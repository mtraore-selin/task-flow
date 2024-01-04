import React from "react";
import Card from "./Card";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { shiftTask } from "../redux/todoSlice";

const Cards = ({ stateToMap }) => {
  const dispatch = useDispatch();

  const shiftingTasks = async (res) => {
    if (!res.destination) return;

    dispatch(shiftTask({ res }));
  };

  return (
    <DragDropContext onDragEnd={shiftingTasks}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {stateToMap?.map((todoCard) => {
          return (
            <>
              <Card
                key={todoCard?.id}
                title={todoCard?.groupName}
                todoList={todoCard}
                groupId={todoCard?.id}
              />
            </>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default Cards;
