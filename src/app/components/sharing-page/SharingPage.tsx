import { useState } from "react";
import { API_ENDPOINT } from "src/app/constants";

const SharingPage = () => {

  const [url, setUrl] = useState('');

  const shareVideo = async () => {
    const response = await fetch(`http://localhost:3000/videos-sharing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ video: { url } }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }
  };

  return (
    <div className="flex flex-row justify-center space-y-5 mt-10">
      <div className="relative border border-black p-4 w-2/5">
        <p className="absolute -top-4 left-2 bg-white px-2">
          Share a Youtube movie
        </p>
        <div className="flex flex-col space-y-4">
          <div className="flex ">
            <div className="basis-1/4 flex flex-row-reverse px-2">
              <label htmlFor="name">Youtube URL:</label>
            </div>
            <div className="basis-2/4 flex items-center">
              <input
                className="border border-gray-300 p-2 rounded-md w-full"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="flex">
            <div className="basis-1/4"></div>
            <div className="basis-2/4 flex items-center">
              <button
                className="bg-white border hover:bg-gray-300 border-black text-black font-bold py-2 px-4 rounded shadow-md whitespace-nowrap w-full"
                onClick={shareVideo}
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharingPage;