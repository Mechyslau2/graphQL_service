import BandService from "./modules/bands/service/BandService.js";
import GenresService from "./modules/genres/genresService/GenresService.js";
import UserService from "./modules/users/usersService/usersService.js";

export const services = {
  userApi: new UserService(),
  genreApi: new GenresService(),
  bandApi: new BandService(),
};
