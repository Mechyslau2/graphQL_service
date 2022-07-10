import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import axios from "axios";
import "dotenv/config";
import {
  transformData,
  transformDataKey,
  transformObject,
} from "../../../utils/sortUtils.js";
import { Genre } from "../../genres/genresService/GenresService.js";

interface Member {
  _id: string;
  instrument: string;
}

interface BandCreate {
  input: {
    name: string;
    origin: string;
    membersId: Member[];
    website: string;
    genres: Genre[];
  };
}

interface Band {
  _id: string;
  origin: string;
  membersId: Member[];
  website: string;
  genresIds: Genre[];
}

interface IParams {
  limit: number;
  offset: number;
}

class BandService extends RESTDataSource {
  genreUrl: string;

  constructor() {
    super();
    this.baseURL = process.env.BANDS_URL;
    this.genreUrl = process.env.GENRES_URL;
  }

  protected willSendRequest(request: RequestOptions): void | Promise<void> {
    request.headers.set("Authorization", `JWT ${this.context.AUTH_TOKEN}`);
  }

  async getAllBands(params: IParams): Promise<void> {
    const response = await this.get(this.baseURL, { ...params });
    const transformItems = await transformData<Band>(response.items)
      .then((items) =>
        items.map((band) => transformDataKey(band, "genresIds", "genres"))
      )
      .then((items) => items.map((band) => transformDataKey(band, "_id", "id")))
      .then((items) =>
        items.map((band) => {
          const members = band.members.map((member) =>
            transformDataKey(member, "_id", "id")
          );
          band.members = members;
          return band;
        })
      );
    response.items = transformItems;
    return response;
  }

  async getBandById(id: string): Promise<void | Band> {
    return transformObject<Band>(await this.get(`${id}`));
  }

  deleteBand(id: string): Promise<void> {
    return this.delete(`${id}`);
  }

  async updateBand(bandRequest): Promise<void> {
    const { id } = bandRequest.input;
    const data = await transformObject<Band>(bandRequest.input)
      .then((band) => transformDataKey(band, "genres", "genresIds"))
      .then((band) => transformDataKey(band, "id", "_id"))
      .then((band) => {
        const members = band?.members?.map((member) =>
          transformDataKey(member, "id", "_id")
        );
        band.members = members || [];
        return band;
      });

    const response = await this.put(`${id}`, { ...data });

    const responseData = await transformObject<Band>(response)
      .then((band) => transformDataKey(band, "genres", "genresIds"))
      .then((band) => {
        const members = band?.members?.map((member) =>
          transformDataKey(member, "_id", "id")
        );
        band.members = members || [];
        return band;
      });

    return responseData;
  }

  async createBand(data: BandCreate): Promise<void> {
    const postData = transformDataKey(data.input, "genres", "genresIds");
    const response = await this.post(this.baseURL, { ...postData });
    return transformDataKey(response, "genresIds", "genres");
  }
}

export default BandService;
