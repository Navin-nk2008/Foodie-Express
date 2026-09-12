import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
  Share,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { restaurantApi } from '../../api/restaurantApi';
import { Restaurant, Dish } from '../../types/restaurant';
import { AppHeader } from '../../components/common/AppHeader';
import { FoodCardHorizontal } from '../../components/cards/FoodCardHorizontal';
import { FloatingCartBar } from '../../components/common/FloatingCartBar';
import { LoadingState } from '../../components/common/LoadingState';
import { typography, spacing, radius, shadows } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type MenuRouteProp = RouteProp<RootStackParamList, 'RestaurantMenu'>;

const CATEGORIES = [
  'Recommended',
  'Signature Pizzas',
  'Calzones',
  'Appetizers',
  'Beverages',
  'Gelato',
];

export default function RestaurantMenuScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<MenuRouteProp>();
  const { restaurantId, restaurant: initialRestaurant } = route.params;

  const { colors, isDark } = useTheme();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(initialRestaurant || null);
  const [menu, setMenu] = useState<Dish[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Recommended');
  const [isVegOnly, setIsVegOnly] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(initialRestaurant?.isFavorite || false);
  const [loading, setLoading] = useState(true);

  const loadMenu = useCallback(async () => {
    try {
      const [restData, menuData] = await Promise.all([
        restaurant ? Promise.resolve({ restaurant }) : restaurantApi.get(restaurantId),
        restaurantApi.getMenu(restaurantId),
      ]);
      setRestaurant(restData.restaurant);
      setMenu(menuData.menu);
      setIsFavorite(restData.restaurant.isFavorite || false);
    } catch (e) {
      console.error('[RestaurantMenuScreen] Error loading menu:', e);
    } finally {
      setLoading(false);
    }
  }, [restaurantId, restaurant]);

  useEffect(() => {
    loadMenu();
  }, [loadMenu]);

  const handleShare = async () => {
    if (!restaurant) return;
    try {
      await Share.share({
        message: `Order gourmet dishes from ${restaurant.name} on Foodie-Express!`,
      });
    } catch (e) {}
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (loading || !restaurant) {
    return <LoadingState message="Loading restaurant menu..." />;
  }

  // Filter items by category and veg-only toggle
  const filteredDishes = menu.filter((dish) => {
    const matchCategory =
      selectedCategory === 'Recommended' ? true : dish.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchVeg = isVegOnly ? dish.dietaryType === 'veg' : true;
    return matchCategory && matchVeg;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Header */}
      <AppHeader
        title="Restaurant Detail"
        onBack={() => navigation.goBack()}
        rightAction={
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={handleShare} style={styles.actionIcon}>
              <Ionicons name="share-outline" size={20} color={isDark ? '#FFFFFF' : colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFavorite} style={styles.actionIcon}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={22}
                color={isFavorite ? colors.primaryContainer : (isDark ? '#FFFFFF' : colors.textPrimary)}
              />
            </TouchableOpacity>
          </View>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Restaurant Hero Image & Meta */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: restaurant.coverImage || restaurant.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          <View
            style={[
              styles.restaurantInfoCard,
              shadows.card,
              {
                backgroundColor: isDark ? colors.surface : '#FFFFFF',
                borderColor: isDark ? colors.border : '#EFECE6',
              },
            ]}
          >
            <View style={styles.infoTitleRow}>
              <Text
                style={[
                  typography.headlineMd,
                  styles.restaurantName,
                  { color: isDark ? '#FFFFFF' : colors.textPrimary },
                ]}
              >
                {restaurant.name}
              </Text>
              <View style={[styles.ratingPill, { backgroundColor: colors.veg }]}>
                <Ionicons name="star" size={12} color="#FFFFFF" />
                <Text style={[typography.labelSm, styles.ratingText]}>{restaurant.rating}</Text>
              </View>
            </View>

            <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary, marginTop: 4 }]}>
              {restaurant.cuisines.join(' • ')}
            </Text>

            <View style={styles.metaRow}>
              <View style={styles.metaBadge}>
                <Ionicons name="time-outline" size={13} color={colors.primaryContainer} />
                <Text style={[typography.labelSm, { color: isDark ? '#D1D5DB' : colors.textPrimary }]}>
                  {restaurant.deliveryTime}
                </Text>
              </View>
              <Text style={styles.metaDot}>•</Text>
              <Text style={[typography.labelSm, { color: isDark ? '#D1D5DB' : colors.textPrimary }]}>
                {restaurant.distance}
              </Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={[typography.labelSm, { color: isDark ? '#D1D5DB' : colors.textPrimary }]}>
                ₹{restaurant.priceForTwo} for two
              </Text>
            </View>

            {restaurant.offer && (
              <View style={[styles.offerBanner, { backgroundColor: isDark ? '#261612' : '#FFF3F0' }]}>
                <MaterialIcons name="local-offer" size={14} color={colors.primaryContainer} />
                <Text style={[typography.labelSm, { color: colors.primaryContainer, fontWeight: '700' }]}>
                  {restaurant.offer}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Veg-Only Filter Bar & Sticky Category Pills */}
        <View style={styles.controlsSection}>
          <View style={styles.vegFilterRow}>
            <View style={styles.vegLabelRow}>
              <Ionicons name="leaf" size={16} color={colors.veg} />
              <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
                Vegetarian Only
              </Text>
            </View>
            <Switch
              value={isVegOnly}
              onValueChange={setIsVegOnly}
              trackColor={{ false: isDark ? '#2A2E3D' : '#E5E7EB', true: colors.veg }}
              thumbColor="#FFFFFF"
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  activeOpacity={0.8}
                  onPress={() => setSelectedCategory(cat)}
                  style={[
                    styles.catPill,
                    {
                      backgroundColor: isSelected
                        ? colors.primaryContainer
                        : isDark
                        ? colors.surface
                        : '#FFFFFF',
                      borderColor: isSelected
                        ? colors.primaryContainer
                        : isDark
                        ? colors.border
                        : '#EFECE6',
                    },
                  ]}
                >
                  <Text
                    style={[
                      typography.labelMd,
                      {
                        color: isSelected ? '#FFFFFF' : isDark ? '#D1D5DB' : colors.textPrimary,
                        fontWeight: isSelected ? '700' : '600',
                      },
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Dishes List */}
        <View style={styles.menuListSection}>
          <Text style={[typography.headlineSm, styles.sectionHeader, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
            {selectedCategory} ({filteredDishes.length})
          </Text>

          {filteredDishes.map((dish) => (
            <FoodCardHorizontal key={dish.id} dish={dish} restaurantId={restaurant.id} />
          ))}
        </View>

        {/* Quality Assurance Callout */}
        <View
          style={[
            styles.trustCard,
            {
              backgroundColor: isDark ? colors.surface : '#FFFFFF',
              borderColor: isDark ? colors.border : '#EFECE6',
            },
          ]}
        >
          <View style={[styles.trustIconCircle, { backgroundColor: isDark ? '#005236' : '#E1F0E8' }]}>
            <MaterialIcons name="verified-user" size={22} color={colors.veg} />
          </View>
          <View style={styles.trustText}>
            <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
              Napoli Kitchen Guarantee
            </Text>
            <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary, marginTop: 2 }]}>
              {restaurant.trustBadge || "100% Caputo '00' flour, fermented 48 hrs for natural digestibility."}
            </Text>
          </View>
        </View>
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionIcon: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  heroContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  heroImage: {
    width: '100%',
    height: 180,
  },
  restaurantInfoCard: {
    marginHorizontal: spacing.md,
    marginTop: -30,
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.md,
  },
  infoTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  restaurantName: {
    fontWeight: '800',
    flex: 1,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    gap: 3,
  },
  ratingText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaDot: {
    color: '#9CA3AF',
  },
  offerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.sm,
    marginTop: 4,
  },
  controlsSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  vegFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(156, 163, 175, 0.2)',
    marginBottom: spacing.sm,
  },
  vegLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  categoryScroll: {
    paddingVertical: 4,
    gap: 8,
  },
  catPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  menuListSection: {
    paddingHorizontal: spacing.md,
  },
  sectionHeader: {
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  trustCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  trustIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustText: {
    flex: 1,
  },
});
