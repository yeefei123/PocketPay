import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const paymentHistory = [
    { id: '1', description: 'Grocery Shopping', amount: '-RM150.00', date: '2024-05-20' },
    { id: '2', description: 'Salary', amount: '+RM3000.00', date: '2024-05-18' },
    { id: '3', description: 'Electricity Bill', amount: '-RM200.00', date: '2024-05-15' },
    { id: '4', description: 'Dining Out', amount: '-RM75.00', date: '2024-05-14' },
];

interface PaymentHistoryItem {
    id: string;
    description: string;
    amount: string;
    date: string;
}

const renderHistoryItem = ({ item }: { item: PaymentHistoryItem }) => (
    <View style={styles.historyItem}>
        <Text style={styles.historyText}>{item.description}</Text>
        <Text style={styles.historyText}>{item.amount}</Text>
        <Text style={styles.historyDate}>{item.date}</Text>
    </View>
);

export default function History(){
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    return(
        <SafeAreaView style={styles.safeArea}>
        < View style = { styles.accountHistory } >
            <Text style={[styles.historyTitle, , { color: isDarkMode ? 'white' : 'black' }]}>Transaction History</Text>
            <FlatList
            data={paymentHistory}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.id}
            style={styles.historyList}
            />
      </View >
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    accountHistory: {
        flex: 1,
        width: '90%',
        height: '80%',
        alignSelf: 'center',
    },
    historyTitle: {
        fontSize: 20,
        color: 'white',
        marginBottom: 10,
        marginTop: 10,
    },
    historyList: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 10,
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    historyText: {
        fontSize: 14,
        color: 'black',
    },
    historyDate: {
        fontSize: 14,
        color: 'gray',
    },
});
