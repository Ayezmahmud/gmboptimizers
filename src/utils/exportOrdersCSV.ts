interface OrderForExport {
  order_code: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  customer_address: string | null;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  items: { service_name: string; price: number; progress_percentage: number; progress_notes: string | null }[];
}

const escapeCSV = (val: string) => {
  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
};

export const exportOrdersToCSV = (orders: OrderForExport[]) => {
  const headers = [
    "Order Code",
    "Customer Name",
    "Customer Email",
    "Customer Phone",
    "Customer Address",
    "Total Amount (AUD)",
    "Payment Status",
    "Order Status",
    "Order Date",
    "Service Name",
    "Service Price (AUD)",
    "Progress (%)",
    "Progress Notes",
  ];

  const rows: string[][] = [];

  for (const order of orders) {
    if (order.items.length === 0) {
      rows.push([
        escapeCSV(order.order_code),
        escapeCSV(order.customer_name),
        escapeCSV(order.customer_email),
        escapeCSV(order.customer_phone || ""),
        escapeCSV(order.customer_address || ""),
        Number(order.total_amount).toFixed(2),
        order.payment_status === "received" ? "Paid" : "Unpaid",
        order.status.replace(/_/g, " "),
        new Date(order.created_at).toLocaleDateString("en-AU"),
        "",
        "",
        "",
        "",
      ]);
    } else {
      for (const item of order.items) {
        rows.push([
          escapeCSV(order.order_code),
          escapeCSV(order.customer_name),
          escapeCSV(order.customer_email),
          escapeCSV(order.customer_phone || ""),
          escapeCSV(order.customer_address || ""),
          Number(order.total_amount).toFixed(2),
          order.payment_status === "received" ? "Paid" : "Unpaid",
          order.status.replace(/_/g, " "),
          new Date(order.created_at).toLocaleDateString("en-AU"),
          escapeCSV(item.service_name),
          Number(item.price).toFixed(2),
          String(item.progress_percentage),
          escapeCSV(item.progress_notes || ""),
        ]);
      }
    }
  }

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `orders-export-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
