import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, StyleSheet, Text, SafeAreaView, View, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { SERVER_URL } from '../../constants';
import { getRequestHeaders } from '../../utils/api';
import { getValueFor } from "../../utils/secureStore";

import BackButton from '../../components/buttons/BackButton';
import SendButton from "../../components/buttons/SendButton";
import Input from "../../components/inputs/Input";
import Message from "../../components/cards/Message";
import EmptyList from "../../components/cards/EmptyList";

import textStyle from '../../styles/text';
import colors from '../../styles/colors';

export default function ChatScreen({ navigation, route }) {
  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);
  const dms = useRef(null);

  const [userID, setUserID] = useState(null);
  const [username, setUsername] = useState('');

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  
  const socketUrl = '192.168.1.194:3000';
  const ws = useRef(new WebSocket(`ws://${socketUrl}/chat`)).current;
  const [websocket, setWebSocket] = useState(null);

  // TODO: - Tu bude nejake api volanie pre historiu sprav...
  // Load messages and user credentials 
  const loadData = async () => {
    const id = await getValueFor('_id');
    setUserID(id);
    setUsername(await getValueFor('username'));

    const demoMessages = [
      {
        from: id,
        to: route.params.owner._id,
        time: '2022-05-06T18:00:00.473Z',
        message: 'Ahojky 🤪'
      },
      {
        from: route.params.owner._id,
        to: id,
        time: '2022-05-06T18:03:00.473Z',
        message: 'Ahoj 🧐'
      },
      {
        from: route.params.owner._id,
        to: id,
        time: '2022-05-06T18:20:19.473Z',
        message: 'Hahahahah hihihi'
      },
      {
        from: id,
        to: route.params.owner._id,
        time: '2022-05-06T18:23:19.473Z',
        message: 'Hahaaha hihihi'
      },
    ];
    setMessages([...demoMessages]);
    setLoading(false);
  };

  // TODO: - sfunkcnit, v zasade to asi bude skoro rovnake ako loadData()
  // Fetch new messages 
  const updateMessages = async () => {
    const newMessages = [];
    setMessages([...messages, ...newMessages]);
    setRefreshing(false);
  };

  // TODO: - sfunkcnit
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

  useEffect(() => {
    loadData();
    //connectSocket();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    updateMessages();
  };

  // TODO: - sfunkcnit
  // Send new message
  const sendMessage = () => {
    //ws.send(message);
    const newMessage = {
      from: userID,
      to: route.params.owner._id,
      time: new Date(Date.now()),
      message: messageText
    };
    //console.log(newMessage)
    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  const renderMessages = ({ item }) => (
    <Message 
      time={item.time}
      style={item.from === userID ? styles.myMessage : styles.otherMessage}
      text={item.message}
      color={item.from === userID ? colors.lightBlue : colors.lightGrey}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton action={() => {
          //ws.close();
          navigation.goBack();
        }}/>
        <Text style={[textStyle.h1, styles.heading]}>{`Your chat with ${route.params.owner.name.first_name}`}</Text>
      </View>
      <FlatList
        data={messages}
        ref={dms}
        renderItem={renderMessages}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        keyExtractor={(item, index) => index}
        contentContainerStyle={styles.messageContainer}
        ListEmptyComponent={!isLoading && <EmptyList text={'You have no messages'}/>}
        onContentSizeChange={() => dms.current.scrollToEnd() }
        onLayout={() => dms.current.scrollToEnd() }
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.messageInput}>
          <Input placeholder={'Message'} 
            value={messageText}
            onChangeText={text => setMessageText(text)}
            width={260}
          />
          <SendButton
            action={() => sendMessage()}
          />
        </View>
      </KeyboardAvoidingView>
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
  messageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  myMessage: {
    marginRight: 17,
    // marginLeft: 17,
    alignSelf: 'flex-end',
    marginBottom: 14
  },  
  otherMessage: {
    marginLeft: 17,
    // marginRight: 17,
    alignSelf: 'flex-start',
    marginBottom: 14
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 10,
    paddingBottom: 20,
    borderTopColor: colors.lightGrey,
    borderTopWidth: 1,
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
