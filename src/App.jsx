import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

const App = () => {
  // const isAdmin = true; // Tentukan berdasarkan autentikasi atau peran pengguna

  return (
    <div>
      {/* {isAdmin ? <AdminRoutes /> : <UserRoutes />} */}
      {/* <UserRoutes/> */}
      <AdminRoutes/>
    </div>
  );
};

export default App;
