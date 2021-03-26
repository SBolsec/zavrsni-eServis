import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Picture } from "../models";
import { getPictures, createPicture, getPicture, IPicturePayload } from "../repositories/picture.repository";

@Route("pictures")
@Tags("Picture")
export default class ListingController {
  
  @Get("/")
  public async getPictures(): Promise<Picture[]> {
    return getPictures();
  }

  @Post("/")
  public async createPicture(@Body() body: IPicturePayload): Promise<Picture> {
    return createPicture(body);
  }

  @Get("/:id")
  public async getPicture(@Path() id: string): Promise<Picture | null> {
    return getPicture(Number(id));
  }
}
