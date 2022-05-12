import { Box, Flex, Text, Container, Center, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "../components/Header";
import { Body } from "../components/body";
import { signInWithGoogle } from "../firebase";

export default function Home() {
  const [signedin, setSignedIn] = useState(false);
  const [user, setUser] = useState("");
  const logIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result);
        const name = result.user.displayName;
        localStorage.setItem("name", name);
        sessionStorage.setItem("gmailToken", result.user.accessToken);
        setUser(name);
        setSignedIn(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (
      sessionStorage.getItem("emailToken") ||
      sessionStorage.getItem("gmailToken")
    ) {
      setSignedIn(true);
    }
  }, []);

  return (
    <Box>
      <Box>
        <Center mb="5">
          {signedin ? (
            ""
          ) : (
            <Flex>
              <Button
                mx={2}
                variant="outline"
                p="1"
                size="s"
                colorScheme="white"
              >
                <Link href={`/signup`}>Sign Up</Link>
              </Button>
              <Button
                mx={2}
                variant="outline"
                p="1"
                size="s"
                colorScheme="white"
                onClick={logIn}
              >
                Log In
              </Button>
            </Flex>
          )}
          {signedin && (
            <Center>
              <Button
                onClick={() => {
                  setUser("");
                  setSignedIn(false);
                }}
                variant="outline"
                p="1"
                size="s"
                colorScheme="white"
              >
                Log Out
              </Button>
            </Center>
          )}
        </Center>
        <Container>
          <Header user={user} />
        </Container>
        <Box pt="10">{signedin && <Body />}</Box>
      </Box>
    </Box>
  );
}
