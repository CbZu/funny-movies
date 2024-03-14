// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Header from './components/header/Header';
import SharedVideos from './components/shared-videos/SharedVideos';
import { Route, Routes } from 'react-router-dom';
import SharingPage from './components/sharing-page/SharingPage';

export function App() {
  return (
      <div className="m5 p-5">
        <Header></Header>
        <Routes>
          <Route
            path="/"
            element={<SharedVideos/>}
          />
          <Route
            path="/share"
            element={<SharingPage/>}
          />
        </Routes>
      </div>
  );
}

export default App;
