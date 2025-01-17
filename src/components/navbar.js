"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import { getlogindata } from "@/redux/features/userSlice";
import { useDispatch } from "react-redux";
import { PackageSearchIcon, ShoppingBagIcon, BadgeDollarSignIcon, SignatureIcon, NfcIcon, Menu, User, X, Home } from "lucide-react";

export default function Navbar() {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const userData = useAppSelector((state) => state.loginReducer.user);
    console.log("userData", userData);
    const userName = userData?.name;
    const firstName = userName?.split(" ", 1)

    const dispatch = useDispatch();
    const { status } = useSession();

    //items del carrito
    const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    useEffect(() => {
        const count = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartItemsCount(count);
        dispatch(getlogindata());
    }, [cartItems]);

    //data nav
    const navlinks = [
        {
            nombre: "Inicio",
            icono: <Home />,
            link: "/",
        },
        {
            nombre: "Productos",
            icono: <PackageSearchIcon />,
            link: "/#products",
        },
        {
            nombre: "Sos Vendedor",
            icono: <BadgeDollarSignIcon />,
            link: "/SellerRegister",
        },
        {
            nombre: "Quienes somos",
            icono: <SignatureIcon />,
            link: "/us",
        },
        {
            nombre: "Contacto",
            icono: <NfcIcon />,
            link: "/contact",
        },
    ];

    const handleMenu = () => {
        setOpen((prev) => !prev);
    };

    return (
        <>
            <div className='flex items-center w-full fixed top-0 z-50 justify-around mx-auto lg:max-w-full bg-amber'>
                <div className='flex md:hidden'>
                    {open === true ? (
                        <X
                            strokeWidth="1"
                            className="cursor-pointer text-brown text-opacity-80"
                            onClick={handleMenu}
                        />
                    ) : (
                        <Menu
                            strokeWidth="1"
                            className="cursor-pointer text-brown  "
                            onClick={handleMenu}
                        />
                    )}
                </div>

                <Link href={"/"}>
                    <h1 className='text-3xl text-dark-aqua cursor-pointer'>
                        <span className='font-bold text-brown text-4xl'>AR</span>tesano
                    </h1>
                </Link>

                <div className='hidden md:flex lg:flex'>
                    <div className='flex items-center space-x-3'>
                        {navlinks.map((link, index) => (
                            <Link
                                key={index}
                                className=' text-center text-nowrap hover:text-light-brown block px-3 pt-3 rounded-md text-brown text-sm'
                                href={link.link}
                            >
                                {link.nombre}
                            </Link>
                        ))}

                    </div>
                </div>

                <div className='flex items-center justify-between gap-5'>
                    <Link href="/Login">
                        <div className="flex flex-nowrap items-center cursor-pointer text-xs text-brown hover:text-light-brown">
                            <User strokeWidth={1} />
                            {userName && status === 'unauthenticated' ? (
                                <p className="hover:underline underline-offset-1"> {firstName}</p>
                            ) : (
                                <p className="hover:underline underline-offset-1"> Ingresá</p>
                            )}
                        </div>
                    </Link>
                    <Link href="/CartDetail">
                        <div className="flex">
                            <ShoppingBagIcon strokeWidth="1" className='cursor-pointer  text-brown  hover:text-light-brown' />
                            <span className=" text-brown pl-1">{cartItemsCount}</span>
                        </div>
                    </Link>
                </div>
            </div>

            <div className='md:hidden'>
                {open ? (
                    <dialog className='flex flex-col items-start pt-2 pb-3 space-y-1 bg-cream bg-opacity-70 text-brown m-0'>
                        {navlinks.map((link, index) => (
                            <Link
                                key={index}
                                className='flex items-center gap-2 px-3 py-2 text-xs hover:text-light-brown hover:underline underline-offset-1'
                                href={link.link}
                            >
                                {link.icono}
                                {link.nombre}
                            </Link>
                        ))}
                    </dialog>
                ) : null}
            </div>
        </>
    );
}