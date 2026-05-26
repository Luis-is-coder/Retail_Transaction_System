// Name : Pyae Phyo Maung
// Class: DIT/1B/03
// Admin No: 2535128

import { getPaymentMethods, getDataByPayment } from "./api.js";

let currentView = "card"; // Default view
let currentData = []; // Store current data for view switching

let paymentMethodsData = [];

// Load payment methods when page loads
window.addEventListener("load", async function () {
  document.getElementById("loading").style.display = "block";
  document.getElementById("error").style.display = "none";

  try {
    // Fetch payment methods
    paymentMethodsData = await getPaymentMethods();

    // Hide loading
    document.getElementById("loading").style.display = "none";
    document.getElementById("payment-methods").style.display = "block";

    // Create buttons for each payment method
    const container = document.getElementById("methods-container");

    for (let i = 0; i < paymentMethodsData.length; i++) {
      const method = paymentMethodsData[i];
      const methodName = method[0]; // e.g., "Cash"
      const methodSlug = method[1]; // e.g., "cash"

      // Create button
      const button = document.createElement("payment-button");
      button.setAttribute("name", methodName);

      // Add click event
      button.addEventListener("click", function () {
        loadPaymentData(methodName, methodSlug);
      });

      container.appendChild(button);
    }
  } catch (error) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("error").style.display = "block";
    document.getElementById("error").textContent =
      "Error loading payment methods. Please make sure the server is running.";
    console.log("Error:", error);
  }
});

// Load data for selected payment method
async function loadPaymentData(methodName, methodSlug) {
  // Show loading
  document.getElementById("results-container").innerHTML =
    "<p>Loading data for " + methodName + "...</p>";
  document.getElementById("results-container").style.display = "block";

  try {
    // Fetch data for this payment method
    const data = await getDataByPayment(methodSlug);

    // Sort by totalAmount in descending order
    data.sort(function (a, b) {
      return parseFloat(b.totalAmount) - parseFloat(a.totalAmount);
    });

    // Get top 5
    const top5 = data.slice(0, 5);

    // Add rank to data
    top5.forEach((record, index) => {
      record.rank = index + 1;
    });

    // Store data for view switching
    currentData = top5;

    // Calculate total and average
    let totalSum = 0;
    for (let i = 0; i < top5.length; i++) {
      totalSum += parseFloat(top5[i].totalAmount);
    }
    const avgAmount = totalSum / top5.length;

    // Clear container
    const container = document.getElementById("results-container");
    container.innerHTML = "<h2>Top 5 Transactions for " + methodName + "</h2>";
    container.style.display = "grid";

    // Show view toggle buttons
    document.getElementById("view-toggle").style.display = "block";

    // Add summary section
    const summary = document.createElement("div");
    summary.id = "summary-section";
    summary.style.backgroundColor = "#f0f0f0";
    summary.style.padding = "15px";
    summary.style.margin = "20px 0";
    summary.style.textAlign = "center";
    summary.style.borderRadius = "5px";
    summary.innerHTML =
      "<h3>Summary</h3>" +
      "<p><strong>Records Shown:</strong> " +
      top5.length +
      "</p>" +
      "<p><strong>Average Amount:</strong> $" +
      avgAmount.toFixed(2) +
      "</p>" +
      "<p><strong>Total Amount (Top 5):</strong> $" +
      totalSum.toFixed(2) +
      "</p>";
    container.appendChild(summary);

    // Display in current view
    displayDataInView(top5);

    // Add clear button
    const clearBtn = document.createElement("button");
    clearBtn.id = "clear-btn";
    clearBtn.textContent = "Clear Results & Select Another";
    clearBtn.className = "btn";
    clearBtn.style.margin = "20px auto";
    clearBtn.style.display = "block";
    clearBtn.onclick = function () {
      document.getElementById("results-container").style.display = "none";
      document.getElementById("payment-methods").style.display = "block";
      document.getElementById("view-toggle").style.display = "none";
    };
    container.appendChild(clearBtn);
  } catch (error) {
    document.getElementById("results-container").innerHTML =
      '<p style="color: red;">Error loading data.</p>';
    console.log("Error:", error);
  }
}

// Display data in selected view
function displayDataInView(data) {
  const container = document.getElementById("results-container");

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
      card.setAttribute("rank", record.rank);

      // Insert before clear button
      const clearBtn = container.querySelector("#clear-btn");
      container.insertBefore(card, clearBtn);
    }
  } else {
    // Table view
    const table = document.createElement("simple-table");
    table.setData(data);

    // Insert before clear button
    const clearBtn = container.querySelector("#clear-btn");
    container.insertBefore(table, clearBtn);
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
