import { Pressable, Text, ActivityIndicator, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'primaryLarge';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
  accessibilityLabel?: string;
}

export function Button({ title, onPress, variant = 'primary', disabled, loading, icon, style, textStyle, testID, accessibilityLabel }: ButtonProps) {
  const isDisabled = disabled || loading;
  const textColor = variantTextStyles[variant]?.color ?? colors.textInverse;

  return (
    <Pressable
      style={[styles.base, variantStyles[variant], isDisabled && styles.disabled, style]}
      onPress={onPress}
      disabled={isDisabled}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.textInverse} />
      ) : (
        <View style={styles.content}>
          {icon && <Ionicons name={icon} size={18} color={textColor} style={styles.icon} />}
          <Text style={[styles.text, variantTextStyles[variant], textStyle]}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 10,
    paddingHorizontal: spacing['2xl'],
    borderRadius: borderRadius.button,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    ...shadows.button,
  },
  disabled: { opacity: 0.5 },
  content: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  icon: { marginRight: 6 },
  text: { ...typography.button },
});

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: { backgroundColor: colors.primary },
  primaryLarge: { backgroundColor: colors.primary, borderRadius: borderRadius.buttonLarge, paddingVertical: spacing.lg },
  secondary: { backgroundColor: colors.backgroundSecondary, shadowOpacity: 0 },
  outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border, shadowOpacity: 0 },
  ghost: { backgroundColor: 'transparent', shadowOpacity: 0 },
};

const variantTextStyles: Record<ButtonVariant, TextStyle> = {
  primary: { color: colors.textInverse },
  primaryLarge: { color: colors.textInverse },
  secondary: { color: colors.textPrimary },
  outline: { color: colors.textPrimary },
  ghost: { color: colors.textPrimary },
};
