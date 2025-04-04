"use client";

import { User } from "@prisma/client";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useCartStore } from '@/store/cart-store';

type AnalyticsTrackerProps = {
    user: Partial<User> | null;
}
const AnalyticsTracker = ({user}: AnalyticsTrackerProps) => {

    const { cartId } = useCartStore(
        useShallow((state) => ({
            cartId: state.cartId
        }))
    );

    useEffect(() => {
        if(!cartId || user) {
            return;
        }

        try {
            const anyWindow = window as any;

            if(anyWindow.umami) {
                anyWindow.umami.identify({
                    cartId,
                })
            }
        } catch(e) {
            console.log(e);
        }
    }, [cartId]);

    useEffect(() => {
        if(!user) {
            return;
        }

        try {
            const anyWindow = window as any;

            if(anyWindow.umami) {
                anyWindow.umami.identify({
                    email: user.email,
                })
            }
        } catch(e) {
            console.log(e);
        }
    }, [user])

    return <></>
}

export default AnalyticsTracker;