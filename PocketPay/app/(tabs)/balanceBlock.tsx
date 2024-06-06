import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface BalanceBlockProps {
    balance: number;
}

const BalanceBlock = ({ balance }: BalanceBlockProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.balance}>Your Balance: {balance}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    balance: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E90FF',
    },
});

export default BalanceBlock;
