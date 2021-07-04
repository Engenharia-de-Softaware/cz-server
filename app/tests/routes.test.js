const SignUpValidatorMiddleware = require('../users/middlewares/signup.users.middleware');
const usersController = require('../users/controllers/users.controller');
const operations = require('../users/operations');

describe('Testing users middlewares', () => {
  it('should verify hasNormalUserSignUpValidFields function', () => {
    const user = {
                    body:{
                        name: "carlos", 
                        cpf: "123123123", 
                        email: "teste123@123.com", 
                        password: "123123123"
                    }
                };

    const errors = SignUpValidatorMiddleware.hasNormalUserSignUpValidFields(user, {}, () => ([]) );
    expect(errors).toEqual([]);
  })

  it('should verify passwordHash function', async () => {
    const user = {
                    body:{
                        name: "carlos", 
                        cpf: "123123123", 
                        email: "teste123@123.com"
                    }
                };

    const errors = await usersController.passwordHash(user, {}, () => ([]));
    expect(errors).toEqual([]);
  })

  it('should verify insert function', async () => {
    const user = {
                    body:{
                        cpf: "123123123", 
                        email: "teste123@123.com",
                        password: "123123123"
                    }
                };
    const res = {
      status: () => {},
      send: () => {}
    }

    const errors = await operations.insert(user, res);
    expect(errors.user.name).toEqual(undefined);
  })

})

