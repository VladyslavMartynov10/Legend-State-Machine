import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import {Routes, RouteService} from '../navigation';
import {useDebugContext} from '../DebugContext';

const screens = [
  {
    label: 'React-Native default declarative approach',
    route: Routes.DECLATIVE_APPROACH,
  },
  {label: 'Legend State Machine', route: Routes.LEGEND_STATE_MACHINE},
] as const;

export const IsNewArchitecture = global?.nativeFabricUIManager != null;

export const ImplementationList: React.FC = () => {
  const {debugRenderHighlight, toggleDebug} = useDebugContext();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{color : 'black'}}>React Native Architecture: {IsNewArchitecture ? 'NEW' : 'OLD'}</Text>

      {screens.map(({label, route}) => (
        <TouchableOpacity
          key={route}
          style={styles.card}
          onPress={() => RouteService.navigate(route)}>
          <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.divider} />

      <TouchableOpacity style={styles.debugButton} onPress={toggleDebug}>
        <Text style={styles.debugText}>
          {debugRenderHighlight ? 'Disable' : 'Enable'} Debug Mode
        </Text>
      </TouchableOpacity>
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
  divider: {
    marginVertical: 16,
    height: 1,
    backgroundColor: '#eee',
  },
  debugButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  debugText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
});
