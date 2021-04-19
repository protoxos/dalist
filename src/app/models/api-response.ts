export enum ResponseStatus {
  Error = 0,
  Success = 1,
  Warning = 2,
  Unknow = 3
}
export class ApiResponse {
  State: ResponseStatus = ResponseStatus.Unknow;
  Data: any;
}
