import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';

type BadgeVariant = 'default' | 'accent';

interface BadgeProps {
    label: string;
    variant?: BadgeVariant;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export function Badge({ label, variant = 'default', style, textStyle }: BadgeProps) {
    return (
        <View style={[styles.base, variantStyles[variant], style]}>
            <Text style={[styles.text, variantTextStyles[variant], textStyle]}>
                {label}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
        alignSelf: 'flex-start',
    },
    text: {
        ...typography.caption,
    },
});

const variantStyles: Record<BadgeVariant, ViewStyle> = {
    default: {
        backgroundColor: colors.backgroundSecondary,
    },
    accent: {
        backgroundColor: colors.primary,
    },
};

const variantTextStyles: Record<BadgeVariant, TextStyle> = {
    default: {
        color: colors.textPrimary,
    },
    accent: {
        color: colors.textInverse,
    },
};