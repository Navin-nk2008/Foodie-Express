import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { typography, spacing } from '../../theme';
import { PrimaryButton } from './PrimaryButton';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Something went wrong while connecting to the kitchen.',
  onRetry,
}) => {
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <MaterialIcons name="cloud-off" size={48} color={colors.primaryContainer} />
      <Text style={[typography.headlineSm, styles.title, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
        Oops! Connection Issue
      </Text>
      <Text style={[typography.bodyMd, styles.message, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
        {message}
      </Text>
      {onRetry && (
        <PrimaryButton title="Try Again" onPress={onRetry} style={styles.button} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  title: {
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  message: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  button: {
    minWidth: 140,
  },
});
