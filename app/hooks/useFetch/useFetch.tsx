import { ApiConfig } from "@/app/configs";
import React from "react";
import { useDidMount } from "../useDidMount";
import { useForceUpdate } from "../useForceUpdate";
import { useLogger } from "../useLogger";

type FetchInputDto<TInput, TOutput> = {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: TInput;
  options?: {
    callOnMount?: boolean;
    enable?: boolean;
  };
};

type FetchOutputDto<TInput, TOutput> = {
  response?: TOutput;
  error?: any;
  status: "none" | "fetching" | "success" | "failed";
  timestamp?: number;
  retry?: () => void;
  fetch: (body?: TInput) => void;
  isFetching: boolean;
};

export const useFetch = <TInput, TOutput>({
  body,
  method = "GET",
  options = {},
  path,
}: FetchInputDto<TInput, TOutput>) => {
  const logger = useLogger("useFetch");
  const { callOnMount = false, enable = true } = options;
  const data = React.useRef<FetchOutputDto<TInput, TOutput>>({
    status: "none",
    fetch: () => {},
    isFetching: false,
  });
  const forceUpdate = useForceUpdate();
  const retry = React.useRef<() => void>();

  const handleCallFetch = React.useCallback(
    (passedBody?: TInput) => {
      retry.current = () => {
        (async () => {
          try {
            data.current.status = "fetching";
            forceUpdate;

            const res = await fetch(`${ApiConfig.baseUrl}/${path}`, {
              body: JSON.stringify(passedBody),
              method,
            });

            const response = await res.json();

            if (response.status === "success") {
              data.current.status = "success";
              data.current.response = response.data;
            } else {
              data.current.status = "failed";
              data.current.response = undefined;
              data.current.error = response.error;
            }
          } catch (err) {
            data.current.status = "failed";
            data.current.response = undefined;
            data.current.error = err;

            logger.error(err);
          } finally {
            data.current.timestamp = Date.now();
            forceUpdate();
          }
        })();
      };

      retry.current();
    },
    [forceUpdate, logger, method, path]
  );

  useDidMount(() => {
    if (callOnMount && enable) {
      handleCallFetch(body);
    }
  });

  logger.log(data.current);

  const ret = data.current;

  Object.defineProperty(ret, "fetch", {
    value: handleCallFetch,
    writable: true,
  });

  Object.defineProperty(ret, "retry", {
    value: retry.current,
    writable: true,
  });

  Object.defineProperty(ret, "isFetching", {
    value: ret.status === "fetching",
    writable: true,
  });

  return ret;
};
