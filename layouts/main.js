import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

const Main = ({ children }) => {
  return (
    <Box as="main" pb={8} bg="#30475E" color="#FFFFFF" minHeight="100vh">
      <Container maxW="container.md" pt={12} fontFamily="'Ubuntu', sans-serif;">
        {children}
      </Container>
    </Box>
  );
};

export default Main;
