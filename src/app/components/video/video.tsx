import { VideoModel } from "src/app/model/Video";
import ReactPlayer from 'react-player';

const Video = ({sharedBy, url, title, description }: VideoModel) => {
  return (
    <div className="flex flex-row space-x-4 w-9/12 max-h-72 max-w-52 mt-8">
      <div className="basis-2/5">
        <div className="iframe-container">
          <ReactPlayer layer="true" url={url} controls={true} width="445px" height="250px" />
        </div>
      </div>
      <div className="basis-3/5">
        <h4 className="font-bold text-red-500">{title}</h4>
        <p>Shared by: {sharedBy}</p>
        <p>Description:</p>
        <p className="font-bold line-clamp-5">{description}</p>
      </div>
    </div>
  );
};

export default Video;