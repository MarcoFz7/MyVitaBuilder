import React from "react";

export const useDidUnmount = (callback: () => void) => {
  React.useEffect(() => {
    return callback;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
