import { toast } from "react-toastify";

export const handleApiError = (error) => {
  let message = "Something went wrong";

  if (error.response) {
    message = error.response.data?.message || message;
  } else if (error.request) {
    message = "Server is not responding";
  } else {
    message = error.message;
  }
  console.log(message);

  toast.error(message);

  return message;
};
