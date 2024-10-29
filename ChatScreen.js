import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, ImageBackground, StatusBar, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import UserOptions from './UserOptions';

export default function ChatScreen({ userName }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);


    const typingMessage = {
      _id: 'typing',
      text: 'Escribiendo...',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: '',
        avatar: require('./assets/LogoPsico.jpg'),
      }
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, [typingMessage]));

    
    fetch('https://47d9-181-78-0-62.ngrok-free.app/predict', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: messageText
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const userPrediction = data.responses; 

      console.log('Predicción:', userPrediction);
      
      
      const formattedMessages = [...messages, userMessage].map(msg => ({
        role: msg.user._id === 1 ? "user" : "assistant",
        content: msg.text,
      }));

      const allMessages = [
        {
          role: "system",
          content: `Tu nombre es PsicoChat, eres un asistente virtual que ayuda a las personas en el ámbito de Salud Mental. Tratas de manera amigable al usuario en cada interacción. Solo hablas de temas de Salud Mental. El nombre del usuario es ${userName}. Utiliza esta información que está basada en experiencias previas reales para mejorar tus respuestas. ${userPrediction}`,
        },
        ...formattedMessages,
        {
          role:"assistant",
          content: `Recuerda que te llamas PsicoChat. Recuerda que debes tener en cuenta estas recomendaciones para responder al usuario ${userPrediction}`
        }
      ];

   
      return fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ',
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: allMessages
        })
      });
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
            name: 'PsicoChat',
            avatar: require('./assets/LogoPsico.jpg'),
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

  const renderCustomBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: styles.leftBubble,
          right: styles.rightBubble,
        }}
        textStyle={{
          left: styles.leftText,
          right: styles.rightText,
        }}
        timeTextStyle={{
          left: styles.leftTime,
          right: styles.rightTime,
        }}
        renderMessage={(messageProps) => {
          return (
            <View style={styles.messageContainer}>
              {messageProps.currentMessage.user._id === 2 && (
                <View style={styles.botContainer}>
                  <Image
                    source={require('./assets/LogoPsico.jpg')} 
                    style={styles.botAvatar}
                  />
                  <Text style={styles.botText}>
                    {messageProps.currentMessage.text}
                  </Text>
                </View>
              )}
            </View>
          );
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {showOptions && <UserOptions userName={userName} onOptionSelect={handleOptionSelect} />}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <GiftedChat
          messages={messages}
          renderInputToolbar={() => { }}
          user={{ _id: 1 }} 
          minInputToolbarHeight={0}
          renderBubble={renderCustomBubble} 
        />
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
          <View style={{ borderRadius: 9999, backgroundColor: '#78b9bd', padding: 5, marginRight: 10, marginBottom: 20, width: 50, justifyContent: 'center', height: 40 }}>
            <MaterialIcons name="send" size={24} color="white" style={{ marginLeft: 10 }} />
          </View>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  infoText: {
    fontSize: 12,
    color: 'grey',
    marginBottom: 4,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginLeft: 5,
    textAlign: 'center',
    justifyContent: 'center'
  },
  leftBubble: {
    backgroundColor: '#A2D9CE',
    borderRadius: 10,
    padding: 1,
  },
  rightBubble: {
    backgroundColor: '#CFF4D2',
    borderRadius: 10,
    padding: 1,
  },
  leftText: {
    color: '#333333',
    fontSize: 16,
  },
  rightText: {
    color: '#4A4A4A',
    fontSize: 16,
  },
  leftTime: {
    color: 'grey',
    fontSize: 12,
  },
  rightTime: {
    color: 'grey',
    fontSize: 12,
  }
  
});
