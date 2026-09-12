import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { FoodieLogo } from '../../components/common/FoodieLogo';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { typography, spacing, radius } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDark } = useTheme();
  const { sendOtp } = useAuth();

  const [phone, setPhone] = useState('9876543210');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    if (!phone || phone.trim().length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const fullPhone = `+91 ${phone.trim()}`;
      const res = await sendOtp(fullPhone);
      if (res.success) {
        navigation.navigate('OTP', { phone: fullPhone, demoOtp: res.demoOtp });
      }
    } catch (e: any) {
      setError(e.message || 'Failed to send OTP. Please check the backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <FoodieLogo size={76} />
          <Text style={[typography.headlineLg, styles.title, { color: isDark ? '#FFFFFF' : '#191C1E' }]}>
            Welcome to Foodie-Express
          </Text>
          <Text style={[typography.bodyMd, styles.subtitle, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
            Sign in or sign up with your mobile number to explore delicious food near you.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={[typography.labelSm, styles.inputLabel, { color: isDark ? '#D1D5DB' : colors.textSecondary }]}>
            MOBILE NUMBER
          </Text>

          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: isDark ? colors.surface : '#FFFFFF',
                borderColor: error ? colors.nonVeg : (isDark ? colors.border : '#EFECE6'),
              },
            ]}
          >
            <View style={[styles.countryCode, { borderRightColor: isDark ? colors.border : '#EFECE6' }]}>
              <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : '#191C1E' }]}>🇮🇳 +91</Text>
            </View>

            <TextInput
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                if (error) setError(null);
              }}
              placeholder="Enter 10-digit number"
              placeholderTextColor={isDark ? '#9CA3AF' : '#8F9499'}
              style={[typography.titleMd, styles.textInput, { color: isDark ? '#FFFFFF' : '#191C1E' }]}
            />
          </View>

          {error ? (
            <Text style={[typography.bodySm, styles.errorText, { color: colors.nonVeg }]}>
              {error}
            </Text>
          ) : (
            <Text style={[typography.labelSm, styles.hintText, { color: isDark ? '#6B7280' : '#8F9499' }]}>
              Academic Demo: Default OTP is <Text style={{ fontWeight: '800' }}>123456</Text>
            </Text>
          )}

          <PrimaryButton
            title="Continue"
            onPress={handleContinue}
            loading={loading}
            style={styles.continueBtn}
          />
        </View>

        <View style={styles.footer}>
          <Text style={[typography.bodySm, { color: isDark ? '#6B7280' : '#8F9499', textAlign: 'center' }]}>
            By continuing, you agree to Foodie-Express Terms of Service and Privacy Policy.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  title: {
    fontWeight: '800',
    textAlign: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 20,
  },
  form: {
    width: '100%',
  },
  inputLabel: {
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  countryCode: {
    paddingHorizontal: spacing.md,
    height: '100%',
    justifyContent: 'center',
    borderRightWidth: 1,
  },
  textInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: spacing.md,
  },
  errorText: {
    marginTop: 6,
    fontWeight: '600',
  },
  hintText: {
    marginTop: 8,
  },
  continueBtn: {
    marginTop: spacing.lg,
    width: '100%',
  },
  footer: {
    marginTop: spacing.xl,
    paddingBottom: spacing.sm,
  },
});
