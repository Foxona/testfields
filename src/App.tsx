import React from "react";
// import { useForm } from "react-hook-form";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import "./App.css";

type TodoType = {
  id: number;
  task: string;
  complete: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 720,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

function App() {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<Inputs>();

  const classes = useStyles();
  const [toDoList, setTodoList] = React.useState<TodoType[]>([]);
  const [text, setText] = React.useState("");

  const handleWrite = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };
  const handleSubmit = () => {
    let idList = toDoList.map((task) => task.id);
    let maxId = Math.max(0, ...idList);
    setTodoList([...toDoList, { id: maxId + 1, task: text, complete: false }]);
  };
  const handleDelete = (id: number) => {
    let deleted = toDoList.filter((task) => {
      return task.id !== id;
    });
    setTodoList(deleted);
  };
  const handleChangeBoolean = (id: number) => {
    let newArr = toDoList.map((task) =>
      task.id === id ? { ...task, complete: !task.complete } : task
    );
    setTodoList(newArr);
  };
  const handleEdit = (id: number, editText: string) => {
    let edited = toDoList.map((list) => {
      return list.id === id ? { ...list, task: editText } : list;
    });
    setTodoList(edited);
  };
  const handleFilter = () => {
    let filtered = toDoList.filter((task) => {
      return !task.complete;
    });
    setTodoList(filtered);
  };

  return (
    <div className="App">
      <div className="App-header">
        <TextField
          label="Ввести / Редактировать"
          onChange={handleWrite}
          value={text}
        />
        <Button color="primary" onClick={handleSubmit}>
          Отправить
        </Button>
        <Button color="primary" onClick={handleFilter}>
          Удалить готовые
        </Button>
        <Paper>
          <List className={classes.root}>
            {toDoList.map((value) => {
              return (
                <ListItem
                  key={value.id}
                  role={undefined}
                  dense
                  button
                  // onChange={() => handleEdit(value.id)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={value.complete}
                      tabIndex={-1}
                      disableRipple
                      onChange={() => handleChangeBoolean(value.id)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={`${value.id}:`} />
                  <TextField
                    value={`${value.task}`}
                    onChange={(e) => handleEdit(value.id, e.target.value)}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleDelete(value.id)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </div>
    </div>
  );
}

export default App;
