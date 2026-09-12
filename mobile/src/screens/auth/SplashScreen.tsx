import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { FoodieLogo } from '../../components/common/FoodieLogo';
import { typography, spacing } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export default function SplashScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDark } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        if (isAuthenticated) {
          navigation.replace('MainTabs');
        } else {
          navigation.replace('Login');
        }
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.centerContent}>
        <FoodieLogo size={100} />
        <Text style={[typography.display, styles.brandName, { color: isDark ? '#FFFFFF' : '#191C1E' }]}>
          FOODIE<Text style={{ color: colors.primaryContainer }}>-EXPRESS</Text>
        </Text>
        <Text style={[typography.bodyMd, styles.tagline, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
          Artisanal Flavors • Express Delivery
        </Text>

        <ActivityIndicator size="small" color={colors.primaryContainer} style={styles.spinner} />
      </View>

      <View style={styles.footer}>
        <Text style={[typography.labelSm, styles.academicText, { color: isDark ? '#6B7280' : '#8F9499' }]}>
          Mobile JavaScript App Development
        </Text>
        <Text style={[typography.bodySm, styles.collegeText, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
          Dr. Sheena Christabel Pravin · VIT Chennai
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    marginTop: spacing.md,
    letterSpacing: -1,
    fontWeight: '900',
  },
  tagline: {
    marginTop: spacing.xs,
    letterSpacing: 0.2,
  },
  spinner: {
    marginTop: spacing.xl,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: spacing.sm,
  },
  academicText: {
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  collegeText: {
    marginTop: 2,
    fontWeight: '600',
  },
});
