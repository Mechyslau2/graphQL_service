import axios from "axios";
import "dotenv/config";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

class Validation {
  protected static async verifyToken(token: string): Promise<any> {
    try {
      const response = await axios.post(
        `${process.env.USERS_URL}/verify`,
        null,
        {
          headers: { Authorization: `jwt ${token}` },
        }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  protected static ofType<T>(obj: any): obj is T {
    return !!obj;
  }

  static async isValidToken(token: string): Promise<boolean> {
    const user = await this.verifyToken(token);
    return this.ofType<User>(user);
  }
}

export default Validation;
