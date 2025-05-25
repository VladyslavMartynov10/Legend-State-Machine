import {createNativeStackNavigator} from '@react-navigation/native-stack';

export const Routes = {
  LEGEND_STATE_MACHINE: 'LEGEND_STATE_MACHINE',

  DECLATIVE_APPROACH: 'DECLATIVE_APPROACH',

  IMPLEMENTATION_LIST: 'IMPLEMENTATION_LIST',
} as const;

export type RouteType = keyof typeof Routes;

export type RootStackParamList = {
  [Routes.LEGEND_STATE_MACHINE]: undefined;

  [Routes.DECLATIVE_APPROACH]: undefined;

  [Routes.IMPLEMENTATION_LIST]: undefined;
};

export const Stack = createNativeStackNavigator<RootStackParamList>();
