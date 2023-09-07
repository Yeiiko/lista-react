import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFloppyDisk,faPenSquare,faTrashCan} from "@fortawesome/free-solid-svg-icons";
import { Box, Button, Checkbox, Flex, FormLabel, Input, Textarea } from "@chakra-ui/react";


export const Task = ({id,name,description,status, handleRemoveTask, handleUpdateTask,handleTaskCount,handleIdChecked,setCheked,checked}) =>{ 
    const [editMode,setEditMode] = useState(false);
    const [editedName,setEditedName] = useState(name);
    const [editedDescrip,setEditedDescrip] = useState(description);
    
   
    

 
    const removeTask = () => {
        handleRemoveTask(id)
    }
    
    const handleSaveTask = () => {
        handleUpdateTask(id,editedName,editedDescrip);
        setEditMode(false);
    }
     
    const tongleEditMode = () => {
        setEditMode(!editMode);
    }

    const handleStatusCheck = () => {
        handleTaskCount(id,!status)
        
    }

    
        
   
    
    

    if (editMode) {
        return(
            
                <Flex  direction="column" alignItems="center" w="315px"> 
                    <li>
                    <Input type="text" value={editedName}  onChange={(e) => setEditedName(e.target.value)} w="225px" onKeyDown={(e) => {if(e.key === "Enter"){handleSaveTask(); }}} />
                    <Textarea type="text" value={editedDescrip}  onChange={(e) => setEditedDescrip(e.target.value)} w="225px"  onKeyDown={(e) => {if(e.key === "Enter"){handleSaveTask(); }}} maxH="90px" resize="none"/>
                    <Button onClick={handleSaveTask}ml="22px" ><FontAwesomeIcon icon={faFloppyDisk} /></Button>
                    </li>
                </Flex>
               
            
        );
    }else{
        return(
         
            <li>
                <Flex justifyContent="center" alignItems="center" pl="10px" h="35px" bg="#DBE7F5"
                m="0 15px 10px 0">

                <Checkbox isChecked={status} id={`checkbox-${id}`} name={`checkbox-${id}`} onChange={() => { setCheked(handleStatusCheck()); 
                }} borderColor="gray" colorScheme="green"/>
            
                <FormLabel className="textoTarea" htmlFor={`checkbox-${id}`} w="200px" display="inline-block" m="0 5px">{name}</FormLabel>

                <Button onClick={tongleEditMode} display="inline-block" textAlign="center" h="30px" mr="-15px" fontSize="18px" variant="unstyled"><FontAwesomeIcon icon={faPenSquare} style={{color: "#113AF4",}} /></Button>
                 
                <Button onClick={removeTask} display="inline-block"   textAlign="center" h="30px"  variant="unstyled"><FontAwesomeIcon icon={faTrashCan} style={{color: "#FA4B3F",}}/></Button>

                </Flex>
                {description && (
                <Box borderRadius="0 0 10px 10px" bg="#B4EAFA" w="301px" mt="-10px" mb="10px" p=" 5px 0 10px 10px">
                <h4>{description}</h4>
                </Box>
    )}
            </li>
           
        
      

        
    )}
    
    
    


    
} 