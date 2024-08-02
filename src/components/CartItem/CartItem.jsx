"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react"
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getCartData, removeItem, updateQuantity } from "@/redux/features/cart";
import { toast, Toaster } from 'react-hot-toast';


const CartItem = ({ _id, name, originalPrice, images, stock }) => {

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        /* if (newQuantity > productById.stock) {
          setQuantity(productById.stock);
        } else {
          setQuantity(newQuantity);
        } */
        setQuantity(newQuantity);
    };

    // Elimino del localStorage y de la BD
    const dispatch = useAppDispatch();

    const handleRemoveItem = async (_id) => {
        dispatch(removeItem({ _id }));
        //handleUpdateCart();
        toast.success("Removido del carrito")
    };


    return (
        <div className=" flex justify-between h-15 bg-amber my-2 mx-2">
            <Image
                src={images}
                alt={name}
                width={130}
                height={120}
                className="object-contain w-20 h-20 ml-4 mt-4"
            />
            <div className="mx-4 pt-2 w-[207px]">
                <div className=" text-sm text-center mb-2">
                    {name}
                </div>
                <div className="text-center ">
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="border rounded-md p-1 w-16 text-black"
                    />
                </div>
                <div className=" flex justify-end gap-10 text-dark-pink text-center pt-5 ml-10">
                    {originalPrice}
                    <button
                        onClick={() => handleRemoveItem(_id)}>

                        <Trash2 />
                    </button>
                </div>
            </div>
        </div>
    )
}
export default CartItem;