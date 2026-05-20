import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <div className="navbar">

      <h2>Notes App</h2>

      <div className="nav-links">

        <Link to="/home">Home</Link>

        <button onClick={logout}>
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;