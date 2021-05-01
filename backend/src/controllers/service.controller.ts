import { Get, Route, Tags, Post, Body, Path, Put, Query } from "tsoa";
import { Service } from "../models";
import {
  getServices,
  createService,
  updateService,
  IServicePayload,
  getService,
  getServiceByUserId,
  getPaginatedSearchListings,
} from "../repositories/service.repository";

@Route("services")
@Tags("Service")
export default class PersonController {
  @Get("/")
  public async getServices(): Promise<Service[]> {
    return getServices();
  }

  @Post("/")
  public async createService(@Body() body: IServicePayload): Promise<Service> {
    return createService(body);
  }

  @Get("/id/:id")
  public async getService(@Path() id: string): Promise<any | null> {
    const service:any = await getService(Number(id));
    if (!service) return null;

    service.profilePicture = service.user.profilePicture;
    delete service.user;
    if (!service.profilePicture) {
      service.profilePicture = {
        url:
          "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
      };
    }

    service.offers.forEach((offer: any) => {
      offer.service.profilePicture = offer.service.user.profilePicture;
      delete offer.service.user;
      if (!offer.service.profilePicture) {
        offer.service.profilePicture = {
          url:
            "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
        };
      }
    });

    return service;
  }

  @Put("/:id")
  public async updateService(
    @Path() id: string,
    @Body() body: IServicePayload
  ): Promise<Service | null> {
    return updateService(Number(id), body);
  }

  @Get("/user/:id")
  public async getServiceByUserId(@Path() id: string): Promise<Service | null> {
    return getServiceByUserId(Number(id));
  }

  @Get("/search")
  public async getSearchResults(
    @Query() service?: string,
    @Query() faultCategoryId?: string,
    @Query() cityId?: number,
    @Query() page?: number,
    @Query() per_page?: number
  ): Promise<any> {
    let ids: number[] = [];
    if (faultCategoryId) {
      faultCategoryId.split(":").forEach((id) => ids.push(Number(id)));
    }

    let res: any = await getPaginatedSearchListings({
      service,
      faultCategoryId: ids,
      cityId,
      page,
      per_page,
    });

    res.data.forEach((service: any) => {
      service.profilePicture = service.user.profilePicture;
      delete service.user;
      if (!service.profilePicture) {
        service.profilePicture = {
          url:
            "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
        };
      }
    });

    return res;
  }
}
