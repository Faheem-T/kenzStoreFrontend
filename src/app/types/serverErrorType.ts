export interface ServerError {
  data: {
    message: string;
    status: number;
  };
  status: number;
}
