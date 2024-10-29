import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../utils/SupabaseClient";

function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')


  const register = (email, password) =>
    supabase.auth.signUp({ email, password });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill all the fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      setError("");
      setLoading(true);
      const { data, error } = await register(
        email,
        password
      );
      if (!error && data) {
        alert(
          "Registration Successful. Check your email to confirm your account"
        );
      }
    } catch (error) {
      setError("Error in Creating Account");
    }
    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-center text-white">
          Registration
        </h1>

        <div className="flex flex-col p-6">

          <hr className="bg-gray-600 border-0 h-px my-4" />

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-gray-200">
              Email
            </label>
            <input
              className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
              type="email"
              placeholder="Enter email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="mt-6 text-gray-200">
              Password
            </label>
            <input
              className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="confirmPassword" className="mt-6 text-gray-200">
              Confirm Password
            </label>
            <input
              className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div class="error text-red-600 font-semibold mt-2">
              {error}
            </div>

            <button
              className="mt-8 text-lg text-white font-semibold bg-blue-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
              type="submit"
            >
              Sign in with Email
            </button>
            <div className="w-100 text-center mt-5 text-white">
              Already a User? <Link to={"/login"}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;