import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { sort, activeBoard } from '../redux/Actions';
import { useParams } from 'react-router-dom';
import TodoList from './TodoList';
import AddButton from './ButtonAdd';
import PropTypes from 'prop-types';

const Board = () => {
  const dispatch = useDispatch();
  const { boardID } = useParams();
  const lists = useSelector(state => state.lists);
  const cards = useSelector(state => state.cards);
  const boards = useSelector(state => state.boards);

  useEffect(() => {
    dispatch(activeBoard(boardID));
    document.body.style.backgroundColor = '#0079bf';
  }, [dispatch, boardID]);

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }

    dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type,
        boardID
      )
    );
  };

  const board = boards[boardID];
  if (!board) {
    return <p>Board not found</p>;
  }

  const listOrder = board.lists;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {provided => (
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
                  />
                );
              }
              return null;
            })}
            {provided.placeholder}
            <AddButton list boardID={boardID} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

Board.propTypes = {
  lists: PropTypes.object.isRequired,
  cards: PropTypes.object.isRequired,
  boards: PropTypes.object.isRequired,
};

export default Board;
