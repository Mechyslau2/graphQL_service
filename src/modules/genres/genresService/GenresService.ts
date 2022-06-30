import { RESTDataSource } from "apollo-datasource-rest";
import "dotenv/config";

interface GenreCreate {
  name: string;
  description: string;
  country: string;
  year: string;
}

interface IParams {
  limit: number;
  offset: number;
}

interface Genre extends GenreCreate {
  _id: string;
}

class GenresService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.GENRES_URL;
  }

  createGenre(genre: GenreCreate, token: string): Promise<void> {
    return this.post(this.baseURL, genre, {
      headers: {
        Authorization: `jwt ${token}`,
      },
    });
  }

  updateGenre(id: string, genre: Genre, token: string): Promise<void> {
    return this.put(`${this.baseURL}/${id}`, genre, {
      headers: {
        Authorization: `jwt ${token}`,
      },
    });
  }

  deleteGenre(id: string, token: string): Promise<void> {
    return this.delete(`${id}`, null, {
      headers: {
        Authorization: `jwt ${token}`,
      },
    });
  }

  getAllGenres(params: IParams): Promise<void> {
    return this.get(this.baseURL, { ...params });
  }

  getGenreById(id: string): Promise<void> {
    return this.get(`${id}`);
  }
}

export default GenresService;
