import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { auth } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default function signUp(props) {
  const auth = getAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const createUser = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        sessionStorage.setItem("emailToken", userCredential.user.accessToken);
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <Box
      width={"50%"}
      direction="column"
      justifyContent="center"
      alignItems="center"
      m="auto"
    >
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type={"email"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <FormLabel>Password</FormLabel>
        <Input
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </FormControl>
      <Center pt={3}>
        <Button
          fontSize={"1.2rem"}
          width="100%"
          variant="solid"
          p="1"
          size="md"
          colorScheme="blue"
          onClick={createUser}
        >
          SUBMIT
        </Button>
      </Center>
    </Box>
  );
}
