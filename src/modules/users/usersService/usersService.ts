import { RESTDataSource } from "apollo-datasource-rest";
import "dotenv/config";

interface UserRegister {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
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

  getUserById(id: string): Promise<void> {
    return this.get(`${id}`);
  }

  protected verifyToken(token: string): Promise<void> {
    return this.post(`verify`, null, {
      headers: {
        Authorization: `Jwt ${token}`,
      },
    });
  }
}

export default UserService;
