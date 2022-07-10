import { RESTDataSource } from "apollo-datasource-rest";
import { transformObject } from '../../../utils/sortUtils.js';
import "dotenv/config";

interface UserRegister {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

interface User extends UserRegister {
  _id: string;
}

class UserService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.USERS_URL;
  }

  register(data: UserRegister): Promise<void> {
    return this.post("register", data);
  }

  login(email: string, password: string): Promise<void> {
    return this.post("login", {
      email,
      password,
    });
  }

  async getUserById(id: string): Promise<void | User> {
    return transformObject(await this.get(`${id}`));
  }
}

export default UserService;
