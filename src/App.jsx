import { Outlet } from "react-router-dom";
import UserHeader from "./components/user/UserHeader";

const App = () => {
  return (
    <div>
      <UserHeader /> {/* Header component shown on all pages */}
      <Outlet /> {/* Renders the child routes */}
    </div>
  );
};

export default App;
