import jsPDF from "jspdf";
import type { CartItem } from "@/contexts/CartContext";

interface OrderPDFData {
  orderCode: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
}

export const generateOrderPDF = ({ orderCode, customerName, customerEmail, items, total }: OrderPDFData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFillColor(66, 133, 244);
  doc.rect(0, 0, pageWidth, 40, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("GB Optimizers", 20, 22);
  doc.setFontSize(10);
  doc.text("Google Maps Optimization Services", 20, 32);

  // Order info
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Order Confirmation", 20, 58);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Order Code: ${orderCode}`, 20, 70);
  doc.text(`Date: ${new Date().toLocaleDateString("en-AU")}`, 20, 78);
  doc.text(`Customer: ${customerName}`, 20, 86);
  if (customerEmail) doc.text(`Email: ${customerEmail}`, 20, 94);

  // Table header
  let y = 110;
  doc.setFillColor(245, 245, 245);
  doc.rect(20, y - 6, pageWidth - 40, 10, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("SERVICE", 22, y);
  doc.text("TYPE", 120, y);
  doc.text("PRICE (AUD)", 155, y);
  y += 10;

  // Items
  doc.setFont("helvetica", "normal");
  items.forEach((item) => {
    doc.text(item.name.substring(0, 40), 22, y);
    doc.text(item.type, 120, y);
    doc.text(`$${item.price.toFixed(2)}`, 155, y);
    y += 8;
  });

  // Total
  y += 4;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, y, pageWidth - 20, y);
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Total:", 120, y);
  doc.setTextColor(66, 133, 244);
  doc.text(`$${total.toFixed(2)} AUD`, 155, y);

  // Footer
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for choosing GB Optimizers. We will begin working on your services shortly.", 20, 270);
  doc.text("For support, contact us at hello@gboptimizers.com", 20, 278);

  doc.save(`GBO-Order-${orderCode}.pdf`);
};
