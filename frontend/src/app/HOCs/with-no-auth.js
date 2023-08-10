/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function WithNoAuth(Component) {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const { push } = useRouter();

    useEffect(() => {
      if (accessToken) push("/");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return accessToken ? null : <Component {...props} />;
  };
}
