import User from "App/Models/User";
import UserLoginValidator from "App/Validators/UserLoginValidator";
import UserSignUpValidator from "App/Validators/UserSignUpValidator";

export default class UsersController {
  async login({ auth, request, response }) {
    try {
      const { email, password } = await request.validate(UserLoginValidator);
      const token = await auth.use('api').attempt(email, password)

      return response.send({message: "Success.", token});
    } catch (error) {
      console.error(error);
      return response.status(400).send(error);
    }
  }
  async signUp({ request, response }) {
    try {
      const { name, email, password } = await request.validate(
        UserSignUpValidator
      );
      let user = new User();
      user.name = name;
      user.email = email;
      user.password = password;
      await user.save();
      return response.send({ message: "Success." });
    } catch (error) {
      console.error(error);
      return response.status(400).send(error);
    }
  }
}
