import { useContext, useReducer } from "react";
import { TaskContext } from "../TaskContext";

export const useTask = () => {
  const {
    editMode,
    tasks,
    setTasks,
    newTask,
    setNewTask,
    newDescription,
    setNewDescrip,
    taskCount,
    setTaskCount,
    checked,
  } = useContext(TaskContext);

  const reducer = (state, action) => {
    switch (action.type) {
      case "createTask":
        if (action.payload.newTask.trim() !== "") {
          const task = {
            id: Date.now(),
            name: action.payload.newTask,
            description: action.payload.newDescription,
            status: action.payload.checked,
            editMode: action.payload.editmode,
          };

          return {
            ...state,
            tasks: [...state.tasks, task],
          };
        }
        return state;

      case "deleteTask":
        const taskId = action.payload;
        return {
          ...state,
          tasks: state.tasks.filter((task) => task.id !== taskId),
        };

      case "tongleEditMode":
        const editId = action.payload;
        return {
          ...state,
          tasks: state.tasks.map((task) => {
            if (task.id === editId) {
              return {
                ...task,
                editMode: !task.editMode,
              };
            }
            return task;
          }),
        };

      case "checkedBox":
        const checkedId = action.payload;
        return {
          ...state,
          tasks: state.tasks.map((task) => {
            if (task.id === checkedId) {
              return {
                ...task,
                status: !task.status,
              };
            }
            return task;
          }),
        };

      case "clearAll":
        return {
          ...state,
          tasks: [],
        };

      case "updateTask":
        const updateId = action.payload.updateId;
        return {
          ...state,
          tasks: state.tasks.map((task) => {
            if (task.id === updateId) {
              return {
                ...task,
                name: action.payload.editedName,
                description: action.payload.editedDescrip,
              };
            }
            return task;
          }),
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, { tasks });

  const createTask = () => {
    dispatch({
      type: "createTask",
      payload: {
        newTask,
        newDescription,
        checked,
        editMode,
      },
    });
    setNewTask("");
    setNewDescrip("");
    setTaskCount(taskCount + 1);
  };

  const updateTask = (updateId, editedName, editedDescrip) => {
    dispatch({
      type: "updateTask",
      payload: {
        updateId,
        editedName,
        editedDescrip,
      },
    });
  };

  const deteledTask = (taskId) => {
    dispatch({ type: "deleteTask", payload: taskId });
    setTaskCount(taskCount - 1);
  };

  const tongleEditMode = (editId) => {
    dispatch({ type: "tongleEditMode", payload: editId });
  };

  const checkedBox = (checkedId) => {
    dispatch({ type: "checkedBox", payload: checkedId });
    setTaskCount((prevCount) => {
      const task = state.tasks.find((task) => task.id === checkedId);
      return prevCount + (task && task.status ? +1 : -1);
    });
  };

  const clearAll = () => {
    dispatch({ type: "clearAll" });
    setTaskCount(0);
  };

  return {
    tasks: state.tasks,
    newTask,
    setNewTask,
    setTasks,
    newDescription,
    setNewDescrip,
    taskCount,
    setTaskCount,
    createTask,
    updateTask,
    deteledTask,
    tongleEditMode,
    checkedBox,
    clearAll,
  };
};
