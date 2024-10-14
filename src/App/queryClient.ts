import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //other query settings
      refetchOnWindowFocus: false,
      // refetchOnWindowFocus: false,
    },
  },
});

export { queryClient };
