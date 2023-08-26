import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFloppyDisk,faPenSquare,faTrashCan} from "@fortawesome/free-solid-svg-icons";
import { Box, Button, Checkbox, Flex, FormLabel, Input } from "@chakra-ui/react";


export const Task = ({id,name,status, handleRemoveTask, handleUpdateTask,handleTaskCount}) =>{ 
    const [editMode,setEditMode] = useState(false);
    const [editedName,setEditedName] = useState(name);
    const [checked,setCheked] = useState(false);
    

 
    const removeTask = () => {
        handleRemoveTask(id)
    }
    
    const handleSaveTask = () => {
        handleUpdateTask(id,editedName);
        setEditMode(false);
    }
     
    const tongleEditMode = () => {
        setEditMode(!editMode);
    }

    const tongleCheked = () =>{
        setCheked(!checked)
        handleTaskCount(checked)
    }
   


    if (editMode) {
        return(
            <li>
                <Box> 
                    <Input type="text" value={editedName}  onChange={(e) => setEditedName(e.target.value)} w="200px" m="0 20px 5px 20px" />
                    <Button onClick={handleSaveTask}><FontAwesomeIcon icon={faFloppyDisk} /></Button>
                </Box>
               
            </li>
        );
    }else{
        return(
         
            <li>
                <Flex justifyContent="center" alignItems="center" pl="10px" h="35px" bg="#FEECE2"
                m="0 15px 10px 0">

                <Checkbox type="checkbox" checked={checked} id={`checkbox-${id}`} name={`checkbox-${id}`} status={status} onChange={tongleCheked} borderColor="gray" colorScheme="green"/>
            
                <FormLabel className="textoTarea" htmlFor={`checkbox-${id}`} w="200px" display="inline-block" m="0 5px">{name}</FormLabel>
        
                <Button onClick={tongleEditMode} display="inline-block" textAlign="center"  w="0" h="30px" mr="-15px" fontSize="18px" variant="unstyled"><FontAwesomeIcon icon={faPenSquare} style={{color: "#113AF4",}} /></Button>
                 
                <Button onClick={removeTask} display="inline-block"   textAlign="center" w="0" h="30px"  variant="unstyled"><FontAwesomeIcon icon={faTrashCan} style={{color: "#FA4B3F",}}/></Button>

                </Flex>
            </li>
           
        
      

        
    )}
    
    
    


    
} 