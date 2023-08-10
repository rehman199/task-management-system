/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { SignInPath } from "../constants/routes/frontend/auth-routes";

const WithAuth = (Component) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const { push } = useRouter();

    useLayoutEffect(() => {
      if (!accessToken) push(SignInPath);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);

    return accessToken ? <Component {...props} /> : null;
  };
};

export default WithAuth;
