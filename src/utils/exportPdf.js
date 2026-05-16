import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

export function exportToPDF(
  data,
  fileName
) {
  const doc = new jsPDF();

  const tableData = data.map(
    (item) => [
      item.type,
      item.amount,
      item.status,
    ]
  );

  autoTable(doc, {
    head: [
      [
        "Type",
        "Amount",
        "Status",
      ],
    ],

    body: tableData,
  });

  doc.save(`${fileName}.pdf`);
}