import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Theme from "./theme/Theme";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <Router>
        <Theme>
          <App />
        </Theme>
      </Router>
    </ChakraProvider>
  </QueryClientProvider>
);
