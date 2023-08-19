import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import axios from 'axios';
import { Feather, AntDesign } from '@expo/vector-icons'; 

const ChatContainer = (props) => {
    const [messages, setMessages] = useState([]);
    const [typeMsg, setTypeMsg] = useState(undefined);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();
    const currentChat = props?.route?.params?.currentChat
    const currentUser = props?.route?.params?.currentUser
    const socket = props?.route?.params?.socket

    useEffect(() => {
        const fetchData = async () => {
            if(currentChat){
                const response = await axios.post(getAllMessagesRoute, {
                    from: currentUser?._id,
                    to: currentChat?._id,
                });
                setMessages(response.data);
            }
        }
        fetchData();
    }, []);

    const handleSendMsg = async(msg) => {
        setTypeMsg("")

        const sendVal = {
            from: currentUser?._id,
            to: currentChat?._id,
            message: msg,
            hour: new Date().getHours(),
            mins: new Date().getMinutes()
        }
        socket.emit("send-msg", sendVal);

        await axios.post(sendMessageRoute, sendVal)
      
        const msgs = [...messages];
        msgs.push({
            fromSelf: true,
            message: msg,
            hour: new Date().getHours(),
            mins: new Date().getMinutes()
        });
        setMessages(msgs);
    }

    useEffect(() => {
        if(socket) {
          socket.on("msg-recieved", (msgData) => {
            if(currentChat?._id == msgData?.from_id){
                setArrivalMessage({
                    fromSelf: false,
                    message: msgData?.received_msg,
                    hour: new Date().getHours(),
                    mins: new Date().getMinutes()
                });
            }
          })
        }
    }, []);
    
    useEffect(()=>{
        arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage]);
    },[arrivalMessage]);

    const renderItem = (val, index) => {
        const status = val?.item?.fromSelf;
        return (
            <View
                style={
                    status
                        ? [styles.mmessageWrapper, { alignSelf: "flex-end", backgroundColor: "#ADD8E6" }]
                        : [styles.mmessageWrapper, { alignSelf: "flex-start", backgroundColor: "#ededed" }]
                }
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                        style={
                            status
                                ? styles.mmessage
                                : [styles.mmessage]
                        }
                    >
                        <Text>{val.item.message}</Text>
                    </View>
                </View>
                <Text style={
                    status
                    ? {alignSelf: 'flex-end', marginLeft: 40, fontSize: 12, color: 'gray' }
                    : {alignSelf: 'flex-start'}
                }>{val.item.hour}:{val.item.mins}</Text>
            </View>
        )
    }
    return (
        <View style={styles.chatContainer}>
                {messages ? (
                    <FlatList
                        data={messages}
                        renderItem={(val, index) => renderItem(val, index)}              
                        keyExtractor={(item, index) => {
                            return index.toString();
                        }}   
                    />
                ) : <Text>Empty Msgs</Text>}
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={{flex: 1, justifyContent: 'flex-end'}}
                    keyboardVerticalOffset={64}
                >
                <View style={styles.messaginginputContainer}>
                    <TouchableOpacity
                        style={{alignSelf: 'center', width: "10%", justifyContent: 'center'}}
                        onPress={() => handleSendMsg(typeMsg)}
                    >
                        <AntDesign name="plus" size={24} color="black" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.messaginginput}
                        onChangeText={(value) => setTypeMsg(value)}
                        value={typeMsg}
                    />
                    <TouchableOpacity
                        style={styles.messagingbuttonContainer}
                        onPress={() => handleSendMsg(typeMsg)}
                    >
                        <Feather name="send" size={20} color="#f2f0f1" />
                    </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
        </View>
    )
}

export default ChatContainer

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
    },
    messaginginputContainer: {
        width: "100%",
        minHeight: 100,
        backgroundColor: "white",
        paddingVertical: 30,
        paddingHorizontal: 15,
        justifyContent: "center",
        flexDirection: "row",
    },
    messaginginput: {
        width: "80%",
        borderWidth: 1,
        padding: 6,
        // flex: 2,
        marginRight: 10,
        borderRadius: 10,
    },
    messagingbuttonContainer: {
        width: "10%",
        backgroundColor: "green",
        borderRadius: 3,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
    },
    mmessageWrapper: {
        marginTop: 4,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 6,
        marginVertical: 1,
        backgroundColor: 'lightgray',
    }
})