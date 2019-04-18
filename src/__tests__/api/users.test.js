import 'fake-indexeddb/auto'

import * as api from '../../api/users'
import { user } from '../../__fixtures__/users'

describe('Users API', () => {
  beforeEach(async () => {
    await api.clear()
  });

  describe('create user', () => {
    it("should be user has ID", async () => {
      const subject = await api.createUser(user);
      expect(subject).toHaveProperty('id');
    });

    it("should be count users equal 1", async () => {
      const subject = await api.createUser(user);
      const users = await api.getUsers();
      expect(users).toHaveLength(1);
    });
  });

  describe('remove user', () => {
    it("should be empty users", async () => {
      const createdUser = await api.createUser(user);
      await api.removeUser(createdUser.id);
      const users = await api.getUsers();
      expect(users).toHaveLength(0);
    });
  });

  describe('update user', () => {
    it("should be updated firstname", async () => {
      const createdUser = await api.createUser(user);
      const attrs = { firstname: 'Changed firstname' };
      const updateUser = { ...createdUser, ...attrs };
      const updatedUser = await api.updateUser(updateUser);
      expect(updatedUser).toMatchObject(updateUser);
    });
  });

  describe('get users', () => {
    it("should be returns two users", async () => {
      const firstUser = await api.createUser(user);
      const secondUser = await api.createUser({ ...user, email: 'second@mail.ru', username: 'second user' });
      const users = await api.getUsers();
      expect(users).toHaveLength(2);
      expect(users[0]).toMatchObject(firstUser);
      expect(users[1]).toMatchObject(secondUser);
    });
  });

  describe('get user', () => {
    it("should be returns user", async () => {
      const createdUser = await api.createUser(user);
      const subject = await api.getUser(createdUser.id);
      expect(subject).toMatchObject(createdUser);
    });

    it("should be returns undefined", async () => {
      const subject = await api.getUser(1);
      expect(subject).toBeUndefined();
    });
  });

  describe('get user by username', () => {
    it("should be returns user", async () => {
      const createdUser = await api.createUser(user);
      const subject = await api.getUserByUsername(createdUser.username);
      expect(subject).toMatchObject(createdUser);
    });

    it("should be returns undefined", async () => {
      const subject = await api.getUserByUsername('test');
      expect(subject).toBeUndefined();
    });
  });

  describe('get user by email', () => {
    it("should be returns user", async () => {
      const createdUser = await api.createUser(user);
      const subject = await api.getUserByEmail(createdUser.email);
      expect(subject).toMatchObject(createdUser);
    });

    it("should be returns undefined", async () => {
      const subject = await api.getUserByEmail('test@test.com');
      expect(subject).toBeUndefined();
    });
  });
});
