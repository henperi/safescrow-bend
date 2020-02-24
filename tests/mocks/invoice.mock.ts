export const validInvoiceData = {
  invoiceTitle: 'funny',
  receiverName: 'funny',
  receiverPhone: '01234567890',
  totalAmount: 600,
  receiverEmail: 'funny@funny.com',
  invoiceItems: [
    {
      rate: 50,
      quantity: 2,
      amount: 100,
    },
    {
      rate: 500,
      quantity: 1,
      amount: 500,
    },
  ],
};

export const inValidInvoiceData1 = {
  invoiceTitle: 'funny',
  receiverName: 'funny',
  receiverPhone: '01234567890',
  totalAmount: 600,
  receiverEmail: 'funny@funny.com',
  invoiceItems: [
    {
      rate: 500,
      quantity: 2,
      amount: 100,
    },
    {
      rate: 500,
      quantity: 1,
      amount: 500,
    },
  ],
};

export const inValidInvoiceData2 = {
  invoiceTitle: 'funny',
  receiverName: 'funny',
  receiverPhone: '01234567890',
  totalAmount: 1000,
  receiverEmail: 'funny@funny.com',
  invoiceItems: [
    {
      rate: 50,
      quantity: 2,
      amount: 100,
    },
    {
      rate: 500,
      quantity: 1,
      amount: 500,
    },
  ],
};
