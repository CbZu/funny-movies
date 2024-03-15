import React, { useState, useEffect } from 'react';
import Video from '../video/Video';
import { VideoModel } from 'src/app/model/Video';
import { API_DOMAIN } from "src/app/constants";

const SharedVideos = () => {
  const [videos, setVideos] = useState<VideoModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_DOMAIN}/videos-sharing`);
      const jsonData = await response.json();
      setVideos(jsonData);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col space-y-4 items-center">
      {videos.map((item) => (
        <Video
          key={item.id}
          id={item.id}
          sharedBy={item.sharedBy}
          url={item.url}
          title={item.title}
          description={item.description}
        ></Video>
      ))}
    </div>
  );
};

export default SharedVideos;
