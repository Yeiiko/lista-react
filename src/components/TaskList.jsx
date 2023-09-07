import { Box, Button, Flex, Input, UnorderedList,Text, Stack } from "@chakra-ui/react";
import { Task } from "./Task";
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";


export const TaskList = () =>{

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
    const [newTask,setNewTask] = useState ("");
    const [newDescription,setNewDescrip] = useState("");
    const [taskCount, setTaskCount] = useState(() => {
      const pendingTasks = tasks.filter(task => !task.status);
      return pendingTasks.length;
    });    
    const [checked,setCheked] = useState(false);
    
     
    useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks])


    const handleAddTask = () => {
        if(newTask.trim() !== ""){
            const task = {
                id: Date.now(),
                name: newTask,
                description: newDescription,
                status: checked
            };
            setTasks((prevTasks) => [...prevTasks,task]
            );

            
            setTaskCount((prevCount) => prevCount +1)

            setNewTask("");
            setNewDescrip("");
            
        }
       
    };
    
    const handleRemoveTask = (id) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter(task => task.id !== id);
        const totalTasks = updatedTasks.filter(task => !task.status);
        setTaskCount(totalTasks.length);
        return updatedTasks;
      });
    };
    

      const handleUpdateTask = (id,editedName,editedDescrip) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => {
            if (task.id === id) {
              return { ...task, name:editedName,description: editedDescrip};
            }
            return task;
          }
          )
        );
        
      };
      

      const handleTaskCount = (id, checked) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => {
            if (task.id === id) {
              return {
                ...task,
                status: !task.status,
              };
            }
            return task;
          })
        );
    
        setTaskCount((prevCount) =>
          prevCount - (checked ? 1 : -1)
        );
      };


    const handleClearAll = () => {
      const clear = [];
      setTasks(clear);
      const clearCount = 0;
      setTaskCount(clearCount)
    }
      
  


    return(
      <Flex
      fontFamily="Ubuntu"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        background="#fff" 
        borderRadius="10px"
        padding="20px"
        boxShadow="1px 1px 1px rgba(0, 0, 0, 0.4), -1px -1px 1px rgba(0, 0, 0, 0.4)" >   

        <Stack  w="300px"  direction="row" >
           
           <Stack>
            <Input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)}    onKeyDown={(e) => {if(e.key === "Enter"){handleAddTask(); }}}
           placeholder="Add you new task" w="225px" borderColor="gray" />
         
          <Input type="text" value={newDescription} onChange={(e) => setNewDescrip(e.target.value)} w="225px" onKeyDown={(e) => {if(e.key === "Enter"){handleAddTask(); }}} borderColor="gray" placeholder="Add your task description"/>
          </Stack>
        
      
         <Flex justifyContent="flex-end">
          <Button onClick={handleAddTask} bg="#127DDB" display="inline-block" justifyContent="center" w="60px" h="90px" borderRadius="5px" m=" 0 0 15px 8px" _hover={{background:"#2D2FF4"}}><FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",fontSize:"20px"}} /></Button>
         </Flex>

         
        </Stack>

        
        <div className="lista">
            <UnorderedList listStyleType="none">
            {tasks.map((task) =>
                <Task 
                 key={task.id}
                 id={task.id}
                 name={task.name}
                 description={task.description}
                 status={task.status}
                 handleRemoveTask={() => handleRemoveTask(task.id)}
                 handleUpdateTask={handleUpdateTask}
                 tasks={tasks}
                 handleTaskCount={handleTaskCount}
                 checked={checked}
                 setCheked={setCheked}
                 />
                 
                 
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