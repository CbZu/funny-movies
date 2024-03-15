import Header from './components/header/Header';
import SharedVideos from './components/shared-videos/SharedVideos';
import { Route, Routes } from 'react-router-dom';
import SharingPage from './components/sharing-page/SharingPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <div className="m5 p-5">
      <ToastContainer />
      <Header
        setToastError={toast.error}
        setToastSuccess={toast.success}
      ></Header>
      <Routes>
        <Route path="/" element={<SharedVideos />} />
        <Route
          path="/share"
          element={
            <SharingPage
              setToastError={toast.error}
              setToastSuccess={toast.success}
            ></SharingPage>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
