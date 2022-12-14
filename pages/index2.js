import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function PreviewPage() {
    const router = useRouter();
    const { success, canceled } = router.query;
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        // const query = new URLSearchParams(window.location.search);

      if(success !== undefined || canceled !== undefined) {

        if (success) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (canceled) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }

    }, [success, canceled]);

    return (
        <form action="/api/checkout_sessions" method="POST">
            <section>
                <button type="submit" role="link">
                    Checkout
                </button>
            </section>

        </form>
    );
}