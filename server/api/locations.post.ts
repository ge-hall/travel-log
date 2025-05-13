import { InsertLocationSchema, location } from '~/lib/db/schema/location';
import db from '~/lib/db';

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    }));
  }

  const validatedBody = await readValidatedBody(event, InsertLocationSchema.safeParse);

  if (!validatedBody.success) {
    const statusMessage = validatedBody
      .error
      .issues
      .map(issue => `${issue.path.join(' ')}: ${issue.message}`)
      .join('; ');

    const data = validatedBody
      .error
      .issues
      .reduce((errors, issue) => {
        errors[issue.path.join('')] = issue.message;

        return errors;
      }, {} as Record<string, string>);
    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }
  console.log(event.context.user);
  const data = {
    ...validatedBody.data,
    slug: validatedBody.data.name.replaceAll(' ', '-').toLowerCase(),
    userId: event.context.user.id,
  };

  console.log(data);
  const created = db.insert(location).values(data).returning();
  return created;
});
