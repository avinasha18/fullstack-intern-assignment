import { useState } from 'react';
import { useAppDispatch } from '@/redux/store';
import { setToken } from '@/redux/auth/auth.slice';
import axios from 'axios';
import { useRouter } from 'next/router'; 


const HomePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter(); 

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      const { token } = response.data;
      router.push('/welcome');

      dispatch(setToken(token));
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  console.log(username)
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full px-4 py-2 mt-4 border rounded-md"
        />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 mt-4 border rounded-md"
        />
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;
