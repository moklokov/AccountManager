import { addingUser, addedUser, addUserError } from '../actions/users'
import Logger from '../logger'

export default function createUserService(attrs) {
  return function (dispatch, getStore, api) {
    try {
      dispatch(addingUser());
      const user = api.users.createUser(attrs);
      dispatch(addedUser(user));
    } catch (error) {
      Logger.info(error);
      dispatch(addUserError());
    }
  }
}
