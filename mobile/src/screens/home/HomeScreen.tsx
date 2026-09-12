import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { restaurantApi } from '../../api/restaurantApi';
import { Restaurant, Cuisine } from '../../types/restaurant';
import { SearchBar } from '../../components/common/SearchBar';
import { PromoBanner } from '../../components/common/PromoBanner';
import { FloatingCartBar } from '../../components/common/FloatingCartBar';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { CuisineCategoryPill } from '../../components/cards/CuisineCategoryPill';
import { RestaurantCardCompact } from '../../components/cards/RestaurantCardCompact';
import { RestaurantCardVertical } from '../../components/cards/RestaurantCardVertical';
import { typography, spacing, radius } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDark } = useTheme();
  const { user } = useAuth();
  const { refreshCart } = useCart();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('pizza');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const [restRes, cuisRes] = await Promise.all([
        restaurantApi.list(),
        restaurantApi.getCuisines(),
      ]);
      setRestaurants(restRes.restaurants);
      setCuisines(cuisRes.cuisines);
      await refreshCart();
    } catch (e: any) {
      setError(e.message || 'Failed to load restaurants.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [refreshCart]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  if (loading) {
    return <LoadingState message="Discovering the best kitchens near you..." />;
  }

  if (error && restaurants.length === 0) {
    return <ErrorState message={error} onRetry={loadData} />;
  }

  const popularRestaurants = restaurants.filter((r) => r.isPopular);
  const featuredRestaurants = restaurants.filter((r) => r.isFeatured || !r.isPopular);

  const userName = user?.name ? user.name.split(' ')[0] : 'Alex';
  const defaultAddress = user?.addresses?.find((a) => a.isDefault) || {
    addressLine: 'Flat 402, Oakwood Heights',
    area: 'Midtown',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primaryContainer]} />}
      >
        {/* Top Header Location & Actions */}
        <View style={styles.topHeader}>
          <View style={styles.locationContainer}>
            <View style={styles.locationTitleRow}>
              <Ionicons name="location" size={17} color={colors.primaryContainer} />
              <Text style={[typography.titleMd, styles.locationTitle, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
                {defaultAddress.addressLine.split(',')[0]}
              </Text>
              <Ionicons name="chevron-down" size={16} color={isDark ? '#9CA3AF' : colors.textSecondary} />
            </View>
            <Text style={[typography.bodySm, styles.locationSubtitle, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
              {defaultAddress.area || 'Evergreen St, Midtown'}
            </Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.iconButton, { backgroundColor: isDark ? colors.surface : '#F2F4F6' }]}
            >
              <Ionicons name="notifications-outline" size={20} color={isDark ? '#FFFFFF' : colors.textPrimary} />
              <View style={[styles.unreadDot, { backgroundColor: colors.primaryContainer }]} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('MainTabs', { screen: 'ProfileTab' } as any)}
              style={[styles.avatarCircle, { borderColor: colors.primaryContainer }]}
            >
              <Image
                source={{
                  uri: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                }}
                style={styles.avatarImg}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text style={[typography.headlineLgMobile, styles.greetingText, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
            Good evening, {userName} 👋
          </Text>
          <Text style={[typography.bodyMd, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
            What would you like to savor today?
          </Text>
        </View>

        {/* Search Bar (Navigates to Search) */}
        <View style={styles.searchSection}>
          <SearchBar
            isReadOnly
            onPress={() => navigation.navigate('MainTabs', { screen: 'SearchTab' } as any)}
            onFilterPress={() => navigation.navigate('MainTabs', { screen: 'SearchTab' } as any)}
            onVoicePress={() => navigation.navigate('MainTabs', { screen: 'SearchTab' } as any)}
          />
        </View>

        {/* Promotional Banner */}
        <View style={styles.promoSection}>
          <PromoBanner />
        </View>

        {/* Cuisine Categories */}
        <View style={styles.sectionHeader}>
          <Text style={[typography.headlineSm, styles.sectionTitle, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
            Explore Cuisines
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cuisineScroll}
        >
          {cuisines.map((c) => (
            <CuisineCategoryPill
              key={c.id}
              cuisine={c}
              isSelected={selectedCuisine === c.id}
              onPress={() => {
                setSelectedCuisine(c.id);
                navigation.navigate('MainTabs', {
                  screen: 'SearchTab',
                  params: { initialQuery: c.name },
                } as any);
              }}
            />
          ))}
        </ScrollView>

        {/* Popular Near You */}
        <View style={styles.sectionHeaderBetween}>
          <Text style={[typography.headlineSm, styles.sectionTitle, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
            Popular Near You
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('MainTabs', { screen: 'SearchTab' } as any)}
          >
            <Text style={[typography.labelSm, { color: colors.primaryContainer, fontWeight: '700' }]}>
              See all →
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.popularScroll}
        >
          {popularRestaurants.map((restaurant) => (
            <RestaurantCardCompact
              key={restaurant.id}
              restaurant={restaurant}
              onPress={() => navigation.navigate('RestaurantMenu', { restaurantId: restaurant.id, restaurant })}
            />
          ))}
        </ScrollView>

        {/* Featured Restaurants */}
        <View style={[styles.sectionHeader, { marginTop: spacing.lg }]}>
          <Text style={[typography.headlineSm, styles.sectionTitle, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
            Featured Restaurants
          </Text>
        </View>

        <View style={styles.verticalList}>
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCardVertical
              key={restaurant.id}
              restaurant={restaurant}
              onPress={() => navigation.navigate('RestaurantMenu', { restaurantId: restaurant.id, restaurant })}
            />
          ))}
        </View>
      </ScrollView>

      {/* Persistent Floating Cart */}
      <FloatingCartBar onPress={() => navigation.navigate('Cart')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  locationContainer: {
    flex: 1,
  },
  locationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationTitle: {
    fontWeight: '800',
  },
  locationSubtitle: {
    marginLeft: 21,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: 7,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  greetingSection: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  greetingText: {
    fontWeight: '800',
    marginBottom: 2,
  },
  searchSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  promoSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionHeader: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionHeaderBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontWeight: '800',
  },
  cuisineScroll: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xs,
  },
  popularScroll: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xs,
  },
  verticalList: {
    paddingHorizontal: spacing.md,
  },
});
