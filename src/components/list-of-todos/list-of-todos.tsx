import {
  List,
  ListItemButton,
  ListItem,
  Checkbox,
  ListItemText,
  Button
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { ToDo } from "../../store/global-store";
import { observer } from "mobx-react-lite";

type ListOfTodosProps = {
  listToDos: Array<ToDo>;
  defineIsDone: (toDoTask: ToDo) => () => void;
  removeToDo: (toDoTask: number) => () => void;
};

export const ListOfTodos = observer((props: ListOfTodosProps) => {
  const { listToDos, defineIsDone, removeToDo } = props;

  return (
    <List>
      {listToDos.map((toDoEl, idx) => (
        <ListItemButton key={idx} onClick={defineIsDone(toDoEl)}>
          <ListItem key={idx}>
            <Checkbox checked={toDoEl.isDone} />
            <ListItemText>{toDoEl.text}</ListItemText>
            <Button variant="outlined" onClick={removeToDo(idx)}>
              <DeleteOutlinedIcon />
            </Button>
          </ListItem>
        </ListItemButton>
      ))}
    </List>
  );
});
