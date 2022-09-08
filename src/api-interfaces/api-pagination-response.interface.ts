export interface ApiPaginationResponse<T> {
  data: T[] | [];
  count: number;
}
