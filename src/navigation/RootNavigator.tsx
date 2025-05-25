import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RouteService} from './RouteService';
import {Stack} from './models';
import {
  DeclativeApproach,
  ImplementationList,
  LegendMachineApproach,
} from '../screens';

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer ref={RouteService.navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerTitle: 'Implementation List',
        }}>
        <Stack.Screen
          name="IMPLEMENTATION_LIST"
          component={ImplementationList}
        />

        <Stack.Screen
          name="DECLATIVE_APPROACH"
          component={DeclativeApproach}
          options={{
            headerTitle: 'React-Native',
          }}
        />

        <Stack.Screen
          name="LEGEND_STATE_MACHINE"
          component={LegendMachineApproach}
          options={{
            headerTitle: 'Legend State Machine',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
