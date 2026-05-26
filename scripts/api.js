// Name : Pyae Phyo Maung
// Class: DIT/1B/03
// Admin No: 2535128

// API module for fetching data from server
const BASE_URL = "http://localhost:8081";

// Function to get first 5 records
export async function getRetailData() {
  try {
    const response = await fetch(`${BASE_URL}/retailData5`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
}

// Function to get payment methods
export async function getPaymentMethods() {
  try {
    const response = await fetch(`${BASE_URL}/paymentMethod`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching payment methods:", error);
    throw error;
  }
}

// Function to get data by payment method
export async function getDataByPayment(paymentMethod) {
  try {
    const response = await fetch(
      `${BASE_URL}/byPaymentMethod/${paymentMethod}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching data by payment:", error);
    throw error;
  }
}
