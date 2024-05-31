import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.historyText}>Alex</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container:{
    alignContent: 'center',
    justifyContent: 'center'
  },
  header:{

  },
  body:{

  },
  historyText:{
    color: 'white'
  },
  bodyContent:{

  },
  info:{

  },
  buttonContainer:{

  }
});
