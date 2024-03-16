import SharedVideos from './components/shared-videos/SharedVideos';
import { Route, Routes } from 'react-router-dom';
import SharingPage from './components/sharing-page/SharingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/header/header";

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
