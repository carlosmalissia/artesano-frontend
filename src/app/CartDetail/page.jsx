"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import Link from "next/link"

import CartItem from "@/components/CartItem/CartItem";

const CartDetailPage = () => {

    const dispatch = useAppDispatch();
    const cartItems = useSelector((state) => state.cartReducer.cartItems);


    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2);
    };

    useEffect(() => {
        console.log("Contenido del carrito:", cartItems);
        //handleUpdateCart();
    }, [cartItems]);

    const count = 3;

    return (
        <div className="bg-cream  text-brown mt-10 ">
            <h1 className="text-center text-xl font-bold pt-2">Detalles de la bolsa</h1>
            <h1 className="text-center text-xl font-bold">de compra</h1>
            <div className="md:flex justify-center">
                <div>
                    {cartItems.length > 0 ? (
                        cartItems.map((e, index) => (

                            <CartItem
                                key={e.id}
                                _id={e._id}
                                images={e.images}
                                name={e.name}
                                originalPrice={e.originalPrice}
                                stock={e.stock}
                            />


                        ))

                    ) : (
                        <p className="text-gray-600">
                            El carrito esta vacío.
                            <br />
                            <Link
                                href="/#product"
                                className="underline font-bold text-primary"
                            >
                                <span>Revisa el catalogo para agregar productos</span>
                            </Link>
                        </p>
                    )}
                </div>
                <div className="flex justify-center  overflow-auto md:items-center  md:ml-8">
                    <div className=" flex-col text-center">
                        <div className=" text-sm flex justify-between ">
                            <p>
                                Subtotal
                            </p>
                            <span className="ml-2">$ {calculateTotal()}</span>

                        </div>
                        <div className=" text-sm flex justify-between ">
                            <p>
                                Envío:
                            </p>
                            <span className="ml-2">
                                Gratis
                            </span>
                        </div>
                        <div className=" text-sm flex justify-between ">
                            <p>
                                Total:
                            </p>
                            <span className="ml-2">
                                $ {calculateTotal()}
                            </span>
                        </div>
                        <br />
                        <div className="flex justify-center">
                            <button className="bg-b-green w-[280px] text-cream h-[56px] font-bold text-xl rounded-lg mx-2 text-center whitespace-nowrap hover:bg-brown hover:text-white mb-4">
                                Finalizar Compra
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default CartDetailPage;