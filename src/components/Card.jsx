import React, { useState } from "react";
import Tasks from "./Tasks";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { editCardName, deleteCard } from "../redux/todoSlice";

const Card = ({ title, todoList, groupId }) => {
  const [modal, setModal] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const dispatch = useDispatch();

  const changeCardTitle = () => {
    dispatch(editCardName({ cardId: groupId, title: newTitle }));
    setModal(false);
  };

  return (
    <div className="flex flex-col border bg-slate-300  p-2 rounded-md h-fit">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-xl">{title}</h2>
        <div className="space-x-4">
          <EditNoteIcon
            titleAccess="Edit card title"
            onClick={() => setModal(true)}
            className="text-green-500 cursor-pointer"
          />
          <DeleteForeverIcon
            onClick={() => dispatch(deleteCard({ cardId: groupId }))}
            className="text-red-500 cursor-pointer"
            titleAccess="Delete Card"
          />
        </div>
      </div>

      {modal && (
        <>
          <p>Enter new Card title here:</p>
          <div className="flex justify-between">
            <input
              type="text"
              value={newTitle}
              placeholder="New Card title"
              className="px-2 py-1 rounded-md"
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button
              onClick={changeCardTitle}
              className="border border-black px-2 rounded-md bg-gray-300 hover:bg-gray-400"
            >
              Submit
            </button>
          </div>
        </>
      )}

      <Tasks todoList={todoList} />
    </div>
  );
};

export default Card;
