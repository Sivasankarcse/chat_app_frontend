import { ADD_TO_CART, DECREMENT_VALUE, INCREMENT_VALUE, REMOVE_FROM_CART, USER_LIST } from "./constants";

export function addToCart(item){
    return {
        type: ADD_TO_CART,
        data: item
    }
}

export function removeFromCart(item){
    return {
        type: REMOVE_FROM_CART,
        data: item
    }
} 

export function getUserList(){
    return {
        type: USER_LIST
    }
}

export function incrementValue(item) {
    console.log("im increment", item)
    return {
        type: INCREMENT_VALUE,
        data: item
    }
}

export function decrementValue() {
    return {
        type: DECREMENT_VALUE,
        data: item
    }
}