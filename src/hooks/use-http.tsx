import { useState, useCallback } from "react";

interface RequestConfig {
  url: string;
  method?: string;
  headers?: {};
  body?: string;
};

interface ProcessResponse {
  (data?: any): void;
}

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Send request to API
  const sendRequest = useCallback(
    async (requestConfig: RequestConfig, processResponse: ProcessResponse) => {
      setIsLoading(true);
      setError(null);

      try {
        console.log("Requesting data...");
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error("Send request failed!");
        }

        console.log(`Recieved data based on ... ${requestConfig.url}`);
        const data = await response.json();
        console.log(data);

        processResponse(data);

      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong!");
        }
      }

      console.log("Finished data...");
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
}

export default useHttp;
