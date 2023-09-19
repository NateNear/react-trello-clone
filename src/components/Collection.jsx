import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import AddBoard from './AddBoard';

class BoardCollection extends Component {
  componentDidMount() {
    document.body.style.backgroundColor = 'white';
  }

  renderBoards() {
    const { boardOrder, boards } = this.props;

    return (
      <div>
        {boardOrder.map((boardID) => {
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
  }

  render() {
    return (
      <div>
        <h3>
          <i className="fa fa-user-o"></i>
          Personal Boards
        </h3>
        <div className="renderBoard board-container">
          {this.renderBoards()}
          <AddBoard boards={this.props.boards}></AddBoard>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  boards: state.boards,
  boardOrder: state.boardOrder,
});

export default connect(mapStateToProps)(BoardCollection);
