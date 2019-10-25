import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = html => {
    savePDF(html, {
      paperSize: 'A4',
      fileName: 'Service Detail.pdf',
      margin: 3,
      scale: 0.6
    });
  };
}

const Doc = new DocService();
export default Doc;
