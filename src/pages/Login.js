import { useState } from "react";
import { Link, redirect } from "react-router-dom";
import { supabase } from "../utils/SupabaseClient";

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')

  const handleSignInWithGitHub = async (e) => {

    e.preventDefault();

    const { error } = await supabase.auth.signInWithOAuth(
      {
        provider: 'github',
      },
      {
        redirectTo: 'http://localhost:3000/',
      }
    );

    if (error) {
      setError(JSON.stringify(error));
    }
  }

  const handleSignIn = async (e) => {

    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.error_description || error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-center text-white">
          Sign in to your account
        </h1>

        <div className="flex flex-col p-6">
          <button
            className="text-lg text-white font-semibold bg-gray-900 py-2 px-4 rounded-md focus:outline-none focus:ring-2"
            onClick={handleSignInWithGitHub}
          >
            Sign In with GitHub
          </button>

          <hr className="bg-gray-600 border-0 h-px my-8" />

          <form className="flex flex-col" onSubmit={handleSignIn}>
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

            <div class="error text-red ont-semibold mt-2">
              {error}
            </div>

            <button
              className="mt-8 text-lg text-white font-semibold bg-blue-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
              type="submit"
            >
              Sign in with Email
            </button>
            <div className="w-100 text-center mt-5 text-white">
              Don't have an account? <Link to={"/registration"}>Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;