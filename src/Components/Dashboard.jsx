import { useOutletContext } from "react-router-dom";

const Dashboard = ({ handleLogout }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context

  return (
    <div>
      {user && (
        <h1 className="text-3xl">
          Welcome, {user.username[0].toUpperCase()}
          {user.username.slice(1).toLowerCase()}
        </h1>
      )}

      {/* Use user data as needed, for example: */}
    </div>
  );
};

export default Dashboard;
