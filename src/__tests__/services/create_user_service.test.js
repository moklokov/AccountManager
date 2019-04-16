import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { addingUser, addedUser } from '../../actions/users'
import createUserService from '../../services/create_user_service'
import { user } from '../../__fixtures__/users'

const api = {
  users: {
    createUser: (attrs)=> user
  }
}
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

describe('Create User Service', () => {
  it("should be changed status and create user", () => {
    const store = mockStore();
    store.dispatch(createUserService());
    const actions = store.getActions();
    expect(actions[0]).toEqual(addingUser());
    expect(actions[1]).toEqual(addedUser(user));
  });

  //TODO integration test with api
});
