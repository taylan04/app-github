import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import Dashboard from "./DashboardNavigator";
import Repositorios from "../screens/Repositorios";
import Issues from "../screens/Issues";
import Profile from "../screens/Profile";
import Routes from ".";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator screenOptions={{
                headerShown: true,
                swipeEnabled: false,
            }}>
            <Drawer.Screen name={Routes.HOME} component={Home} />
            <Drawer.Screen name={Routes.PROFILE} component={Profile} />
            <Drawer.Screen name={Routes.REPOSITORIOS} component={Repositorios} />
            <Drawer.Screen name={Routes.ISSUES} component={Issues} />
        </Drawer.Navigator>
    );
}