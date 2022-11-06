import { Box, HStack, Image, ScrollView, Text } from "native-base";
import React from "react";

const DetailList = () => {
  return (
    <ScrollView paddingX={3}>
      <HStack
        mb={6}
        mt={16}
        backgroundColor="#DAEFFF"
        borderRadius={10}
        padding="3"
        justifyContent={"space-between"}
      >
        <Box>
          <Text bold fontSize={"xl"}>
            Study -Golang
          </Text>
          <Text w={250} color={"#9B9B9B"}>
            Learn Golang to improve fundamentals and familiarize with coding.
          </Text>
          <Text w={250} color={"#9B9B9B"}>
            Advantages of Go Go has advantages over other languages, including:
          </Text>
          <Text w={250} color={"#9B9B9B"}>
            Supports concurrency at the language level with fairly easy
            application Supports data processing with multiple processors at the
            same time (parallel processing) Have a garbage collector The
            compilation process is very fast It's not a hierarchical programming
            language and it's not strict OOP, giving developers the freedom to
            how to write code.
          </Text>
          <Text w={250} color={"#9B9B9B"}>
            Listing Material 1. Installation 2. Setup Go Modules 3. Setup Gopath
            & Workspace 4. Go Command 5. Hello World 6. Variable 7. Tipe
            DataKonstanta 8. Operator 9. Condition 10.Loops
          </Text>
          <Text mt={3} color={"#9B9B9B"}>
            2-2-2
          </Text>
        </Box>
        <Box>
          <Box backgroundColor="#81C8FF" borderRadius={5} padding={2}>
            <Text>study</Text>
          </Box>
          <Image
            mt={2}
            source="finish"
            resizeMode="contain"
            alignItems="center"
          />
        </Box>
      </HStack>
    </ScrollView>
  );
};

export default DetailList;
