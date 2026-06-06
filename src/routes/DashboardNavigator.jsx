import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const Tabs = createBottomTabNavigator()

function Placeholder() {
    return (<View><Text>Placeholder</Text></View>)
}

export default function DashboardNavigator() {
    return (
        <Tabs.Navigator screenOptions={{headerShown: false}}>
            <Tabs.Screen 
            name="Teste1" 
            component={Placeholder}
            options={{tabBarIcon: (props) => {
                const { focused, color } = props;
                const cor = focused ? '#1a30a1' : 'black'
                return <FontAwesome5 name="user-alt" size={24} color={cor} />}}}/>
            <Tabs.Screen 
            name="Teste2" 
            component={Placeholder}
            options={{tabBarIcon: (props) => {
                const { focused, color } = props;
                const cor = focused ? '#1a30a1' : 'black'
                return <MaterialIcons name="home" size={24} color={cor} />}}} />
            <Tabs.Screen 
            name="Teste3" 
            component={Placeholder}
            options={{tabBarIcon: (props) => {
                const { focused, color } = props;
                const cor = focused ? '#1a30a1' : 'black'
                return <AntDesign name="code" size={24} color={cor} />}}} />
        </Tabs.Navigator>
    )
}
