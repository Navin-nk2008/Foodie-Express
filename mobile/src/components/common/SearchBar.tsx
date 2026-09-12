import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { typography, radius, spacing } from '../../theme';

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  onClear?: () => void;
  onPress?: () => void;
  onFilterPress?: () => void;
  onVoicePress?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  isReadOnly?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSubmitEditing,
  onClear,
  onPress,
  onFilterPress,
  onVoicePress,
  placeholder = 'Search dishes, restaurants or cuisines...',
  autoFocus = false,
  isReadOnly = false,
}) => {
  const { colors, isDark } = useTheme();

  const content = (
    <>
      <Ionicons name="search" size={20} color={colors.primaryContainer} style={styles.searchIcon} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#9CA3AF' : '#8F9499'}
        autoFocus={autoFocus}
        editable={!isReadOnly}
        style={[
          typography.bodyMd,
          styles.input,
          { color: isDark ? '#FFFFFF' : '#191C1E' },
        ]}
      />

      {value && value.length > 0 && onClear && (
        <TouchableOpacity onPress={onClear} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="close-circle" size={18} color={isDark ? '#9CA3AF' : '#8F9499'} style={styles.icon} />
        </TouchableOpacity>
      )}

      {onVoicePress && (
        <TouchableOpacity onPress={onVoicePress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="mic-outline" size={20} color={isDark ? '#9CA3AF' : '#8F9499'} style={styles.icon} />
        </TouchableOpacity>
      )}

      {onFilterPress && (
        <TouchableOpacity onPress={onFilterPress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <MaterialIcons name="tune" size={20} color={colors.primaryContainer} style={styles.icon} />
        </TouchableOpacity>
      )}
    </>
  );

  const containerStyle = [
    styles.container,
    {
      backgroundColor: isDark ? '#1A1D26' : '#F4F1EC',
      borderColor: isDark ? '#2A2E3D' : '#EFECE6',
    },
  ];

  if (isReadOnly) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={containerStyle}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyle}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    height: '100%',
    padding: 0,
  },
  icon: {
    marginLeft: spacing.sm,
  },
});
