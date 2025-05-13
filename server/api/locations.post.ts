import type { DrizzleError } from 'drizzle-orm';
import { InsertLocationSchema } from '~/lib/db/schema/location';
import { getUniqueSlugForLocationName, insertLocation } from '~/lib/queries/location';

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
  // console.log(event.context.user);

  try {
    const slug = await getUniqueSlugForLocationName(validatedBody.data.name, event.context.user.id);

    const data = {
      ...validatedBody.data,
      slug,
      userId: event.context.user.id,
    };

    // console.log(data);
    const created = await insertLocation(data);
    return created;
  }
  catch (e) {
    const error = e as DrizzleError;
    console.log('INSERT ERROR', error);
    if (error.message === 'SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: location.slug') {
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: 'Slug must be unique(location name is used to generate the slug)',
      }));
    }
    if (error.message === 'SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: location.user_id, location.name') {
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: 'Location name already exists',
      }));
    }
    throw error;
  }
});
