import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { typography, radius, spacing } from '../../theme';
import { OrderStage, OrderHistoryStep } from '../../types/order';

interface OrderStatusTimelineProps {
  currentStage: OrderStage;
  history?: OrderHistoryStep[];
}

const STAGES: Array<{ key: OrderStage; title: string; desc: string; icon: string }> = [
  {
    key: 'placed',
    title: 'Order Confirmed',
    desc: 'Payment successful & sent to kitchen',
    icon: 'checkmark-circle',
  },
  {
    key: 'cooking',
    title: 'Restaurant Preparing your Food',
    desc: 'Woodfired baking & final check',
    icon: 'restaurant',
  },
  {
    key: 'delivering',
    title: 'Out for Delivery',
    desc: 'Partner picked up parcel and heading your way',
    icon: 'bicycle',
  },
  {
    key: 'delivered',
    title: 'Delivered',
    desc: 'Contactless doorstep handoff',
    icon: 'home',
  },
];

export const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({
  currentStage,
  history = [],
}) => {
  const { colors, isDark } = useTheme();

  // Stage index mapping
  const stageOrder = ['placed', 'validated', 'cooking', 'ready', 'delivering', 'delivered'];
  const currentIndex = stageOrder.indexOf(currentStage);

  return (
    <View style={styles.container}>
      <Text
        style={[
          typography.headlineSm,
          styles.headerTitle,
          { color: isDark ? '#FFFFFF' : colors.textPrimary },
        ]}
      >
        Delivery Progress
      </Text>

      <View style={styles.timelineList}>
        {STAGES.map((step, index) => {
          const stepIndex = stageOrder.indexOf(step.key);
          const isDone = currentIndex > stepIndex || (currentIndex >= stepIndex && currentStage === 'delivered');
          const isActive =
            (step.key === 'placed' && (currentStage === 'placed' || currentStage === 'validated')) ||
            (step.key === 'cooking' && (currentStage === 'cooking' || currentStage === 'ready')) ||
            (step.key === 'delivering' && currentStage === 'delivering') ||
            (step.key === 'delivered' && currentStage === 'delivered');

          const isLast = index === STAGES.length - 1;

          // Find time from history
          const histItem = history.find((h) => h.stage === step.key);
          const timeText = histItem ? histItem.at : '';

          return (
            <View key={step.key} style={styles.stepRow}>
              {/* Left Indicator Column */}
              <View style={styles.indicatorCol}>
                <View
                  style={[
                    styles.nodeCircle,
                    {
                      backgroundColor: isDone
                        ? colors.veg
                        : isActive
                        ? colors.primaryContainer
                        : isDark
                        ? '#2A2E3D'
                        : '#E1E2E5',
                      borderColor: isActive ? colors.primaryFixed : 'transparent',
                      borderWidth: isActive ? 3 : 0,
                    },
                  ]}
                >
                  {isDone ? (
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                  ) : isActive ? (
                    <View style={styles.pulseInner} />
                  ) : (
                    <View style={styles.pendingDot} />
                  )}
                </View>

                {!isLast && (
                  <View
                    style={[
                      styles.verticalLine,
                      {
                        backgroundColor: isDone
                          ? colors.veg
                          : isDark
                          ? '#2A2E3D'
                          : '#E1E2E5',
                      },
                    ]}
                  />
                )}
              </View>

              {/* Right Content Column */}
              <View style={[styles.contentCol, !isLast && { paddingBottom: spacing.lg }]}>
                <View style={styles.stepHeaderRow}>
                  <Text
                    style={[
                      typography.titleMd,
                      {
                        color: isDark ? '#FFFFFF' : colors.textPrimary,
                        fontWeight: isActive || isDone ? '700' : '500',
                      },
                    ]}
                  >
                    {step.title}
                  </Text>
                  {timeText ? (
                    <Text style={[typography.labelSm, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
                      {timeText}
                    </Text>
                  ) : null}
                </View>

                <Text
                  style={[
                    typography.bodySm,
                    styles.stepDesc,
                    { color: isDark ? '#9CA3AF' : colors.textSecondary },
                  ]}
                >
                  {step.desc}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
  },
  headerTitle: {
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  timelineList: {},
  stepRow: {
    flexDirection: 'row',
  },
  indicatorCol: {
    alignItems: 'center',
    width: 32,
    marginRight: spacing.sm,
  },
  nodeCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  pulseInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  pendingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8F9499',
  },
  verticalLine: {
    width: 2,
    flex: 1,
    marginTop: -2,
    marginBottom: -2,
    zIndex: 1,
  },
  contentCol: {
    flex: 1,
  },
  stepHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepDesc: {
    marginTop: 2,
    lineHeight: 16,
  },
});
