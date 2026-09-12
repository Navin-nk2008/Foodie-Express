import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ToastAndroid, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { typography, radius, spacing } from '../../theme';

interface PromoBannerProps {
  onCopyCode?: (code: string) => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onCopyCode }) => {
  const { colors, isDark } = useTheme();

  const handleCopy = () => {
    const code = 'WELCOME40';
    if (onCopyCode) onCopyCode(code);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Coupon WELCOME40 copied!', ToastAndroid.SHORT);
    }
  };

  return (
    <View
      style={[
        styles.banner,
        {
          backgroundColor: isDark ? '#261612' : '#FFF3F0',
          borderColor: isDark ? '#4A2318' : '#FFDAD2',
        },
      ]}
    >
      <View style={styles.leftContent}>
        <View style={styles.badge}>
          <MaterialIcons name="celebration" size={13} color={colors.primaryContainer} />
          <Text style={[typography.labelSm, { color: colors.primaryContainer }]}>FIRST ORDER OFFER</Text>
        </View>

        <Text
          style={[
            typography.headlineSm,
            styles.title,
            { color: isDark ? '#FFFFFF' : '#191C1E' },
          ]}
        >
          40% OFF your first order
        </Text>

        <Text
          style={[
            typography.bodySm,
            styles.subtitle,
            { color: isDark ? '#D1D5DB' : '#5A413A' },
          ]}
        >
          Use coupon code at checkout
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleCopy}
          style={[
            styles.codePill,
            {
              backgroundColor: isDark ? '#1A1D26' : '#FFFFFF',
              borderColor: colors.primaryContainer,
            },
          ]}
        >
          <Text style={[typography.labelSm, styles.codeText, { color: colors.primaryContainer }]}>
            WELCOME40
          </Text>
          <MaterialIcons name="content-copy" size={13} color={colors.primaryContainer} />
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80',
        }}
        style={styles.foodImage}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  leftContent: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  title: {
    fontWeight: '800',
    lineHeight: 22,
    marginBottom: 4,
  },
  subtitle: {
    marginBottom: spacing.sm,
  },
  codePill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
    gap: 6,
  },
  codeText: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  foodImage: {
    width: 90,
    height: 90,
    borderRadius: radius.lg,
  },
});
