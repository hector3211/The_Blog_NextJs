import { useRouter } from "next/router";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Container,
  Button,
  Center,
  Divider,
  Text,
  Heading,
  Flex,
  Box,
  useToast,
} from "@chakra-ui/react";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
export const Body = () => {
  const toast = useToast();
  const router = useRouter();
  const databaseRef = collection(db, "posts");
  const [ID, setID] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogConttent, setBlogContent] = useState("");
  const [data, setData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    let token = sessionStorage.getItem("gmailToken");
    if (token) {
      getData();
    }
  }, []);
  const addData = () => {
    addDoc(databaseRef, {
      body: blogConttent,
      title: blogTitle,
    })
      .then(() => {
        toast({
          title: "Successfully added to database",
          status: "success",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
        // alert("Successfully added data!");
        getData();
        setBlogTitle("");
        setBlogContent("");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getData = async () => {
    await getDocs(databaseRef).then((response) => {
      setData(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
  };
  const getId = (id, title, body) => {
    setID(id);
    setBlogTitle(title);
    setBlogContent(body);
    setIsUpdate(true);
  };
  const updateFields = () => {
    let feildToEdit = doc(db, "posts", ID);
    updateDoc(feildToEdit, {
      body: blogConttent,
      title: blogTitle,
    })
      .then(() => {
        toast({
          title: "Update success!",
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
        // alert("data updated");
        getData();
        setBlogTitle("");
        setBlogContent("");
        setIsUpdate(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteDocument = (id) => {
    let feildToEdit = doc(db, "posts", id);
    deleteDoc(feildToEdit)
      .then(() => {
        toast({
          title: " Deleted post",
          status: "info",
          position: "top",
          duration: 1000,
          isClosable: true,
        });
        // alert("Successfully DELETED data!");
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box>
      <Container boxShadow="base" rounded="md" py="3">
        <FormControl>
          <FormLabel htmlFor="blog title">Blog title</FormLabel>
          <Input
            type="text"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
          />
          <FormLabel htmlFor="blog content">Post content</FormLabel>
          <Textarea
            value={blogConttent}
            type="text"
            onChange={(e) => setBlogContent(e.target.value)}
          />
        </FormControl>
        <Center>
          {isUpdate ? (
            <Button
              onClick={updateFields}
              mt="3"
              variant="outline"
              size="md"
              colorScheme="white"
            >
              Update
            </Button>
          ) : (
            <Button
              onClick={addData}
              mt="3"
              variant="outline"
              size="md"
              colorScheme="white"
            >
              Post
            </Button>
          )}
        </Center>
      </Container>
      <Container mt="5">
        {data.map((data) => {
          return (
            <Box key={data.id} py="10" textAlign="start">
              <Container>
                <Heading
                  _hover={{
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  fontSize="3xl"
                  display="block"
                  onClick={() =>
                    router.push(`/post/${data.id}/${data.title}/${data.body}`)
                  }
                >
                  {data.title}
                </Heading>
                <Text>{data.body}</Text>
                <Flex justifyContent={"end"}>
                  <DeleteIcon
                    _hover={{ cursor: "pointer" }}
                    onClick={() => deleteDocument(data.id)}
                    w={3}
                    h={3}
                  />
                  <EditIcon
                    _hover={{ cursor: "pointer" }}
                    onClick={() => getId(data.id, data.title, data.body)}
                    mx={2}
                    w={3}
                    h={3}
                  />
                </Flex>
              </Container>
            </Box>
          );
        })}
      </Container>
    </Box>
  );
};
