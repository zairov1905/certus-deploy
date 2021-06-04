import cuid from "cuid";

export const sampleDataDocs = [
 
  {
    id: cuid(),
    docType:"Hesabat",
    docNumber:"A125521B",
    docSubject:"100000",
    docDate:"12.02.2020",
    docPurpose:1,
  },
  {
    id: cuid(),
    docType:"Refarat",
    docNumber:"A125521B",
    docSubject:"100000",
    docDate:"12.02.2020",
    docPurpose:0

  },
  {
    id: cuid(),
    docType:"Ərizə",
    docNumber:"A125521B",
    docSubject:"100000",
    docDate:"12.02.2020",
    docPurpose:1

  },
];
