import { processingUsers, editedUser, processUsersError, validationUserErrors } from '../actions/users'
import validation from '../validators/user'
import Logger from '../logger'

export default function updateUserService(id, attrs) {
  return async function (dispatch, getStore, api) {
    try {
      dispatch(processingUsers());
      const user = await api.users.getUser(id);
      let updateUser = { ...user, ...attrs };
      const validErrors = await validation(updateUser);
      if (Object.keys(validErrors).length) {
        dispatch(validationUserErrors(validErrors));
      } else {
        updateUser = await api.users.updateUser(updateUser);
        dispatch(editedUser(id, updateUser));
      }
    } catch (error) {
      Logger.info(error);
      dispatch(processUsersError(error));
    }
  }
}
