import { Header } from "./components/Header";
import { TaskList } from "./components/TaskList";
import { Flex, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { TaskProvider } from "./TaskContext";

const theme = extendTheme({
  fonts: {
    body: "Caprasimo, sans-serif",
    heading: "Ubuntu, serif",
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <TaskProvider>
        <Flex
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          bgGradient="linear(to bottom, rgba(34, 45, 195, 1), rgba(45, 189, 253, 1))"
        >
          <Header />
          <TaskList />
        </Flex>
      </TaskProvider>
    </ChakraProvider>
  );
}

export default App;
