import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat';
import UserOptions from './UserOptions';

export default function ChatScreen({ userName }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showOptions, setShowOptions] = useState(true);

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

    const formattedMessages = [...messages, userMessage].map(msg => ({
      role: msg.user._id === 1 ? "user" : "assistant",
      content: msg.text,
    }));

    const allMessages = [
      {
        role: "system",
        content: `Tu nombre es Medichat y un mensaje de bienvenida amigable corto, eres un asistente Médico que realizas diagnósticos para la atención primaria de la salud, intenta dar respuestas con recomendaciones y siempre avisa al usuario si requiere que asista al médico lo antes posible en caso de ser necesario. El nombre del usuario es ${userName}.`
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
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: allMessages
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const botResponse = data.choices[0].message.content.trim();
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
          <Text style={styles.infoText}>Medichat podría cometer errores, por favor validar información importante</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{
            flex: 1, marginLeft: 10, marginBottom: 5, backgroundColor: 'white', borderRadius: 15, borderColor: 'grey',
            borderWidth: 1, height: 40, marginRight: 10, paddingLeft: 10, justifyContent: 'center'
          }}>
            <TextInput placeholder='Describe tus síntomas' onChangeText={handleTextInput} value={inputMessage} />
          </View>

          <TouchableOpacity onPress={handleButtonClick}>
            <View style={{ borderRadius: 9999, backgroundColor: 'black', padding: 5, marginRight: 10, marginBottom: 20, width: 50, justifyContent: 'center', height: 40 }}>
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
