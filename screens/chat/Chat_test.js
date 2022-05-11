import React, { Component, useRef } from "react";
import { ScrollView, ActivityIndicator, StyleSheet, Text, SafeAreaView, View, FlatList, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import io from "socket.io-client";
import { SERVER_URL } from "../../constants"

import { getValueFor, loadSecure } from "../../utils/secureStore";
import { getRequestHeaders } from "../../utils/api";

import BackButton from '../../components/buttons/BackButton';
import SendButton from "../../components/buttons/SendButton";
import Input from "../../components/inputs/Input";
import Message from "../../components/cards/Message";
import EmptyList from "../../components/cards/EmptyList";

import textStyle from '../../styles/text';
import colors from '../../styles/colors';

// source: https://github.com/Hyllesen/TaxiApp/tree/01_SocketIoChat
export default class ChatScreenTest extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: [],
      userID: null,
      contactID: null,
      roomName: null
    };
  }

  async getUserID() {
    const id = await getValueFor('_id');
    const userID = id.replace(/['"]+/g, '');
    this.setState({ userID: userID });
  }

  async setContactID() {
    this.setState({ contactID: this.props.route.params._id });
  }

  async getOlderMessages(){
    const requestHeaders = await getRequestHeaders();
    const endpoint = `${SERVER_URL}/chat?user1=${this.state.userID}&user2=${this.state.contactID}`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: requestHeaders
    });
    const messages = await response.json();
    this.setState({ chatMessages: messages });
  }
  
  async componentDidMount() {
    this._isMounted = true;
    try{
      await this.getUserID();
      await this.setContactID();
      await this.getOlderMessages();
    }catch(err){
      console.log("error: ", err);
    }

    this.socket = io(SERVER_URL);
    
    var user1 = "";
    var user2 = "";
    if(this.state.userID > this.state.contactID){
      user1 = this.state.userID;
      user2 = this.state.contactID;
    }else{
      user1 = this.state.contactID;
      user2 = this.state.userID;
    }

    const roomName = `${user1}_${user2}`;

    this.setState({ roomName: roomName });

    this.socket.emit("join_room", {
      room_name: roomName
    });

    this.socket.on("message", msg => {
        //console.log("received message: ", msg);
        //const msgText = msg.message;
        this.setState({ chatMessages: [...this.state.chatMessages, msg] });
    });
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  leaveRoom(){
    this.socket.emit("leave_room", {
      room_name: this.state.roomName
    });
    this.socket.disconnect();
  }
  
  async submitChatMessage() {
    if(this.state.chatMessage !== ""){
      const newMessage = {
          from: this.state.userID,
          to: this.state.contactID,
          time: new Date(Date.now()),
          message: this.state.chatMessage
      };


      // sends the message object to socket server
      this.socket.emit("message", {
        roomName: this.state.roomName,
        message: newMessage
      });

      const auth = (await loadSecure()).auth;
      const endpoint = `${SERVER_URL}/chat`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': auth
        },
        body: JSON.stringify(newMessage)
      });

      if(response.status == 201){
        console.log("message saved");
      }else{
        console.log("error: ", response.status);
      }
      this.setState({ chatMessage: "" });
      }
  }

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      //<Text key={chatMessage}>{chatMessage.message}</Text>
      <Message
        key={chatMessage.time}
        time={chatMessage.time}
        style={chatMessage.from === this.state.userID ? styles.myMessage : styles.otherMessage}
        text={chatMessage.message}
        color={chatMessage.from === this.state.userID ? colors.lightBlue : colors.lightGrey}
        />
    ));

    return (
      <SafeAreaView style={styles.container}>
        <BackButton action={() => {
          this.leaveRoom();
          this.props.navigation.goBack();
        }}/>
        <Text style={[styles.heading, textStyle.h2]}>Your chat with {this.props.route.params.username}</Text>
        <ScrollView ref={(scroll) => {this.scroll = scroll;}}>
            {chatMessages}
        </ScrollView>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.messageInput}>
                <Input placeholder={'Message'} 
                    value={this.state.chatMessage}
                    onChangeText={chatMessage => {
                        this.setState({ chatMessage });
                    }}
                    width={260}
                />
                <SendButton
                    action={() => {
                        this.submitChatMessage();
                        Keyboard.dismiss();
                    }}
                />
            </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#F5FCFF"
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
  },
  heading: {
    marginLeft: 30,
    marginBottom: 20
  }
});