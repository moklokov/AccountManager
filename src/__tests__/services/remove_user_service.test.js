import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { removingUser, removedUser } from '../../actions/users'
import removeUserService from '../../services/remove_user_service'
import { user } from '../../__fixtures__/users'

const api = {
  users: {
    removeUser: (id)=> user
  }
}
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe('Remove User Service', () => {
  it("should be changed status and remove user", () => {
    store.dispatch(removeUserService(user.id));
    const actions = store.getActions();
    expect(actions[0]).toEqual(removingUser());
    expect(actions[1]).toEqual(removedUser(user.id));
  });

  //TODO integration test with api
});
