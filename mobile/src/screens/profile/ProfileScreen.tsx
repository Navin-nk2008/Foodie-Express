import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { typography, spacing, radius } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDark } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out of Foodie-Express?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          logout();
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        },
      },
    ]);
  };

  const defaultUser = {
    name: 'Alex Johnson',
    phone: '+91 98765 43210',
    email: 'alex.johnson@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  };

  const currentUser = user || defaultUser;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: isDark ? colors.surface : '#FFFFFF', borderBottomColor: isDark ? colors.border : '#EFECE6' }]}>
        <Text style={[typography.headlineMd, styles.headerTitle, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
          My Account
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsIconBtn}
        >
          <Ionicons name="settings-outline" size={22} color={isDark ? '#FFFFFF' : colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: isDark ? colors.surface : '#FFFFFF',
              borderColor: isDark ? colors.border : '#EFECE6',
            },
          ]}
        >
          <View style={styles.avatarRow}>
            <View style={[styles.avatarBox, { borderColor: colors.primaryContainer }]}>
              <Image source={{ uri: currentUser.avatar }} style={styles.avatarImg} />
            </View>

            <View style={styles.profileText}>
              <Text style={[typography.headlineSm, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '800' }]}>
                {currentUser.name}
              </Text>
              <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary, marginTop: 2 }]}>
                {currentUser.phone}
              </Text>
              <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
                {currentUser.email}
              </Text>
            </View>
          </View>
        </View>

        {/* Saved Addresses Section */}
        <View style={styles.section}>
          <Text style={[typography.labelLg, styles.sectionTitle, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
            SAVED ADDRESSES
          </Text>

          <View
            style={[
              styles.cardGroup,
              {
                backgroundColor: isDark ? colors.surface : '#FFFFFF',
                borderColor: isDark ? colors.border : '#EFECE6',
              },
            ]}
          >
            <View style={styles.addressRow}>
              <View style={[styles.iconBox, { backgroundColor: isDark ? '#261612' : '#FFF1ED' }]}>
                <Ionicons name="home" size={18} color={colors.primaryContainer} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
                    Home
                  </Text>
                  <View style={[styles.defaultPill, { backgroundColor: colors.veg }]}>
                    <Text style={[typography.labelSm, { color: '#FFFFFF', fontSize: 9 }]}>DEFAULT</Text>
                  </View>
                </View>
                <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary, marginTop: 2 }]}>
                  Flat 402, Oakwood Heights, Evergreen St, Midtown
                </Text>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: isDark ? colors.border : '#F2F4F6' }]} />

            <View style={styles.addressRow}>
              <View style={[styles.iconBox, { backgroundColor: isDark ? '#1E2433' : '#EFF6FF' }]}>
                <Ionicons name="briefcase" size={18} color="#3B82F6" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
                  Office
                </Text>
                <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary, marginTop: 2 }]}>
                  Tech Park Tower B, 5th Floor, OMR, Sholinganallur
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Menu Options */}
        <View style={styles.section}>
          <Text style={[typography.labelLg, styles.sectionTitle, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
            PREFERENCES & ACCOUNT
          </Text>

          <View
            style={[
              styles.cardGroup,
              {
                backgroundColor: isDark ? colors.surface : '#FFFFFF',
                borderColor: isDark ? colors.border : '#EFECE6',
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('MainTabs', { screen: 'OrdersTab' } as any)}
              style={styles.menuRow}
            >
              <View style={styles.menuRowLeft}>
                <MaterialIcons name="receipt-long" size={20} color={colors.primaryContainer} />
                <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
                  Past Orders & Reorder
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={isDark ? '#9CA3AF' : colors.textSecondary} />
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: isDark ? colors.border : '#F2F4F6' }]} />

            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              style={styles.menuRow}
            >
              <View style={styles.menuRowLeft}>
                <Ionicons name="moon-outline" size={20} color={colors.primaryContainer} />
                <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
                  Appearance & Theme Settings
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={isDark ? '#9CA3AF' : colors.textSecondary} />
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: isDark ? colors.border : '#F2F4F6' }]} />

            <TouchableOpacity
              onPress={() => Alert.alert('Help & Support', 'Foodie Support is active 24/7 at support@foodie-express.com')}
              style={styles.menuRow}
            >
              <View style={styles.menuRowLeft}>
                <MaterialIcons name="help-outline" size={20} color={colors.primaryContainer} />
                <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
                  Help & FAQs
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={isDark ? '#9CA3AF' : colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Academic Project Credits Card */}
        <View
          style={[
            styles.academicCard,
            {
              backgroundColor: isDark ? '#141822' : '#F4F1EC',
              borderColor: isDark ? '#2A2E3D' : '#E1E2E5',
            },
          ]}
        >
          <Text style={[typography.labelSm, { color: colors.primaryContainer, fontWeight: '800' }]}>
            ACADEMIC CAPSTONE PROJECT
          </Text>
          <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700', marginTop: 2 }]}>
            FOODIE-EXPRESS
          </Text>
          <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary, marginTop: 4 }]}>
            Course: Mobile JavaScript App Development{'\n'}
            Faculty: Dr. Sheena Christabel Pravin{'\n'}
            School of Electronics Engineering, VIT Chennai
          </Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLogout}
          style={[
            styles.logoutBtn,
            {
              backgroundColor: isDark ? colors.surface : '#FFFFFF',
              borderColor: colors.nonVeg,
            },
          ]}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.nonVeg} />
          <Text style={[typography.labelLg, { color: colors.nonVeg, fontWeight: '700' }]}>
            Sign Out
          </Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  headerTitle: {
    fontWeight: '800',
  },
  settingsIconBtn: {
    padding: 4,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 40,
    gap: spacing.md,
  },
  profileCard: {
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.md,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatarBox: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  profileText: {
    flex: 1,
  },
  section: {
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontWeight: '800',
    marginBottom: spacing.xs,
    letterSpacing: 0.5,
  },
  cardGroup: {
    borderRadius: radius.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: spacing.md,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultPill: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.pill,
  },
  divider: {
    height: 1,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  menuRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  academicCard: {
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.md,
    marginTop: spacing.xs,
  },
  logoutBtn: {
    height: 48,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
});
