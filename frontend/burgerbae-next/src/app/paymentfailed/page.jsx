import React from 'react'
import PaymentUnsuccessful from '@/features/payment/paymentFail'    

export const metadata = {
  title: `Payment Unsuccessful | Burger Bae`,
  description: ` Payment Unsuccessful `,
};

export default function PaymentFailPage()
{
  return (
    <PaymentUnsuccessful/>
  )
}