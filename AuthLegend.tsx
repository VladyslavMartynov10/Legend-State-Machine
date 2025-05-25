import React from 'react';
import {
  Text,
  Pressable,
  TouchableOpacity,
  StatusBar,
  Linking,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {AnimatedShadowButton, ActivityIndicator} from './ui';
import {
  $Switch as Switch,
  $TextInput as TextInput,
} from '@legendapp/state/react-native';
import {Show} from '@legendapp/state/react';
import {observable} from '@legendapp/state';

interface InitialValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}

interface Form {
  values: InitialValues;
  errors: Record<keyof Omit<InitialValues, 'agreeTerms'>, string>;
  validate: () => boolean;
  handleSubmit: () => void;
  didSubmit: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithLinkedIn: () => Promise<void>;
  signInWithApple: () => Promise<void>;
}

const form$ = observable<Form>({
  values: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeTerms: false,
  },
  errors: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  didSubmit: false,
  isLoading: false,
  validate() {
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };

    if (!form$.values.firstName.get().trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!form$.values.lastName.get().trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!form$.values.email.get().includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }
    if (form$.values.password.get().length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    form$.errors.set(newErrors);
    return Object.values(newErrors).some(error => error !== '');
  },
  handleSubmit() {
    form$.didSubmit.set(true);
    if (!form$.validate()) {
      console.log('Form submitted:', form$.values.get());
    }
  },
  async signInWithGoogle() {
    form$.isLoading.set(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Signed in with Google');
    form$.isLoading.set(false);
  },
  async signInWithLinkedIn() {
    form$.isLoading.set(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Signed in with LinkedIn');
    form$.isLoading.set(false);
  },
  async signInWithApple() {
    form$.isLoading.set(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Signed in with Apple');
    form$.isLoading.set(false);
  },
});

export const AuthLegend = () => {
  const {values, errors, isLoading} = form$;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="white" />

      <Show if={isLoading}>{() => <ActivityIndicator isVisible={true} />}</Show>

      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Pressable>
          <Text style={styles.loginText}>Log In</Text>
        </Pressable>

        <TextInput
          $value={values.firstName}
          placeholder="First Name"
          $style={() =>
            errors.firstName.get() ? styles.inputError : styles.input
          }
          placeholderTextColor="#666"
        />
        <Show if={errors.firstName}>
          {() => <Text style={styles.errorText}>{errors.firstName.get()}</Text>}
        </Show>

        <TextInput
          $value={values.lastName}
          placeholder="Last Name"
          $style={() =>
            errors.lastName.get() ? styles.inputError : styles.input
          }
          placeholderTextColor="#666"
        />
        <Show if={errors.lastName}>
          {() => <Text style={styles.errorText}>{errors.lastName.get()}</Text>}
        </Show>

        <TextInput
          $value={values.email}
          placeholder="user@gmail.com"
          $style={() => (errors.email.get() ? styles.inputError : styles.input)}
          placeholderTextColor="#666"
        />
        <Show if={errors.email}>
          {() => <Text style={styles.errorText}>{errors.email.get()}</Text>}
        </Show>

        <TextInput
          $value={values.password}
          placeholder="Enter Your Password"
          secureTextEntry
          $style={() =>
            errors.password.get() ? styles.inputError : styles.input
          }
          placeholderTextColor="#666"
        />
        <Show if={errors.password}>
          {() => <Text style={styles.errorText}>{errors.password.get()}</Text>}
        </Show>

        <View style={styles.termsContainer}>
          <Switch $value={values.agreeTerms} />
          <Text style={styles.termsText}>
            I agree with{' '}
            <Text
              style={styles.linkText}
              onPress={() => Linking.openURL('https://www.google.com')}>
              Terms of Service
            </Text>{' '}
            and <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>

        <AnimatedShadowButton title="Sign Up" onPress={form$.handleSubmit} />

        <Text style={styles.orText}>or</Text>

        <TouchableOpacity
          style={styles.socialButtonLinkedin}
          onPress={form$.signInWithLinkedIn}>
          <Image
            source={require('./assets/linkedin.png')}
            style={styles.socialIconWhite}
          />
          <Text style={styles.socialButtonTextWhite}>
            Continue with LinkedIn
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={form$.signInWithGoogle}>
          <Image
            source={require('./assets/google.png')}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={form$.signInWithApple}>
          <Image
            source={require('./assets/apple.png')}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
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
  input: {
    width: '100%',
    padding: 14,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: 'black',
  },
  inputError: {
    width: '100%',
    padding: 14,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: 'black',
  },
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
  termsText: {
    fontSize: 14,
    color: '#333',
  },
  linkText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  socialIconWhite: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    color: '#666',
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
  socialButton: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  socialButtonLinkedin: {
    width: '100%',
    backgroundColor: 'black',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
});
