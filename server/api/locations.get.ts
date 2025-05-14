import { getLocationsForCurrentUser } from '~/lib/queries/location';
import defineAuthenticatedEventHandler from '~/utils/define-auth-event-handler';

export default defineAuthenticatedEventHandler(async (event) => {
  return await getLocationsForCurrentUser(event.context.user.id);
});
