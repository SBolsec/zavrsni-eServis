import { Service } from "../models";

export interface IServicePaginatedResult {
  current_page: number,
  total_pages: number,
  per_page: number,
  data: Service[]
}