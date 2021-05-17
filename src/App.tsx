import React, { useEffect } from "react";
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
type TodoForm = { test: TodoType[] };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 720,
      backgroundColor: theme.palette.background.paper,
    },
  })
);


  // {msg: string, data: TodoType[]}

  const fetchServer: () => Promise<TodoType[]> = async () => {
    const serRes = await fetch("http://localhost:8333/todos");
    const todosRes = await serRes.json();
    return todosRes.data;
  };

  const classes = useStyles();
  const [toDoList, setTodoList] = React.useState<TodoType[]>([]);
  const [text, setText] = React.useState("");

  // https://react-hook-form.com/api/usefieldarray
  // "Controlled Field Array"

  const controls = watch(`test`, []);
  let toDoList = controls.map((ctrl, i) => ({ ...ctrl, ...fields[i] }));
  // there's a bug when the first id does not receive updates

  const onSubmit = (data: TodoForm) => {
    console.log(data);
    console.log("errors", errors);
  };

  const handleAdd = () => {
    let idList = toDoList.map((task) => task.id);
    let maxId = Math.max(0, ...idList);
    append({ id: maxId + 1, task: "", complete: false });
  };
  const handleFilter = () => {
    const i = toDoList.findIndex((task) => task.complete);
    // can't remove everything at once because of stupid React-hook-form limitation
    // only one operation is allowed per render
    if (i !== -1) {
      remove(i);
    }
  };

  useEffect(() => {
    fetchServer().then((res) => {
      setTodoList(res);
    });
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <TextField
          label="Введите"
          onChange={() => setText(testInput.current?.value ?? "")}
          inputRef={testInput}
        />
        <form
          action="http://localhost:8333/todos"
          method="post"
          onSubmit={handleSubmit(onSubmit)}
        // encType="multipart/form-data"
        >
          <input type="submit" value="На сервер" />
          <Button onClick={handleSubmit} children={"Добавить"} />
          <Button onClick={handleFilter} children={"Удалить готовые"} />
          <Paper>
            <List className={classes.root}>
              {toDoList.map((value, i) => {
                return (
                  <ListItem key={value.id} role={undefined} dense button>
                    <ListItemIcon>
                      {Ctrl(`${i}.complete`, p => <Checkbox {...p} />, false)}
                    </ListItemIcon>
                    <ListItemText primary={value.id} />
                    {Ctrl(`${i}.id`, p => <input {...p} type="hidden" />, value.id)}
                    {Ctrl(`${i}.task`, p => <TextField inputProps={p} />, value.task)}
                    {errors.test && <p>errors.test</p>}
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => remove(i)}
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
