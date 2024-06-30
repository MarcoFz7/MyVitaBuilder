import React from "react";

export const useForceUpdate = () => {
  const [, setTick] = React.useState(0);

  return () => {
    setTick((tick) => tick + 1);
  };
};
