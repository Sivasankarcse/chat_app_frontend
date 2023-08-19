import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Header = () => {

    const cartData = useSelector((state) => state.reducer);
    const [cartItems, setCartItems] = useState(0)

    useEffect(() => {
        setCartItems(cartData.length)
    }, [cartData])

    return (
        <View style={{}}>
            <View style={{fontSize: 20, textAlign: 'right', padding: 15, backgroundColor: 'orange'}}>
                <View style={{backgroundColor: "yellow", borderRadius: 15, height: 40, width: 40, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20}}>{cartItems}</Text> 
                </View>
            </View>
        </View>
    )
}

export default Header