import { View, Text, Image, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addToCart, decrementValue, incrementValue, removeFromCart } from './redux/action'
import { useDispatch, useSelector } from 'react-redux'

const Product = (props) => {
    const item = props.item
    const [availableItem, setAvailableItem] = useState(item)
    const dispatch = useDispatch()
    const [isAdded, setIsAdded] = useState(false)

    const cartItems = useSelector(state => state.reducer)
    const productItems = useSelector(state => state.addCountReducer);

    const handleAddToCart = (item) => {
        // console.warn(item);
        dispatch(addToCart(item))
    }

    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item.name));
    }

    const addItem = (itemVal) => {
        console.log('atem', itemVal)
        dispatch(incrementValue(itemVal))
    }

    const removeItem = (itemVal) => {
        console.log(itemVal)
        dispatch(decrementValue(itemVal))
    }

    useEffect(() => {
        console.log('productItems', productItems.available)
        setAvailableItem(productItems.available)
    }, [productItems])

    useEffect(() => {

        let result = cartItems.filter((element) => {
            return element.name === item.name
        })
        if(result.length){
            setIsAdded(true)
        }else{
            setIsAdded(false) 
        }
        // if(cartItems && cartItems.length){
        //     cartItems.forEach((element) =>{
        //         // console.warn(element)
        //         if(element.name===item.name){
        //             setIsAdded(true)
        //         }
        //     })
        // }
    }, [cartItems])

    return (
        <View style={{alignItems: 'center', borderBottomColor: 'orange', borderBottomWidth: 2, padding: 10}}>
            <Text style={{fontSize: 24}}>{item.name}</Text>
            <Text style={{fontSize: 24}}>{item.price}</Text>
            <Text style={{fontSize: 24}}>{item.color}</Text>
            <Text style={{fontSize: 24, color: 'red'}}>Avalable: {availableItem.available}</Text>
            <Image style={{width: 100, height: 100}} source={{uri: item.image}} />
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => addItem(availableItem)}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', marginRight: 10, borderWidth: 1, borderRadius: 50, padding: 5}}>+</Text>
                </TouchableOpacity>
                {isAdded ? 
                    <Button title="Remove To Cart" onPress={()=>handleRemoveFromCart(item) }/>
                : 
                    <Button title="Add To Cart" onPress={()=>handleAddToCart(item) }/>
                }
                <TouchableOpacity onPress={() => removeItem(availableItem)}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10, borderWidth: 1, borderRadius: 50, padding: 5}}>-</Text>
                </TouchableOpacity>            
            </View>
        </View> 
    )
}

export default Product