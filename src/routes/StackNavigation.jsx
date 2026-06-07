import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import DrawerNavigator from './DrawerNavigator';
import Routes from '.';
import Profile from '../screens/Profile';
import Repositorios from '../screens/Repositorios';
import Issues from '../screens/Issues';
import { useGit } from "../providers/GitContext";

export default function StackNavigation() {

    const Stack = createNativeStackNavigator()
    const { repositorios, issues } = useGit();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name={Routes.LOGIN}
                component={Login}
            />
            <Stack.Screen
                name={Routes.REGISTER}
                component={Register}
            />
            <Stack.Screen
                name={Routes.DRAWER}
                component={DrawerNavigator}
            />
            <Stack.Screen
                name={Routes.PROFILE}
                component={Profile}
            />
            <Stack.Screen
                name={Routes.REPOSITORIOS}
                component={Repositorios}
            />
            <Stack.Screen
                name={Routes.ISSUES}
                component={Issues}
            />
        </Stack.Navigator>
    )
}