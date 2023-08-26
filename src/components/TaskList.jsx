import { Box, Button, Flex, Input, UnorderedList,Text } from "@chakra-ui/react";
import { Task } from "./Task";
import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";


export const TaskList = () =>{

    const [tasks, setTasks] = useState([]);
    const [newTask,setNewTask] = useState ("");
    const [taskCount,setTasksCount] = useState(0);

    const handleAddTask = () => {
        if(newTask.trim() !== ""){
            const task = {
                id: Date.now(),
                name: newTask,
                status: "incomplete"
            };
            setTasks((prevTasks) => [...prevTasks,task]);

            if (task.status) {
              setTasksCount((prevCount) => prevCount +1);
            }

            setNewTask("");
            
        }
       
    };


    const handleRemoveTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));

        const newCount = tasks.length -1;
        setTasksCount(newCount)
      };


      const handleUpdateTask = (id,editedName) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => {
            if (task.id === id) {
              return { ...task, name:editedName };
            }
            return task;
          }
          )
        );
        
      };
      

      const handleTaskCount = (checked) => {
     
        if (checked) {
          setTasksCount((prevCount) => prevCount +1);
          
       } else if (!checked){
        setTasksCount((prevCount) => prevCount -1);
        
      }
    
    }

    const handleClearAll = () => {
      const clear = [];
      setTasks(clear);
      const clearCount = 0;
      setTasksCount(clearCount)
    }
      
    return(
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        background="#fff" 
        borderRadius="10px"
        padding="20px"
        boxShadow="1px 1px 1px rgba(0, 0, 0, 0.4), -1px -1px 1px rgba(0, 0, 0, 0.4)" >   

        <Box display="flex" alignItems="center" m="15px 10px">
         <Input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)}  onKeyDown={(e) => {if(e.key === "Enter"){
         handleAddTask();
         }}} 
         placeholder="Add you new task" w="225px" borderColor="gray"/>

          <Button onClick={handleAddTask} bg="#127DDB" display="flex" justifyContent="center" w="50px" h="40px" borderRadius="5px" ml="15px" ><FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} /></Button>
         
        </Box>

        <div className="lista">
            <UnorderedList listStyleType="none">
            {tasks.map((task) =>
                <Task 
                 key={task.id}
                 id={task.id}
                 name={task.name}
                 status={task.status}
                 handleRemoveTask={() => handleRemoveTask(task.id)}
                 handleUpdateTask={handleUpdateTask}
                 tasks={tasks}
                 setTasksCount={setTasksCount}
                 handleTaskCount={handleTaskCount}/>
                 
                 
            )}
            </UnorderedList>
        </div>
        <Box display="flex" w="320px" justifyContent="center" alignItems="center" pt="20px">
            <Text>You have {taskCount} pending task</Text>
            <Button display="flex"  onClick={handleClearAll}  bg="#F43423" _hover={{background:"#F50801"}} color="#fff" borderRadius="3px" m="0 0 0 50px">Clear All</Button>
        </Box>
        </Flex>
        
    );
}