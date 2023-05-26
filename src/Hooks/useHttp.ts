import { useCallback, useState } from "react";
import { requestConfigResource } from "../Services/DTOs";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (requestConfig: requestConfigResource, applyData: Function) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        applyData(data);
        // helperToGetAllProdId(data.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    []
  );
  return {
    isLoading,
    error,
    sendRequest,
  };
};

// const helperToGetAllProdId = (prodArray: any) => {
//   //@ts-ignore
//   prodArray.forEach((prod) => {
//     console.log(prod.name, prod.id);
//   });
// };

export default useHttp;
