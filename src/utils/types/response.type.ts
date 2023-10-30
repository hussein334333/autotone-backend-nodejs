/**
 * the following is used as Response Schema Type for all APIs
 */
export interface Response<T> {
  body: T
  status: number
  message: string
}
