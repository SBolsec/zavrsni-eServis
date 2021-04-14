import { Listing } from "../models";

export interface IListingPaginatedResult {
  current_page: number,
  total_pages: number,
  per_page: number,
  data: Listing[]
}