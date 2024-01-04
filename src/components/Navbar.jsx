import React from "react";

const Navbar = ({ changeState }) => {
  return (
    <nav className="flex text-white px-10 py-2 mb-2 justify-between">
      <h1 className="font-bold text-3xl">Task Flow</h1>

      <button className="border px-2 py-1" onClick={changeState}>
        Switch Board
      </button>
    </nav>
  );
};

export default Navbar;
