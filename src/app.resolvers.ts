import { combineResolvers } from "apollo-resolvers";

import users from "./modules/users/resolvers/usersResolvers.js";
import genres from "./modules/genres/resolvers/genreResolver.js";
import bands from "./modules/bands/resolvers/bandsResolvers.js";

export const resolvers = combineResolvers([users, genres, bands]);
