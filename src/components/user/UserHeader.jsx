import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const UserHeader = () => {

  return (
    <header>
    <div className="logo">
      <img src="image.png" alt="Logo" />
      <h1>Zamora Beauty Guide</h1>
    </div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/consultation">Consultation</Link>
        </li>
        <li>
          <Link to="/product">Product</Link>
        </li>
        <li><Heart /></li>

      </ul>
    </nav>
  </header>  );
};

export default UserHeader;
