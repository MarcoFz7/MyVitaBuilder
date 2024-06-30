import React from "react";

export const useDidMount = (callback: () => void) => {
  React.useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
