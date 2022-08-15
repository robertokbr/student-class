import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import '../styles/global.css';
import { ClassProvider } from "../states/context/class-context";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ClassProvider>
        <Component {...pageProps} />
      </ClassProvider>
    </ChakraProvider>
  );
}

export default MyApp
