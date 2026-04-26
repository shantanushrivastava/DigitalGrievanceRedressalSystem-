import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout, isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLink = (to, label) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`text-sm font-medium px-3 py-1.5 rounded-lg transition ${
          isActive
            ? "bg-blue-100 text-blue-700"
            : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <span className="text-xl font-bold text-gray-800">GrievanceHub</span>
        </Link>

        <div className="flex items-center gap-2">
          {navLink("/", "Home")}
          {navLink("/track", "Track Ticket")}
          {navLink("/submit", "Submit")}

          {isLoggedIn ? (
            <>
              {isAdmin
                ? navLink("/admin", "Admin")
                : navLink("/dashboard", "Dashboard")}
              <button
                onClick={handleLogout}
                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition ml-1"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={`text-sm font-medium px-4 py-1.5 rounded-lg transition ml-1 ${
                location.pathname === "/login"
                  ? "bg-blue-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;