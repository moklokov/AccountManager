import { removingUser, removedUser, removeUserError } from '../actions/users'
import Logger from '../logger'

export default function removeUserService(id) {
  return function (dispatch, getStore, api) {
    try {
      dispatch(removingUser());
      const user = api.users.removeUser(id);
      dispatch(removedUser(user.id));
    } catch (error) {
      Logger.info(error);
      dispatch(removeUserError());
    }
  }
}
