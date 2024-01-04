import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currState: "mainCard",
  mainCard: [
    {
      id: 101,
      groupName: "My Resources",
      tasks: [
        { id: 1, title: "Test-1", date: new Date().toLocaleString() },
        { id: 2, title: "Test-2", date: new Date().toLocaleString() },
      ],
    },
    {
      id: 102,
      groupName: "Todo",
      tasks: [],
    },
    {
      id: 103,
      groupName: "Doing",
      tasks: [],
    },
    {
      id: 104,
      groupName: "Done",
      tasks: [],
    },
  ],
  newBoard: [
    {
      id: 543,
      groupName: "New Board",
      tasks: [
        { id: 1, title: "new bord task", date: new Date().toLocaleString() },
        { id: 2, title: "Test-2", date: new Date().toLocaleString() },
      ],
    },
  ],
};

export const userSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const items = Array.from(
        state.currState === "mainCard" ? state.mainCard : state.newBoard
      );
      const a = items.find((item) => item.id === action.payload.cardId);
      const aArray = a.tasks;
      aArray.push({
        id: Date.now(),
        title: action.payload.message,
        date: new Date().toLocaleString(),
      });

      return state;
      // state.newBoard = JSON.parse(JSON.stringify(items));
    },

    addCard: (state, action) => {
      // const items = Array.from(
      //   state.currState === "mainCard" ? state.mainCard : state.newBoard
      // );
      // console.log(items);
      // items.push({
      //   id: Date.now(),
      //   groupName: action.payload.title,
      //   tasks: [],
      // });

      const card =
        state.currState === "mainCard" ? state.mainCard : state.newBoard;
      card.push({
        id: Date.now(),
        groupName: action.payload.title,
        tasks: [],
      });

      return state;
    },

    deleteTask: (state, action) => {
      const items = Array.from(
        state.currState === "mainCard" ? state.mainCard : state.newBoard
      );
      const a = items.find((item) => item.id === action.payload.cardId);
      const aArray = a.tasks;

      aArray.splice(
        aArray.findIndex((item) => item.id === action.payload.id),
        1
      );

      // state.mainCard = JSON.parse(JSON.stringify(items));
    },

    deleteCard: (state, action) => {
      const items =
        state?.currState === "mainCard" ? state.mainCard : state.newBoard;
      console.log(items);

      items.splice(
        items.findIndex((item) => item.id === action.payload.cardId),
        1
      );
    },

    editTask: (state, action) => {
      const items = Array.from(
        state?.currState === "mainCard" ? state.mainCard : state.newBoard
      );
      const a = items.find((item) => item.id === action.payload.cardId);
      const aArray = a.tasks;

      const b = aArray.find((item) => item.id === action.payload.id);
      b.title = action.payload.newMessage;
      b.date = new Date().toLocaleString();

      // state.mainCard = JSON.parse(JSON.stringify(items));
    },

    editCardName: (state, action) => {
      const card = Array.from(
        state?.currState === "mainCard" ? state.mainCard : state.newBoard
      );
      const a = card.find((item) => item.id === action.payload.cardId);

      a.groupName = action.payload.title;
    },

    shiftTask: (state, action) => {
      const items = Array.from(
        state?.currState === "mainCard" ? state.mainCard : state.newBoard
      );

      const a = items.find(
        (item) => item.id === Number(action.payload.res.source.droppableId)
      );
      const aArray = a.tasks;

      const splicedItem = aArray.splice(action.payload.res.source.index, 1);

      const b = items.find(
        (item) => item.id === Number(action.payload.res.destination.droppableId)
      );
      const bArray = b.tasks;

      bArray.splice(action.payload.res.destination.index, 0, splicedItem[0]);
    },

    newBoardDispatch: (state, action) => {
      if (state.currState === "mainCard") {
        state.currState = "newBoard";
      } else {
        state.currState = "mainCard";
      }
    },
  },
});

export const {
  addTask,
  deleteTask,
  editTask,
  shiftTask,
  removeFromFav,
  updateFavourites,
  editCardName,
  newBoardDispatch,
  addCard,
  deleteCard,
} = userSlice.actions;

export default userSlice.reducer;
