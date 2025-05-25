import {observable} from '@legendapp/state';
import {Linking} from 'react-native';

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
  openTerms: () => void;
  openPrivacy: () => void;
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

export const stateMachine$ = observable<StateMachine>({
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

  openTerms() {
    Linking.openURL('https://www.google.com');
  },

  openPrivacy() {
    Linking.openURL('https://www.google.com');
  },
});
