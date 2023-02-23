import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import EditIcon from "@mui/icons-material/Edit";
import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  editItem,
  getItems,
  setEdit,
  setTitle,
} from "../../modules/tasks/redux/actions.tasks";
import { useLocation } from "react-router-dom";

function TodoList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const tasksStore = useSelector((store) => store.tasks);

  useEffect(() => {
    if (location.pathname.includes("/tasks")) dispatch(getItems());
  }, []);

  useEffect(() => {
    if (!tasksStore.edit) {
      dispatch(setTitle("", ""));
    } else {
      dispatch(setTitle(tasksStore.id, tasksStore.title));
    }
  }, [tasksStore.edit]);

  const handleEdit = (item) => {
    dispatch(setEdit());
    dispatch(setTitle(item.id, item.title));
  };

  const handleComplete = (id, completed) => {
    dispatch(
      editItem(id, {
        completed: !completed,
      })
    );
  };

  const handleDelete = (item) => {
    dispatch(deleteItem(item));
  };
  return (
    <Container maxWidth="sm">
      {!tasksStore.items.length ? (
        <ListItem button>
          <ListItemIcon>
            <DoDisturbAltIcon color="error" />
          </ListItemIcon>
          <ListItemText primary={"No hay tareas"} />
        </ListItem>
      ) : (
        <List>
          {tasksStore.items.map((item) => {
            return (
              <ListItem
                key={item.id}
                button
                onClick={() => handleComplete(item.id, item.completed)}
              >
                <ListItemIcon>
                  {!item.completed ? (
                    <RadioButtonUncheckedIcon color="primary" />
                  ) : (
                    <CheckCircleOutlineIcon color="primary" />
                  )}
                </ListItemIcon>

                <ListItemText
                  primary={item.title}
                  style={
                    item.completed
                      ? {
                          textDecoration: "line-through",
                          color: "GrayText",
                        }
                      : {}
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEdit(item, item.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      )}
    </Container>
  );
}

export default TodoList;
