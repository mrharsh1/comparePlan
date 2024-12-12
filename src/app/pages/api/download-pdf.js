// /src/pages/api/download-pdf.js
import { PDFDocument, rgb } from 'pdf-lib';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    // Simulated data for now. Replace it with real data or DB logic
    const dbData = await fetchDataFromDB();

    const data = {
      logo: '/assets/logo.png', // Assuming logo image is stored in public/assets
      tableData: {
        headers: ['Feature', 'Plan A', 'Plan B'],
        body: dbData.map((row) => [row.feature, row.plan_a, row.plan_b]),
      },
    };

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([500, 750]);

    // Add the logo to the page
    const logoBytes = await fetch(data.logo).then((res) => res.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const logoDims = logoImage.scale(0.5);

    // Position the logo at the top of the page
    page.drawImage(logoImage, {
      x: page.getWidth() / 2 - logoDims.width / 2,
      y: 750 - logoDims.height - 10,
      width: logoDims.width,
      height: logoDims.height,
    });

    // Add the document title
    page.drawText('Insurance Comparison', {
      size: 18,
      x: 50,
      y: 650,
    });

    // Draw the table headers and data
    let yPosition = 600;
    data.tableData.body.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        page.drawText(cell, {
          x: 50 + cellIndex * 150,
          y: yPosition - rowIndex * 20,
          size: 12,
          color: cell === 'Not Covered' ? rgb(1, 0, 0) : rgb(0, 0, 0),
        });
      });
    });

    // Generate the PDF file as a byte array
    const pdfBytes = await pdfDoc.save();

    // Set the response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="insurance_comparison.pdf"');
    res.status(200).send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Error generating PDF:', error.message);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
}

// Simulated database fetch logic for demonstration purposes
const fetchDataFromDB = async () => {
  return [
    { feature: 'Coverage', plan_a: 'Covered', plan_b: 'Not Covered' },
    { feature: 'Price', plan_a: '$100', plan_b: '$120' },
  ];
};
