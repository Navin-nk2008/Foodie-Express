import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { typography, spacing } from '../../theme';
import { PrimaryButton } from './PrimaryButton';

interface EmptyStateProps {
  icon?: keyof typeof MaterialIcons.glyphMap;
  title: string;
  description: string;
  actionTitle?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'restaurant',
  title,
  description,
  actionTitle,
  onAction,
}) => {
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: isDark ? colors.surface : '#FFF1ED',
          },
        ]}
      >
        <MaterialIcons name={icon} size={36} color={colors.primaryContainer} />
      </View>

      <Text style={[typography.headlineSm, styles.title, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
        {title}
      </Text>

      <Text style={[typography.bodyMd, styles.description, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
        {description}
      </Text>

      {actionTitle && onAction && (
        <PrimaryButton title={actionTitle} onPress={onAction} style={styles.actionBtn} />
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
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: spacing.md,
  },
  actionBtn: {
    minWidth: 160,
  },
});
