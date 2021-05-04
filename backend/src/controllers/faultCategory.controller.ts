import { getFaultCategoriesOfService } from './../repositories/faulCategory.repository';
import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { FaultCategory } from "../models";
import { createFaultCategory, getFaultCategories, getFaultCategoriesFormatted, getFaultCategoriesForSearch, getFaultCategory, IFaultCategory } from '../repositories/faulCategory.repository';

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

  @Get("/id/:id")
  public async getFaultCategory(@Path() id: string): Promise<FaultCategory | null> {
    return getFaultCategory(Number(id));
  }

  @Get("/formatted")
  public async getFaultCategoriesFormatted(): Promise<FaultCategory[]> {
    return getFaultCategoriesFormatted();
  }

  @Get("/search")
  public async getFaultCategoriesSearch(): Promise<FaultCategory[]> {
    return getFaultCategoriesForSearch();
  }

  @Get("/service/:id")
  public async getFaultCategoriesOfService(@Path() id: string): Promise<FaultCategory[]> {
    return getFaultCategoriesOfService(Number(id));
  }
}
