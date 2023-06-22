import { userModel } from "./models/UsersModels.js";
import { createHash, isValidPassword } from "../../path.js";

export default class UserManager {
  
  async registro(user) {
    try {
      const { first_name, last_name, email, age, password, role } = user;
      const existUser = await userModel.find({ email });
      if (existUser.length === 0) {
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
          return await userModel.create({
            ...user,
            password: createHash(password),
            role: "admin",
          });
        } else {
          const newUser = await userModel.create({
            ...user,
            password: createHash(password),
            role: "usuario",
          });
          return newUser;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await userModel.findOne({ email });
      if (userExist) {
        const passValid = isValidPassword(password, userExist);
        if (!passValid) return false;
        else return userExist;
      }
      return false;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      const userExist = await userModel.findById(id);
      // console.log(userExist);
      if (userExist) {
        return userExist;
      }
      return false;
    } catch (error) {
      console.log(error);
      // throw new Error(error)
    }
  }

  async getByEmail(email) {
    try {
      const userExist = await userModel.findOne({ email });
      // console.log(userExist);
      if (userExist) {
        return userExist;
      }
      return false;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
