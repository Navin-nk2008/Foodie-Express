import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { typography, radius, spacing } from '../../theme';
import { Rider } from '../../types/order';

interface RiderProfileCardProps {
  rider?: Rider;
}

export const RiderProfileCard: React.FC<RiderProfileCardProps> = ({ rider }) => {
  const { colors, isDark } = useTheme();

  const handleCall = () => {
    if (rider?.phone) {
      Linking.openURL(`tel:${rider.phone}`).catch(() => {
        Alert.alert('Rider Contact', `Calling ${rider.name} at ${rider.phone}`);
      });
    } else {
      Alert.alert('Calling Rider', 'Connecting to delivery partner...');
    }
  };

  const handleMessage = () => {
    Alert.alert('Message Rider', `Chatting with ${rider?.name || 'Vikram'}...`);
  };

  const riderName = rider?.name || 'Vikram S.';
  const rating = rider?.rating || 4.9;
  const deliveries = rider?.deliveries || '1,840 deliveries';
  const vehicle = rider?.vehicle || 'Electric Scooter';
  const avatar =
    rider?.avatar ||
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80';

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? colors.surface : '#FFFFFF',
          borderColor: isDark ? colors.border : '#EFECE6',
        },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: avatar }} style={styles.avatar} resizeMode="cover" />
          <View style={[styles.verifiedBadge, { backgroundColor: colors.veg }]}>
            <Ionicons name="checkmark" size={10} color="#FFFFFF" />
          </View>
        </View>

        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text
              style={[
                typography.headlineSm,
                styles.name,
                { color: isDark ? '#FFFFFF' : colors.textPrimary },
              ]}
            >
              {riderName}
            </Text>
            <View style={[styles.ratingPill, { backgroundColor: isDark ? '#3D2A14' : '#FEF3C7' }]}>
              <Ionicons name="star" size={11} color={colors.amber} />
              <Text style={[typography.labelSm, { color: colors.amber, fontWeight: '700' }]}>
                {rating}
              </Text>
            </View>
          </View>

          <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
            {vehicle} • {deliveries}
          </Text>

          <View style={styles.safetyRow}>
            <MaterialIcons name="health-and-safety" size={14} color={colors.veg} />
            <Text style={[typography.labelSm, { color: colors.veg, fontWeight: '600' }]}>
              Sanitized bag & regular temp checks
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleCall}
          style={[styles.callBtn, { backgroundColor: colors.primaryContainer }]}
        >
          <Ionicons name="call" size={16} color="#FFFFFF" />
          <Text style={[typography.labelMd, styles.btnText]}>Call {riderName.split(' ')[0]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleMessage}
          style={[
            styles.messageBtn,
            {
              backgroundColor: isDark ? colors.surfaceVariant : '#F2F4F6',
              borderColor: isDark ? colors.border : '#E1E2E5',
            },
          ]}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={16}
            color={isDark ? '#FFFFFF' : colors.textPrimary}
          />
          <Text
            style={[
              typography.labelMd,
              { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '600' },
            ]}
          >
            Message
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.md,
    marginVertical: spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  name: {
    fontWeight: '700',
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  safetyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  callBtn: {
    flex: 1,
    height: 42,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  messageBtn: {
    flex: 1,
    height: 42,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
});
