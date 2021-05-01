export interface IServiceSearchPayload {
  service?: string;
  faultCategoryId?: number[];
  cityId?: number;
  page?: number;
  per_page?: number;
}
