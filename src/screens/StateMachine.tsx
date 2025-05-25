import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {
  AnimatedShadowButton,
  ActivityIndicator,
  HighlightOnRender,
  Counter,
} from '../ui';
import {
  $Switch as Switch,
  $TextInput as TextInput,
} from '@legendapp/state/react-native';
import {Show} from '@legendapp/state/react';
import {UnistylesRuntime} from 'react-native-unistyles';
import {stateMachine$} from './state-machine';
import {useDebugContext} from '../DebugContext';

const PADDING_TOP =
  Platform.OS === 'ios' ? UnistylesRuntime.insets.top || 16 : 0;

export const StateMachine = () => {
  const {values, errors, isLoading} = stateMachine$;

  const {debugRenderHighlight} = useDebugContext();

  return (
    <View style={styles.parent}>
      {debugRenderHighlight && <Counter />}

      <Show if={isLoading}>{() => <ActivityIndicator isVisible={true} />}</Show>

      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <HighlightOnRender>
          <Text style={styles.title}>Create Account</Text>
        </HighlightOnRender>

        <HighlightOnRender>
          <TextInput
            $value={values.firstName}
            placeholder="First Name"
            $style={() =>
              errors.firstName.get() ? styles.inputError : styles.input
            }
            placeholderTextColor="#666"
          />
        </HighlightOnRender>

        <HighlightOnRender>
          <Show if={errors.firstName}>
            {() => (
              <Text style={styles.errorText}>{errors.firstName.get()}</Text>
            )}
          </Show>
        </HighlightOnRender>

        <HighlightOnRender>
          <TextInput
            $value={values.lastName}
            placeholder="Last Name"
            $style={() =>
              errors.lastName.get() ? styles.inputError : styles.input
            }
            placeholderTextColor="#666"
          />
        </HighlightOnRender>

        <HighlightOnRender>
          <Show if={errors.lastName}>
            {() => (
              <Text style={styles.errorText}>{errors.lastName.get()}</Text>
            )}
          </Show>
        </HighlightOnRender>

        <HighlightOnRender>
          <TextInput
            $value={values.email}
            placeholder="user@gmail.com"
            $style={() =>
              errors.email.get() ? styles.inputError : styles.input
            }
            placeholderTextColor="#666"
          />
        </HighlightOnRender>

        <HighlightOnRender>
          <Show if={errors.email}>
            {() => <Text style={styles.errorText}>{errors.email.get()}</Text>}
          </Show>
        </HighlightOnRender>

        <HighlightOnRender>
          <TextInput
            $value={values.password}
            placeholder="Enter Your Password"
            secureTextEntry
            $style={() =>
              errors.password.get() ? styles.inputError : styles.input
            }
            placeholderTextColor="#666"
          />
        </HighlightOnRender>

        <HighlightOnRender>
          <Show if={errors.password}>
            {() => (
              <Text style={styles.errorText}>{errors.password.get()}</Text>
            )}
          </Show>
        </HighlightOnRender>

        <View style={styles.termsContainer}>
          <HighlightOnRender>
            <Switch $value={values.agreeTerms} />
          </HighlightOnRender>

          <HighlightOnRender>
            <Text style={styles.termsText}>
              I agree with{' '}
              <Text style={styles.linkText} onPress={stateMachine$.openPrivacy}>
                Terms of Service
              </Text>{' '}
              and <Text style={styles.linkText}>{'\n'}Privacy Policy</Text>
            </Text>
          </HighlightOnRender>
        </View>

        <HighlightOnRender>
          <AnimatedShadowButton
            title="Sign Up"
            onPress={() => stateMachine$.send({type: 'SUBMIT'})}
          />
        </HighlightOnRender>

        <HighlightOnRender>
          <Text style={styles.orText}>or</Text>
        </HighlightOnRender>

        <HighlightOnRender>
          <TouchableOpacity
            style={styles.socialButtonLinkedin}
            onPress={stateMachine$.signInWithLinkedIn}>
            <Image
              source={require('../../assets/linkedin.png')}
              style={styles.socialIconWhite}
            />
            <Text style={styles.socialButtonTextWhite}>
              Continue with LinkedIn
            </Text>
          </TouchableOpacity>
        </HighlightOnRender>

        <HighlightOnRender>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={stateMachine$.signInWithGoogle}>
            <Image
              source={require('../../assets/google.png')}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </HighlightOnRender>

        <HighlightOnRender>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={stateMachine$.signInWithApple}>
            <Image
              source={require('../../assets/apple.png')}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </TouchableOpacity>
        </HighlightOnRender>
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
