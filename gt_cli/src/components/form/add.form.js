import { Button, Container, Grid, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  editItem,
  setEdit,
  setError,
  setTitle,
} from "../../modules/tasks/redux/actions.tasks";

const Form = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.tasks);

  const handleChange = (event) => {
    const title = event.target.value;

    dispatch(setTitle(tasks.id, title));
    if (title.length === 0) {
      dispatch(setError("tarea..."));
    } else {
      dispatch(setError(""));
    }
  };

  const handleClick = () => {
    if (tasks.title.length === 0) {
      dispatch(setError("Debes ingresar una tarea."));
      return;
    }
    if (tasks.edit) {
      dispatch(
        editItem(tasks.id, {
          title: tasks.title,
        })
      );
      dispatch(setEdit());
    } else {
      dispatch(
        addItem({
          title: tasks.title,
        })
      );
    }
    dispatch(setTitle("", ""));
  };
  return (
    <Container maxWidth="sm">
      <Grid container alignItems="center">
        <Grid item md={12}>
          <TextField
            value={tasks.title}
            onChange={handleChange}
            error={!!tasks.error}
            helperText={tasks.error}
            id="outlined-basic"
            fullWidth
            label="Tarea..."
            multiline
            variant="outlined"
          />
        </Grid>
        <Grid item md={2}>
          <Button variant="outlined" style={{
            marginTop: "2px"
          }} color="primary" onClick={handleClick}>
            {tasks.edit ? "Editar" : "Agregar"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Form;
