import React, { useState } from 'react';
import WelcomeScreen from './WelcomesScreen';
import ChatScreen from './ChatScreen';

export default function App() {
  const [userName, setUserName] = useState('');
  const [isWelcomeScreenVisible, setIsWelcomeScreenVisible] = useState(true);

  const handleNameSubmit = (name) => {
    setUserName(name);
    setIsWelcomeScreenVisible(false);
  };

  return (
    isWelcomeScreenVisible ? (
      <WelcomeScreen onNameSubmit={handleNameSubmit} />
    ) : (
      <ChatScreen userName={userName} />
    )
  );
}
