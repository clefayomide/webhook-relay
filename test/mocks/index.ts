import { ipgHeaderSignatureKey } from '../../src/constant';

export const ipgMockData = {
  body: {
    event: 'TRANSACTION.COMPLETED',
    uuid: '2Xdf35faAyX2Sk5Dalu405rUD',
    timestamp: 1594646111460,
    data: {
      remittanceAmount: 0,
      bankCode: '011',
      amount: 12000,
      paymentReference: 'FBN|WEB|MX6072|13-07-2020|3481032|762672',
      channel: 'WEB',
      splitAccounts: [],
      retrievalReferenceNumber: '000106923853',
      transactionDate: 1594646111460,
      accountNumber: null,
      responseCode: '00',
      token: null,
      responseDescription: 'Approved by Financial Institution',
      paymentId: 3481032,
      merchantCustomerId: 'hhs@gr.la',
      escrow: false,
      merchantReference: '2Xdf35faAyX2Sk5Dalu405rUD',
      currencyCode: '566',
      merchantCustomerName: 'yee tod',
      cardNumber: '561233*********0865',
    },
  },
  header: {
    [ipgHeaderSignatureKey]:
      'b814a610d6750c2a9d1ed42144e2be08e630dd50f45f0ba11760f9f71a615f9aba0d8f98d5467294d0b39cc66987e9a397a90caade7b297409a4720687612db5',
  },
  normalizedEvent: {
    eventType: 'transaction.completed',
    eventId: '2Xdf35faAyX2Sk5Dalu405rUD',
    source: 'ipg',
    data: {
      reference: '2Xdf35faAyX2Sk5Dalu405rUD',
      status: 'successful',
      amount: 12000,
      currency: 'NGN',
      channel: 'WEB',
      timestamp: 1594646111460,
      statusDescription: 'Approved by Financial Institution',
      customer: {
        email: 'hhs@gr.la',
        name: 'yee tod',
      },
    },
    originalEvent:
      '{"event":"TRANSACTION.COMPLETED","uuid":"2Xdf35faAyX2Sk5Dalu405rUD","timestamp":1594646111460,"data":{"remittanceAmount":0,"bankCode":"011","amount":12000,"paymentReference":"FBN|WEB|MX6072|13-07-2020|3481032|762672","channel":"WEB","splitAccounts":[],"retrievalReferenceNumber":"000106923853","transactionDate":1594646111460,"accountNumber":null,"responseCode":"00","token":null,"responseDescription":"Approved by Financial Institution","paymentId":3481032,"merchantCustomerId":"hhs@gr.la","escrow":false,"merchantReference":"2Xdf35faAyX2Sk5Dalu405rUD","currencyCode":"566","merchantCustomerName":"yee tod","cardNumber":"561233*********0865"}}',
  },
};
