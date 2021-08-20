import React from "react";
import {
  Button,
  Container,
  IconButton,
  InputBase,
  List,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";
import TodoItem from "./components/TodoItem";
import Alert from "./components/Alert";
import { v4 } from "uuid";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8),
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: 40,
      padding: theme.spacing(2),
    },
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    maxWidth: 500,
    margin: "0 auto",
    fontWeight: theme.typography.fontWeightBold,
  },
  inputField: {
    paddingLeft: theme.spacing(2),
    fontSize: "1.25rem",
    fontWeight: "600",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  todoListContainer: {
    width: "100%",
    textAlign: "center",
    transition: "all 0.3s ease",
  },
  list: {
    width: "80%",
    maxWidth: 500,
    margin: "2rem auto",
  },
}));

const getData = () => {
  let list = localStorage.getItem("list");

  return list ? JSON.parse(list) : [];
};

const App = () => {
  const classes = useStyles();

  const [text, setText] = useState("");
  const [list, setList] = useState(getData());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      showAlert(true, "Please enter a text", "danger");
    } else if (text && isEditing) {
      const updList = list.map((item) => {
        if (item.id === editId) {
          return { ...item, title: text };
        }

        return item;
      });
      setList(updList);
      setIsEditing(false);
      setEditId(null);
      showAlert(true, "Item edited!", "success");
      setText("");
    } else {
      const newItem = { id: v4(), title: text };
      setList([newItem, ...list]);
      showAlert(true, "Item added", "success");
      setText("");
    }
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setText(specificItem.title);
    setIsEditing(true);
    setEditId(specificItem.id);
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, "Item removed!", "danger");
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h2" component="h1" className={classes.title}>
        Todo List
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <Paper className={classes.input}>
          <InputBase
            className={classes.inputField}
            placeholder="e.g Learn JavaScript"
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="input"
            fullWidth
            endAdornment={
              <IconButton type="submit">
                {isEditing ? <EditIcon /> : <AddBoxIcon />}
              </IconButton>
            }
          />
        </Paper>
      </form>
      {list.length > 0 && (
        <div className={classes.todoListContainer} id="todoRefContainer">
          <List className={classes.list}>
            {list.map((item) => {
              return (
                <TodoItem
                  key={item.id}
                  {...item}
                  editItem={editItem}
                  removeItem={removeItem}
                />
              );
            })}
          </List>
          <Button
            variant="contained"
            style={{ background: "#ff6f47", color: "#fff" }}
            onClick={() => {
              const todoRef = document.getElementById("todoRefContainer");
              todoRef.classList.add("fall");

              todoRef.addEventListener("transitionend", () => {
                setList([]);
                showAlert(true, "Cleared All", "danger");
              });
            }}
          >
            Clear All
          </Button>
        </div>
      )}
    </Container>
  );
};

export default App;
