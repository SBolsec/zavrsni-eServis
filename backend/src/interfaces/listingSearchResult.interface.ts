import { Listing } from "../models";

export interface IListingSearchResult {
  prev_page: number | null,
  next_page: number | null,
  current_page: number,
  total_pages: number,
  per_page: number,
  data: Listing[]
}