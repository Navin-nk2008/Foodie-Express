import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { typography, spacing, radius } from '../../theme';

interface AppHeaderProps {
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ title, onBack, rightAction }) => {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: isDark ? colors.surface : '#FFFFFF',
          borderBottomColor: isDark ? colors.border : '#EFECE6',
        },
      ]}
    >
      <View style={styles.left}>
        {onBack ? (
          <TouchableOpacity
            onPress={onBack}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={[
              styles.backButton,
              { backgroundColor: isDark ? colors.surfaceVariant : '#F2F4F6' },
            ]}
          >
            <Ionicons name="arrow-back" size={20} color={isDark ? '#FFFFFF' : colors.textPrimary} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 36 }} />
        )}
      </View>

      <Text
        numberOfLines={1}
        style={[
          typography.headlineSm,
          styles.title,
          { color: isDark ? '#FFFFFF' : colors.textPrimary },
        ]}
      >
        {title}
      </Text>

      <View style={styles.right}>{rightAction || <View style={{ width: 36 }} />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  left: {
    width: 44,
    alignItems: 'flex-start',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
  },
  right: {
    width: 44,
    alignItems: 'flex-end',
  },
});
