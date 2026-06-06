import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import Dashboard from "./DashboardNavigator";
import LogoutIcon from "../components/LogoutIcon";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator screenOptions={{headerRight: () => <LogoutIcon/>}}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Dashboard" component={Dashboard} />
        </Drawer.Navigator>  
    );

}