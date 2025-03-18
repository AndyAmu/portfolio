import './App.css';
import ResponsiveAppBar from './component/Natbar'
import ScrollToTop from "react-scroll-to-top";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Footer from './component/Footer'
import { Routes, Route } from 'react-router-dom'
import PageHome from './component/pageHome';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  console.log('App rendering'); // Debug log
  return (
    <LanguageProvider>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<PageHome />} />
      </Routes>
      <Footer />
      <ScrollToTop
        style={{ backgroundColor: 'white', opacity: '50%', width: '30px', height: '30px' }}
        smooth
        viewBox="0 0 24 24"
        component={<FileUploadIcon />} 
      />
    </LanguageProvider>
  );
}

export default App;
