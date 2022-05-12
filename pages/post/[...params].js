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
import { Header } from "../../components/Header";
export default function postId() {
  const router = useRouter();
  const { params = [] } = router.query;
  return (
    <Box>
      <Center mb="2">
        <Button variant="outline" p="1" size="s" colorScheme="white">
          <Link href={`/`}>Home</Link>
        </Button>
      </Center>
      <Header />
      <Box pt="10" textAlign="center">
        <Container>
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
        </Container>
      </Box>
    </Box>
  );
}
