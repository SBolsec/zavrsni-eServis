import { Offer } from "../models";

export interface IOfferPaginatedResult {
  current_page: number,
  total_pages: number,
  per_page: number,
  data: Offer[]
}