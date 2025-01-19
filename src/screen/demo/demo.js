import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { makeStyles } from 'react-native-elements';

export default function DashboardScreen() {
  return (
    <SafeAreaView contentContainerStyle={styles.container}>
      <View style={{ backgroundColor: "" }}>
        <LinearGradient colors={['#4361EE', '#8C3FFF']} style={{ width: "100%", height: "30%" }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "20%", borderWidth: 1, height: 50, borderRadius: 40 }}>
              <Text>User Icon</Text>
            </View>
            <View style={{ width: "60%", borderWidth: 1 }}>
              <Text>User Icon</Text>
            </View>
            <View style={{ width: "10%", borderWidth: 1 }}>
              <Text>User</Text>
            </View>
            <View style={{ width: "10%", borderWidth: 1 }}>
              <Text> Icon</Text>
            </View>
          </View>
          <View style={{ marginTop: "35%", alignSelf: "center", height: 213, width: "90%", backgroundColor: "#fff", position: "absolute", zIndex: 999 }}>
            <Text >ddddd</Text>
          </View>
        </LinearGradient>
        <View style={{ borderWidth: 1, backgroundColor: "red", height: "70%" }}>
          {/* Buttons */}
          <View style={{width:"90%",alignSelf:"center"}}>
            <View style={[styles.buttonsContainer, { marginTop: "40%" }]}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Budget</Text>
                <Icon name="plus" size={18} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Subscription</Text>
                <Icon name="plus" size={18} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4F4F4',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
  },
  iconRow: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginHorizontal: 10,
  },
  expensesOverview: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  totalExpenses: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  totalLabel: {
    color: '#777',
    fontSize: 14,
  },
  savings: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  savingsLabel: {
    color: '#777',
    fontSize: 14,
  },
  expenseCategories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  progressBarContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    color: '#007AFF',
    fontSize: 16,
  },
  billContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  billItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  billTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  billName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  billDue: {
    fontSize: 14,
    color: '#888',
  },
  billAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
