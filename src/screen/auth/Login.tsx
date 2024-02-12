import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Props } from '../../common/props';
import AuthProvider from '../../provider/auth';
import { AuthContext } from '../../common/context/auth-context';
import Styles from '../../utils/styles';

interface LoginProps extends Props {
}

const LoginScreen = ({route, navigation}: LoginProps) => {
  const {login} = useContext(AuthContext)
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [signUpMode, setSignupMode] = useState<boolean>(false)

  useEffect(() => {}, []);
  const onChangeEmail = (input: string) => {
    setEmail(input);
  };
  const onChangePassword = (input: string) => {
    setPassword(input);
  };
  const loginAttempt = async (email: string, password: string) => {
    try {
      setIsLoggingIn(true);
      const authRes = signUpMode ? await AuthProvider.register({email, password}):await AuthProvider.login({email, password});
      if (authRes?.error) {
        setErrorMessage('Invalid login');
      } else {
        login(authRes)
      }

      setIsLoggingIn(false);
    } catch (e) {
      setIsLoggingIn(false);
    }
  };



  return (
    <View style={Styles.body}>
      <View style={[Styles.container, Styles.aligntItemsCenter]}>
        <Text>Welcome to Covid dashboard</Text>
        {isLoggingIn ? (
          <ActivityIndicator />
        ) : (
          <View style={[]}>
            <TextInput
              style={Styles?.input}
              onChangeText={onChangeEmail}
              value={email}
              placeholder="Email"
            />
            <TextInput
              style={Styles?.input}
              onChangeText={onChangePassword}
              value={password}
              placeholder="Password"
              secureTextEntry
            />
            {signUpMode? <>
            <Button title="Register" onPress={() => loginAttempt(email, password)} />
            <TouchableOpacity onPress={()=>{setSignupMode(false)}}><Text>Already have account? <Text style={{color:'#156AFD'}}>login</Text> instead</Text></TouchableOpacity></>:<>
            <Button title="Login" onPress={() => loginAttempt(email, password)} />
            <TouchableOpacity onPress={()=>{setSignupMode(true)}}><Text>Don't have account? <Text style={{color:'#156AFD'}}>register</Text> instead</Text></TouchableOpacity></>}
            <Text style={Styles.dangerText}>{errorMessage}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default LoginScreen;
