import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);

      // optional (useful for frontend display)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message || "Login Success");

      navigate("/home");

    } catch (err) {

      console.log(err);

      const data = err.response?.data;

      // Show structured backend errors
      if (data?.errors) {
        const messages = Object.values(data.errors).join("\n");
        alert(messages);
      } else {
        alert(data?.message || "Login Failed");
      }

    } finally {
      setLoading(false);
    }
  };


  return (

    <div className="container">

      <div className="form-box">

        <h1>Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        <button
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don't have account?{" "}
          <Link to="/signup">
            Signup
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;