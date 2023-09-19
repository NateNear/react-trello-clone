import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { editList, removeList } from '../redux/actions';
import TextArea from 'react-autosize-textarea';
import TodoCard from './TodoCard';
import AddButton from './AddButton';

class TodoList extends Component {
  state = {
    editing: false,
    title: '',
  };

  componentDidMount() {
    const { title } = this.props;
    this.setState({ title });
  }

  closeForm = () => {
    this.setState({ editing: false });
  };

  handleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleSave = () => {
    this.setState({ editing: false });
    const { listID } = this.props;
    const newTitle = this.state.title;
    this.props.dispatch(editList(listID, newTitle));
  };

  handleEdit = () => {
    this.setState({ editing: true });
  };

  handleDelete = () => {
    const { listID, boardID } = this.props;
    console.log('delete list is called' + listID);
    this.props.dispatch(removeList(listID, boardID));
  };

  renderEditForm = () => {
    return (
      <div>
        <div className="card" style={{ width: '100%' }}>
          <TextArea
            placeholder={this.state.title}
            autoFocus
            onBlur={this.closeForm}
            onChange={this.handleChange}
            value={this.state.title}
          ></TextArea>
        </div>
        <div>
          <button onMouseDown={this.handleSave} className="btn btn-success">
            save
          </button>
        </div>
      </div>
    );
  };

  render() {
    const { cards, listID, index } = this.props;

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
                    marginTop: '10',
                    padding: '2px',
                    borderRadius: '3px',
                    boxSizing: 'border-box',
                  }}
                >
                  {this.state.editing ? (
                    this.renderEditForm()
                  ) : (
                    <p className="editButton">
                      {this.props.title}
                      <div className="hide">
                        <i className="fa fa-trash" onClick={this.handleDelete}></i>
                      </div>
                      <div className="hide">
                        <i className="fa fa-pencil-square-o" onClick={this.handleEdit}></i>
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
  }
}

export default connect()(TodoList);
