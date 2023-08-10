"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import generalApi from "../config/api";
import { errorToast, successToast } from "../config/toast";
import { REGISTRATION_SUCCESS } from "../constants/messages";
import {
  SignIn,
  SignUp,
  Signout,
} from "../constants/routes/backend/auth-routes";
import { SignInPath } from "../constants/routes/frontend/auth-routes";
import { login, logout } from "../store/auth-slice";
import { setTasks } from "../store/tasks-slice";
import useLoading from "./use-loading";

const useAuth = ({ initialValues = {}, type = "" }) => {
  const [values, setValues] = useState(initialValues);

  const { loading, setLoading } = useLoading();
  const { push } = useRouter();
  const dispatch = useDispatch();

  const onChange = (event) => {
    const { name, value } = event.target;

    setValues((prev) => {
      return { user: { ...prev.user, [name]: value } };
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (type === "register") {
        await generalApi.post(SignUp, values);
        successToast(REGISTRATION_SUCCESS);
        return await push(SignInPath);
      }

      const { data } = await generalApi.post(SignIn, values);
      dispatch(login({ user: data.user }));
      push("/");
    } catch (err) {
      errorToast(err?.response?.data?.error ?? err?.message);
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await generalApi.post(Signout);
      dispatch(setTasks({ tasks: [] }));
      dispatch(logout());
      push("/");
    } catch (err) {
      errorToast(err?.response?.data?.error ?? err.message);
    }
    setLoading(false);
  };

  return { loading, onChange, onSubmit, values, logoutUser };
};

export default useAuth;
