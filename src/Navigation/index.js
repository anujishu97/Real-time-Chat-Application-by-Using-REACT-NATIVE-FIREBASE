import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native'
import {Login,SignUp,Dashboard, Splash, ShowFullImg, Chat} from '../container';
import {color} from '../utility';
import { StatusBar } from 'react-native';


const Stack= createStackNavigator();

function NavContainer(){
    return(
        <NavigationContainer>
            <StatusBar backgroundColor="#ff004c"
    barStyle="light-content"/>
            <Stack.Navigator initialRouteName="Splash"
            screenOptions={{
                headerShown:true,
                headerStyle:{backgroundColor: "#FF2A6B"},
                headerTintColor:color.WHITE,
                headerTitleAlign: "center",
                headerTitleStyle:{fontWeight:"bold",fontSize:22}
            }} 
            >
                <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
                <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
                <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
                <Stack.Screen name="Dashboard" component={Dashboard} options={{
                    headerLeft:null}}/>
                <Stack.Screen name="ShowFullImg" component={ShowFullImg} options={{
                    headerBackTitle:null}}/> 
                <Stack.Screen name="Chat" component={Chat} options={{
                    headerBackTitle:null}}/> 
                    
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default NavContainer;