import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      // replace the current screen with Home so the user cannot navigate back to Splash
      navigation.replace('Home');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* Center Branding Content */}
      <View style={styles.brandContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>📝</Text>
        </View>
        <Text style={styles.title}>Task Tracker</Text>
        <Text style={styles.subtitle}>Stay organized, stay productive</Text>
      </View>

      {/* Bottom Loading Content */}
      <View style={styles.footerContainer}>
        <ActivityIndicator size="small" color="#6366F1" style={styles.loader} />
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Premium Slate Dark Background
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  brandContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 24,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  logoEmoji: {
    fontSize: 44,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 24,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 8,
    letterSpacing: 0.2,
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginBottom: 16,
  },
  version: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
});