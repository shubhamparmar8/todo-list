import { IconButton, ListItem, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5px 8px",
    marginBottom: theme.spacing(2),
    transition: "all 0.3s ease",
    [theme.breakpoints.down("sm")]: {
      padding: "2.5px 4px",
    },
  },
  listItem: {
    padding: 0,
    width: "100%",
  },
  itemText: {
    flex: 1,
    paddingInline: theme.spacing(1),
    fontSize: "1.25rem",
    fontWeight: "600",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
}));

const TodoItem = ({ title, id, removeItem, editItem }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} id={id}>
      <ListItem className={classes.listItem}>
        <Typography
          variant="h6"
          component="p"
          color="textSecondary"
          className={classes.itemText}
        >
          {title}
        </Typography>
        <div>
          <IconButton onClick={() => editItem(id)}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              const todo = document.getElementById(`${id}`);
              todo.classList.add("fall");
              todo.addEventListener("transitionend", () => removeItem(id));
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </ListItem>
    </Paper>
  );
};

export default TodoItem;
