import { Component } from 'react';
import { connect } from 'react-redux';
import TextArea from 'react-autosize-textarea';
import { addCard, addList } from '../redux/Actions';
import PropTypes from 'prop-types';


class AddButton extends Component {
  state = {
    formState: false,
    text: '',
  };

  static propTypes = {
    boardID: PropTypes.string.isRequired, // Add this line
    listID: PropTypes.string, // Define listID if it's a prop used in this component
    list: PropTypes.bool, // Define list if it's a prop used in this component
    dispatch: PropTypes.func.isRequired,
  };

  componentDidUpdate() {
    console.log(this.props.boardID);
  }

  openForm = () => {
    this.setState({
      formState: true,
    });
  };

  closeForm = () => {
    this.setState({
      formState: false,
      text: '',
    });
  };

  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleAddList = () => {
    const { text } = this.state;

    if (text) {
      this.props.dispatch(addList(text, this.props.boardID));
      this.setState({
        text: '',
      });
    }
  };

  handleAddCard = () => {
    const { listID } = this.props;
    const { text } = this.state;

    if (text) {
      this.props.dispatch(addCard(listID, text));
      this.setState({
        text: '',
      });
    }
  };

  renderForm = () => {
    const { list } = this.props;
    const placeHolder = list ? 'Enter list title' : 'Enter title for card';
    const buttonTitle = list ? 'Add list' : 'Add card';

    return (
      <div className="renderForm">
        <div className="card" style={{ width: '80%' }}>
          <TextArea
            placeholder={placeHolder}
            autoFocus
            onBlur={this.closeForm}
            onChange={this.handleChange}
            value={this.state.text}
          ></TextArea>
        </div>
        <div>
          <button
            onMouseDown={list ? this.handleAddList : this.handleAddCard}
            className="btn btn-success"
          >
            {buttonTitle}
          </button>
          <button type="button" className="close" aria-label="Close" onClick={this.closeForm}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    );
  };

  ToAddCard = () => {
    const { list } = this.props;
    const buttonType = list ? 'Add another list' : 'Add another card';
    const buttonColor = list ? '#5ba4cf' : 'transparent';
    const buttonTextColor = list ? 'white' : 'black';
    const buttonTextOpacity = list ? 1 : 0.5;

    return (
      <div
        className="openForm"
        onClick={this.openForm}
        style={{
          opacity: buttonTextOpacity,
          cursor: 'pointer',
          color: buttonTextColor,
          backgroundColor: buttonColor,
        }}
      >
        <p>
          <i className="fa fa-plus" aria-hidden="true"></i>
          {buttonType}
        </p>
      </div>
    );
  };

  render() {
    return this.state.formState ? this.renderForm() : this.ToAddCard();
  }
}

export default connect()(AddButton);
