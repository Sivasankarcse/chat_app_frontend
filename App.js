import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ChatScreen from './src/screens/ChatScreen';
import Header from './src/components/Header';
import Product from './src/components/Product';
import { Provider } from 'react-redux';
import store from './src/components/redux/store';
import HomeScreen from './src/screens/HomeScreen';
import ProductWrapper from './src/components/ProductWrapper';
import UserList from './src/components/UserList';
import ChatContainer from './src/components/ChatContainer';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false
        }}
      >
        <Stack.Screen name='Chat' component={ChatScreen} />
        <Stack.Screen 
          name="chatContainer" 
          component={ChatContainer}
        />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <Provider store={store}>
    //   <NavigationContainer>
    //     <Stack.Navigator>
    //       <Stack.Screen name='Home' component={HomeScreen } />
    //       <Stack.Screen name='User' component={UserList} />
    //       <Stack.Screen name='Chat' component={ChatScreen} />
    //       <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
    //       <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: false}}/>
    //       {/* <Stack.Screen name='Messaging' component={Messaging} /> */}
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </Provider>
  );
}


