import { useCallback } from "react";
import { useSelector } from "react-redux";

function ValidationError() {
  const { error } = useSelector((state) => state.auth);
  const errorMessage = useCallback(() => {
    return Object.keys(error).map((item) => {
      const msg = error[item].join(",");
      return `${item} ${msg}`;
    });
  }, [error]);

  return (
    error &&
    errorMessage().map((item) => {
      return (
        <p key={item} className=" text-red-600">
          {item}
        </p>
      );
    })
  );
}

export default ValidationError;
