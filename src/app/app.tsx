// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Header from './components/header/Header';
import SharedVideos from './components/shared-videos/SharedVideos';
import { Route, Routes } from 'react-router-dom';
import SharingPage from './components/sharing-page/SharingPage';
import { useEffect } from 'react';
import consumer from './helper/consumer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {

  useEffect(() => {
    const subscription = consumer.subscriptions.create('VideosSharingChannel', {
      received(data) {
        toast.success(`New video is shared by ${data.email} - Title: ${data.video}`);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="m5 p-5">
      <ToastContainer />
      <Header></Header>
      <Routes>
        <Route path="/" element={<SharedVideos />} />
        <Route path="/share" element={<SharingPage />} />
      </Routes>
    </div>
  );
}

export default App;
