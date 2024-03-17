import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/header/header";
import SharingPage from "./components/sharing-page/sharing-page";
import SharedVideos from "./components/shared-videos/shared-videos";

export function App() {
  return (
    <div className="m5 p-5">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<SharedVideos />} />
        <Route path="/share" element={<SharingPage />} />
      </Routes>
    </div>
  );
}

export default App;
