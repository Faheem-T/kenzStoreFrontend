export interface ServerError {
  data: {
    message: string;
    success: number;
  };
  status: number;
}
