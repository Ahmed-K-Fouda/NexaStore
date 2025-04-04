"use client";

import { User } from "@prisma/client";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useCartStore } from '@/store/cart-store';

type AnalyticsTrackerProps = {
    user: Partial<User> | null;
}
interface UmamiWindow extends Window {
  umami?: {
    track: (
      eventName: string,
      data: { cartId: string; totalPrice: number; currency: string }
    ) => void;
    identify: (data: { cartId?: string; email?: string | null }) => void;
  };
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
      const umamiWindow = window as UmamiWindow;
      umamiWindow.umami?.identify({ cartId });
    } catch (e) {
      console.log(e);
    }
    }, [cartId,user]);

    useEffect(() => {
        if(!user) {
            return;
        }

        try {
      const umamiWindow = window as UmamiWindow;
      umamiWindow.umami?.identify({ email: user.email });
    } catch (e) {
      console.log(e);
    }
  }, [user?.email]);

    return <></>
}

export default AnalyticsTracker;