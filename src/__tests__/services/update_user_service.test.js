import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { editingUser, editedUser } from '../../actions/users'
import updateUserService from '../../services/update_user_service'
import { user } from '../../__fixtures__/users'

const api = {
  users: {
    updateUser: jest.fn()
  }
}
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe('Update User Service', () => {
  const attrs = { firstname: 'New user' };
  const updatedUser = { ...user, ...attrs };

  it("should be changed status and update user", () => {
    api.users.updateUser.mockReturnValueOnce(updatedUser);
    store.dispatch(updateUserService(user.id, attrs));
    const actions = store.getActions();
    expect(actions[0]).toEqual(editingUser());
    expect(actions[1]).toEqual(editedUser(user.id, updatedUser));
  });

  //TODO integration test with api
});
