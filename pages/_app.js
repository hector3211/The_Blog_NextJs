import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Layout from "../layouts/main";

function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    styles: {
      "html,body": {
        minHeight: "100vh",
      },
    },
    colors: {
      red: "#F05454",
      dark: "#222831",
      light: "#DDDDDD",
      meduim: "#30475E",
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
