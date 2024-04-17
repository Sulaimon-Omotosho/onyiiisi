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
        const response = await fetch("http://localhost:3000/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: productData,
            email: session?.user?.email,
          }),
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          router.push("/checkout");
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error creating checkout:", error);
        toast.error("Error creating checkout");
      }
    } else {
      router.push("/login");
    }
  };

  return { createCheckout };
};
