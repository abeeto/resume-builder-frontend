import { useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';

export const usePdfDownload = (
  componentRef: React.RefObject<HTMLDivElement | null>,
) => {
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'Resume',
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
        * {
          box-shadow: none !important;
        }
      }
    `,
  });

  const downloadPdf = useCallback(() => {
    handlePrint();
  }, [handlePrint]);

  return { downloadPdf };
};
