import {
  Box,
  Flex,
  Container,
  Center,
  Button,
  Text,
  chakra,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "../components/Header";
import { Body } from "../components/body";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { motion, isValidMotionProp } from "framer-motion";
export default function Home() {
  const [signedin, setSignedIn] = useState(false);
  const [user, setUser] = useState("");
  const [admin, setAdmin] = useState("");
  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
  });
  useEffect(() => {
    if (
      sessionStorage.getItem("emailToken") ||
      sessionStorage.getItem("gmailToken")
    ) {
      setUser(sessionStorage.getItem("displayName"));
      setSignedIn(true);
    }
  }, []);
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.setItem("emailToken", "");
        sessionStorage.setItem("gmailToken", "");
        sessionStorage.setItem("displayName", "");
        sessionStorage.setItem("admin", "");
        setUser("");
        setSignedIn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box>
      <Box>
        <Center mb="5">
          {signedin ? (
            <ChakraBox whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }}>
              <Button
                onClick={signOutUser}
                variant="solid"
                p="2"
                size="md"
                colorScheme="blue"
              >
                Log Out
              </Button>
            </ChakraBox>
          ) : (
            <Flex>
              <ChakraBox whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }}>
                <Link href={`/signup`}>
                  <Button
                    mx={2}
                    variant="solid"
                    size="md"
                    width="90px"
                    colorScheme="blue"
                  >
                    <Text fontSize={"lg"}>Sign Up</Text>
                  </Button>
                </Link>
              </ChakraBox>
              <ChakraBox whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }}>
                <Link href={`/login`}>
                  <Button
                    mx={2}
                    variant="solid"
                    size="md"
                    width="90px"
                    colorScheme="green"
                  >
                    <Text fontSize={"lg"}>Log In</Text>
                  </Button>
                </Link>
              </ChakraBox>
            </Flex>
          )}
        </Center>
        <Container>
          <Header user={user} />
        </Container>
        <Box pt="10">
          {signedin && <Body admin={sessionStorage.getItem("admin")} />}
        </Box>
      </Box>
    </Box>
  );
}
