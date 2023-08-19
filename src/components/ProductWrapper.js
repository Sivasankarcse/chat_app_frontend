import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Header from './Header'
import Product from './Product'

const ProductWrapper = ({navigation}) => {

    const products = [
        {
          name: "Samsung Mobile",
          color: "white",
          price: 30000,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlf9jm9mjAnTalB5hGq1ldL1HTuE87dWwhrcurGbpU9Oqpe2e1v4TdnnkX_EPX0jTJL8w&usqp=CAU'
        },
        {
          name: "Apple I Phone",
          color: "pink",
          price: 80000,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlf9jm9mjAnTalB5hGq1ldL1HTuE87dWwhrcurGbpU9Oqpe2e1v4TdnnkX_EPX0jTJL8w&usqp=CAU'
        },
        {
          name: "Nokia Mobile",
          color: "red",
          price: 20000,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlf9jm9mjAnTalB5hGq1ldL1HTuE87dWwhrcurGbpU9Oqpe2e1v4TdnnkX_EPX0jTJL8w&usqp=CAU'
        },
        {
          name: "HTC Mobile",
          color: "red",
          price: 20000,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlf9jm9mjAnTalB5hGq1ldL1HTuE87dWwhrcurGbpU9Oqpe2e1v4TdnnkX_EPX0jTJL8w&usqp=CAU'
        }  
    ]
     
    return (
        <View style={styles.container}>
            <View style={{marginTop: 25}}>
                <Header />
            </View>
            <View style={{marginTop: 25}}>
                <ScrollView>
                    {products.map((item) => 
                        <Product item={item}/>
                    )}
                </ScrollView>
            </View>
        </View>
    )
}

export default ProductWrapper

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
  });