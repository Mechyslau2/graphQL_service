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

  register(data: UserRegister) {
    try {
      return this.post("register", data);
    } catch ({ message }) {
      return message;
    }
  }

  login(email: string, password: string) {
    try {
      return this.post("login", {
        email,
        password,
      });
    } catch ({ message }) {
      return message;
    }
  }

  getUserById(id: string) {
    try {
      return this.get(`${id}`);
    } catch ({ message }) {
      return message;
    }
  }

  protected verifyToken(token: string) {
    try {
      return this.post(`verify`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch ({ message }) {
      return message;
    }
  }
}

export default UserService;
