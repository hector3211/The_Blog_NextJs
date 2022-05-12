import React from "react";
import { Box, Container } from "@chakra-ui/react";

export const Header = (props) => {
  return (
    <Box>
      <Container>
        <Box fontSize="2xl" bg="red" borderRadius="lg" align="center" p="2">
          {props.user
            ? `Welcome ${props.user.split(" ", 1)}`
            : "Welcome to the Blog"}
        </Box>
      </Container>
    </Box>
  );
};
