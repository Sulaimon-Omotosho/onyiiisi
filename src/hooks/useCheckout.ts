"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCheckout = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const createCheckout = async (productData: any[]) => {
    if (session?.user) {
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: productData,
            email: session?.user?.email,
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error("Error during checkout:", errorData);
          toast.error("Error during checkout. Please try again.");
          return;
        }

        const data = await response.json();
        router.push("/checkout");
      } catch (error) {
        console.error("Error during checkout:", error);
        toast.error("Error during checkout. Please try again.");
      }
    } else {
      toast.error("Please sign in to make Checkout");
      router.push("/login");
    }
  };

  return { createCheckout };
};
