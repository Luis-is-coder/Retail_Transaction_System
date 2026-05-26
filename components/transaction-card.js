// Name : Pyae Phyo Maung
// Class: DIT/1B/03
// Admin No: 2535128

// Simple transaction card web component
class TransactionCard extends HTMLElement {
  constructor() {
    super();

    // Create shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create card HTML
    shadow.innerHTML = `
      <style>
        .card {
        border: 2px solid #999;
        padding: 20px;
        margin: 10px;
        border-radius: 8px;
        background-color: white;
        transition: transform 0.2s, box-shadow 0.2s;
        position: relative;
        height: auto;
        box-shadow: 0 4px 6px rgba(0,0,0,0.15);
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .card h3 {
          color: #333;
          margin-top: 0;
        }
        .card p {
          margin: 5px 0;
          color: #666;
        }
        .amount {
          font-weight: bold;
          color: green;
          font-size: 18px;
        }
        .rank-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #4CAF50;
          color: white;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: bold;
        }
        .rank-1 { background: gold; color: #333; }
        .rank-2 { background: silver; color: #333; }
        .rank-3 { background: #cd7f32; color: white; }
        .discount-badge {
          display: inline-block;
          background: #ff9800;
          color: white;
          padding: 3px 8px;
          border-radius: 10px;
          font-size: 11px;
          margin-left: 5px;
        }
      </style>
      <div class="card">
        <span id="rankBadge"></span>
        <h3>Customer ID: <span id="customerId"></span></h3>
        <p>Product: <span id="productId"></span></p>
        <p>Quantity: <span id="quantity"></span></p>
        <p>Price: $<span id="price"></span><span id="discountBadge"></span></p>
        <p>Payment: <span id="payment"></span></p>
        <p>Category: <span id="category"></span></p>
        <p class="amount">Total: $<span id="total"></span></p>
      </div>
    `;
  }

  // Called when element is added to page
  connectedCallback() {
    this.shadowRoot.querySelector("#customerId").textContent =
      this.getAttribute("customerid") || "";
    this.shadowRoot.querySelector("#productId").textContent =
      this.getAttribute("productid") || "";
    this.shadowRoot.querySelector("#quantity").textContent =
      this.getAttribute("quantity") || "";
    this.shadowRoot.querySelector("#price").textContent =
      this.getAttribute("price") || "";
    this.shadowRoot.querySelector("#payment").textContent =
      this.getAttribute("payment") || "";
    this.shadowRoot.querySelector("#category").textContent =
      this.getAttribute("category") || "";
    this.shadowRoot.querySelector("#total").textContent =
      this.getAttribute("total") || "";

    // Show rank badge if rank attribute exists
    const rank = this.getAttribute("rank");
    const rankBadge = this.shadowRoot.querySelector("#rankBadge");
    if (rank) {
      rankBadge.className = "rank-badge rank-" + rank;
      rankBadge.textContent = "#" + rank;
    }

    // Show discount badge if discount > 0
    const discount = parseFloat(this.getAttribute("discount") || "0");
    const discountBadge = this.shadowRoot.querySelector("#discountBadge");
    if (discount > 0) {
      discountBadge.className = "discount-badge";
      discountBadge.textContent = discount.toFixed(1) + "% OFF";
    }
  }
}

// Define the custom element
customElements.define("transaction-card", TransactionCard);
