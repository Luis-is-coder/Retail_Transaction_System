// Name : Pyae Phyo Maung
// Class: DIT/1B/03
// Admin No: 2535128

// Simple table component for displaying transactions
class SimpleTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  setData(data) {
    this.render(data);
  }

  render(data) {
    this.shadowRoot.innerHTML = `
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          min-width: 100%;
        }
        :host {
          display: block;
          width: 100%;
          grid-column: 1 / -1;
        }
        th {
          background-color: #333;
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: bold;
        }
        td {
          padding: 10px 12px;
          border-bottom: 1px solid #ddd;
        }
        tr:hover {
          background-color: #f5f5f5;
        }
        .rank-badge {
          display: inline-block;
          background: #4CAF50;
          color: white;
          padding: 3px 8px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: bold;
        }
        .rank-1 { background: gold; color: #333; }
        .rank-2 { background: silver; color: #333; }
        .rank-3 { background: #cd7f32; color: white; }
        .discount {
          background: #ff9800;
          color: white;
          padding: 2px 6px;
          border-radius: 8px;
          font-size: 10px;
          margin-left: 5px;
        }
      </style>
      <table>
        <thead>
          <tr>
            ${data[0] && data[0].rank ? "<th>Rank</th>" : ""}
            <th>Customer ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Payment</th>
            <th>Category</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              (record) => `
            <tr>
              ${record.rank ? `<td><span class="rank-badge rank-${record.rank}">#${record.rank}</span></td>` : ""}
              <td>${record.customerID}</td>
              <td>${record.productID}</td>
              <td>${record.quantity}</td>
              <td>$${parseFloat(record.price).toFixed(2)}${record.discountAppliedInPercentage > 0 ? `<span class="discount">${record.discountAppliedInPercentage.toFixed(1)}% OFF</span>` : ""}</td>
              <td>${record.paymentMethod}</td>
              <td>${record.productCategory}</td>
              <td><strong>$${parseFloat(record.totalAmount).toFixed(2)}</strong></td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
    `;
  }
}

customElements.define("simple-table", SimpleTable);
