import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { Flex,ChakraProvider,extendTheme} from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: "Caprasimo, sans-serif",
    heading: "Ubuntu, serif",
    
  },
});

function App() {
  
  return (
    
    <ChakraProvider theme={theme}> 
      <Flex
       minH="100vh" 
       display="flex"
       alignItems="center"
       justifyContent="center"
       flexDirection="column"
       bgGradient="linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(27,20,6,1) 100%)" > 
        <Header />
        <TaskList/>
      </Flex>
      </ChakraProvider>
     
    
  )
}

export default App
