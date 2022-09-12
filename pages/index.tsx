import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Button, VStack } from "@chakra-ui/react";

const Index: NextPage = () => {
  const router = useRouter();

  return (
    <VStack
      width="100%"
      height="60vh"
      justify="center"
      align="center"
      spacing={8}
    >
      <Button
        size="lg"
        variant="link"
        onClick={() => {
          router.push("/create");
        }}
      >
        Create a form
      </Button>
      <button
        onClick={() => {
          throw new Error("Something went wrong");
        }}
      >
        Break the world
      </button>
      ;
      <Button
        size="lg"
        variant="link"
        onClick={() => {
          window.open("https://daniel-tehrani-33.gitbook.io/");
        }}
      >
        Documentation
      </Button>
      <Button
        size="lg"
        variant="link"
        onClick={() => {
          window.open("https://github.com/DanTehrani/storyform-interface");
        }}
      >
        GitHub
      </Button>
    </VStack>
  );
};

export default Index;
