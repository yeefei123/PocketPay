import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AddFunction() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Please choose a payment method.</Text>

                <TouchableOpacity style={[styles.button, { backgroundColor: '#007BFF' }]}>
                    <Text style={styles.buttonText}>Bank</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, { backgroundColor: '#28A745' }]}>
                    <Text style={styles.buttonText}>Cash</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    button: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
        width: '90%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
