import PayPalButton from "../components/PayPalButton";

const Payment = () => {
    return (
        <div> {/* O puedes utilizar un fragment: <>...</> */}
            <h2>PayPal</h2>
            <PayPalButton totalValue={'10.99'} invoice={'cabina numero 1'}></PayPalButton>
        </div>
    );
}

export default Payment;
