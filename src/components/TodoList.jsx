import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { editList, removeList } from '../redux/Actions';
import TextArea from 'react-autosize-textarea';
import TodoCard from './TodoCard';
import AddButton from './ButtonAdd';
import PropTypes from 'prop-types';

const TodoList = ({ title, cards, listID, index, boardID }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);

  useEffect(() => {
    setListTitle(title);
  }, [title]);

  const closeForm = () => {
    setEditing(false);
  };

  const handleChange = (e) => {
    setListTitle(e.target.value);
  };

  const handleSave = () => {
    setEditing(false);
    dispatch(editList(listID, listTitle));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDelete = () => {
    console.log('delete list is called' + listID);
    dispatch(removeList(listID, boardID));
  };

  const renderEditForm = () => {
    return (
      <div>
        <div className="card" style={{ width: '100%' }}>
          <TextArea
            placeholder={listTitle}
            autoFocus
            onBlur={closeForm}
            onChange={handleChange}
            value={listTitle}
          ></TextArea>
        </div>
        <div>
          <button onMouseDown={handleSave} className="btn btn-success">
            save
          </button>
        </div>
      </div>
    );
  };

  return (
    <Draggable draggableId={String(listID)} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={String(listID)} type="card">
            {(provided) => (
              <div
                className="card"
                style={{
                  backgroundColor: '#ebecf0',
                  width: '272px',
                  margin: '4px',
                  marginTop: '10px',
                  padding: '2px',
                  borderRadius: '3px',
                  boxSizing: 'border-box',
                }}
              >
                {editing ? (
                  renderEditForm()
                ) : (
                  <p className="editButton">
                    {listTitle}
                    <div className="hide">
                      <i className="fa fa-trash" onClick={handleDelete}></i>
                    </div>
                    <div className="hide">
                      <i className="fa fa-pencil-square-o" onClick={handleEdit}></i>
                    </div>
                  </p>
                )}
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {cards.map((card, index) => (
                    <div style={{ width: '95%', margin: '0 auto 10px' }} key={card.id}>
                      <TodoCard text={card.text} id={card.id} listID={listID} index={index}></TodoCard>
                    </div>
                  ))}
                  {provided.placeholder}
                  <AddButton listID={listID} cards></AddButton>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

TodoList.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  listID: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  boardID: PropTypes.string.isRequired,
};

export default TodoList;
