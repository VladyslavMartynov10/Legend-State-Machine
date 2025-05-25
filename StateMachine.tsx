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
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {AnimatedShadowButton, ActivityIndicator} from './ui';
import {
  $Switch as Switch,
  $TextInput as TextInput,
} from '@legendapp/state/react-native';
import {Show} from '@legendapp/state/react';
import {observable} from '@legendapp/state';
import {UnistylesRuntime} from 'react-native-unistyles';

const PADDING_TOP =
  Platform.OS === 'ios' ? UnistylesRuntime.insets.top || 16 : 0;

interface InitialValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}

type StateMachineState =
  | 'idle'
  | 'validating'
  | 'submitting'
  | 'success'
  | 'error';

type StateMachineEventType =
  | 'VALIDATE'
  | 'SUBMIT'
  | 'SUCCESS'
  | 'ERROR'
  | 'RESET';

type StateMachineEvent = {type: StateMachineEventType};

interface StateMachine {
  values: InitialValues;
  errors: Record<keyof Omit<InitialValues, 'agreeTerms'>, string>;
  state: StateMachineState;
  isLoading: boolean;
  send: (event: StateMachineEvent) => void;
  signInWithLinkedIn: () => void;
  signInWithGoogle: () => void;
  signInWithApple: () => void;
}

const transitions: Record<
  StateMachineState,
  Partial<Record<StateMachineEventType, StateMachineState>>
> = {
  idle: {
    VALIDATE: 'validating',
    SUBMIT: 'submitting',
  },
  validating: {
    ERROR: 'error',
    SUCCESS: 'idle',
  },
  submitting: {
    SUCCESS: 'success',
    ERROR: 'error',
  },
  success: {
    RESET: 'idle',
  },
  error: {
    RESET: 'idle',
  },
};

const stateMachine$ = observable<StateMachine>({
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
  state: 'idle',
  isLoading: false,
  send(event) {
    const nextState = transitions[stateMachine$.state.get()]?.[event.type];
    if (nextState) {
      stateMachine$.state.set(nextState);
    }
    if (event.type === 'VALIDATE') {
      const newErrors = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      };
      if (!stateMachine$.values.firstName.get().trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!stateMachine$.values.lastName.get().trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!stateMachine$.values.email.get().includes('@')) {
        newErrors.email = 'Please enter a valid email';
      }
      if (stateMachine$.values.password.get().length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      stateMachine$.errors.set(newErrors);
      stateMachine$.send({
        type: Object.values(newErrors).some(e => e) ? 'ERROR' : 'SUCCESS',
      });
    }
    if (event.type === 'SUBMIT') {
      stateMachine$.send({type: 'VALIDATE'});
      if (stateMachine$.state.get() !== 'error') {
        stateMachine$.isLoading.set(true);
        setTimeout(() => {
          stateMachine$.isLoading.set(false);
          stateMachine$.send({type: 'SUCCESS'});
        }, 2000);
      }
    }
  },
  signInWithLinkedIn() {
    stateMachine$.isLoading.set(true);

    setTimeout(() => {
      stateMachine$.isLoading.set(false);
      stateMachine$.send({type: 'SUCCESS'});
    }, 2000);
  },
  signInWithGoogle() {
    stateMachine$.isLoading.set(true);

    setTimeout(() => {
      stateMachine$.isLoading.set(false);
      stateMachine$.send({type: 'SUCCESS'});
    }, 2000);
  },
  signInWithApple() {
    stateMachine$.isLoading.set(true);

    setTimeout(() => {
      stateMachine$.isLoading.set(false);
      stateMachine$.send({type: 'SUCCESS'});
    }, 2000);
  },
});

export const StateMachine = () => {
  const {values, errors, isLoading} = stateMachine$;

  console.log('render State Machine');

  return (
    <View style={styles.parent}>
      <StatusBar barStyle="light-content" backgroundColor="white" />

      <Show if={isLoading}>
        {() => <ActivityIndicator isVisible={true} color="black" />}
      </Show>

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
            and <Text style={styles.linkText}>{'\n'}Privacy Policy</Text>
          </Text>
        </View>
        <AnimatedShadowButton
          title="Sign Up"
          onPress={() => stateMachine$.send({type: 'SUBMIT'})}
        />
        <Text style={styles.orText}>or</Text>
        <TouchableOpacity
          style={styles.socialButtonLinkedin}
          onPress={stateMachine$.signInWithLinkedIn}>
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
          onPress={stateMachine$.signInWithGoogle}>
          <Image
            source={require('./assets/google.png')}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={stateMachine$.signInWithApple}>
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

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingTop: PADDING_TOP,
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
    color: 'black',
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
    marginLeft: 8,
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
