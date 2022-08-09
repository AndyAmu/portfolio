import './App.css';
import ResponsiveAppBar from './component/Natbar'
import ScrollToTop from "react-scroll-to-top";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Header from './component/Header'
import Footer from './component/Footer'

function App() {
  return (
    <>
      <Header />
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
