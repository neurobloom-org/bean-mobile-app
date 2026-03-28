// src/screens/user/PairingScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

const PairingScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>🤖</Text>
                <Text style={styles.title}>Pair Your Robot</Text>
                <Text style={styles.subtitle}>
                    You don't have a robot paired yet. This feature is coming soon!
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.XL,
    },
    emoji: {
        fontSize: 80,
        marginBottom: SPACING.XL,
    },
    title: {
        ...TYPOGRAPHY.H1,
        color: COLORS.TEXT_PRIMARY,
        textAlign: 'center',
        marginBottom: SPACING.MD,
    },
    subtitle: {
        ...TYPOGRAPHY.BODY_LARGE,
        color: COLORS.TEXT_SECONDARY,
        textAlign: 'center',
    },
});

export default PairingScreen;
