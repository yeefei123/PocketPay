import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import History, { HistoryRef, PaymentHistoryItem, renderHistoryItem } from '../history/history';


const initialPaymentHistory: PaymentHistoryItem[] = [
    { id: '1', description: 'Grocery Shopping', amount: '-RM150.00', date: '2024-05-20' },
    { id: '2', description: 'Salary', amount: '+RM3000.00', date: '2024-05-18' },
    { id: '3', description: 'Electricity Bill', amount: '-RM200.00', date: '2024-05-15' },
    { id: '4', description: 'Dining Out', amount: '-RM75.00', date: '2024-05-14' },
];


export default function App() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [modalVisible, setModalVisible] = useState(false);
    const [amtModalVisible, setAmtModalVisible] = useState(false);
    const [scannedData, setScannedData] = useState('');
    const [amount, setAmount] = useState('');

    const historyRef = useRef<HistoryRef>(null);

    const handleAddPress = () => {
        setModalVisible(false);
        setAmtModalVisible(true);
    };

    const handleCancelPress = () => {
        setModalVisible(false);
        setAmtModalVisible(false);
    };

    const handleAmountConfirm = () => {
        if (historyRef.current) {
            console.log(renderHistoryItem)
            const newTransaction: PaymentHistoryItem = {
                id: (initialPaymentHistory.length + 1).toString(),
                description: 'New Transaction',
                amount: `+RM${amount}`,
                date: new Date().toISOString().split('T')[0],
            };
            historyRef.current.appendToPaymentHistory(newTransaction);
        }
        console.log(initialPaymentHistory)
        setAmtModalVisible(false);
        alert('Transfer successfully');
    };

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
                <History ref={historyRef} paymentHistory={initialPaymentHistory} />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing((current: CameraType) => (current === 'back' ? 'front' : 'back'));
    }

    function handleCodeScanned({ data }: { data: string }) {
        setScannedData(data);
        setModalVisible(true);
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                onBarcodeScanned={handleCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
            />
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Phone Number: 0177430180</Text>
                        <Text style={styles.modalTitle}>Account Name: Tey Sing Qi</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleCancelPress}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalButton} onPress={handleAddPress}>
                                <Text style={styles.modalButtonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                visible={amtModalVisible}
                animationType="slide"
                onRequestClose={() => setAmtModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Enter Amount to Transfer</Text>
                        <TextInput
                            style={styles.modalInput}
                            keyboardType="numeric"
                            placeholder="Amount"
                            value={amount}
                            onChangeText={setAmount}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleCancelPress}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalButton} onPress={handleAmountConfirm}>
                                <Text style={styles.modalButtonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <History ref={historyRef} paymentHistory={initialPaymentHistory} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#1E90FF',
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
    accountHistory: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
    },
    modalInput: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 20,
    },
});
