import { InsertLocationSchema } from '~/lib/db/schema/location';

export default defineEventHandler(async (event) => {
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
        errors[issue.path.join(' ')] = issue.message;

        return errors;
      }, {} as Record<string, string>)
      .join;
    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }
  return validatedBody.data;
});
