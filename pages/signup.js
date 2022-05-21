import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  chakra,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { motion, isValidMotionProp } from "framer-motion";
import { auth } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default function signUp(props) {
  const auth = getAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
  });
  const createUser = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        sessionStorage.setItem("emailToken", userCredential.user.accessToken);
        sessionStorage.setItem(
          "displayName",
          userCredential.user.email.split("@", 1)
        );
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <ChakraBox
      initial={{ width: 0, y: -100 }}
      animate={{ width: "50%", y: 0 }}
      exit={{ opacity: "100%" }}
      width={"50%"}
      direction="column"
      justifyContent="center"
      alignItems="center"
      m="auto"
    >
      <Center>
        <ChakraBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link href={"/"}>
            <Button
              size="md"
              width="100px"
              variant="solid"
              p="1"
              colorScheme="green"
            >
              Home
            </Button>
          </Link>
        </ChakraBox>
      </Center>
      <FormControl mt="5">
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
        <ChakraBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            size="md"
            width="100px"
            variant="solid"
            p="1"
            colorScheme="blue"
            onClick={createUser}
          >
            Submit
          </Button>
        </ChakraBox>
      </Center>
    </ChakraBox>
  );
}
