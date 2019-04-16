import { editingUser, editedUser, editUserError } from '../actions/users'
import Logger from '../logger'

export default function updateUserService(id, attrs) {
  return function (dispatch, getStore, api) {
    try {
      dispatch(editingUser());
      const user = api.users.updateUser(id, attrs);
      dispatch(editedUser(id, user));
    } catch (error) {
      Logger.info(error);
      dispatch(editUserError());
    }
  }
}
