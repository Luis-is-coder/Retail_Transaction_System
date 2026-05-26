// Name : Pyae Phyo Maung
// Class: DIT/1B/03
// Admin No: 2535128

// Simple payment method button component
class PaymentButton extends HTMLElement {
  constructor() {
    super();

    // Create shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create button
    const button = document.createElement("button");
    button.id = "btn";

    // Default text
    button.textContent = "Payment Method";
    button.style.backgroundColor = "#4CAF50";
    button.style.color = "white";
    button.style.padding = "15px 30px";
    button.style.margin = "10px";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.fontSize = "16px";

    // Add hover effect
    button.onmouseover = function () {
      this.style.backgroundColor = "#45a049";
    };
    button.onmouseout = function () {
      this.style.backgroundColor = "#4CAF50";
    };

    // Append to shadow root
    shadow.appendChild(button);
  }

  // Called when element is added to page
  connectedCallback() {
    const button = this.shadowRoot.querySelector("#btn");
    button.textContent = this.getAttribute("name") || "Payment Method";
  }
}

// Define the custom element
customElements.define("payment-button", PaymentButton);
