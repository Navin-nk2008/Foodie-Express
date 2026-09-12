/**
 * Foodie Stitch Color Design Tokens
 * Exact hex values extracted from Stitch Project 13194954215451445834
 */

export interface ColorTheme {
  isDark: boolean;
  primary: string;
  primaryContainer: string;
  primaryFixed: string;
  primaryFixedDim: string;
  background: string;
  surface: string;
  surfaceVariant: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  outline: string;
  outlineVariant: string;
  veg: string;
  vegContainer: string;
  nonVeg: string;
  nonVegContainer: string;
  star: string;
  amber: string;
  error: string;
  white: string;
  black: string;
  overlay: string;
}

export const lightColors: ColorTheme = {
  isDark: false,
  primary: '#B42901',
  primaryContainer: '#FF5E36',
  primaryFixed: '#FFDAD2',
  primaryFixedDim: '#FFB4A2',
  background: '#F8F9FC',
  surface: '#FFFFFF',
  surfaceVariant: '#E1E2E5',
  surfaceContainerLow: '#F2F4F6',
  surfaceContainer: '#ECEEF0',
  surfaceContainerHigh: '#E7E8EB',
  surfaceContainerHighest: '#E1E2E5',
  card: '#FFFFFF',
  textPrimary: '#191C1E',
  textSecondary: '#5A413A',
  border: '#E3BEB6',
  outline: '#8F7069',
  outlineVariant: '#E3BEB6',
  veg: '#086C47',
  vegContainer: '#9CF1C2',
  nonVeg: '#B4281D',
  nonVegContainer: '#FE5E4B',
  star: '#E68A00',
  amber: '#F59E0B',
  error: '#BA1A1A',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(25, 28, 30, 0.45)',
};

export const darkColors: ColorTheme = {
  isDark: true,
  primary: '#FF6B4A',
  primaryContainer: '#FF5E36',
  primaryFixed: '#FFDAD2',
  primaryFixedDim: '#FFB4A3',
  background: '#0F1117',
  surface: '#1A1D26',
  surfaceVariant: '#222634',
  surfaceContainerLow: '#1A1D26',
  surfaceContainer: '#1E2024',
  surfaceContainerHigh: '#262A38',
  surfaceContainerHighest: '#333539',
  card: '#1A1D26',
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  border: '#2A2E3D',
  outline: '#A88A83',
  outlineVariant: '#2A2E3D',
  veg: '#4EDEA3',
  vegContainer: '#005236',
  nonVeg: '#FFB3AD',
  nonVegContainer: '#68000A',
  star: '#FBBF24',
  amber: '#F59E0B',
  error: '#FFB4AB',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.70)',
};
