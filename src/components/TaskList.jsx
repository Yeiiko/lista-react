import {
  Box,
  Button,
  Flex,
  Input,
  UnorderedList,
  Text,
  Stack,
} from "@chakra-ui/react";
import { Task } from "./Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTask } from "../Hooks/useTask";
import {useEffect } from "react";


export const TaskList = () => {
  const {
    tasks,
    newTask,
    setNewTask,
    newDescription,
    setNewDescrip,
    taskCount,
    createTask,
    updateTask,
    deteledTask,
    tongleEditMode,
    checkedBox,
    clearAll
  } = useTask();
 
  

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    createTask();
  };

  const handleClearAll = () => {
    clearAll()
  }
  
  return (
    <Flex
      fontFamily="Ubuntu"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      background="#fff"
      borderRadius="10px"
      padding="20px"
      boxShadow="1px 1px 1px rgba(0, 0, 0, 0.4), -1px -1px 1px rgba(0, 0, 0, 0.4)"
    >
      <Stack w="300px" direction="row">
        <Stack>
          <Input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add you new task"
            w="225px"
            borderColor="gray"
          />

          <Input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescrip(e.target.value)}
            w="225px"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTask;
              }
            }}
            borderColor="gray"
            placeholder="Add your task description"
          />
        </Stack>

        <Flex justifyContent="flex-end">
          <Button
            onClick={handleAddTask}
            bg="#127DDB"
            display="inline-block"
            justifyContent="center"
            w="60px"
            h="90px"
            borderRadius="5px"
            m=" 0 0 15px 8px"
            _hover={{ background: "#2D2FF4" }}
          >
            <FontAwesomeIcon
              icon={faPlus}
              style={{ color: "#ffffff", fontSize: "20px" }}
            />
          </Button>
        </Flex>
      </Stack>

      <div className="lista">
        <UnorderedList listStyleType="none">
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              updateTask={updateTask}
              deteledTask={deteledTask}
              tongleEditMode={tongleEditMode}
              checkedBox={checkedBox}
            />
          ))}
        </UnorderedList>
      </div>
      <Box
        display="flex"
        w="320px"
        justifyContent="center"
        alignItems="center"
        pt="20px"
      >
        <Text>You have {taskCount} pending task</Text>
        <Button
          onClick={handleClearAll}
          display="flex"
          bg="#F43423"
          _hover={{ background: "#F50801" }}
          color="#fff"
          borderRadius="3px"
          m="0 0 0 50px"
        >
          Clear All
        </Button>
      </Box>
    </Flex>
  );
};
