import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastProps } from "src/app/model/ToastProps";
import { API_DOMAIN } from "src/app/constants";
import consumer from "src/app/helper/consumer";

const Header = ({ setToastError, setToastSuccess }: ToastProps) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token", "email"]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!cookies.token);
    setEmail(cookies.email);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const subscription = consumer.subscriptions.create('VideosSharingChannel', {
        received(data) {
          if (data.email !== email) {
            setToastSuccess(`New video is shared by ${data.email} - Title: ${data.video}`);
          }
        },
      });
  
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isLoggedIn]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleLogin();
  };

  const handleLogin = async () => {
    const response = await fetch(`${API_DOMAIN}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password: password }),
    });
    const jsonData = await response.json();
    if (response.ok) {
      setCookie('token', jsonData.token, { path: '/' });
      setCookie('email', jsonData.email, { path: '/' });
      setIsLoggedIn(true)
    } else {
      setToastError(jsonData.error);
    }
  };

  const handleLogout = async () => {
    removeCookie("token");
    removeCookie("email");
    setEmail("");
    setPassword("");
    setIsLoggedIn(false);
  };

  return (
    <div className="flex justify-between mx-16 border-b-2 border-slate-950" >
      <div className="flex space-x-1 items-center cursor-pointer" onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faHome} className="text-4xl font-bold" />
        <h4 className="text-4xl font-bold">Funny Movies</h4>
      </div>
      <div className="flex space-x-4 items-center p-4 pr-0">
        {isLoggedIn ? (
          <div className="flex space-x-4 item-center">
            <p className="flex items-center">{email}</p>
            <button
              type="submit"
              className="bg-white border hover:bg-gray-300 border-black text-black font-bold py-2 px-4 rounded shadow-md whitespace-nowrap"
              onClick={()=> navigate('/share')}
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
