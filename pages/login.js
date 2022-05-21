import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { ImEnvelop } from "react-icons/im";
import { FiPlusCircle } from "react-icons/fi";
import { signInWithGoogle, auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  useToast,
  chakra,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion, isValidMotionProp } from "framer-motion";
export default function login() {
  const router = useRouter();
  const toast = useToast();
  const [toggleEmailPopUp, setToggleEmailPopUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
  });
  const logInWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result);
        const name = result.user.email.split("@", 1);
        const adminEmail = result.user.email;
        if (adminEmail === "hectororopesa5@gmail.com") {
          sessionStorage.setItem("admin", adminEmail);
        }
        sessionStorage.setItem("displayName", name);
        sessionStorage.setItem("gmailToken", result.user.accessToken);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const logInWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      //email Hector33@email.com
      // password heypassword
      .then((userCredential) => {
        sessionStorage.setItem("emailToken", userCredential.user.accessToken);
        sessionStorage.setItem(
          "displayName",
          userCredential.user.email.split("@", 1)
        );
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Not A Member",
          description: "You need to sign up!.",
          status: "warning",
          position: "top",
          duration: 1500,
          isClosable: true,
        });
      });
  };
  return (
    <ChakraBox
      initial={{ width: 0, y: -100 }}
      animate={{ width: "100%", y: 0 }}
      exit={{ opacity: "100%" }}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <ChakraBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          width="300px"
          size="md"
          mb="2"
          variant="solid"
          p="1"
          colorScheme="green"
          onClick={logInWithGoogle}
          _hover={{ bg: "blue.500" }}
        >
          Log In With Google
          <Icon as={FaGoogle} ml="2" />
        </Button>
      </ChakraBox>
      <ChakraBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          width="300px"
          size="md"
          variant="solid"
          p="1"
          colorScheme="green"
          onClick={() => setToggleEmailPopUp(true)}
          _hover={{ bg: "blue.500" }}
        >
          Log In With Email
          <Icon as={ImEnvelop} ml="2" />
        </Button>
      </ChakraBox>
      <ChakraBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link href={`/signup`}>
          <Button
            mt="2"
            size="md"
            width="300px"
            variant="solid"
            p="1"
            colorScheme="green"
            _hover={{ bg: "blue.500" }}
          >
            Sign Up
            <Icon as={FiPlusCircle} ml="2" />
          </Button>
        </Link>
      </ChakraBox>
      <ChakraBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link href={"/"}>
          <Button
            mt="2"
            size="md"
            width="300px"
            variant="solid"
            p="1"
            colorScheme="green"
            _hover={{ bg: "blue.500" }}
          >
            Home
          </Button>
        </Link>
      </ChakraBox>
      {toggleEmailPopUp && (
        <Container>
          <FormControl mt="20" boxShadow="lg" p="6" rounded="md" color="light">
            <FormLabel>Email</FormLabel>
            <Input
              my="1"
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <FormLabel>Password</FormLabel>
            <Input
              my="1"
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Center>
              <Button
                variant="outline"
                p="1"
                mt="2"
                size="s"
                colorScheme="white"
                onClick={logInWithEmail}
              >
                Log In
              </Button>
            </Center>
          </FormControl>
        </Container>
      )}
    </ChakraBox>
  );
}
