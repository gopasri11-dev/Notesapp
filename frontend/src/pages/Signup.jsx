import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async () => {

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        form
      );

      alert(res.data.message || "Signup Success ✔");

      navigate("/");

    } catch (err) {

      console.log(err);

      const data = err.response?.data;

      // Show field-level errors if available
      if (data?.errors) {
        const messages = Object.values(data.errors).join("\n");
        alert(messages);
      } else {
        alert(data?.message || "Signup Failed");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <div className="form-box">

        <h2>Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        <p>
          Already have account?{" "}
          <Link to="/">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;