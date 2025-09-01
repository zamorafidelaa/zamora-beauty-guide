// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, role }) => {
//   const userRole = localStorage.getItem("role"); 
//   const isLoggedIn = !!userRole; 

//   if (!isLoggedIn) {
//     return <Navigate to="/login" />;
//   }

//   if (role && userRole !== role) {
//     return <Navigate to="/home" />;
//   }

//   return children; 
// };

// export default ProtectedRoute;
