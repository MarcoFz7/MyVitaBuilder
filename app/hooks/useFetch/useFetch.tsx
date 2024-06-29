import { ApiConfig } from "@/app/configs";
import React from "react";
import { useDidMount } from "../useDidMount";
import { useForceUpdate } from "../useForceUpdate";
import { useLogger } from "../useLogger";

type FetchInputDto<TInput, TOutput> = {
  path: string;
  method?: string;
  body?: TInput;
  options?: {
    callOnMount?: boolean;
    enable?: boolean;
  };
};

type FetchOutputDto<TInput, TOutput> = {
  response?: TOutput;
  status: "none" | "fetching" | "success" | "error";
  timestamp?: number;
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

            data.current.status = "success";
            data.current.response = response;
          } catch (err) {
            data.current.status = "error";
            data.current.response = undefined;

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

  logger.log("useFetch hook initialized");

  const ret = data.current;

  Object.defineProperty(ret, "fetch", {
    value: handleCallFetch,
  });

  Object.defineProperty(ret, "retry", {
    value: retry.current,
  });

  return ret;
};
