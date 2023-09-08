import { createContext } from "react";
import { useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescrip] = useState("");
  const [taskCount, setTaskCount] = useState(() => {
    const pendingTasks = tasks.filter((task) => !task.status);
    return pendingTasks.length;
  });
  const [checked, setCheked] = useState(false);
  const [editMode, setEditMode] = useState(false);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        newTask,
        setNewTask,
        newDescription,
        setNewDescrip,
        taskCount,
        setTaskCount,
        checked,
        setCheked,
        editMode,
        setEditMode,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
