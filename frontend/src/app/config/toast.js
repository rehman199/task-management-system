import { toast } from "react-toastify";

const errorToast = (message = "Error, Please try again") =>
  toast.error(message);

const successToast = (message) => toast.success(message);

export { errorToast, successToast };
