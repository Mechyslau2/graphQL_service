import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import "dotenv/config";
import { transformData, transformObject } from "../../../utils/sortUtils.js";

 interface GenreCreate {
  name: string;
  description: string;
  country: string;
  year: string;
}

interface GenreData {
  items: Genre[];
  total: number;
  limit: number;
  offset: number;
}
interface IParams {
  limit: number;
  offset: number;
}

export interface Genre extends GenreCreate {
  _id: string;
}

interface UpdateGenre {
  id: string;
}

class GenresService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.GENRES_URL;
  }

  protected willSendRequest(request: RequestOptions): void | Promise<void> {
    request.headers.set("Authorization", `JWT ${this.context.AUTH_TOKEN}`);
  }

  async createGenre(genre: GenreCreate): Promise<void> {
    return transformObject<Genre>(await this.post(this.baseURL, genre));
  }

  updateGenre(id: string, genre: UpdateGenre): Promise<void> {
    return this.put(`${id}`, { ...genre });
  }

  deleteGenre(id: string): Promise<void> {
    return this.delete(`${id}`);
  } 

  async getAllGenres(params?: IParams): Promise<any | GenreData> {
    const response = await this.get(this.baseURL, { ...params });
    const transformItems = await transformData<Genre>(response.items);
    response.items = transformItems;
    return response;
  }

  async getGenreById(id: string): Promise<void | Genre> {
    return transformObject<Genre>(await this.get(`${id}`));
  }
}

export default GenresService;
