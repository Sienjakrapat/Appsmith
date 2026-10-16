export default {
  generatePDF() {
    const doc = new jspdf.jsPDF();
    const data = PrintQuery.data;
    const customerName = data_table.triggeredRow.customer_name || data_table.triggeredRow.name;
    const receiptDate = data_table.triggeredRow.sale_date;

    // Header ของใบเสร็จ
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("SALES RECEIPT", 105, 15, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Customer Name: ${customerName}`, 14, 30);
    doc.text(`Date: ${receiptDate}`, 14, 37);

    // ดึงข้อมูลแถวสินค้า
    const tableRows = data.map(item => [
      item.product_name,
      item.unit_price,
      item.quantity,
      item.net
    ]);

    doc.autoTable({
      startY: 45,
      head: [["Product", "Unit Price", "Qty", "Total"]],
      body: tableRows,
    });

    // บันทึกลง Store เพื่อแสดงในหน้า Print
    storeValue("print", doc.output("datauristring"));
  }
}