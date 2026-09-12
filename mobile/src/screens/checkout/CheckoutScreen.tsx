import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { orderApi } from '../../api/orderApi';
import { AppHeader } from '../../components/common/AppHeader';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { typography, spacing, radius, shadows } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CheckoutScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDark } = useTheme();
  const { user } = useAuth();
  const { cart, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [deliveryNote, setDeliveryNote] = useState('Leave with security guard');
  const [isPlacing, setIsPlacing] = useState(false);

  if (!cart) {
    navigation.goBack();
    return null;
  }

  const defaultAddress = user?.addresses?.[0] || {
    title: 'Home',
    addressLine: 'Flat 402, Oakwood Heights, Evergreen St',
    area: 'Midtown',
  };

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    try {
      const payload = {
        restaurantId: cart.restaurant.id,
        items: cart.items.map((i) => ({ id: i.id, qty: i.qty })),
        coupon: cart.coupon,
        deliveryAddress: {
          ...defaultAddress,
          note: deliveryNote,
        },
        paymentMethod:
          paymentMethod === 'upi'
            ? 'UPI / Google Pay (Simulated)'
            : paymentMethod === 'card'
            ? 'Credit Card (Simulated)'
            : 'Cash on Delivery',
      };

      const res = await orderApi.placeOrder(payload);
      if (res && res.order) {
        await clearCart();
        navigation.replace('OrderConfirmation', {
          orderId: res.order.id,
          orderNumber: res.order.orderNumber,
          eta: res.order.eta,
          total: res.order.total,
        });
      }
    } catch (e: any) {
      Alert.alert('Order Failed', e.message || 'Unable to place order. Please try again.');
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Checkout" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Delivery Address Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark ? colors.surface : '#FFFFFF',
              borderColor: isDark ? colors.border : '#EFECE6',
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <Ionicons name="location" size={20} color={colors.primaryContainer} />
            <Text style={[typography.titleMd, styles.cardTitle, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
              Delivery Address
            </Text>
          </View>

          <View style={styles.addressBox}>
            <View style={styles.addressTagRow}>
              <Text style={[typography.labelLg, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
                {defaultAddress.title}
              </Text>
              <View style={[styles.defaultBadge, { backgroundColor: isDark ? '#261612' : '#FFF1ED' }]}>
                <Text style={[typography.labelSm, { color: colors.primaryContainer }]}>DEFAULT</Text>
              </View>
            </View>

            <Text style={[typography.bodyMd, { color: isDark ? '#D1D5DB' : colors.textSecondary, marginTop: 4 }]}>
              {defaultAddress.addressLine}, {defaultAddress.area}
            </Text>

            <View style={styles.noteInputRow}>
              <MaterialIcons name="edit-note" size={18} color={isDark ? '#9CA3AF' : colors.textSecondary} />
              <TextInput
                value={deliveryNote}
                onChangeText={setDeliveryNote}
                placeholder="Add delivery instructions (optional)"
                placeholderTextColor={isDark ? '#9CA3AF' : '#8F9499'}
                style={[typography.bodySm, styles.noteInput, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}
              />
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark ? colors.surface : '#FFFFFF',
              borderColor: isDark ? colors.border : '#EFECE6',
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <MaterialIcons name="payment" size={20} color={colors.primaryContainer} />
            <Text style={[typography.titleMd, styles.cardTitle, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
              Select Payment Method
            </Text>
          </View>

          {/* Option 1: UPI */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPaymentMethod('upi')}
            style={[
              styles.paymentOption,
              paymentMethod === 'upi' && {
                borderColor: colors.primaryContainer,
                backgroundColor: isDark ? '#261612' : '#FFF1ED',
              },
            ]}
          >
            <View style={styles.payOptionLeft}>
              <View style={[styles.radioCircle, paymentMethod === 'upi' && { borderColor: colors.primaryContainer }]}>
                {paymentMethod === 'upi' && <View style={[styles.radioDot, { backgroundColor: colors.primaryContainer }]} />}
              </View>
              <View>
                <Text style={[typography.labelLg, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
                  UPI / Instant Online Payment
                </Text>
                <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
                  Google Pay, PhonePe, Paytm (Simulated)
                </Text>
              </View>
            </View>
            <Ionicons name="flash" size={16} color={colors.primaryContainer} />
          </TouchableOpacity>

          {/* Option 2: Card */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPaymentMethod('card')}
            style={[
              styles.paymentOption,
              paymentMethod === 'card' && {
                borderColor: colors.primaryContainer,
                backgroundColor: isDark ? '#261612' : '#FFF1ED',
              },
            ]}
          >
            <View style={styles.payOptionLeft}>
              <View style={[styles.radioCircle, paymentMethod === 'card' && { borderColor: colors.primaryContainer }]}>
                {paymentMethod === 'card' && <View style={[styles.radioDot, { backgroundColor: colors.primaryContainer }]} />}
              </View>
              <View>
                <Text style={[typography.labelLg, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
                  Credit / Debit Cards
                </Text>
                <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
                  Visa, Mastercard, RuPay (Simulated)
                </Text>
              </View>
            </View>
            <Ionicons name="card-outline" size={18} color={isDark ? '#D1D5DB' : colors.textPrimary} />
          </TouchableOpacity>

          {/* Option 3: COD */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPaymentMethod('cod')}
            style={[
              styles.paymentOption,
              paymentMethod === 'cod' && {
                borderColor: colors.primaryContainer,
                backgroundColor: isDark ? '#261612' : '#FFF1ED',
              },
            ]}
          >
            <View style={styles.payOptionLeft}>
              <View style={[styles.radioCircle, paymentMethod === 'cod' && { borderColor: colors.primaryContainer }]}>
                {paymentMethod === 'cod' && <View style={[styles.radioDot, { backgroundColor: colors.primaryContainer }]} />}
              </View>
              <View>
                <Text style={[typography.labelLg, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
                  Cash on Delivery
                </Text>
                <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
                  Pay with cash upon delivery
                </Text>
              </View>
            </View>
            <MaterialIcons name="payments" size={18} color={isDark ? '#D1D5DB' : colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Order Summary Snapshot */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark ? colors.surface : '#FFFFFF',
              borderColor: isDark ? colors.border : '#EFECE6',
            },
          ]}
        >
          <Text style={[typography.titleMd, styles.cardTitle, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
            Order Snapshot
          </Text>
          <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary, marginBottom: 8 }]}>
            From <Text style={{ fontWeight: '700' }}>{cart.restaurant.name}</Text> • {cart.itemCount} items
          </Text>

          <View style={styles.snapshotTotalRow}>
            <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
              Final Payable Amount
            </Text>
            <Text style={[typography.headlineSm, { color: colors.primary, fontWeight: '800' }]}>
              ₹{cart.grandTotal}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom CTA */}
      <View
        style={[
          styles.footerBar,
          shadows.modal,
          {
            backgroundColor: isDark ? colors.surface : '#FFFFFF',
            borderTopColor: isDark ? colors.border : '#EFECE6',
          },
        ]}
      >
        <PrimaryButton
          title={`Place Order • ₹${cart.grandTotal}`}
          onPress={handlePlaceOrder}
          loading={isPlacing}
          style={styles.placeBtn}
          icon={<Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 100,
    gap: spacing.md,
  },
  card: {
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontWeight: '800',
  },
  addressBox: {
    paddingTop: 4,
  },
  addressTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  defaultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  noteInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: 'rgba(156, 163, 175, 0.15)',
  },
  noteInput: {
    flex: 1,
    padding: 0,
    height: 32,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(156, 163, 175, 0.25)',
    marginBottom: spacing.xs,
  },
  payOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  snapshotTotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(156, 163, 175, 0.15)',
  },
  footerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    padding: spacing.md,
  },
  placeBtn: {
    width: '100%',
  },
});
