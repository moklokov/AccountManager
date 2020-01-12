import {
  processingUsers,
  processUsersError,
  validationUserErrors,
  addedUser
} from "../actions/users";
import validator from "../validators/user";
import Logger from "../logger";

export default function createUserService(attrs) {
  return async function(dispatch, getStore, api) {
    try {
      dispatch(processingUsers());
      const validErrors = await validator(attrs);
      if (Object.keys(validErrors).length) {
        dispatch(validationUserErrors(validErrors));
      } else {
        const currentTime = new Date();
        const user = await api.users.createUser({
          ...attrs,
          createdAt: currentTime,
          updatedAt: currentTime
        });
        dispatch(addedUser(user));
      }
    } catch (error) {
      Logger.info(error);
      dispatch(processUsersError(error));
    }
  };
}
