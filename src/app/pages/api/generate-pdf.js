import { exec } from "child_process";
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const inputPDF = path.join(process.cwd(), "public", "input.pdf");
  const outputPDF = path.join(process.cwd(), "public", "output.pdf");

  // Check if input PDF exists
  if (!fs.existsSync(inputPDF)) {
    fs.writeFileSync(inputPDF, "Placeholder content for the base PDF");
  }

  // Coherent PDF command to add navigation links
  const cpdfCommand = `
    cpdf ${inputPDF} 
    -add-text "Go to Page 2" -topright 50 -fontsize 12 
    -link 50,750,150,770 "page:2" 
    -add-text "Visit Page 3" -topright 70 -fontsize 12 
    -link 50,730,150,750 "page:3" 
    -o ${outputPDF}
  `;

  exec(cpdfCommand, (error) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: "PDF generation failed" });
    }

    res.status(200).json({ message: "PDF generated successfully", url: "/output.pdf" });
  });
}
