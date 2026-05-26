// Name : Pyae Phyo Maung
// Class: DIT/1B/03
// Admin No: 2535128

import { getRetailData } from "./api.js";

let currentView = "card"; // Default view
let currentData = []; // Store current data for view switching

// Load and display data when page loads
window.addEventListener("load", async function () {
  // Show loading message
  document.getElementById("loading").style.display = "block";
  document.getElementById("error").style.display = "none";
  document.getElementById("data-container").style.display = "none";

  try {
    // Fetch data from API
    const data = await getRetailData();

    // Sort by customerID in ascending order
    data.sort(function (a, b) {
      return parseInt(a.customerID) - parseInt(b.customerID);
    });

    // Store data for view switching
    currentData = data;

    // Hide loading
    document.getElementById("loading").style.display = "none";

    // Show data container
    const container = document.getElementById("data-container");
    container.style.display = "grid";

    // Show view toggle buttons
    document.getElementById("view-toggle").style.display = "block";

    // Calculate total amount
    let totalSum = 0;
    for (let i = 0; i < data.length; i++) {
      totalSum += parseFloat(data[i].totalAmount);
    }

    // Create summary section
    const summary = document.createElement("div");
    summary.id = "summary-section";
    summary.style.backgroundColor = "#f0f0f0";
    summary.style.padding = "15px";
    summary.style.margin = "20px 0";
    summary.style.textAlign = "center";
    summary.style.borderRadius = "5px";
    summary.innerHTML =
      "<h3>Summary</h3>" +
      "<p><strong>Total Records:</strong> " +
      data.length +
      "</p>" +
      "<p><strong>Total Amount:</strong> $" +
      totalSum.toFixed(2) +
      "</p>";
    container.appendChild(summary);

    // Display in current view
    displayDataInView(data);
  } catch (error) {
    // Show error message
    document.getElementById("loading").style.display = "none";
    document.getElementById("error").style.display = "block";
    document.getElementById("error").textContent =
      "Error loading data. Please make sure the server is running.";
    console.log("Error:", error);
  }
});

// Display data in selected view
function displayDataInView(data) {
  const container = document.getElementById("data-container");

  // Remove old cards or table
  const oldCards = container.querySelectorAll("transaction-card");
  oldCards.forEach((card) => card.remove());
  const oldTable = container.querySelector("simple-table");
  if (oldTable) oldTable.remove();

  if (currentView === "card") {
    // Card view
    for (let i = 0; i < data.length; i++) {
      const record = data[i];

      const card = document.createElement("transaction-card");
      card.setAttribute("customerid", record.customerID);
      card.setAttribute("productid", record.productID);
      card.setAttribute("quantity", record.quantity);
      card.setAttribute("price", record.price);
      card.setAttribute("payment", record.paymentMethod);
      card.setAttribute("category", record.productCategory);
      card.setAttribute("total", record.totalAmount);
      card.setAttribute("discount", record.discountAppliedInPercentage || "0");

      container.appendChild(card);
    }
  } else {
    // Table view
    const table = document.createElement("simple-table");
    table.setData(data);
    container.appendChild(table);
  }
}

// Switch to card view
function switchToCardView() {
  currentView = "card";
  document.getElementById("cardViewBtn").style.backgroundColor = "#4CAF50";
  document.getElementById("tableViewBtn").style.backgroundColor = "#777";
  displayDataInView(currentData);
}

// Switch to table view
function switchToTableView() {
  currentView = "table";
  document.getElementById("cardViewBtn").style.backgroundColor = "#777";
  document.getElementById("tableViewBtn").style.backgroundColor = "#4CAF50";
  displayDataInView(currentData);
}

// Add event listeners for view toggle buttons
document
  .getElementById("cardViewBtn")
  .addEventListener("click", switchToCardView);
document
  .getElementById("tableViewBtn")
  .addEventListener("click", switchToTableView);
