import { getLocationsForCurrentUser } from '~/lib/queries/location';
import defineAuthenticatedEventHandler from '~/utils/define-auth-event-handler';

export default defineAuthenticatedEventHandler(async (event) => {

  // await new Promise(resolve => setTimeout(resolve, 1000));

  return await getLocationsForCurrentUser(event.context.user.id);
});
