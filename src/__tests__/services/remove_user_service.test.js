import 'fake-indexeddb/auto'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import api from '../../api'
import { removingUser, removedUser } from '../../actions/users'
import removeUserService from '../../services/remove_user_service'
import { user } from '../../__fixtures__/users'

describe('Remove User Service', () => {
  const mockApi = {
    users: {
      removeUser: (id)=> id
    }
  }
  const middlewares = [thunk.withExtraArgument(mockApi)];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore();

  it("should be changed status and remove user", async () => {
    await store.dispatch(removeUserService(1));
    const actions = store.getActions();
    expect(actions[0]).toEqual(removingUser());
    expect(actions[1]).toEqual(removedUser(1));
  });

  describe('integration api', () => {
    const middlewares = [thunk.withExtraArgument(api)];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore();

    it("should be empty users", async () => {
      const createdUser = await api.users.createUser(user);
      await store.dispatch(removeUserService(createdUser.id));
      const users = await api.users.getUsers();
      expect(users).toHaveLength(0);
    });
  });
});
