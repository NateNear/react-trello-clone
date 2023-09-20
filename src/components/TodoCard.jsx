import { useState } from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import TextArea from 'react-autosize-textarea';
import { removeCard, editCard } from '../redux/Actions';
import PropTypes from 'prop-types';

const TodoCard = ({ text, id, index, listID, dispatch }) => {
  const [editing, setEditing] = useState(false);
  const [cardText, setCardText] = useState(text);

  const closeForm = () => {
    setEditing(false);
  };

  const handleDelete = () => {
    dispatch(removeCard(id, listID));
  };

  const handleChange = (e) => {
    setCardText(e.target.value);
  };

  const handleSave = () => {
    setEditing(false);
    dispatch(editCard(id, listID, cardText));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const renderEditForm = () => {
    return (
      <div>
        <div className="card" style={{ width: '100%' }}>
          <TextArea
            placeholder={cardText}
            value={cardText}
            onChange={handleChange}
            autoFocus
            onBlur={closeForm}
          ></TextArea>
        </div>
        <button onMouseDown={handleSave} className="btn btn-success">
          save
        </button>
      </div>
    );
  };

  const renderCard = () => {
    return (
      <Draggable draggableId={String(id)} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="card">
              <p className="editButton">
                {cardText}
                <div className="hide">
                  <i
                    onMouseDown={handleDelete}
                    className="fa fa-trash"
                    aria-hidden="true"
                    style={{ paddingRight: '2px' }}
                  ></i>
                </div>
                <div className="hide">
                  <i className="fa fa-pencil-square-o" onMouseDown={handleEdit}></i>
                </div>
              </p>
            </div>
          </div>
        )}
      </Draggable>
    );
  };

  return editing ? renderEditForm() : renderCard();
};

TodoCard.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  listID: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(TodoCard);
