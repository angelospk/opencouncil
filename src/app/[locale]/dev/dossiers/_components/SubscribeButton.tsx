"use client";

import { useState } from "react";
import { Bell, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Mock subscribe button for the demo — toggles local state only, no persistence.
 */
export function SubscribeButton({ subscribers }: { subscribers: number }) {
    const [subscribed, setSubscribed] = useState(false);
    const count = subscribers + (subscribed ? 1 : 0);

    return (
        <Button
            variant={subscribed ? "default" : "outline"}
            onClick={() => setSubscribed((s) => !s)}
            className="gap-2"
        >
            {subscribed ? <BellRing className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
            {subscribed ? "Ακολουθείτε" : "Ακολουθήστε τον φάκελο"}
            <span className="opacity-70">· {count}</span>
        </Button>
    );
}
