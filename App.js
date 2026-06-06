import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/routes/StackNavigation';
import AuthProvider from "./src/providers/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}
