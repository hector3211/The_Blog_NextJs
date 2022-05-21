import React from "react";
import {
  Box,
  Text,
  Flex,
  chakra,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
export const Header = (props) => {
  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
  });
  return (
    <Box align="center">
      {props.user ? (
        <ChakraBox
          initial={{ width: 0, x: 1000 }}
          animate={{ width: "100%", x: 0 }}
          exit={{ opacity: "100%" }}
          display="flex"
          rounded="lg"
          justifyContent="center"
          alignItems="center"
          height="70"
          bgGradient="linear(to-r, green.500, blue.500)"
        >
          <Text fontSize="2xl" position="absolute">
            Welcome {props.user}
          </Text>
        </ChakraBox>
      ) : (
        <Flex direction="column" justifyContent="center" alignItems="center">
          <ChakraBox
            mt="5"
            animate={{
              rotate: [0, 0, 360, 360, 0],
              scale: [0, 1, 1.5, 1],
              borderRadius: ["50%", "50%"],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
            bgGradient="linear(to-r, blue.500, green.400)"
            width="200px"
            height="200px"
          >
            <Image
              height="200px"
              width="200px"
              rounded="full"
              src="https://media-exp1.licdn.com/dms/image/C4E03AQG7ty6QC0J36A/profile-displayphoto-shrink_200_200/0/1638498523408?e=1658361600&v=beta&t=FKZc5lGyv8b2oLrWmCopTmoI1XOsaZbR5nPDxjrnPwA"
              alt="profile pic"
            />
          </ChakraBox>
          <Text width="100%" fontSize="5xl" mb="10" position="relative">
            Welcome to my Blog
          </Text>
          <Text fontSize="1xl" position="absolute" top="390">
            Here are somethings i enjoy and write about!
          </Text>
          <ChakraBox
            initial={{ width: 0, x: 1000 }}
            animate={{ width: "100%", x: 0 }}
            exit={{ opacity: "100%" }}
          >
            <Grid
              h="600px"
              templateColumns="repeat(6, 1fr)"
              templateRows="repeat(2,1fr)"
              autoColumns="auto"
              gap={2}
              mt="50"
            >
              <GridItem colStart={1} colSpan={2}>
                <Image
                  src="https://images.pexels.com/photos/1152854/pexels-photo-1152854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="hero image"
                  height="300px"
                  rounded="lg"
                />
              </GridItem>
              <GridItem colStart={3} colSpan={2} rowStart={1}>
                <Image
                  src="https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="hero image"
                  height="300px"
                  rounded="lg"
                />
              </GridItem>
              <GridItem colStart={5} colSpan={2} rowStart={1}>
                <Image
                  src="https://images.pexels.com/photos/2291004/pexels-photo-2291004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="hero image"
                  height="300px"
                  rounded="lg"
                />
              </GridItem>
              <GridItem colStart={1} colSpan={6} rowStart={2}>
                <Image
                  src="https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="hero image"
                  width="100%"
                  height="300px"
                  rounded="lg"
                />
              </GridItem>
            </Grid>
          </ChakraBox>
        </Flex>
      )}
    </Box>
  );
};
