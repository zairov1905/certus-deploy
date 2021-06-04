import cuid from "cuid";

export const sampleDataExpense = [
 
  {
    id: cuid(),
    expenseGroup:"Elektronika",
    expenseType:"Notebook",
    expenseDate:"12.12.2021",
    expenseCounterparty:"Samsung",
    expenseContract:"ABSKA",
    expenseInvoice:"12000AZN",
    operationType:0,
    payment:"",
    paymentType:""
  },
  {
    id: cuid(),
    expenseGroup:"Texnika",
    expenseType:"Kran",
    expenseDate:"12.12.2021",
    expenseCounterparty:"HUB",
    expenseContract:"BSKDSA",
    expenseInvoice:"12000AZN",
    operationType:1,
    payment:"",
    paymentType:""
  },
  {
    id: cuid(),
    expenseGroup:"Məişət",
    expenseType:"Soyuducu",
    expenseDate:"12.12.2021",
    expenseCounterparty:"MAXI",
    expenseContract:"JDSKFSAFJ",
    expenseInvoice:"12000AZN",
    operationType:1,
    payment:"",
    paymentType:""
  },

  
];
