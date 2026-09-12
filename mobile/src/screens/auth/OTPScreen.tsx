import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { typography, spacing, radius } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'OTP'>;
type RoutePropType = RouteProp<RootStackParamList, 'OTP'>;

export default function OTPScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { phone, demoOtp = '123456' } = route.params;

  const { colors, isDark } = useTheme();
  const { verifyOtp, sendOtp } = useAuth();

  const [otp, setOtp] = useState(demoOtp);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    if (!otp || otp.trim().length !== 6) {
      setError('Please enter the 6-digit OTP code');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const success = await verifyOtp(phone, otp.trim());
      if (success) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
      }
    } catch (e: any) {
      setError(e.message || 'Invalid OTP code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    try {
      setError(null);
      await sendOtp(phone);
      setTimer(30);
    } catch (e: any) {
      setError('Failed to resend OTP.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backBtn, { backgroundColor: isDark ? colors.surface : '#F2F4F6' }]}
        >
          <Ionicons name="arrow-back" size={20} color={isDark ? '#FFFFFF' : colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={[typography.headlineLg, styles.title, { color: isDark ? '#FFFFFF' : '#191C1E' }]}>
          Verify Mobile Number
        </Text>
        <Text style={[typography.bodyMd, styles.subtitle, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
          Enter the 6-digit code sent to <Text style={{ fontWeight: '700' }}>{phone}</Text>
        </Text>

        <View style={styles.inputBox}>
          <TextInput
            value={otp}
            onChangeText={(text) => {
              setOtp(text.replace(/[^0-9]/g, ''));
              if (error) setError(null);
            }}
            keyboardType="number-pad"
            maxLength={6}
            placeholder="• • • • • •"
            placeholderTextColor={isDark ? '#4B5563' : '#CBD5E1'}
            autoFocus
            style={[
              styles.otpInput,
              {
                backgroundColor: isDark ? colors.surface : '#FFFFFF',
                borderColor: error ? colors.nonVeg : colors.primaryContainer,
                color: isDark ? '#FFFFFF' : '#191C1E',
              },
            ]}
          />
        </View>

        {error ? (
          <Text style={[typography.bodySm, styles.errorText, { color: colors.nonVeg }]}>
            {error}
          </Text>
        ) : (
          <Text style={[typography.labelSm, styles.demoHint, { color: isDark ? '#6B7280' : '#8F9499' }]}>
            Demo Mode: Pre-filled with code <Text style={{ fontWeight: '800' }}>123456</Text>
          </Text>
        )}

        <PrimaryButton
          title="Verify & Proceed"
          onPress={handleVerify}
          loading={loading}
          style={styles.verifyBtn}
        />

        <View style={styles.resendRow}>
          <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
            Didn't receive the OTP?{' '}
          </Text>
          <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
            <Text
              style={[
                typography.labelMd,
                {
                  color: timer > 0 ? (isDark ? '#6B7280' : '#9CA3AF') : colors.primaryContainer,
                  fontWeight: '700',
                },
              ]}
            >
              {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  topBar: {
    marginTop: spacing.md,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginTop: spacing.xl,
  },
  title: {
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  subtitle: {
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  inputBox: {
    marginBottom: spacing.sm,
  },
  otpInput: {
    height: 60,
    borderRadius: radius.lg,
    borderWidth: 2,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 12,
  },
  errorText: {
    marginTop: 4,
    fontWeight: '600',
  },
  demoHint: {
    marginTop: 4,
  },
  verifyBtn: {
    marginTop: spacing.xl,
    width: '100%',
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
});
