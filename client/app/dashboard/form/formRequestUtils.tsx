import toast from "react-hot-toast";
import axios from "axios";

export async function getUserForms() {
  console.log("Hello")
  const formDataFromLocalStorage = JSON.parse(
    localStorage.getItem("formDataFromLocalStorage")!
  );
  const FormNewCreatedPing = localStorage.getItem("FormNewCreatedPing");
  if (formDataFromLocalStorage) {
    if (FormNewCreatedPing == "Yes") {
      const toastId = toast.loading("Getting Data From Server..");
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `${
            process.env.NEXT_PUBLIC_TOKEN_TYPE
          } ${localStorage.getItem("userToken")}`,
        };
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/form/getUserForms`,
          { headers }
        );
        console.log(response.data.forms); // Assuming the server returns some data
        toast.success(response.data.message, {
          id: toastId,
        });
        localStorage.setItem(
          "formDataFromLocalStorage",
          JSON.stringify(response.data.forms)
        );
        localStorage.removeItem("FormNewCreatedPing");
        return response.data.forms;
      } catch (error: any) {
        console.error("Error in updating profile:", error);
        toast.error(error.response.data.error, {
          id: toastId,
        });
      }
    }
    return formDataFromLocalStorage;
  } else {
    const toastId = toast.loading("Getting Data From Server..");
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${
          process.env.NEXT_PUBLIC_TOKEN_TYPE
        } ${localStorage.getItem("userToken")}`,
      };
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/form/getUserForms`,
        { headers }
      );
      console.log(response.data.forms); // Assuming the server returns some data
      toast.success(response.data.message, {
        id: toastId,
      });
      localStorage.setItem(
        "formDataFromLocalStorage",
        JSON.stringify(response.data.forms)
      );
      return response.data.forms;
    } catch (error: any) {
      console.error("Error in updating profile:", error);
      toast.error(error.response.data.error, {
        id: toastId,
      });
    }
  }
}
