import { useState, useEffect } from 'react';
import { VideoModel } from 'src/app/model/Video';
import { API_DOMAIN } from "src/app/constants";
import Video from "../video/video";

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

  return (
    <div data-testid="shared-videos" className="flex flex-col space-y-4 items-center">
      {loading && <div>Loading...</div>}
      {videos.map((item) => (
        <Video
          key={item.id}
          id={item.id}
          sharedBy={item.sharedBy}
          url={item.url}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default SharedVideos;
