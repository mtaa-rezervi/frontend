import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, StyleSheet, Text, SafeAreaView, View, ScrollView} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { getRequestHeaders } from '../../utils/api';
import { getValueFor } from "../../utils/secureStore";

import BackButton from '../../components/buttons/BackButton';
import StandardButton from "../../components/buttons/StandardButton";
import Input from "../../components/Input";

import textStyle from '../../styles/text';
import colors from '../../styles/colors';
import { SERVER_URL } from '../../constants';

export default function ChatScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  
  const socketUrl = '192.168.1.194:3000';
  const ws = useRef(new WebSocket(`ws://${socketUrl}/chat`)).current;
  const [websocket, setWebSocket] = useState(null);

  const connectSocket = async () => {
    //const socketUrl = '192.168.1.194:3000';
    //const ws = new WebSocket(`ws://${socketUrl}/chat`);
    //setWebSocket(ws);

    const serverMessagesList = [];
    const username = await getValueFor('username');

    ws.onopen = () => {
      console.log('Room opened');
      ws.send(JSON.stringify({ username: username }));
    };

    ws.onmessage = (message) => {
      serverMessagesList.push(message.data);
      setMessages([...serverMessagesList])
      console.log(messages)
    };
  };

  const sendMessage = () => {
    ws.send(message);
    //ws.send(message);
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton action={() => {
          websocket.close();
          navigation.goBack();
        }}/>
        <Text style={[textStyle.h1, styles.heading]}>Chat</Text>
      </View>
      <View style={styles.messageInput}>
        <Input placeholder={'message'} 
          value={message}
          onChangeText={text => setMessage(text)}
        />
        <StandardButton
          action={() => { 
            sendMessage();
            setMessage(''); 
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingBottom: 5,
    marginBottom: 10
  },
  heading: {
    marginRight: 30,
    marginLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageInput: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    opacity: 0.8
  }
});
