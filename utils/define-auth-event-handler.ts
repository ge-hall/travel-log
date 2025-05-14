import type { H3Event } from 'h3';
import type { User } from 'better-auth';

type AuthenticatedEvent = H3Event & {
  context: H3Event['context'] & {
    user: User;
  };
};
export default function defineAuthenticatedEventHandler<T>(

  handler: (event: AuthenticatedEvent) => T,
) {
  return defineEventHandler(async (event) => {
    if (!event.context.user) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      }));
    }
    return handler(event as AuthenticatedEvent);
  });
}
