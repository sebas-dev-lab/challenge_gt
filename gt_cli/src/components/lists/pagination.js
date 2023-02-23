import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getItems,
  setLimit,
  setPagination,
} from "../../modules/tasks/redux/actions.tasks";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";

export default function TablePaginationTd() {
  const dispatch = useDispatch();
  const tasksStore = useSelector((store) => store.tasks);

  const handleChangePage = (event, newPage) => {
    dispatch(setPagination(newPage, tasksStore.limit));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setLimit(event.target.value));
  };

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pagination
        count={tasksStore.pages}
        color="primary"
        onChange={handleChangePage}
      />
      <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
        <InputLabel id="select">Tareas</InputLabel>
        <Select
          labelId="select"
          id="select"
          value={tasksStore.limit}
          label="limit"
          onChange={handleChangeRowsPerPage}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
