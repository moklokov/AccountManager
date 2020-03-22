import {
  processingUsers,
  editedUser,
  processUsersError
} from "../actions/users";
import Logger from "../logger";

export default function loadUserService(id) {
  return async function(dispatch, _, api) {
    try {
      dispatch(processingUsers());
      const user = await api.users.getUser(parseInt(id));
      dispatch(editedUser(user.id, user));
    } catch (error) {
      Logger.info(error);
      dispatch(processUsersError(error));
    }
  };
}
