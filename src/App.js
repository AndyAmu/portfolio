import './App.css';
import ResponsiveAppBar from './component/Natbar'
import ScrollToTop from "react-scroll-to-top";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Footer from './component/Footer'
import { Routes, Route } from 'react-router-dom'
import Pagehome from './component/pageHome';


function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Pagehome />} />
      </Routes>
      <ResponsiveAppBar />
      <Footer />
      <ScrollToTop
        style={{ backgroundColor: 'white', opacity: '70%', width: '50px', height: '50px' }}
        smooth
        viewBox="0 0 24 24"
        component={<FileUploadIcon />} />
    </>
  );
}

export default App;
