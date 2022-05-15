import {
  Box,
  Flex,
  Text,
  Container,
  Center,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaGooglePlay } from "react-icons/fa";
import { ImEnvelop } from "react-icons/im";
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
                <Text>Log In With Google</Text>
                <Icon as={FaGooglePlay} ml="2" />
              </Button>
              <Button
                mx={2}
                variant="outline"
                p="1"
                size="s"
                colorScheme="white"
                // make a chakura modal to sign up the user
              >
                <Text>Log In With Email</Text>
                <Icon as={ImEnvelop} ml="2" />
              </Button>
            </Flex>
          )}
          {signedin && (
            <Center>
              <Button
                onClick={() => {
                  setUser("");
                  setSignedIn(false);
                  sessionStorage.setItem("emailToken", "");
                  sessionStorage.setItem("gmailToken", "");
                }}
                variant="outline"
                p="1"
                size="s"
                colorScheme="white"
              >
                <Text>Log Out</Text>
              </Button>
            </Center>
          )}
        </Center>
        <Container>
          <Header user={signedin} />
        </Container>
        <Box pt="10">{signedin && <Body />}</Box>
      </Box>
    </Box>
  );
}
