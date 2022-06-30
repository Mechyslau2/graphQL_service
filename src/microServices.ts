import GenresService from "./modules/genres/genresService/GenresService.js";
import UserService from "./modules/users/usersService/usersService.js";

export const services = {
  userApi: new UserService(),
  genreApi: new GenresService(),
};
