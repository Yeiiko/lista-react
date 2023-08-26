
import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { Flex,ChakraProvider} from '@chakra-ui/react';


function App() {
  
  return (
    
    <ChakraProvider> 
      <Flex
      minH="100vh" 
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      bgGradient="linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(27,20,6,1) 100%)" > 
        <Header/>
        <TaskList/>
      </Flex>
      </ChakraProvider>
    
    
  )
}

export default App 
