import 'fake-indexeddb/auto'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import api from '../../api'
import { editingUser, editedUser } from '../../actions/users'
import updateUserService from '../../services/update_user_service'
import { user } from '../../__fixtures__/users'

describe('Update User Service', () => {
  const mockApi = {
    users: {
      updateUser: jest.fn()
    }
  }
  const middlewares = [thunk.withExtraArgument(mockApi)];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore();

  const attrs = { firstname: 'New user' };
  const expectedUser = { ...user, ...attrs };

  it("should be changed status and update user", () => {
    mockApi.users.updateUser.mockReturnValueOnce(expectedUser);
    store.dispatch(updateUserService(user.id, attrs));
    const actions = store.getActions();
    expect(actions[0]).toEqual(editingUser());
    expect(actions[1]).toEqual(editedUser(user.id, expectedUser));
  });

  describe('integration api', () => {
    const middlewares = [thunk.withExtraArgument(api)];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore();

    it("should be changed user", async () => {
      const createdUser = await api.users.createUser(user);
      const updatedUser = await api.users.updateUser(createdUser.id, attrs);
      const users = await api.users.getUsers();
      expect(updatedUser).toMatchObject(expectedUser);
      expect(users[0]).toMatchObject(expectedUser);
    });
  });
});
