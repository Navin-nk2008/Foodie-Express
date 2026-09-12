import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList, MainTabParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { searchApi, SearchResponse } from '../../api/searchApi';
import { SearchBar } from '../../components/common/SearchBar';
import { FilterChip } from '../../components/common/FilterChip';
import { DietaryBadge } from '../../components/common/DietaryBadge';
import { FoodCardHorizontal } from '../../components/cards/FoodCardHorizontal';
import { RestaurantCardVertical } from '../../components/cards/RestaurantCardVertical';
import { FloatingCartBar } from '../../components/common/FloatingCartBar';
import { EmptyState } from '../../components/common/EmptyState';
import { typography, spacing, radius } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type SearchRouteProp = RouteProp<MainTabParamList, 'SearchTab'>;

export default function SearchScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<SearchRouteProp>();
  const initialQuery = route.params?.initialQuery || '';

  const { colors, isDark } = useTheme();

  const [query, setQuery] = useState(initialQuery);
  const [dietary, setDietary] = useState<string | undefined>(undefined);
  const [minRating, setMinRating] = useState<number | undefined>(undefined);
  const [under30Mins, setUnder30Mins] = useState<boolean>(false);
  const [hasOffers, setHasOffers] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResponse | null>(null);

  const executeSearch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await searchApi.search({
        q: query,
        dietary,
        minRating,
        maxDeliveryTime: under30Mins,
        hasOffers,
      });
      setResults(data);
    } catch (e) {
      console.error('[SearchScreen] Error executing search:', e);
    } finally {
      setLoading(false);
    }
  }, [query, dietary, minRating, under30Mins, hasOffers]);

  useEffect(() => {
    executeSearch();
  }, [executeSearch]);

  const handleSelectRecent = (term: string) => {
    setQuery(term);
  };

  const handleClear = () => {
    setQuery('');
    setDietary(undefined);
    setMinRating(undefined);
    setUnder30Mins(false);
    setHasOffers(false);
  };

  const hasActiveQuery = query.trim().length > 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Input Bar */}
      <View style={styles.searchHeader}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={executeSearch}
          onClear={handleClear}
          placeholder="Search for 'Pizza', 'Burgers' or 'Pasta'..."
        />
      </View>

      {/* Filter Chips Carousel */}
      <View style={styles.filterChipsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          <FilterChip
            label="Veg"
            selected={dietary === 'veg'}
            onPress={() => setDietary(dietary === 'veg' ? undefined : 'veg')}
            icon={<DietaryBadge type="veg" size={13} />}
          />
          <FilterChip
            label="Non-Veg"
            selected={dietary === 'non-veg'}
            onPress={() => setDietary(dietary === 'non-veg' ? undefined : 'non-veg')}
            icon={<DietaryBadge type="non-veg" size={13} />}
          />
          <FilterChip
            label="Rating 4.0+"
            selected={minRating === 4.0}
            onPress={() => setMinRating(minRating === 4.0 ? undefined : 4.0)}
            icon={<Ionicons name="star" size={12} color={minRating === 4.0 ? colors.primaryContainer : colors.amber} />}
          />
          <FilterChip
            label="Under 30 mins"
            selected={under30Mins}
            onPress={() => setUnder30Mins(!under30Mins)}
            icon={<Ionicons name="time-outline" size={13} color={under30Mins ? colors.primaryContainer : (isDark ? '#D1D5DB' : '#5A413A')} />}
          />
          <FilterChip
            label="Great Offers"
            selected={hasOffers}
            onPress={() => setHasOffers(!hasOffers)}
            icon={<MaterialIcons name="local-offer" size={13} color={hasOffers ? colors.primaryContainer : (isDark ? '#D1D5DB' : '#5A413A')} />}
          />
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.centerLoading}>
            <ActivityIndicator size="small" color={colors.primaryContainer} />
            <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary, marginTop: 8 }]}>
              Searching kitchens...
            </Text>
          </View>
        ) : hasActiveQuery && results ? (
          /* Live Matches Section */
          <View style={styles.resultsSection}>
            <Text style={[typography.headlineSm, styles.sectionTitle, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
              Live Matches ({results.totalMatches})
            </Text>

            {results.totalMatches === 0 ? (
              <EmptyState
                icon="search-off"
                title={`No matches for "${query}"`}
                description="Try checking for typos or searching for a different dish or restaurant."
                actionTitle="Clear Search"
                onAction={handleClear}
              />
            ) : (
              <>
                {/* Matched Dishes */}
                {results.dishes.length > 0 && (
                  <View style={styles.dishList}>
                    {results.dishes.map((dish) => (
                      <FoodCardHorizontal key={dish.id} dish={dish} restaurantId={dish.restaurantId} />
                    ))}
                  </View>
                )}

                {/* Matched Restaurants */}
                {results.restaurants.length > 0 && (
                  <View style={styles.restaurantList}>
                    <Text style={[typography.titleMd, styles.subHeader, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
                      Restaurants matching "{query}"
                    </Text>
                    {results.restaurants.map((r) => (
                      <RestaurantCardVertical
                        key={r.id}
                        restaurant={r}
                        onPress={() => navigation.navigate('RestaurantMenu', { restaurantId: r.id, restaurant: r })}
                      />
                    ))}
                  </View>
                )}
              </>
            )}
          </View>
        ) : (
          /* Discovery & Trending View */
          <View style={styles.discoveryView}>
            {/* Recent Searches */}
            {results?.recentSearches && results.recentSearches.length > 0 && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionTitleRow}>
                  <Text style={[typography.headlineSm, styles.sectionTitle, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
                    Recent Searches
                  </Text>
                  <TouchableOpacity onPress={() => handleClear()}>
                    <Text style={[typography.labelSm, { color: colors.primaryContainer, fontWeight: '700' }]}>
                      Clear all
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.pillsRow}>
                  {results.recentSearches.map((term, idx) => (
                    <TouchableOpacity
                      key={idx}
                      activeOpacity={0.8}
                      onPress={() => handleSelectRecent(term)}
                      style={[
                        styles.historyPill,
                        {
                          backgroundColor: isDark ? colors.surface : '#FFFFFF',
                          borderColor: isDark ? colors.border : '#EFECE6',
                        },
                      ]}
                    >
                      <Ionicons name="time-outline" size={14} color={isDark ? '#9CA3AF' : colors.textSecondary} />
                      <Text style={[typography.bodySm, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '500' }]}>
                        {term}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Trending Now */}
            {results?.trending && (
              <View style={styles.sectionBlock}>
                <View style={styles.trendingHeader}>
                  <MaterialIcons name="local-fire-department" size={20} color={colors.primaryContainer} />
                  <Text style={[typography.headlineSm, styles.sectionTitle, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
                    Trending Now
                  </Text>
                </View>

                <View style={styles.trendingGrid}>
                  {results.trending.map((item, idx) => (
                    <TouchableOpacity
                      key={idx}
                      activeOpacity={0.8}
                      onPress={() => handleSelectRecent(item.term)}
                      style={[
                        styles.trendingCard,
                        {
                          backgroundColor: isDark ? colors.surface : '#FFFFFF',
                          borderColor: isDark ? colors.border : '#EFECE6',
                        },
                      ]}
                    >
                      <View style={[styles.trendIconBox, { backgroundColor: isDark ? '#261612' : '#FFF1ED' }]}>
                        <Ionicons name="trending-up" size={16} color={colors.primaryContainer} />
                      </View>
                      <View style={styles.trendInfo}>
                        <Text style={[typography.labelLg, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
                          {item.term}
                        </Text>
                        <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary, fontSize: 11 }]}>
                          {item.count}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Explore Cuisines Matrix */}
            {results?.cuisines && (
              <View style={styles.sectionBlock}>
                <Text style={[typography.headlineSm, styles.sectionTitle, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
                  Explore Cuisines
                </Text>
                <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary, marginBottom: spacing.md }]}>
                  Taste profiles curated for your cravings
                </Text>

                <View style={styles.cuisineGrid}>
                  {results.cuisines.map((c) => (
                    <TouchableOpacity
                      key={c.id}
                      activeOpacity={0.85}
                      onPress={() => handleSelectRecent(c.name)}
                      style={[
                        styles.cuisineCard,
                        {
                          backgroundColor: isDark ? colors.surface : '#FFFFFF',
                          borderColor: isDark ? colors.border : '#EFECE6',
                        },
                      ]}
                    >
                      <Image source={{ uri: c.image }} style={styles.cuisineImage} resizeMode="cover" />
                      <View style={styles.cuisineOverlay}>
                        <Text style={[typography.titleMd, styles.cuisineTitle]}>
                          {c.emoji} {c.name}
                        </Text>
                        <Text numberOfLines={1} style={[typography.bodySm, styles.cuisineSubtitle]}>
                          {c.subtitle}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Persistent Floating Cart Bar */}
      <FloatingCartBar onPress={() => navigation.navigate('Cart')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeader: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  filterChipsRow: {
    paddingVertical: spacing.sm,
  },
  filterScroll: {
    paddingHorizontal: spacing.md,
    gap: 8,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: 110,
  },
  centerLoading: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  resultsSection: {
    marginTop: spacing.sm,
  },
  sectionTitle: {
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  subHeader: {
    fontWeight: '700',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  dishList: {},
  restaurantList: {
    marginTop: spacing.md,
  },
  discoveryView: {
    marginTop: spacing.sm,
  },
  sectionBlock: {
    marginBottom: spacing.lg,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  historyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  trendingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.sm,
  },
  trendingGrid: {
    gap: 8,
  },
  trendingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: 10,
  },
  trendIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendInfo: {
    flex: 1,
  },
  cuisineGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  cuisineCard: {
    width: '48%',
    height: 110,
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  cuisineImage: {
    width: '100%',
    height: '100%',
  },
  cuisineOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(25, 28, 30, 0.55)',
    justifyContent: 'flex-end',
    padding: 8,
  },
  cuisineTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  cuisineSubtitle: {
    color: '#E1E2E5',
    fontSize: 10,
  },
});
