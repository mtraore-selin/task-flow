import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import { useDispatch, useSelector } from "react-redux";
import { newBoardDispatch, addCard } from "../redux/todoSlice";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const disaptch = useDispatch();

  const states = useSelector((card) => card.todo);

  const [stateToMap, setStateToMap] = useState(
    states?.currState === "mainCard" ? states.mainCard : states.newBoard
  );

  const changeState = () => {
    disaptch(newBoardDispatch());

    if (states.currState === "mainCard") {
      setStateToMap(states.newBoard);
    } else {
      setStateToMap(states.mainCard);
    }
  };

  const [addCardTitle, setAddCardTitle] = useState("");

  const handleAddCard = () => {
    if (!addCardTitle) {
      toast.error("Add a Card Title");
    } else {
      disaptch(addCard({ title: addCardTitle }));
      setAddCardTitle("");
    }
  };

  useEffect(() => {
    setStateToMap(
      states.currState === "mainCard" ? states.mainCard : states.newBoard
    );
  }, [states]);

  return (
    <div className="min-h-screen px-10 py-5  bg-gray-700">
      <Navbar changeState={changeState} />
      <div>
        <Cards stateToMap={stateToMap} />
      </div>

      <div className="bg-gray-100 p-2 my-5 flex items-center gap-10">
        <h2 className="text-xl font-medium">Add Card</h2>
        <input
          value={addCardTitle}
          onChange={(e) => setAddCardTitle(e.target.value)}
          type="text"
          className="px-2 py-1 rounded-md border-2"
          placeholder="Add a new card title"
        />
        <button
          onClick={handleAddCard}
          className="border border-black rounded-md px-2 py-1"
        >
          Submit
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default Home;
