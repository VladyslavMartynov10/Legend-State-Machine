import React, {useState} from 'react';
import {
  TextInput,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  StatusBar,
  Linking,
  Switch,
  Platform,
} from 'react-native';
import {
  UnistylesRuntime,
  createStyleSheet,
  useStyles,
} from 'react-native-unistyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {ActivityIndicator, AnimatedShadowButton} from './ui';

export const AuthDefault: React.FC = () => {
  const {styles} = useStyles(stylesheet);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let newErrors: {
      email?: string;
      password?: string;
      firstName?: string;
      lastName?: string;
    } = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log('Form submitted:', {email, password, firstName, lastName});
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Signed in with Google');
    setIsLoading(false);
  };

  const signInWithLinkedIn = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Signed in with Google');
    setIsLoading(false);
  };

  const signInWithApple = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Signed in with Google');
    setIsLoading(false);
  };

  return (
    <View style={styles.parent}>
      <StatusBar barStyle="light-content" backgroundColor="white" />

      <ActivityIndicator isVisible={isLoading} color="black" />

      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Pressable>
          <Text style={styles.loginText}>Log In</Text>
        </Pressable>

        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
          style={styles.input(!!errors.firstName)}
          placeholderTextColor="#666"
        />
        {errors.firstName && (
          <Text style={styles.errorText}>{errors.firstName}</Text>
        )}

        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
          style={styles.input(!!errors.lastName)}
          placeholderTextColor="#666"
        />
        {errors.lastName && (
          <Text style={styles.errorText}>{errors.lastName}</Text>
        )}

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="user@gmail.com"
          style={styles.input(!!errors.email)}
          placeholderTextColor="#666"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter Your Password"
          secureTextEntry
          style={styles.input(!!errors.password)}
          placeholderTextColor="#666"
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <View style={styles.termsContainer}>
          <Switch
            value={agreeTerms}
            onChange={value => setAgreeTerms(value.nativeEvent.value)}
          />

          <Text
            style={styles.termsText}
            onPress={() => Linking.openURL('https://www.google.com')}>
            I agree with{' '}
            <Text
              style={styles.linkText}
              onPress={() => Linking.openURL('https://www.google.com')}>
              Terms of Service
            </Text>{' '}
            and <Text style={styles.linkText}>{'\n'}Privacy Policy</Text>
          </Text>
        </View>

        <AnimatedShadowButton title="Sign Up" onPress={handleSubmit} />

        <Text style={styles.orText}>or</Text>

        <TouchableOpacity
          style={styles.socialButton('black')}
          onPress={signInWithLinkedIn}>
          <Image
            source={require('./assets/linkedin.png')}
            style={styles.socialIconWhite}
          />
          <Text style={styles.socialButtonTextWhite}>
            Continue with LinkedIn
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton('white')}
          onPress={signInWithGoogle}>
          <Image
            source={require('./assets/google.png')}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton('white')}
          onPress={signInWithApple}>
          <Image
            source={require('./assets/apple.png')}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

const stylesheet = createStyleSheet(() => ({
  parent: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? 16 : UnistylesRuntime.insets.top,
  },
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loginText: {
    color: '#007BFF',
    alignSelf: 'flex-end',
    marginBottom: 20,
    fontSize: 16,
    fontWeight: '500',
  },
  input: (isError: boolean) => ({
    width: '100%',
    padding: 14,
    borderWidth: 1,
    borderColor: isError ? 'red' : '#ced4da',
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: 'black',
  }),
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  termsText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  linkText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    color: '#666',
  },
  socialButton: (bgColor: string) => ({
    width: '100%',
    backgroundColor: bgColor,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: bgColor === 'white' ? 1 : 0,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  }),
  socialIcon: {
    width: 24,
    height: 24,
  },
  socialIconWhite: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  socialButtonTextWhite: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
}));
