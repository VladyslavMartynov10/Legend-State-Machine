import React from 'react';
import {ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Routes, RouteService} from '../navigation';

const screens = [
  {
    label: 'React-Native default declarative approach',
    route: Routes.DECLATIVE_APPROACH,
  },
  {label: 'Legend State Machine', route: Routes.LEGEND_STATE_MACHINE},
] as const;

export const ImplementationList: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {screens.map(({label, route}) => (
        <TouchableOpacity
          key={route}
          style={styles.card}
          onPress={() => {
            RouteService.navigate(route);
          }}>
          <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
});
