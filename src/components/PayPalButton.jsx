import React from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = (props) => {
  return (
    <div>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: props.invoice,
                amount: {
                  value: props.totalvalue,

                }
              }
            ]
          })
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order?.capture();
          console.log("order", order);
          if (order.status==="COMPLETED") {
            props.handlePayment(order)
            //registar el pago con el id
            
          }
        }}
      />
    </div>
  );
};
export default PayPalButton;
