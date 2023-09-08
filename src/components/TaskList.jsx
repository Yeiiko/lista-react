import {
  Box,
  Button,
  Flex,
  Input,
  UnorderedList,
  Text,
  Stack,
  FormErrorMessage,
  FormControl
} from "@chakra-ui/react";
import { Task } from "./Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTask } from "../Hooks/useTask";
import {useEffect } from "react";
import { useForm } from "react-hook-form";


export const TaskList = () => {
  const {
    tasks,
    taskCount,
    createTask,
    updateTask,
    deteledTask,
    tongleEditMode,
    checkedBox,
    clearAll
  } = useTask();
 
  const {register,handleSubmit,formState:{errors,isValid},reset} = useForm({mode:"onChange"})

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (data) => {
    createTask(data.newTask,data.newDescription);
    reset();
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
    <form onSubmit={handleSubmit(handleAddTask)}>
      <Stack w="300px" direction="row">
        <Stack>
          <FormControl isInvalid={errors.newTask}>
            <Input
            type="text"
            {...register("newTask",{
              minLength:{
              value: 3,
              message:"The task is  very short"
              }
            })}
            placeholder="Add you new task"
            w="225px"
            borderColor="gray"
          />
          <FormErrorMessage  role="alert">
            {errors.newTask && errors.newTask.message}
          </FormErrorMessage>
          </FormControl>  

          <Input
            type="text"
            {...register("newDescription")}
            borderColor="gray"
            placeholder="Add your task description"
          />
        </Stack>

        <Flex justifyContent="flex-end">
          <Button
            type="submit"
            disabled={isValid}
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
</form>
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
