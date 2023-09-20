import { useState } from 'react';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addBoard } from '../redux/Actions';
import { connect } from 'react-redux';

const AddBoard = ({ dispatch }) => {
  const [title, setTitle] = useState('Create new board');

  const handleAddBoard = (e) => {
    e.preventDefault();
    dispatch(addBoard(title));
    setTitle('Create new board');
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleAddBoard}>
        <input
          onChange={handleChange}
          value={title}
          type="text"
          style={{ height: '100px', width: '200px', textAlign: 'center' }}
        ></input>
      </form>
    </div>
  );
};

AddBoard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(AddBoard);
