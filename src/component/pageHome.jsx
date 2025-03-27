import React from 'react';
import Body from './Body';

const PageHome = ({ socket, messages, setMessages, chatType, setChatType }) => {
  console.log('PageHome rendering'); // Debug log
  return (
    <>
      <Body
        socket={socket}
        messages={messages}
        setMessages={setMessages}
        chatType={chatType}
        setChatType={setChatType}
      />
    </>
  );
};

export default PageHome;