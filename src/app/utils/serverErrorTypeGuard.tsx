import { ServerError } from "../types/serverErrorType";

export const isServerError = (error: any): error is ServerError => {
  return (
    typeof error === "object" &&
    "data" in error &&
    "status" in error &&
    "message" in error.data &&
    "success" in error.data
  );
};
