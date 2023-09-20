// import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Board from "./components/Board";
import BoardCollection from "./components/Collection";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";

function App() {
  const { boards, boardOrder } = useSelector(state => ({
    boards: state.boards,
    boardOrder: state.boardOrder
  }));

  return (
    <div>
      <Router>
        <h3 style={{ backgroundColor: "#026aa7", color: "white" }} className="panel-footer">
          <Navbar boards={boards} boardOrder={boardOrder}></Navbar>
          <em style={{ color: "#8bbdd9" }}>Trello</em>
        </h3>
        <Routes>
          <Route path="/" element={<BoardCollection />} />
          <Route path="/:boardID" element={<Board />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
