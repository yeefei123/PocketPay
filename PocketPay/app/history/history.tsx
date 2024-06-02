import React, { forwardRef, useImperativeHandle } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

interface PaymentHistoryItem {
    id: string;
    description: string;
    amount: string;
    date: string;
}

interface HistoryRef {
    appendToPaymentHistory: (newItem: PaymentHistoryItem) => void;
}

const renderHistoryItem = ({ item }: { item: PaymentHistoryItem }) => (
    <View key={item.id} style={styles.historyItem}>
        <Text style={styles.historyText}>{item.description}</Text>
        <Text style={styles.historyText}>{item.amount}</Text>
        <Text style={styles.historyDate}>{item.date}</Text>
    </View>
);

const History = forwardRef<HistoryRef, { paymentHistory: PaymentHistoryItem[] }>((props, ref) => {
    const [paymentHistory, setPaymentHistory] = React.useState<PaymentHistoryItem[]>(props.paymentHistory);

    useImperativeHandle(ref, () => ({
        appendToPaymentHistory(newItem: PaymentHistoryItem) {
            setPaymentHistory((currentHistory) => [
                ...currentHistory,
                { ...newItem, id: (currentHistory.length + 1).toString() },
            ]);
        },
        getPaymentHistory() {
            return paymentHistory;
        },
    }));

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.accountHistory}>
                <Text style={styles.historyTitle}>Transaction History</Text>
                <FlatList
                    data={paymentHistory}
                    renderItem={renderHistoryItem}
                    keyExtractor={(item) => item.id}
                    style={styles.historyList}
                />
            </View>
        </SafeAreaView>
    );
});

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
        marginBottom: 10,
        marginTop: 10,
        color: 'white'
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
    },
    historyDate: {
        fontSize: 14,
        color: 'gray',
    },
});

export default History;
export { renderHistoryItem };
export type { HistoryRef, PaymentHistoryItem };

