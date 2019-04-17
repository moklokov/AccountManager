jest.mock('../../api/users');
import 'fake-indexeddb/auto'
import validator from '../../validators/user'
import { user } from '../../__fixtures__/users'
import { getUserByUsername, getUserByEmail } from '../../api/users'

describe('User validator', () => {
  describe('with correct fields', () => {
    it("should be returns empty errors", () => {
      expect(validator(user)).toEqual({});
    });
  });

  describe('with empty fields', () => {
    const fields = { avatar: '', username: '', password: '', repeatPassword: '', firstname: '', lastname: '', birthdate: '',
        email: '', gender: '', address: '', phone: '', fax: '', company: '', githublink: '', facebook: '', language: '',
          skills: [], info: '', hobbies: [] };

    it("should be returns 10 errors", () => {
      expect(validator(fields)).toMatchObject({
        username: ['обязательно для заполнения'],
        password: ['обязательно для заполнения'],
        repeatPassword: ['обязательно для заполнения'],
        firstname: ['обязательно для заполнения'],
        lastname: ['обязательно для заполнения'],
        email: ['обязательно для заполнения'],
        gender: ['обязательно для заполнения'],
        company: ['обязательно для заполнения'],
        language: ['обязательно для заполнения'],
        skills: ['должно быть выбрано не менее 3x']
      });
    });
  });

  describe('with invalid fields', () => {
    describe('unique username', () => {
      beforeAll(() => {
        getUserByUsername.mockResolvedValue(user)
      });

      it("should be returns presence username error", () => {
        expect(validator(user)).toMatchObject({ username: ['уже существует'] })
      });
    });

    describe('confirm password', () => {
      beforeAll(() => {
        user.password = '111111';
        user.repeatPassword = '222222';
      });

      it("should be returns passwords not match error", () => {
        expect(validator(user)).toMatchObject({ repeatPassword: ['не соответствует пароолю'] })
      });
    });

    describe('unique email', () => {
      beforeAll(() => {
        getUserByEmail.mockResolvedValue(user)
      });

      it("should be returns presence email error", () => {
        expect(validator(user)).toMatchObject({ email: ['уже существует'] })
      });
    });

    describe('less skills', () => {
      beforeAll(() => {
        user.skills = ['Javascript'];
      });

      it("should be returns less skills error", () => {
        expect(validator(user)).toMatchObject({ skills: ['должно быть выбрано не менее 3x'] })
      });
    });

    describe('user under 18', () => {
      beforeAll(() => {
        user.birthdate = new Date();
      });

      it("should be returns under 18 error", () => {
        expect(validator(user)).toMatchObject({ birthdate: ['еще не достигли 18 летия'] })
      });
    });

    describe('information length more 300 symbols', () => {
      beforeAll(() => {
        let info = '';
        for (var i = 0; i < 300; i++) {
          info += i;
        }
        user.info = info;
      });

      it("should be returns more 300 symbols error", () => {
        expect(validator(user)).toMatchObject({ info: ['не более 300 символов'] })
      });
    });
  });
});
