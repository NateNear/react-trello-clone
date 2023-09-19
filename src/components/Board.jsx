import React, { Component } from 'react';
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort, activeBoard } from "../redux/actions";
import store from '../redux/store';
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import TodoList from "./TodoList";
import AddButton from "./AddButton";

class Board extends Component {
  state = {
    boardID: ""
  }

  componentDidMount() {
    this.setActiveBoard();
    document.body.style.backgroundColor = "#0079bf";
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.boardID !== prevProps.match.params.boardID) {
      this.setActiveBoard();
    }
  }

  setActiveBoard() {
    const { boardID } = this.props.match.params;
    this.props.dispatch(activeBoard(boardID));
    this.setState({ boardID });
    console.log("active : " + store.getState().active);
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }

    this.props.dispatch(sort(source.droppableId, destination.droppableId, source.index, destination.index, draggableId, type, this.state.boardID));
  }

  render() {
    const { lists, cards, boards } = this.props;
    const { boardID } = this.state;

    const board = boards[boardID];
    if (!board) {
      return <p>Board not found</p>
    }

    const listOrder = board.lists;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="d-flex">
              {listOrder.map((listID, index) => {
                const list = lists[listID];
                if (list) {
                  const listCards = list.cards.map(cardId => cards[cardId]);
                  return (
                    <TodoList
                      listID={list.id}
                      key={list.id}
                      title={list.title}
                      cards={listCards}
                      index={index}
                      boardID={boardID}
                    ></TodoList>
                  );
                }
              })}
              {provided.placeholder}
              <AddButton list boardID={boardID}></AddButton>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards,
  boards: state.boards,
  boardOrder: state.boardOrder
});

export default connect(mapStateToProps)(Board);
