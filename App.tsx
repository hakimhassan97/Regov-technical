/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';

import 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import HomeScreen from './src/screen/home/Home';
import {AuthContext} from './src/common/context/auth-context';
import LoginScreen from './src/screen/auth/Login';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [activeUser, setActiveUser] = useState<any>();
  // const [userToken, setUserToken] = useState<string>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  const logout = () => {
    setActiveUser(null);
  };
  const login = (userLogin: any) => {
    setActiveUser(userLogin);
  };

  return (
    <>
      <AuthContext.Provider value={{...activeUser, login, logout}}>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}>
              {activeUser?.idToken ? (
                <HomeScreen route={undefined} navigation={undefined} />
              ) : (
                <LoginScreen
                  route={undefined}
                  navigation={undefined}
                />
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </AuthContext.Provider>
    </>
  );
}


export default App;
