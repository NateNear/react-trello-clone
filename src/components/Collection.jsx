import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddBoard from './BoardAdd';
import PropTypes from 'prop-types';

const BoardCollection = () => {
  const boards = useSelector(state => state.boards);
  const boardOrder = useSelector(state => state.boardOrder);

  useEffect(() => {
    document.body.style.backgroundColor = 'white';
  }, []);

  const renderBoards = () => {
    return (
      <div>
        {boardOrder.map(boardID => {
          const board = boards[boardID];
          return (
            <Link
              key={boardID}
              to={`/${board.id}`}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <div className="board-display">{board.title}</div>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <h3>
        <i className="fa fa-user-o"></i>
        Personal Boards
      </h3>
      <div className="renderBoard board-container">
        {renderBoards()}
        <AddBoard boards={boards}></AddBoard>
      </div>
    </div>
  );
};

BoardCollection.propTypes = {
  boards: PropTypes.object.isRequired,
  boardOrder: PropTypes.array.isRequired,
};

export default BoardCollection;
