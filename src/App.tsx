import { observer } from "mobx-react-lite";
import { ChangeEventHandler, useCallback, useState } from "react";
import { ToDo, toDoStore } from "./store/global-store";

import { Button, TextField, Toolbar, Typography, Switch } from "@mui/material";

import { ListOfTodos } from "./components/list-of-todos/list-of-todos";

export const App = observer(() => {
  const [todo, setToDo] = useState<string>("");

  const registerNameOfToDo = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => setToDo(event.target.value),
    []
  );
  const addToDo = useCallback(() => {
    toDoStore.add(todo);
    setToDo("");
  }, [todo]);
  const removeToDo = useCallback(
    (elIdx: number) => () => {
      toDoStore.remove(elIdx);
    },
    []
  );
  const defineIsDone = useCallback(
    (toDoTask: ToDo) => () => toDoStore.defineIsDone(toDoTask),
    []
  );

  const setFiltered = useCallback((event, checked) => {
    toDoStore.filter(checked);
  }, []);

  const arrToDisplay: Array<ToDo> = !toDoStore.isFiltered
    ? toDoStore.arrOfToDo
    : toDoStore.arrOfToDo.filter((todo: ToDo) => todo.isDone);

  return (
    <div className="App">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Typography variant="h4" component="div">
          ToDoList
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Switch value={toDoStore.isFiltered} onChange={setFiltered} />
          <Typography variant="h6" component="div">
            filter by isDone
          </Typography>
        </div>
      </Toolbar>
      <ListOfTodos
        listToDos={arrToDisplay}
        defineIsDone={defineIsDone}
        removeToDo={removeToDo}
      />
      <TextField
        variant="filled"
        sx={{ maxHeight: "30px !important", width: "90%" }}
        value={todo}
        onChange={registerNameOfToDo}
      />
      <Button
        onClick={addToDo}
        variant={"contained"}
        sx={{ height: "55px !important", width: "10%" }}
      >
        add
      </Button>
    </div>
  );
});
