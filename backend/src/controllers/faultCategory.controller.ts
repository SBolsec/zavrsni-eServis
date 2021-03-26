import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { FaultCategory } from "../models";
import { createFaultCategory, getFaultCategories, getFaultCategory, IFaultCategory } from '../repositories/faulCategory.repository';

@Route("faultCategories")
@Tags("Fault Category")
export default class FaultCategoryController {
  
  @Get("/")
  public async getFaultCategories(): Promise<FaultCategory[]> {
    return getFaultCategories();
  }

  @Post("/")
  public async createFaultCategory(@Body() body: IFaultCategory): Promise<FaultCategory> {
    return createFaultCategory(body);
  }

  @Get("/:id")
  public async getFaultCategory(@Path() id: string): Promise<FaultCategory | null> {
    return getFaultCategory(Number(id));
  }
}
