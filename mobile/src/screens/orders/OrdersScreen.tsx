import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { orderApi } from '../../api/orderApi';
import { Order } from '../../types/order';
import { LoadingState } from '../../components/common/LoadingState';
import { EmptyState } from '../../components/common/EmptyState';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { typography, spacing, radius, shadows } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function OrdersScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDark } = useTheme();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      const data = await orderApi.list();
      setOrders(data.orders);
    } catch (e) {
      console.error('[OrdersScreen] Error loading orders:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  if (loading) {
    return <LoadingState message="Fetching your orders..." />;
  }

  const activeOrders = orders.filter((o) => o.stage !== 'delivered');
  const pastOrders = orders.filter((o) => o.stage === 'delivered');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: isDark ? colors.surface : '#FFFFFF', borderBottomColor: isDark ? colors.border : '#EFECE6' }]}>
        <Text style={[typography.headlineMd, styles.headerTitle, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
          Your Orders
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primaryContainer]} />}
      >
        {orders.length === 0 ? (
          <EmptyState
            icon="receipt"
            title="No Orders Yet"
            description="You haven't placed any food orders yet. Start exploring great restaurants near you!"
            actionTitle="Find Food Now"
            onAction={() => navigation.navigate('MainTabs', { screen: 'HomeTab' } as any)}
          />
        ) : (
          <>
            {/* Active Orders Section */}
            {activeOrders.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeaderRow}>
                  <View style={[styles.pulseCircle, { backgroundColor: colors.veg }]} />
                  <Text style={[typography.headlineSm, styles.sectionTitle, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
                    Active Orders ({activeOrders.length})
                  </Text>
                </View>

                {activeOrders.map((order) => (
                  <View
                    key={order.id}
                    style={[
                      styles.orderCard,
                      shadows.card,
                      {
                        backgroundColor: isDark ? colors.surface : '#FFFFFF',
                        borderColor: colors.primaryContainer,
                        borderWidth: 1.5,
                      },
                    ]}
                  >
                    <View style={styles.orderTopRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={[typography.headlineSm, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
                          {order.restaurantName}
                        </Text>
                        <Text style={[typography.labelSm, { color: colors.primaryContainer, fontWeight: '700', marginTop: 2 }]}>
                          Order #{order.orderNumber}
                        </Text>
                      </View>

                      <View style={[styles.stageBadge, { backgroundColor: isDark ? '#261612' : '#FFF1ED' }]}>
                        <Ionicons name="bicycle" size={13} color={colors.primaryContainer} />
                        <Text style={[typography.labelSm, { color: colors.primaryContainer, fontWeight: '800' }]}>
                          {order.stage.toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    <Text style={[typography.bodySm, styles.itemsSummary, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
                      {order.items.map((i) => `${i.qty}x ${i.name}`).join(', ')}
                    </Text>

                    <View style={styles.orderBottomRow}>
                      <View>
                        <Text style={[typography.labelSm, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
                          Total Amount
                        </Text>
                        <Text style={[typography.headlineSm, { color: colors.primary, fontWeight: '800' }]}>
                          ₹{order.total}
                        </Text>
                      </View>

                      <PrimaryButton
                        title="Track Live"
                        onPress={() => navigation.navigate('OrderTracking', { orderId: order.id })}
                        style={styles.trackBtn}
                        icon={<Ionicons name="navigate" size={16} color="#FFFFFF" />}
                      />
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Past Orders Section */}
            <View style={[styles.section, { marginTop: spacing.md }]}>
              <Text style={[typography.headlineSm, styles.sectionTitle, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
                Past Orders ({pastOrders.length})
              </Text>

              {pastOrders.map((order) => (
                <View
                  key={order.id}
                  style={[
                    styles.orderCard,
                    {
                      backgroundColor: isDark ? colors.surface : '#FFFFFF',
                      borderColor: isDark ? colors.border : '#EFECE6',
                      borderWidth: 1,
                    },
                  ]}
                >
                  <View style={styles.orderTopRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={[typography.headlineSm, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
                        {order.restaurantName}
                      </Text>
                      <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary, marginTop: 2 }]}>
                        {new Date(order.createdAt).toLocaleDateString()} • ₹{order.total}
                      </Text>
                    </View>

                    <View style={[styles.stageBadge, { backgroundColor: isDark ? '#005236' : '#E1F0E8' }]}>
                      <Ionicons name="checkmark-circle" size={13} color={colors.veg} />
                      <Text style={[typography.labelSm, { color: colors.veg, fontWeight: '700' }]}>Delivered</Text>
                    </View>
                  </View>

                  <Text style={[typography.bodySm, styles.itemsSummary, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
                    {order.items.map((i) => `${i.qty}x ${i.name}`).join(', ')}
                  </Text>

                  <View style={styles.pastOrderActions}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('RestaurantMenu', { restaurantId: order.restaurantId })}
                      style={[styles.reorderBtn, { borderColor: colors.primaryContainer }]}
                    >
                      <MaterialIcons name="replay" size={16} color={colors.primaryContainer} />
                      <Text style={[typography.labelMd, { color: colors.primaryContainer, fontWeight: '700' }]}>
                        Reorder
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('OrderTracking', { orderId: order.id })}
                      style={styles.detailsBtn}
                    >
                      <Text style={[typography.labelMd, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
                        View Receipt →
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 56,
    borderBottomWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  headerTitle: {
    fontWeight: '800',
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 40,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.sm,
  },
  pulseCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    fontWeight: '800',
  },
  orderCard: {
    borderRadius: radius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  orderTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  stageBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  itemsSummary: {
    marginTop: 8,
    lineHeight: 18,
  },
  orderBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(156, 163, 175, 0.15)',
  },
  trackBtn: {
    height: 38,
    paddingHorizontal: 16,
  },
  pastOrderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(156, 163, 175, 0.15)',
  },
  reorderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1.5,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  detailsBtn: {
    paddingVertical: 6,
  },
});
