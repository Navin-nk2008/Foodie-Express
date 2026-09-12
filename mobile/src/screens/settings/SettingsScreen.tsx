import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { API_BASE_URL, setApiBaseUrl } from '../../api/client';
import { AppHeader } from '../../components/common/AppHeader';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { typography, spacing, radius } from '../../theme';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { colors, isDark, themeMode, setThemeMode, toggleTheme } = useTheme();

  const [apiUrl, setApiUrl] = useState(API_BASE_URL);
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);

  const handleSaveApiUrl = () => {
    setApiBaseUrl(apiUrl);
    Alert.alert('Configuration Saved', `API Base URL updated to:\n${apiUrl}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Settings & Appearance" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Theme Settings */}
        <View style={styles.section}>
          <Text style={[typography.labelLg, styles.sectionTitle, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
            APPEARANCE & THEME
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
            <View style={styles.settingRow}>
              <View style={styles.rowLeft}>
                <Ionicons
                  name={isDark ? 'moon' : 'sunny'}
                  size={20}
                  color={colors.primaryContainer}
                />
                <View>
                  <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
                    Dark Theme Mode
                  </Text>
                  <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
                    {isDark ? 'Obsidian Midnight activated' : 'Warm Culinary off-white activated'}
                  </Text>
                </View>
              </View>

              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#E5E7EB', true: colors.primaryContainer }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={[styles.divider, { backgroundColor: isDark ? colors.border : '#F2F4F6' }]} />

            <View style={styles.themeSelectorRow}>
              {(['light', 'dark', 'system'] as const).map((mode) => {
                const isSelected = themeMode === mode;
                return (
                  <TouchableOpacity
                    key={mode}
                    activeOpacity={0.8}
                    onPress={() => setThemeMode(mode)}
                    style={[
                      styles.modeOption,
                      {
                        backgroundColor: isSelected
                          ? colors.primaryContainer
                          : isDark
                          ? colors.surfaceVariant
                          : '#F2F4F6',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        typography.labelMd,
                        {
                          color: isSelected ? '#FFFFFF' : isDark ? '#D1D5DB' : colors.textPrimary,
                          fontWeight: isSelected ? '700' : '500',
                          textTransform: 'capitalize',
                        },
                      ]}
                    >
                      {mode}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Developer / Network Configuration */}
        <View style={styles.section}>
          <Text style={[typography.labelLg, styles.sectionTitle, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
            BACKEND CONFIGURATION
          </Text>

          <View
            style={[
              styles.cardGroup,
              {
                backgroundColor: isDark ? colors.surface : '#FFFFFF',
                borderColor: isDark ? colors.border : '#EFECE6',
                padding: spacing.md,
              },
            ]}
          >
            <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
              REST API Host URL
            </Text>
            <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary, marginTop: 2, marginBottom: spacing.sm }]}>
              Android Emulator uses <Text style={{ fontWeight: '700' }}>http://10.0.2.2:3001</Text>. On physical Wi-Fi phone, set your PC's LAN IP.
            </Text>

            <TextInput
              value={apiUrl}
              onChangeText={setApiUrl}
              autoCapitalize="none"
              autoCorrect={false}
              style={[
                typography.bodyMd,
                styles.urlInput,
                {
                  backgroundColor: isDark ? colors.surfaceVariant : '#F4F1EC',
                  borderColor: isDark ? colors.border : '#E1E2E5',
                  color: isDark ? '#FFFFFF' : colors.textPrimary,
                },
              ]}
            />

            <PrimaryButton
              title="Save & Update Host"
              onPress={handleSaveApiUrl}
              style={styles.saveBtn}
            />
          </View>
        </View>

        {/* Notifications & System Preferences */}
        <View style={styles.section}>
          <Text style={[typography.labelLg, styles.sectionTitle, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
            SYSTEM NOTIFICATIONS & SENSORS
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
            <View style={styles.settingRow}>
              <View style={styles.rowLeft}>
                <Ionicons name="notifications-outline" size={20} color={colors.primaryContainer} />
                <View>
                  <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
                    Order Updates & Delivery Alerts
                  </Text>
                  <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
                    Receive live kitchen & rider notifications
                  </Text>
                </View>
              </View>

              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#E5E7EB', true: colors.primaryContainer }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={[styles.divider, { backgroundColor: isDark ? colors.border : '#F2F4F6' }]} />

            <View style={styles.settingRow}>
              <View style={styles.rowLeft}>
                <Ionicons name="navigate-outline" size={20} color={colors.primaryContainer} />
                <View>
                  <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
                    Precise Location Services
                  </Text>
                  <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
                    Accurate restaurant distance calculation
                  </Text>
                </View>
              </View>

              <Switch
                value={locationServices}
                onValueChange={setLocationServices}
                trackColor={{ false: '#E5E7EB', true: colors.primaryContainer }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* App Version Info */}
        <View style={styles.versionFooter}>
          <Text style={[typography.labelSm, { color: isDark ? '#6B7280' : '#8F9499', textAlign: 'center' }]}>
            FOODIE-EXPRESS v2.0.0 (Academic Build)
          </Text>
          <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary, textAlign: 'center', marginTop: 2 }]}>
            React Native + Expo + Node.js Express REST API
          </Text>
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
  section: {},
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
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
    paddingRight: spacing.sm,
  },
  divider: {
    height: 1,
  },
  themeSelectorRow: {
    flexDirection: 'row',
    padding: spacing.sm,
    gap: spacing.sm,
  },
  modeOption: {
    flex: 1,
    height: 38,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  urlInput: {
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  saveBtn: {
    height: 42,
  },
  versionFooter: {
    marginTop: spacing.sm,
    paddingBottom: spacing.md,
  },
});
