import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = (html, pdfMeta) => {
    savePDF(html, pdfMeta);
  };
}

const Doc = new DocService();
export default Doc;
