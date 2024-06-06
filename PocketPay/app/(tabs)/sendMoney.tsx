import React, { useRef, useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HistoryRef, PaymentHistoryItem } from '../history/history';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  ContactList: undefined;
  ContactDetails: { contactName: string };
};

type ContactDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ContactDetails'>;

interface Props  {
  route: ContactDetailsScreenRouteProp;
  balance: number;
  updateBalance: (newBalance: number) => void;
};

const initialPaymentHistory: PaymentHistoryItem[] = [
    { id: '1', description: 'Grocery Shopping', amount: '-RM150.00', date: '2024-05-20' },
    { id: '2', description: 'Salary', amount: '+RM3000.00', date: '2024-05-18' },
    { id: '3', description: 'Electricity Bill', amount: '-RM200.00', date: '2024-05-15' },
    { id: '4', description: 'Dining Out', amount: '-RM75.00', date: '2024-05-14' },
];

const SendMoney : React.FC<Props> = ({ route, balance, updateBalance }) => {
    const { contactName } = route.params as { contactName: string };
    const [bankValue, setBankValue] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [password, setPassword] = useState("");
    const [isAmountValid, setIsAmountValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = useState('');
    const historyRef = useRef<HistoryRef>(null);

    const handleSendMoney = () => {
        const parsedValue = parseFloat(amount);

        if (isNaN(parsedValue) || parsedValue <= 0 ) {
            console.log("Invalid amount.");
        } 
        else if ((balance - parsedValue) < 0){
            console.log("Not enough balance.");
        }
        else {
            setModalVisible(true);
        }
    };

    const handleSendPress = () => {
        const validPassword = "1234567"; 
        const isPasswordValid = password === validPassword;
        
        if (isPasswordValid) {
            if (historyRef.current) {
                const newTransaction: PaymentHistoryItem = {
                    id: (initialPaymentHistory.length + 1).toString(),
                    description: `Send Money To ${contactName}`,
                    amount: `-RM${amount}`,
                    date: new Date().toISOString().split('T')[0],
                };
                historyRef.current.appendToPaymentHistory(newTransaction);
            }
            console.log('bankInfo',balance);
            const updatedBalance = parseFloat(amount) - balance;
            updateBalance(updatedBalance); 
            console.log('updatedBalance',updatedBalance)
            setModalVisible(false);
            alert('Transaction successfully. Your current balance is RM' + balance);
        } else {
            console.log("Wrong Password Given")
        }
    };

    const handleCancelPress = () => {
        setModalVisible(false);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <View style={styles.inner}>
                        <Text style={styles.title}>
                            Transferring to {contactName}.
                        </Text>

                        <Text style={styles.label}>Transfer Amount:</Text>
                        <TextInput
                            style={[
                                styles.input,
                                !isAmountValid && styles.inputError,
                            ]}
                            placeholder="Enter your amount number"
                            value={amount}
                            onChangeText={setAmount}
                        />
                        {!isAmountValid && (
                            <Text style={styles.errorText}>Invalid amount number.</Text>
                        )}

                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={handleSendMoney}
                        >
                            <Text style={styles.confirmButtonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Enter Password</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.modalButton} onPress={handleCancelPress}>
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.modalButton} onPress={handleSendPress}>
                                    <Text style={styles.modalButtonText}>Send</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    label: {
        alignSelf: "flex-start",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#555",
    },
    input: {
        width: "100%",
        padding: 15,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: "white",
    },
    inputError: {
        borderColor: "red",
    },
    errorText: {
        color: "red",
        alignSelf: "flex-start",
        marginBottom: 10,
    },
    confirmButton: {
        backgroundColor: "#1E90FF",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 20,
    },
    confirmButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    dropdown: {
        height: 50,
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 20,
        width: "100%",
    },
    icon: {
        marginRight: 5,
    },
    dropdownLabel: {
        position: "absolute",
        backgroundColor: "white",
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
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
    modalInput: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 20,
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
});

export default SendMoney;