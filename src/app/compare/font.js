import { jsPDF } from "jspdf"
var callAddFont = function () {
this.addFileToVFS('Inter-VariableFont_opsz,wght-bold.ttf', font);
this.addFont('Inter-VariableFont_opsz,wght-bold.ttf', 'Inter-VariableFont_opsz,wght', 'bold');
};
jsPDF.API.events.push(['addFonts', callAddFont])
export default font;