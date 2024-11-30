import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConversationSidebar = ({ navigation, userName }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    const storedConversations = await AsyncStorage.getItem('conversations');
    if (storedConversations) {
      setConversations(JSON.parse(storedConversations));
    }
  };

  const handleSelectConversation = (conversation) => {
    navigation.navigate('Chat', { selectedConversation: conversation });
  };

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectConversation(item)} style={styles.conversationItem}>
      <Text style={styles.conversationTitle}>Chat del {item.date}</Text>
      <Text numberOfLines={1} style={styles.conversationSnippet}>{item.messages[0]?.text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.sidebarContainer}>
      <Text style={styles.title}>Hola, {userName}</Text>
      <Text style={styles.subtitle}>Tus Conversaciones</Text>
      <FlatList
        data={conversations}
        renderItem={renderConversationItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 20,
  },
  conversationItem: {
    padding: 10,
    borderBottomColor: '#E9ECEF',
    borderBottomWidth: 1,
  },
  conversationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343A40',
  },
  conversationSnippet: {
    fontSize: 14,
    color: '#6C757D',
  },
});

export default ConversationSidebar;
