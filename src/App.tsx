import React from "react";
import { useForm, Controller } from "react-hook-form";
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
  const classes = useStyles();
  const [toDoList, setTodoList] = React.useState<TodoType[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TodoType>();

  const onSubmit = (data: TodoType) => {
    console.log(data);
    console.log("errors", errors);
  };

  const handleAdd = () => {
    let idList = toDoList.map((task) => task.id);
    let maxId = Math.max(0, ...idList);
    setTodoList([...toDoList, { id: maxId + 1, task: "", complete: false }]);
  };
  const handleDelete = (id: number) => {
    let deleted = toDoList.filter((task) => {
      return task.id !== id;
    });
    setTodoList(deleted);
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
        <form
          action="http://localhost:8333/posttodo"
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          // encType="multipart/form-data"
        >
          <input type="submit" value="На сервер" />
          <Button onClick={handleAdd} children={"Добавить"} />
          <Button onClick={handleFilter} children={"Удалить готовые"} />
          <Paper>
            <List className={classes.root}>
              {toDoList.map((value) => {
                return (
                  <ListItem key={value.id} role={undefined} dense button>
                    <ListItemIcon>
                      <Controller
                        name={`items[${value.id}][complete]` as any}
                        control={control}
                        defaultValue={false}
                        render={({ field }) => <Checkbox {...field} />}
                      />
                    </ListItemIcon>
                    <Controller
                      name={`items[${value.id}][id]` as any}
                      defaultValue={value.id}
                      control={control}
                      render={({ field }) => {
                        return (
                          <>
                            <ListItemText primary={field.value} />
                            <input type="hidden" {...field} />
                          </>
                        );
                      }}
                    />
                    <Controller
                      name={`items[${value.id}][task]` as any}
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} inputRef={field.ref} />
                      )}
                    />
                    {errors.task && <p>errors.task.message</p>}
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
        </form>
      </div>
    </div>
  );
}

export default App;
