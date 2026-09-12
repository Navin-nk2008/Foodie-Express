import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect, Path, Circle } from 'react-native-svg';

interface FoodieLogoProps {
  size?: number;
}

export const FoodieLogo: React.FC<FoodieLogoProps> = ({ size = 64 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 160 160" fill="none">
      <Defs>
        <LinearGradient id="foodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FF6B4A" />
          <Stop offset="100%" stopColor="#FF431A" />
        </LinearGradient>
      </Defs>

      {/* Rounded squircle app icon backdrop */}
      <Rect x="12" y="12" width="136" height="136" rx="36" fill="url(#foodieGrad)" />

      {/* Plate / cloche smile rim */}
      <Path
        d="M42 98C42 114 60 122 80 122C100 122 118 114 118 98"
        stroke="#FFFFFF"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Stylized fork & spoon forming energetic 'F' monogram */}
      <Path d="M52 46V84" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
      <Path
        d="M52 50C62 50 82 48 82 62C82 74 62 74 52 74"
        stroke="#FFFFFF"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="106" cy="56" r="10" fill="#FFE27A" />
      <Path d="M102 74C102 74 112 84 112 92" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
    </Svg>
  );
};
