import React, { useState,useEffect,useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
  Modal
} from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icons

const SOCKET_SERVER_URL = 'https://socketio.herokuapp.com/'; // Demo Socket.IO server

export default function ChatScreen() {
  const dispatch = useDispatch();
  const chatData = useSelector(state => state.userInfo.chatData);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(chatData || []);
  const [showOptions, setShowOptions] = useState(false); // State to control option display
  const socketRef = useRef(null);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option) => {
    console.log('Option selected:', option);
    // Handle each option click, e.g., sending a message, opening settings, etc.
    setShowOptions(false); // Close options after selection
  };

  useEffect(() => {
    const loadMessages = async () => {
      const storedMessages = await AsyncStorage.getItem('messages');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    };

    loadMessages();

    socketRef.current = io(SOCKET_SERVER_URL);

    socketRef.current.on('message', msg => {
      handleIncomingMessage(msg);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleIncomingMessage = async msg => {
    const state = await NetInfo.fetch();

    const timestamp = new Date().toLocaleTimeString(); // Get current time

    const messageWithTime = { ...msg, timestamp };

    if (state.isConnected) {
      // If online, directly update messages
      setMessages(prevMessages => {
        const newMessages = [...prevMessages, messageWithTime];
        dispatch({ type: 'SET_CHAT_INFO', payload: newMessages });
        AsyncStorage.setItem('messages', JSON.stringify(newMessages));
        return newMessages;
      });
    } else {
      // If offline, store locally
      setMessages(prevMessages => {
        const newMessages = [...prevMessages, messageWithTime];
        AsyncStorage.setItem('messages', JSON.stringify(newMessages));
        return newMessages;
      });
    }
  };

  const sendMessage = async () => {
    if (message) {
      const timestamp = new Date().toLocaleTimeString(); // Get current time
      const msgObject = { message, sender_id: 'your_user_id', timestamp };

      const state = await NetInfo.fetch();
      if (state.isConnected) {
        socketRef.current.emit('message', msgObject);
        handleIncomingMessage(msgObject); // Update local state immediately
      } else {
        // Store locally if offline
        const newMessages = [...messages, msgObject];
        setMessages(newMessages);
        dispatch({ type: 'SET_CHAT_INFO', payload: newMessages });
        await AsyncStorage.setItem('messages', JSON.stringify(newMessages));
      }

      setMessage('');
    }
  };

  const isGoogleMapsLink = url => {
    const regex = /https:\/\/maps\.google\.com\/[^\s]+/;
    return regex.test(url);
  };

  const openGoogleMap = (url) => {
    Linking.openURL(url)
      .catch(err => console.error('Error opening map link: ', err));
  };

  const recodeVoice=()=>{
    dispatch({ type: 'SET_CHAT_INFO', payload: [''] });
  };

  const renderMessage = ({ item }) => {
    const isUserMessage = item.sender_id === 'your_user_id';

    const isMapLink = isGoogleMapsLink(item.message);
    const mapPreviewUrl = isMapLink
      ? `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(item.message.split("/@")[1].split(",")[0])},${encodeURIComponent(item.message.split("/@")[1].split(",")[1])}&zoom=15&size=400x400&markers=color:red%7Clabel:%7C${encodeURIComponent(item.message.split("/@")[1].split(",")[0])},${encodeURIComponent(item.message.split("/@")[1].split(",")[1])}&key=YOUR_GOOGLE_MAPS_API_KEY`
      : null;

    return (
      <View
        style={[
          styles.messageContainer,
          isUserMessage ? styles.userMessage : styles.serverMessage,
        ]}>
        <Text style={styles.messageText}>{item.message}</Text>
        {isMapLink && mapPreviewUrl ? (
          <TouchableOpacity
            style={styles.mapContainer}
            onPress={() => openGoogleMap(item.message)} // Open Google Maps link
          >
            <Image
              source={{ uri: mapPreviewUrl }}
              style={styles.mapPreview}
            />
            <Text style={styles.mapLink}>View on Maps</Text>
          </TouchableOpacity>
        ) : null}
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputSection}>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={toggleOptions}>
            <Icon name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            placeholderTextColor="#999"
          />
          {message ? (
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={recodeVoice}>
            <Icon name="microphone" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for options */}
      <Modal
        transparent={true}
        visible={showOptions}
        animationType="fade"
        onRequestClose={() => setShowOptions(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleOptionClick('Option 1')}>
              <Text style={styles.optionText}>Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleOptionClick('Option 2')}>
              <Text style={styles.optionText}>Option 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleOptionClick('Option 3')}>
              <Text style={styles.optionText}>Option 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleOptionClick('Option 4')}>
              <Text style={styles.optionText}>Option 4</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 25,
    width: 50,
    height: 50,
    marginHorizontal: 5,
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  input: {
    height: 40,
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  sendButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  messageContainer: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  serverMessage: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  mapContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  mapPreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  mapLink: {
    color: '#007AFF',
    marginTop: 5,
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'right',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',borderWidth:1
  },
  optionButton: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 18,
    color: '#007AFF',
  },
});
