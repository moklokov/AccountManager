import 'fake-indexeddb/auto'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { addingUser, addedUser } from '../../actions/users'
import createUserService from '../../services/create_user_service'
import { user } from '../../__fixtures__/users'
import api from '../../api'

describe('Create User Service', () => {
  const mockApi = {
    users: {
      createUser: (attrs)=> user
    }
  }
  const middlewares = [thunk.withExtraArgument(mockApi)];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore();

  it("should be changed status and create user", async () => {
    await store.dispatch(createUserService(user));
    const actions = store.getActions();
    expect(actions[0]).toEqual(addingUser());
    expect(actions[1]).toEqual(addedUser(user));
  });

  describe('integration with api', () => {
    const middlewares = [thunk.withExtraArgument(api)];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore();

    it("should be created user", async () => {
      await store.dispatch(createUserService(user));
      const users = await api.users.getUsers();
      expect(users).toHaveLength(1);
      expect(users[0]).toHaveProperty('username', user.username);
    });
  });
});
