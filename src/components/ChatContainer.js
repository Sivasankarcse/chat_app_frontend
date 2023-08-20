import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, ScrollView, Image, Platform } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import axios from 'axios';
import { Feather, AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const ChatContainer = (props) => {
    const navigation = useNavigation()
    const [messages, setMessages] = useState([]);
    const [typeMsg, setTypeMsg] = useState(undefined);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollViewRef = useRef();
    const currentChat = props?.route?.params?.currentChat
    const currentUser = props?.route?.params?.currentUser
    const socket = props?.route?.params?.socket

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => (
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Image 
                        source={{ uri: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" }}
                        style={{height: 40, width: 40, borderRadius: 50}}
                    />
                    <View style={{alignItems: 'center'}}>
                        <Text
                            {...props}
                            style={{color: 'white', fontWeight: 'bold', fontSize: 16, marginLeft: 10}}>
                            {currentChat?.username}
                        </Text>
                        <Text style={{fontSize: 12, color: 'white'}}>Online</Text>
                    </View>
                </View>
              ),
              headerStyle: {
                backgroundColor: '#f4511e', //Set Header color
            },
        })
    }, [navigation])

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
                    ? {alignSelf: 'flex-end', marginLeft: 40, fontSize: 11, color: 'gray', marginTop: 4 }
                    : {alignSelf: 'flex-start', marginTop: 2, fontSize: 11, color: 'gray',}
                }>{val.item.hour}:{val.item.mins}</Text>
            </View>
        )
    }
    return (
        <View style={styles.chatContainer}>
                {messages ? (
                    <ScrollView 
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}                
                        style={{height: "70%"}}
                    >
                        <FlatList
                            data={messages}
                            renderItem={(val, index) => renderItem(val, index)}              
                            keyExtractor={(item, index) => {
                                return index.toString();
                            }}   
                        />
                    </ScrollView>
                ) : <Text>Empty Msgs</Text>}
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={{flex: 1, justifyContent: 'flex-end'}}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 55: 0}
                >
                <View style={styles.messaginginputContainer}>
                    <TouchableOpacity
                        style={{alignSelf: 'center', justifyContent: 'center', width: "8%"}}
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
        backgroundColor: 'green'
    },
    messaginginputContainer: {
        paddingBottom: "12%",
        // paddingTop: "10%",
        // marginBottom: "10%",
        // flex: 1,
        padding: 10,
        width: "100%",
        height: 100,
        backgroundColor: "white",
        // paddingVertical: 30,
        // paddingHorizontal: 15,
        justifyContent: "center",
        flexDirection: "row",
    },
    messaginginput: {
        width: "80%",
        borderWidth: 1,
        padding: 6,
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
        paddingHorizontal: 8,
        borderRadius: 6,
        padding: 3,
        marginVertical: 1,
        backgroundColor: 'lightgray',
    }
})