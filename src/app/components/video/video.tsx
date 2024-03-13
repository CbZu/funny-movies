const Video = () => {
  return (
    <div className="flex flex-row w-full">
      <div className="basis-2/5">
        <div className="iframe-container">
          <iframe
            src={`https://www.youtube.com/embed/OYUY7Ugupts`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video player"
          ></iframe>
        </div>
      </div>
      <div className="basis-3/5">
        <h4 className="font-bold text-red-500">Movie Title</h4>
        <p>Shared by: acnn@gmail.com</p>
        <p>Description:</p>
        <p className="font-bold">
          Như Anh Đã Thấy Em (CTTDE2) - PhucXp ft. Freak D #freakd​ #lofi​
          #NhuAnhDaThayEm Chơi Tiktok cùng ORINN tại đây nhé mọi người:
          https://vt.tiktok.com/ZS8N5JAgH/ https://vt.tiktok.com/ZS8N5FaJf/ ►
          Stream on: https://Orinn.dfan.to/NADNTE ► Official Mv: • PhucXp - Nhu
          Anh Da Thay Em (CTTDE 2)... ► PhucXp: / ducphucakadp ► More
          information about Freak D Music: https://lnkto.bio/freakd
        </p>
      </div>
    </div>
  );
};

export default Video;