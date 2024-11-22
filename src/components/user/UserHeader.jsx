import { Link } from "react-router-dom";

const UserHeader = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/consultation">Consultation</Link>
          </li>
          <li>
            <Link to="/search-skincare">Search Skincare</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default UserHeader;
