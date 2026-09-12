import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SecondaryButton } from '../../components/common/SecondaryButton';
import { typography, spacing, radius, shadows } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type ConfirmationRouteProp = RouteProp<RootStackParamList, 'OrderConfirmation'>;

export default function OrderConfirmationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ConfirmationRouteProp>();
  const { orderId, orderNumber, eta, total } = route.params;

  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.centerContent}>
        {/* Animated Celebration Icon */}
        <View style={[styles.successCircle, { backgroundColor: isDark ? '#005236' : '#E1F0E8' }]}>
          <Ionicons name="checkmark-circle" size={68} color={colors.veg} />
        </View>

        <Text style={[typography.headlineLg, styles.title, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
          Order Placed!
        </Text>

        <Text style={[typography.bodyMd, styles.subtitle, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
          Your delicious meal is confirmed and the kitchen is firing up the ovens!
        </Text>

        {/* Order Details Card */}
        <View
          style={[
            styles.detailsCard,
            shadows.card,
            {
              backgroundColor: isDark ? colors.surface : '#FFFFFF',
              borderColor: isDark ? colors.border : '#EFECE6',
            },
          ]}
        >
          <View style={styles.detailRow}>
            <Text style={[typography.bodyMd, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
              Order Number
            </Text>
            <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
              {orderNumber}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[typography.bodyMd, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
              Estimated Delivery
            </Text>
            <Text style={[typography.titleMd, { color: colors.primaryContainer, fontWeight: '700' }]}>
              {eta}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[typography.bodyMd, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
              Amount Paid
            </Text>
            <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '800' }]}>
              ₹{total}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <PrimaryButton
          title="Track Live Order"
          onPress={() => navigation.replace('OrderTracking', { orderId })}
          style={styles.actionBtn}
          icon={<MaterialIcons name="delivery-dining" size={22} color="#FFFFFF" />}
        />

        <SecondaryButton
          title="Back to Home"
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] })}
          style={styles.actionBtn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
  detailsCard: {
    width: '100%',
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.md,
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonGroup: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  actionBtn: {
    width: '100%',
  },
});
