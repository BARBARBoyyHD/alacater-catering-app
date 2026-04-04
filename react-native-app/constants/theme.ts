/**
 * Alacater Color Guidelines & Design Tokens
 * Reference: docs/projects/02.Color-Guidelines.md
 *
 * Primary Brand: #FF7B00 (Orange)
 * All UI components should use these color tokens for consistency.
 */

import { Platform } from 'react-native';

// Primary Brand Colors
const primaryOrange = '#FF7B00';
const primaryOrangeLight = '#FFF5EB';
const primaryOrangeDark = '#E56E00';

// Secondary Colors
const successGreen = '#1B5E3A';
const successGreenLight = '#2E7D52';
const infoBlue = '#4A6FA5';

// Neutral Colors
const white = '#FFFFFF';
const backgroundGray = '#F5F5F5';
const borderLight = '#E5E5E5';
const borderMedium = '#CCCCCC';
const textPrimary = '#333333';
const textSecondary = '#666666';
const textTertiary = '#999999';

// Semantic Colors
const errorRed = '#FF3B30';
const warningYellow = '#FFB800';
const disabled = '#CCCCCC';

export const Colors = {
  light: {
    // Brand
    primary: primaryOrange,
    primaryLight: primaryOrangeLight,
    primaryDark: primaryOrangeDark,

    // Backgrounds
    background: backgroundGray,
    card: white,
    selectedCard: primaryOrangeLight,

    // Text
    text: textPrimary,
    textSecondary: textSecondary,
    textTertiary: textTertiary,
    onPrimary: white, // Text on primary orange background

    // UI Elements
    border: borderLight,
    borderMedium: borderMedium,
    inputBackground: white,
    inputBorder: borderMedium,
    inputBorderFocused: primaryOrange,
    inputBorderError: errorRed,

    // Semantic
    success: successGreen,
    successLight: successGreenLight,
    info: infoBlue,
    warning: warningYellow,
    error: errorRed,
    disabled: disabled,

    // Status Badges
    shipping: infoBlue,
    delivered: successGreen,
    pending: warningYellow,
    cancelled: errorRed,

    // Icons
    icon: textSecondary,
    iconOnPrimary: white,
    tabIconDefault: textTertiary,
    tabIconSelected: primaryOrange,
  },
  dark: {
    // Brand (adjusted for dark mode per Color Guidelines)
    primary: primaryOrange,
    primaryLight: '#3D2E00', // Darker version of light orange
    primaryDark: primaryOrangeDark,

    // Backgrounds
    background: '#242424',
    card: '#1A1A1A',
    selectedCard: '#3D2E00',

    // Text
    text: '#E0E0E0',
    textSecondary: '#B0B0B0',
    textTertiary: '#808080',
    onPrimary: white,

    // UI Elements
    border: '#3A3A3A',
    borderMedium: '#4A4A4A',
    inputBackground: '#242424',
    inputBorder: '#4A4A4A',
    inputBorderFocused: primaryOrange,
    inputBorderError: errorRed,

    // Semantic
    success: successGreenLight,
    successLight: successGreen,
    info: infoBlue,
    warning: warningYellow,
    error: errorRed,
    disabled: '#505050',

    // Status Badges
    shipping: infoBlue,
    delivered: successGreenLight,
    pending: warningYellow,
    cancelled: errorRed,

    // Icons
    icon: '#B0B0B0',
    iconOnPrimary: white,
    tabIconDefault: '#808080',
    tabIconSelected: primaryOrange,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
