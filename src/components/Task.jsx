import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Box, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Task = ({
  taskTitle,
  taskDate,
  taskId,
  handleDeleteTask,
  handleEditTask,
  openModel,
  setOpenModel,
}) => {
  const [editText, setEditText] = useState(taskTitle);

  return (
    <div className="border flex flex-col gap-2 bg-slate-100 my-2 p-1.5 rounded-md z-40">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-medium">{taskTitle}</h4>
          <p>
            <span className="font-medium text-sm">Date: </span>
            {taskDate}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button onClick={() => setOpenModel(true)}>
            <EditNoteIcon
              className="text-green-500 hover:text-green-600"
              titleAccess="Edit Task"
            />
          </button>

          <button onClick={() => handleDeleteTask(taskId)}>
            <DeleteForeverIcon
              className="text-red-500 hover:text-red-600"
              titleAccess="Delete Task"
            />
          </button>
        </div>
      </div>

      <Modal
        open={openModel}
        onClose={() => setOpenModel(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ height: "100vh" }}
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Edit Text
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <textarea
              onChange={(e) => setEditText(e.target.value)}
              value={editText}
              className="border-2 w-full rounded-md px-2 py-1"
              rows={4}
            >
              {taskTitle}
            </textarea>
          </Typography>

          <button
            onClick={() => handleEditTask(taskId, editText)}
            className="border border-black px-2 py-1 rounded-md font-medium bg-slate-200 hover:bg-slate-300 w-full mt-4"
          >
            Submit
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default Task;
