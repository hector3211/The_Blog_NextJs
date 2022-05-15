import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";

const Main = ({ children }) => {
  return (
    <Box as="main" pb={8} bg="#30475E" color="#FFFFFF" minHeight="100vh">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>The Blog</title>
      </Head>
      <Container maxW="container.md" pt={12} fontFamily="'Ubuntu', sans-serif;">
        {children}
      </Container>
    </Box>
  );
};

export default Main;
