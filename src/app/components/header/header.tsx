import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
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
        <input
          type="text"
          placeholder="email"
          className="border border-gray-300 p-2 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="password"
          className="border border-gray-300 p-2 rounded-md w-full"
        />
        <button className="bg-white border hover:bg-gray-300 border-black text-black font-bold py-2 px-4 rounded shadow-md whitespace-nowrap">
          Login / Register
        </button>
      </div>
    </div>
  );
};

export default Header;