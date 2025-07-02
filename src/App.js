import './App.css';
import ResponsiveAppBar from './component/Natbar';
import ScrollToTop from 'react-scroll-to-top';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Footer from './component/Footer';
import { Routes, Route } from 'react-router-dom';
import PageHome from './component/pageHome';
import { LanguageProvider } from './context/LanguageContext';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

// URL del backend (en producción será la URL de Render.com)
const ENDPOINT = process.env.REACT_APP_API_URL || '';

function App() {
  console.log('App rendering'); // Debug log

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatType, setChatType] = useState('local'); // Tipo de chat por defecto

  useEffect(() => {
    // Inicializar conexión con Socket.io
    const newSocket = io(ENDPOINT || window.location.origin, {
      withCredentials: true,
    });
    setSocket(newSocket);

    // Escuchar eventos del servidor
    newSocket.on('chat message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on('chat cleared', () => {
      setMessages([]);
    });

    // Limpiar la conexión al desmontar el componente
    return () => newSocket.close();
  }, []);

  return (
    <LanguageProvider>
      <ResponsiveAppBar />
      <Routes>
        <Route
          path="/"
          element={
            <PageHome
              socket={socket}
              messages={messages}
              setMessages={setMessages}
              chatType={chatType}
              setChatType={setChatType}
            />
          }
        />
      </Routes>
      <Footer />
      <ScrollToTop
        style={{ 
          backgroundColor: 'white', 
          opacity: '50%', 
          width: '30px', 
          height: '30px',
          bottom: '70px' // Aumentado de 40px a 70px para que no quede debajo del menú
        }}
        smooth
        viewBox="0 0 24 24"
        component={<FileUploadIcon />}
      />
    </LanguageProvider>
  );
}

export default App;