import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Line, Path, Circle } from 'react-native-svg';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { typography, radius, spacing, shadows } from '../../theme';
import { Rider } from '../../types/order';

interface SimulatedMapViewProps {
  rider?: Rider;
  restaurantName?: string;
  onRecenter?: () => void;
}

export const SimulatedMapView: React.FC<SimulatedMapViewProps> = ({
  rider,
  restaurantName = 'Napoli Woodfired',
  onRecenter,
}) => {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.mapCard,
        shadows.card,
        {
          backgroundColor: isDark ? '#141822' : '#EAECEF',
          borderColor: isDark ? '#2A2E3D' : '#E1E2E5',
        },
      ]}
    >
      {/* Background Stylized Road Grid */}
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFillObject}>
        {/* Road 1 */}
        <Line x1="10%" y1="20%" x2="90%" y2="80%" stroke={isDark ? '#222736' : '#D6D9DE'} strokeWidth="18" />
        {/* Road 2 */}
        <Line x1="20%" y1="85%" x2="80%" y2="15%" stroke={isDark ? '#222736' : '#D6D9DE'} strokeWidth="14" />
        {/* Dotted Delivery Route Path */}
        <Path
          d="M 50 50 Q 140 120 220 100 T 320 180"
          stroke={colors.primaryContainer}
          strokeWidth="4"
          strokeDasharray="6, 6"
          fill="none"
        />
      </Svg>

      {/* Origin Marker (Restaurant) */}
      <View style={[styles.marker, { top: 35, left: 35 }]}>
        <View style={[styles.pinCircle, { backgroundColor: '#FF5E36' }]}>
          <Ionicons name="pizza" size={16} color="#FFFFFF" />
        </View>
        <View style={[styles.pinLabel, { backgroundColor: isDark ? '#1A1D26' : '#FFFFFF' }]}>
          <Text numberOfLines={1} style={[typography.labelSm, { color: isDark ? '#FFFFFF' : '#191C1E' }]}>
            {restaurantName}
          </Text>
        </View>
      </View>

      {/* Moving Rider Pin */}
      <View style={[styles.marker, { top: 90, left: 160 }]}>
        <View
          style={[
            styles.riderPinCircle,
            shadows.coralGlow,
            { backgroundColor: colors.primaryContainer, borderColor: '#FFFFFF' },
          ]}
        >
          <Ionicons name="bicycle" size={18} color="#FFFFFF" />
        </View>
        <View style={[styles.pinLabel, { backgroundColor: '#191C1E' }]}>
          <Text style={[typography.labelSm, { color: '#FFFFFF', fontWeight: '700' }]}>
            Vikram ({rider?.currentLocation?.distanceAway || '1.8 km'})
          </Text>
        </View>
      </View>

      {/* Destination Marker (Home) */}
      <View style={[styles.marker, { bottom: 25, right: 35 }]}>
        <View style={[styles.pinCircle, { backgroundColor: colors.veg }]}>
          <Ionicons name="home" size={16} color="#FFFFFF" />
        </View>
        <View style={[styles.pinLabel, { backgroundColor: isDark ? '#1A1D26' : '#FFFFFF' }]}>
          <Text style={[typography.labelSm, { color: isDark ? '#FFFFFF' : '#191C1E' }]}>
            Alex's Home
          </Text>
        </View>
      </View>

      {/* Map Control: Recenter Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onRecenter}
        style={[
          styles.recenterBtn,
          {
            backgroundColor: isDark ? '#1A1D26' : '#FFFFFF',
            borderColor: isDark ? '#2A2E3D' : '#E1E2E5',
          },
        ]}
      >
        <MaterialIcons name="my-location" size={16} color={colors.primaryContainer} />
        <Text style={[typography.labelSm, { color: isDark ? '#FFFFFF' : '#191C1E', fontWeight: '700' }]}>
          Recenter
        </Text>
      </TouchableOpacity>

      {/* Traffic Status Indicator */}
      <View
        style={[
          styles.trafficBadge,
          {
            backgroundColor: isDark ? '#1A1D26' : '#FFFFFF',
            borderColor: isDark ? '#2A2E3D' : '#E1E2E5',
          },
        ]}
      >
        <MaterialIcons name="traffic" size={14} color={colors.veg} />
        <Text style={[typography.labelSm, { color: colors.veg, fontWeight: '700' }]}>Light Traffic</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapCard: {
    height: 230,
    borderRadius: radius.xl,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: spacing.sm,
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  pinCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  riderPinCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
  },
  pinLabel: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    marginTop: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  recenterBtn: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: 1,
    zIndex: 20,
  },
  trafficBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    borderWidth: 1,
    zIndex: 20,
  },
});
