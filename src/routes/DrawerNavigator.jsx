import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import Dashboard from "./DashboardNavigator";
import Repositorios from '../screens/Repositorios';
import Issues from '../screens/Issues';
import Profile from "../screens/Profile";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator screenOptions={{headerRight: () => <LogoutIcon/>}}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="Repositorios" component={Repositorios} />
            <Drawer.Screen name="Issues" component={Issues} />
        </Drawer.Navigator>  
    );

}