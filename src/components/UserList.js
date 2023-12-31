import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserList } from './redux/action';

const UserList = () => {
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.reducer)

    useEffect(() => {
        dispatch(getUserList())
    }, [])

    console.warn("userList,", userList[0])

    return (
        <View style={{flex: 1}}>
            { 
                userList.length ? 
                userList.map((item) => (<Text style={{fontSize: 16, color: 'red'}}>{item.firstName}</Text>)) 
                : null
            }
        </View>
    )
}

export default UserList