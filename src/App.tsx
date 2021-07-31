import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import "./App.css";
import { AppRouter } from "./Router";

function App() {
  return (
    <ChakraProvider>
      <AppRouter />
    </ChakraProvider>
  );
}

export default App;
