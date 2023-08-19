import { View, Text, ScrollView, StyleSheet, Button } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Product from '../components/Product'

const HomeScreen = ({navigation}) => {

    const products = [
        {
          id: 1,
          name: "Samsung Mobile",
          color: "white",
          price: 30000,
          available: 20,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlf9jm9mjAnTalB5hGq1ldL1HTuE87dWwhrcurGbpU9Oqpe2e1v4TdnnkX_EPX0jTJL8w&usqp=CAU'
        },
        {
          id: 2,
          name: "Apple I Phone",
          color: "pink",
          price: 80000,
          available: 10,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlf9jm9mjAnTalB5hGq1ldL1HTuE87dWwhrcurGbpU9Oqpe2e1v4TdnnkX_EPX0jTJL8w&usqp=CAU'
        },
        {
          id: 3,
          name: "Nokia Mobile",
          color: "red",
          price: 20000,
          available: 30,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlf9jm9mjAnTalB5hGq1ldL1HTuE87dWwhrcurGbpU9Oqpe2e1v4TdnnkX_EPX0jTJL8w&usqp=CAU'
        },
        {
          id: 4,
          name: "HTC Mobile",
          color: "red",
          price: 20000,
          available: 10,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlf9jm9mjAnTalB5hGq1ldL1HTuE87dWwhrcurGbpU9Oqpe2e1v4TdnnkX_EPX0jTJL8w&usqp=CAU'
        }  
    ]
     
    return (
        <View style={styles.container}>
            <Button title="Go to User List" onPress={() => navigation.navigate("User")} />
            <View style={{marginTop: 5}}>
                <Header />
            </View>
            <View style={{marginTop: 25}}>
                <ScrollView>
                    {products.map((item) => 
                        <Product key={item.id} item={item}/>
                    )}
                </ScrollView>
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
});