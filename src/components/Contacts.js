import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const Contacts = ({ contacts, currentUser, changeChat }) => {

    const changeCurrentChat = (index, contact) => { 
        // setCurrentSelected(index);
        changeChat(contact);
    };

    const renderItem = (contact, index) => {
        // console.log('contactUsername', contact.item.username)
        // console.log('contactIndex', contact.index)
        return (
            <TouchableOpacity key={contact.item._id} onPress={()=>changeCurrentChat(contact.index,contact.item)}>
                <View style={{flexDirection: 'row', marginVertical: 13}}>
                    <Ionicons
                        name='person-circle-outline'
                        size={45}
                        color='black'
                        style={styles.cavatar}
                    />
                    <View style={styles.crightContainer}>
                        <View>
                            <Text style={styles.cusername}>{contact.item.username}</Text>
                            <Text style={styles.cmessage}>
                                {contact?.item?.text ? contact?.item?.text : "Tap to start chatting"}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.ctime}>
                                {contact?.item?.time ? contact?.item?.time : "now"}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.chatlistContainer}>
            {contacts.length > 0 ? (
                <FlatList
                    data={contacts}
                    renderItem={(val, index) => renderItem(val, index)}
                    // renderItem={({ item }) => <ChatComponent item={item} currentUser={currentUser}/>}
                    keyExtractor={(item) => item._id}
                />
            ) : (
                <View style={styles.chatemptyContainer}>
                    <Text style={styles.chatemptyText}>Please Add New Friends!</Text>
                </View>
            )}
        </View>
    )
}


export default Contacts

const styles = StyleSheet.create({
    chatscreen: {
        backgroundColor: "#F7F7F7",
        flex: 1,
        padding: 10,
        position: "relative",
    },
    chatheading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "green",
    },
    chattopContainer: {
        backgroundColor: "#F7F7F7",
        height: 70,
        width: "100%",
        padding: 20,
        justifyContent: "center",
        marginBottom: 15,
        elevation: 2,
    },
    chatheader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    chatlistContainer: {
        paddingHorizontal: 10,
    },
    chatemptyContainer: {
        width: "100%",
        height: "80%",
        alignItems: "center",
        justifyContent: "center",
    },
    chatemptyText: { 
        fontWeight: "bold", 
        fontSize: 24, 
        paddingBottom: 30 
    },
    cchat: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        height: 80,
        marginBottom: 10,
    },
    cavatar: {
        marginRight: 15,
    },
    cusername: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "bold",
    },
    cmessage: {
        fontSize: 14,
        opacity: 0.7,
    },
    crightContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    },
    ctime: {
        opacity: 0.5,
    },
})