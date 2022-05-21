import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, isValidMotionProp } from "framer-motion";
export default function postId() {
  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
  });
  const router = useRouter();
  const { params = [] } = router.query;
  return (
    <Box>
      <Center mb="2">
        <ChakraBox whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }}>
          <Button
            mx={2}
            variant="solid"
            size="md"
            width="90px"
            colorScheme="green"
          >
            <Link href={`/`}>Home</Link>
          </Button>
        </ChakraBox>
      </Center>
      <Box pt="10" textAlign="center">
        <Flex
          boxShadow="base"
          rounded="md"
          direction="column"
          justifyContent="center"
          py="10"
        >
          <Heading fontSize="5xl">{params[1]}</Heading>
          <Text fontSize="3xl">{params[2]}</Text>
        </Flex>
      </Box>
    </Box>
  );
}
