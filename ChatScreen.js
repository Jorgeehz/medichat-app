import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat';
import { TypingAnimation } from 'react-native-typing-animation'; // Importar el componente de animación
import UserOptions from './UserOptions';


export default function ChatScreen({ userName }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  const [loading, setLoading] = useState(false); // Estado para controlar la animación

  const handleButtonClick = () => {
    if (inputMessage.trim() === "") {
      return;
    }
    sendMessage(inputMessage);
    setInputMessage("");
    setShowOptions(false);
  };

  const sendMessage = (messageText) => {
    const userMessage = {
      _id: Math.random().toString(36).substring(7),
      text: messageText,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: userName,
        avatar: 'https://placeimg.com/140/140/any',
      },
    };

    setMessages(previousMessages => GiftedChat.append(previousMessages, [userMessage]));
    setLoading(true); // Iniciar la animación

    // Añadir el mensaje de "escribiendo..."
    const typingMessage = {
      _id: 'typing',
      text: 'Escribiendo...',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Medichat',
        avatar: require('./assets/medichat.png'),
      }
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, [typingMessage]));

    const formattedMessages = [...messages, userMessage].map(msg => ({
      role: msg.user._id === 1 ? "user" : "assistant",
      content: msg.text,
    }));

    const allMessages = [
      {
        role: "system",
        content: `Tu nombre es PsicoChat. Eres un asistente Médico virtual experto en temas de salud mental. Tu objetivo es ayudar a los usuarios con sus problemas y diagnosticarle alguna posible enfermedad mental. Responde de manera clara, tono amigable y acogedor. Si un usuario hace una pregunta que no esté relacionada con Salud Mental, responde diciendo que solo estas apto para temas de Salud Mental. Si no tienes claro lo que el usuario está diciendo, pide más información para responder con más precisión. Este es el nombre del usuario ${userName}.`
      },
      ...formattedMessages,
      {
        role: "user",
        content: messageText
      }
    ];

    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'',
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: allMessages
      })
    })
    .then(response => response.json())
    .then(data => {
      setLoading(false); 
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const botResponse = data.choices[0].message.content.trim();
        setMessages(previousMessages => previousMessages.filter(msg => msg._id !== 'typing'));

        const botMessage = {
          _id: Math.random().toString(36).substring(7),
          text: botResponse,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Medichat',
            avatar: require('./assets/medichat.png'),
          }
        };

        setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
      } else {
        console.error('Invalid response structure:', data);
      }
    })
    .catch(error => {
      setLoading(false);
      setMessages(previousMessages => previousMessages.filter(msg => msg._id !== 'typing'));
      console.error('Error:', error);
    });
  };

  const handleTextInput = (text) => {
    setInputMessage(text);
  };

  const handleOptionSelect = (optionText) => {
    sendMessage(optionText);
    setShowOptions(false); 
  };

  return (
    <ImageBackground source={require('./assets/bg3-1.png')} resizeMode='cover' style={{ flex: 1, width: "100%", height: "100%" }}>
      <View style={{ flex: 1 }}>
        {showOptions && <UserOptions userName={userName} onOptionSelect={handleOptionSelect} />}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <GiftedChat messages={messages} renderInputToolbar={() => { }} user={{ _id: 1 }} minInputToolbarHeight={0} />
        </View>

        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Text style={styles.infoText}>PsicoChat podría cometer errores, por favor validar información importante</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{
            flex: 1, marginLeft: 10, marginBottom: 5, backgroundColor: 'white', borderRadius: 15, borderColor: 'grey',
            borderWidth: 1, height: 40, marginRight: 10, paddingLeft: 10, justifyContent: 'center'
          }}>
            <TextInput placeholder='Describe tus síntomas' onChangeText={handleTextInput} value={inputMessage} />
          </View>

          <TouchableOpacity onPress={handleButtonClick}>
            <View style={{ borderRadius: 9999, backgroundColor: '#F08080', padding: 5, marginRight: 10, marginBottom: 20, width: 50, justifyContent: 'center', height: 40 }}>
              <MaterialIcons name="send" size={24} color="white" style={{ marginLeft: 10 }} />
            </View>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  infoText: {
    fontSize: 12,
    color: 'grey',
    marginBottom: 4,
    fontStyle: 'italic',
    marginLeft: 5,
    textAlign: 'center',
    justifyContent: 'center'
  }
});
