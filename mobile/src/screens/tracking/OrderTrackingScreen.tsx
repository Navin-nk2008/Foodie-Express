import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { orderApi } from '../../api/orderApi';
import { TrackingData } from '../../types/order';
import { AppHeader } from '../../components/common/AppHeader';
import { SimulatedMapView } from '../../components/tracking/SimulatedMapView';
import { OrderStatusTimeline } from '../../components/tracking/OrderStatusTimeline';
import { RiderProfileCard } from '../../components/tracking/RiderProfileCard';
import { DietaryBadge } from '../../components/common/DietaryBadge';
import { LoadingState } from '../../components/common/LoadingState';
import { typography, spacing, radius, shadows } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type TrackingRouteProp = RouteProp<RootStackParamList, 'OrderTracking'>;

export default function OrderTrackingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<TrackingRouteProp>();
  const { orderId } = route.params;

  const { colors, isDark } = useTheme();

  const [tracking, setTracking] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isItemsExpanded, setIsItemsExpanded] = useState(true);

  const fetchTracking = useCallback(async () => {
    try {
      const data = await orderApi.getTracking(orderId);
      setTracking(data);
    } catch (err) {
      console.error('[OrderTrackingScreen] Error fetching tracking:', err);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchTracking();

    // Poll live stage progression
    const interval = setInterval(() => {
      fetchTracking();
    }, 2500);

    return () => clearInterval(interval);
  }, [fetchTracking]);

  if (loading || !tracking) {
    return <LoadingState message="Connecting to live delivery tracking..." />;
  }

  const isDelivered = tracking.stage === 'delivered';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* App Header with Support Button */}
      <AppHeader
        title="Live Tracking"
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => Alert.alert('Foodie Support', 'Connecting to 24x7 order support representative...')}
            style={[
              styles.supportPill,
              {
                backgroundColor: isDark ? colors.surface : '#FFFFFF',
                borderColor: isDark ? colors.border : '#EFECE6',
              },
            ]}
          >
            <MaterialIcons name="help-outline" size={15} color={colors.primaryContainer} />
            <Text style={[typography.labelSm, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
              Support
            </Text>
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Order Status Hero Card */}
        <View
          style={[
            styles.heroCard,
            shadows.card,
            {
              backgroundColor: isDark ? colors.surface : '#FFFFFF',
              borderColor: isDark ? colors.border : '#EFECE6',
            },
          ]}
        >
          <View style={styles.heroTopRow}>
            <Text style={[typography.labelLg, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
              Order ID <Text style={{ color: colors.primaryContainer, fontWeight: '800' }}>#{tracking.orderNumber || tracking.orderId}</Text>
            </Text>

            <View style={[styles.statusChip, { backgroundColor: isDark ? '#261612' : '#FFF1ED' }]}>
              <Ionicons
                name={isDelivered ? 'checkmark-circle' : 'bicycle'}
                size={14}
                color={colors.primaryContainer}
              />
              <Text style={[typography.labelSm, { color: colors.primaryContainer, fontWeight: '800' }]}>
                {isDelivered ? 'Delivered' : 'On the move'}
              </Text>
            </View>
          </View>

          <Text
            style={[
              typography.headlineLg,
              styles.etaTitle,
              { color: isDark ? '#FFFFFF' : colors.textPrimary },
            ]}
          >
            {isDelivered ? 'Order Delivered! 🎉' : `Arriving in ${tracking.eta}`}
          </Text>

          <View style={styles.etaSubRow}>
            <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
              {isDelivered ? 'Delivered safely at your doorstep' : `Estimated arrival at ${tracking.estimatedArrival}`}
            </Text>

            {!isDelivered && (
              <View style={styles.livePulseRow}>
                <View style={[styles.pulseDot, { backgroundColor: colors.veg }]} />
                <Text style={[typography.labelSm, { color: colors.veg, fontWeight: '700' }]}>
                  Live GPS
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Interactive Route Map */}
        <SimulatedMapView
          rider={tracking.rider}
          restaurantName="Napoli Woodfired"
          onRecenter={() => Alert.alert('Recenter', 'Camera recentered on active delivery partner.')}
        />

        {/* 4-Step Vertical Timeline */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: isDark ? colors.surface : '#FFFFFF',
              borderColor: isDark ? colors.border : '#EFECE6',
            },
          ]}
        >
          <OrderStatusTimeline currentStage={tracking.stage} history={tracking.history} />
        </View>

        {/* Delivery Partner Profile Card */}
        <RiderProfileCard rider={tracking.rider} />

        {/* Expandable Order Items & Delivery Address */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: isDark ? colors.surface : '#FFFFFF',
              borderColor: isDark ? colors.border : '#EFECE6',
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsItemsExpanded(!isItemsExpanded)}
            style={styles.expandableHeader}
          >
            <View style={styles.expandableLeft}>
              <MaterialIcons name="receipt-long" size={20} color={colors.primaryContainer} />
              <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
                Order Items ({tracking.items.length})
              </Text>
            </View>

            <View style={styles.expandableRight}>
              <Text style={[typography.titleMd, { color: colors.primary, fontWeight: '800' }]}>
                ₹{tracking.total}
              </Text>
              <Ionicons
                name={isItemsExpanded ? 'chevron-up' : 'chevron-down'}
                size={18}
                color={isDark ? '#9CA3AF' : colors.textSecondary}
              />
            </View>
          </TouchableOpacity>

          {isItemsExpanded && (
            <View style={styles.expandedContent}>
              {tracking.items.map((item, idx) => (
                <View key={idx} style={styles.itemRow}>
                  <DietaryBadge type={item.dietaryType} size={14} />
                  <Text
                    numberOfLines={1}
                    style={[
                      typography.bodyMd,
                      styles.itemName,
                      { color: isDark ? '#FFFFFF' : colors.textPrimary },
                    ]}
                  >
                    {item.qty}x {item.name}
                  </Text>
                  <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
                    ₹{item.subtotal || item.price * item.qty}
                  </Text>
                </View>
              ))}

              <View style={[styles.addressDivider, { borderTopColor: isDark ? colors.border : '#F2F4F6' }]}>
                <View style={styles.addressRow}>
                  <Ionicons name="location-outline" size={18} color={colors.primaryContainer} />
                  <View style={{ flex: 1 }}>
                    <Text style={[typography.labelLg, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
                      Delivery Address
                    </Text>
                    <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary, marginTop: 2 }]}>
                      {tracking.deliveryAddress?.addressLine}
                    </Text>
                    {tracking.deliveryAddress?.note && (
                      <Text style={[typography.bodySm, { color: colors.primary, marginTop: 2, fontStyle: 'italic' }]}>
                        Note: {tracking.deliveryAddress.note}
                      </Text>
                    )}
                  </View>
                </View>
              </View>

              <View style={[styles.footerActions, { borderTopColor: isDark ? colors.border : '#F2F4F6' }]}>
                <TouchableOpacity
                  onPress={() => Alert.alert('Support Request', 'Connecting to support team...')}
                  style={styles.helpLink}
                >
                  <Text style={[typography.labelMd, { color: colors.primaryContainer, fontWeight: '700' }]}>
                    Need help with this order? →
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => Alert.alert('Invoice', 'Invoice PDF downloaded successfully.')}
                  style={styles.invoiceLink}
                >
                  <MaterialIcons name="download" size={16} color={isDark ? '#9CA3AF' : colors.textSecondary} />
                  <Text style={[typography.labelSm, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
                    Download Invoice
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 40,
    gap: spacing.md,
  },
  supportPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  heroCard: {
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.md,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  etaTitle: {
    fontWeight: '800',
    marginTop: 4,
    marginBottom: 4,
  },
  etaSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  livePulseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sectionCard: {
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.md,
  },
  expandableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  expandableLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expandableRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expandedContent: {
    marginTop: spacing.md,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: 6,
  },
  itemName: {
    flex: 1,
  },
  addressDivider: {
    borderTopWidth: 1,
    marginTop: spacing.md,
    paddingTop: spacing.md,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  footerActions: {
    borderTopWidth: 1,
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  helpLink: {},
  invoiceLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
