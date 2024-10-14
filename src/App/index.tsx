import { QueryClientProvider } from "react-query";
import { ProvidersPack as Providers } from "../components/Providers";
import Routers from "../components/routers";
import "./index.css";
import { queryClient } from "./queryClient";

function App() {
  return (
    <Providers>
      <Providers.Providers>
        <QueryClientProvider client={queryClient} />
      </Providers.Providers>
      <Routers />
    </Providers>
  );
}

export default App;
