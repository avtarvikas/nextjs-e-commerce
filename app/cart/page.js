"use client";
import React, { useMemo } from "react";
import Wrapper from "../components/Wrapper";
import CartItem from "../components/cartItem/CartItem";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { removeAllFromCart } from "../redux/reducers/cartItem";
import { toast } from "react-toastify";

const Cart = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cartItems.cartItems);

  const subTotal = useMemo(() => {
    return cartItem.reduce((total, val) => total + val.price, 0);
  }, [cartItem]);
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {cartItem.length > 0 && (
          <>
            <div className="text-center max-w-[800px] mx-auto mt-0 md:mt-0">
              <div className="text-[28px]  md:text-[32px] mb-5 font-semibold leading-tight  ">
                Shopping Cart
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              <div className="flex-[2]">
                <div className="text-lg font-bold mb-5">
                  {" "}
                  Cart Items ({cartItem.length})
                </div>
                {cartItem?.map((item, i) => {
                  console.log(item, "iii");
                  return (
                    <div key={i}>
                      <CartItem data={item} />
                    </div>
                  );
                })}
              </div>
              <div className="flex-[1]">
                <div className="text-lg font-bold ">Summary</div>
                <div className="p-5 my-5 bg-black/[.05] rounded-xl ">
                  <div className="flex justify-between">
                    <div className="uppercase text-md md:text-lg font-medium text-black">
                      Subtotal
                    </div>
                    <div className="text-md md:text-lg font-medium text-black">
                      $ {subTotal.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-sm md:text-md py-5 border-t mt-5">
                    The subtotal reflects the total price of your order,
                    including duties and taxes, before any applicable discounts.
                    it dose not include delivery costs and international
                    transition fees.
                  </div>
                </div>
                <button
                  onClick={() => {
                    route.push("/checkout");
                  }}
                  className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}

        {cartItem.length === 0 && (
          <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
            <Image
              src="/assets/empty-cart.jpg"
              alt="empty-cart"
              width={300}
              height={300}
              className="w-[300px] md:w-[400px]"
            />
            <span className="text-xl font-bold">Your cart is empty</span>
            <span className="text-center mt-4">
              Looks like you have not added anything in your cart.
              <br />
              Go ahead and explore to categories
            </span>
            <div
              className="py-4 px-8 rounded-full cursor-pointer bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
              onClick={() => route.push("/")}
            >
              Continue Shopping
            </div>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Cart;
