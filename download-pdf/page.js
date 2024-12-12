// pages/api/download-pdf.js
import { PDFDocument, rgb } from 'pdf-lib';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const dbData = await fetchDataFromDB(); // Fetch data from your DB

    // Example data structure to be replaced with dbData transformation
    const data = {
      logo: 'https://alpsinsurance.org/wp-content/uploads/2021/09/logo-png-1-300x72.png',
      tableData: {
        headers: ['Feature', 'Plan A', 'Plan B'],
        body: dbData.map((row) => [row.feature, row.plan_a, row.plan_b]), // Use actual column names
      },
    };

    const pdfDoc = await PDFDocument.create();
    const PAGE_WIDTH = 500;
    const PAGE_HEIGHT = 750;

    // Add Pages
    const page1 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

    // Fetch and embed logo
    const logoBytes = await fetch(data.logo).then((res) => res.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const logoDims = logoImage.scale(0.5);

    // Draw logo
    page1.drawImage(logoImage, {
      x: page1.getWidth() / 2 - logoDims.width / 2,
      y: PAGE_HEIGHT - logoDims.height - 10,
      width: logoDims.width,
      height: logoDims.height,
    });

    // Draw some dynamic content
    page1.drawText('Your Insurance Comparison', {
      size: 18,
      x: 50,
      y: PAGE_HEIGHT - 100,
    });

    // Generate table-like content
    let yPosition = PAGE_HEIGHT - 200; // Start Y position for the table

    data.tableData.body.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        page1.drawText(cell, {
          x: 50 + cellIndex * 150,
          y: yPosition - rowIndex * 20, // Space between rows
          size: 12,
          color: cell === 'Not Covered' ? rgb(1, 0, 0) : rgb(0, 0, 0), // Red for "Not Covered"
        });
      });
    });

    const pdfBytes = await pdfDoc.save();
    res.setHeader('Content-Disposition', 'attachment; filename="insurance_comparison.pdf"');
    res.status(200).send(Buffer.from(pdfBytes)); // Ensure correct status code is used
  } catch (error) {
    console.error('Error generating PDF:', error.message);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
}

// Simulated database fetch function, replace with actual DB fetch logic
const fetchDataFromDB = async () => {
  // You can replace this with your actual database fetching code
  return [
    { feature: 'Coverage', plan_a: 'Covered', plan_b: 'Not Covered' },
    { feature: 'Price', plan_a: '$100', plan_b: '$120' },
  ];
};
