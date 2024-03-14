import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { API_ENDPOINT } from '../../constants';
import { useCookies } from 'react-cookie';

const Header = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);


  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      const jsonData = await response.json();
      setCookie("token", jsonData.token, { path: '/' });
    } catch (error: any) {
      setIsLoggedIn(false);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="flex justify-between mx-16 border-b-2 border-slate-950">
      <div className="flex space-x-1 items-center">
        <div>
          <FontAwesomeIcon icon={faHome} className="text-4xl font-bold" />
        </div>
        <div>
          <h4 className="text-4xl font-bold">Funny Movies</h4>
        </div>
      </div>
      <div className="flex space-x-4 items-center p-4 pr-0">
        {isLoggedIn ? (
          <div>
            <p>{}</p>
            <button
              type="submit"
              className="bg-white border hover:bg-gray-300 border-black text-black font-bold py-2 px-4 rounded shadow-md whitespace-nowrap"
            >
              Share a movie
            </button>
            <button
              type="submit"
              className="bg-white border hover:bg-gray-300 border-black text-black font-bold py-2 px-4 rounded shadow-md whitespace-nowrap"
            >
              Logout
            </button>

          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              placeholder="email"
              className="border border-gray-300 p-2 rounded-md w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="password"
              className="border border-gray-300 p-2 rounded-md w-full"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-white border hover:bg-gray-300 border-black text-black font-bold py-2 px-4 rounded shadow-md whitespace-nowrap"
            >
              Login / Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Header;