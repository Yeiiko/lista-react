import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faPenSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

export const Task = ({
  task,
  updateTask,
  deteledTask,
  tongleEditMode,
  checkedBox,
}) => {
  const [editedName, setEditedName] = useState(task.name);
  const [editedDescrip, setEditedDescrip] = useState(task.description);

  const handleUpdateTask = () => {
    updateTask(task.id, editedName, editedDescrip);
    tongleEditMode(task.id);
  };

  const handleDeletedTask = () => {
    deteledTask(task.id);
  };

  const handleEditMode = () => {
    tongleEditMode(task.id);
  };

  const handleTaskCount = () => {
    checkedBox(task.id);
  };

  if (task.editMode) {
    return (
      <Flex direction="column" alignItems="center" w="315px">
        <li>
          <Input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            w="225px"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSaveTask();
              }
            }}
          />
          <Textarea
            type="text"
            value={editedDescrip}
            onChange={(e) => setEditedDescrip(e.target.value)}
            w="225px"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpdateTask();
              }
            }}
            maxH="90px"
            resize="none"
          />
          <Button onClick={handleUpdateTask} ml="22px">
            <FontAwesomeIcon icon={faFloppyDisk} />
          </Button>
        </li>
      </Flex>
    );
  } else {
    return (
      <li>
        <Flex
          justifyContent="center"
          alignItems="center"
          pl="10px"
          h="35px"
          bg="#DBE7F5"
          m="0 15px 10px 0"
        >
          <Checkbox
            isChecked={task.status}
            id={`checkbox-${task.id}`}
            name={`checkbox-${task.id}`}
            onChange={handleTaskCount}
            borderColor="gray"
            colorScheme="green"
          />

          <FormLabel
            className="textoTarea"
            htmlFor={`checkbox-${task.id}`}
            w="200px"
            display="inline-block"
            m="0 5px"
          >
            {task.name}
          </FormLabel>

          <Button
            onClick={handleEditMode}
            display="inline-block"
            textAlign="center"
            h="30px"
            mr="-15px"
            fontSize="18px"
            variant="unstyled"
          >
            <FontAwesomeIcon icon={faPenSquare} style={{ color: "#113AF4" }} />
          </Button>

          <Button
            onClick={handleDeletedTask}
            display="inline-block"
            textAlign="center"
            h="30px"
            variant="unstyled"
          >
            <FontAwesomeIcon icon={faTrashCan} style={{ color: "#FA4B3F" }} />
          </Button>
        </Flex>
        {task.description && (
          <Box
            borderRadius="0 0 10px 10px"
            bg="#B4EAFA"
            w="301px"
            mt="-10px"
            mb="10px"
            p=" 5px 0 10px 10px"
          >
            <h4>{task.description}</h4>
          </Box>
        )}
      </li>
    );
  }
};
