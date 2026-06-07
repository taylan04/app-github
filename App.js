import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/routes/StackNavigation';
import AuthProvider from "./src/providers/AuthContext";
import GitProvider from "./src/providers/GitContext";

export default function App() {
  return (
    <AuthProvider>
      <GitProvider>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </GitProvider>
    </AuthProvider>
  );
}
