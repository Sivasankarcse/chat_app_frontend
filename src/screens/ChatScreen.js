import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Contacts from '../components/Contacts';
import { io } from "socket.io-client";
import { allUsersRoute } from '../utils/APIRoutes';
import axios from 'axios';
import {API_HOST} from '@env';

const ChatScreen = ({navigation}) => {
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined)
    const [isContactAvailable, setIsContactAvailable] = useState(false)

    const callLogout = async() => {
        try {
            await AsyncStorage.removeItem("currentUser");
            navigation.navigate("Login");
        } catch(err){
            console.log("im reomve item catach", err)
        }
    }

    useEffect(() => {
        const navigationTo = async () => {
            const currentUsr = await AsyncStorage.getItem("currentUser")
            if(currentUsr){
                const usr = await AsyncStorage.getItem("currentUser")
                setCurrentUser(await JSON.parse(usr));
                setIsContactAvailable(true);
            } else {
                navigation.navigate("Login");
            }
        }
        navigationTo();
    }, [])

    useEffect(()=>{
        if(currentUser){
          socket.current = io(API_HOST);
          socket.current.emit("add-user", currentUser._id);
        }
    },[currentUser]);

    useEffect( () => {
        const getCurrentUser = async()=>{
          if(currentUser)  {
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(data.data);
          }
        }
        getCurrentUser();
    }, [currentUser]);

    const handleChatChange = (chat) =>{
        navigation.navigate("chatContainer", {
            "currentChat": chat, 
            "socket": socket.current, 
            "currentUser": currentUser,
        })
    }

    return (
        <View>
            <TouchableOpacity
                onPress={callLogout}
                style={{alignItems: 'flex-end', padding: 15}}
            >
                <Text style={{fontSize: 14, fontWeight: 'bold', paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'orange', borderWidth: 1, borderColor: 'lightgray', borderRadius: 10}}>Logout</Text>
            </TouchableOpacity>

            { !isContactAvailable && <ActivityIndicator size="large" color="#00ff00" /> }
            { isContactAvailable && <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} /> }
        </View>
    )
}

export default ChatScreen