import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ boards, boardOrder }) => {
  return (
    <div>
      <Link to="/" style={{ color: 'white', marginLeft: '0' }}>
        <i className="fa fa-home"></i>
      </Link>
      <DropdownButton id="dropdown-basic-button" title="Boards" style={{ display: 'inline-block', float: 'center' }}>
        {boardOrder.map((boardID) => {
          const board = boards[boardID];
          return (
            <Dropdown.Item key={boardID}>
              <Link to={`/${board.id}`} style={{ textDecoration: 'none' }}>
                {board.title}
              </Link>
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </div>
  );
};

Navbar.propTypes = {
  boards: PropTypes.object.isRequired,
  boardOrder: PropTypes.array.isRequired,
};

export default Navbar;
