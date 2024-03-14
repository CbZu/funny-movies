import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch(`http://localhost:3000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const jsonData = await response.json();
    setCookie('token', jsonData.token, { path: '/' });
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    removeCookie('token');
    setIsLoggedIn(false)
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleLogin();
  };

  const navigateToSharePage = () => {
    navigate('/share');
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
          <div className="flex space-x-4">
            <p className="text-center">{email}</p>
            <button
              type="submit"
              className="bg-white border hover:bg-gray-300 border-black text-black font-bold py-2 px-4 rounded shadow-md whitespace-nowrap"
              onClick={navigateToSharePage}
            >
              Share a movie
            </button>
            <button
              type="submit"
              className="bg-white border hover:bg-gray-300 border-black text-black font-bold py-2 px-4 rounded shadow-md whitespace-nowrap"
              onClick={handleLogout}
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
