import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/routes/StackNavigation';
import AuthProvider from "./src/providers/AuthContext";
import GitProvider from "./src/providers/GitContext";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <GitProvider>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
      </GitProvider>
    </AuthProvider>
    </SafeAreaProvider>
  );
}
