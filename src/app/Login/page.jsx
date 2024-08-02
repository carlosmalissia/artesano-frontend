"use client";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '@/redux/services/usersApi';
import { loginUser, logoutUser } from "@/redux/features/userSlice"
import { Eye, EyeOff, Facebook, } from "lucide-react"
import Link from "next/link";

const Login = () => {

    const dispatch = useDispatch();
    const [login] = useLoginUserMutation();
    const [loginSuccess, setLoginSuccess] = useState(false);

    // validaciones con useForm
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = handleSubmit(async data => {
        console.log(data);

        console.log(errors);



        try {
            const loginResponse = await login(data);
            console.log(loginResponse);

            //if (loginResponse) {

            setLoginSuccess(true);
            dispatch(loginUser(loginResponse.data))

            // Trayendo el shoppinCart del usuario
            /* console.log("aca ", loginResponse.data.user._id);
            const userID = loginResponse.data.user._id
     
            const userById = await axios(`https://pf-15a.up.railway.app/api/users/${userID}`)
            const data = userById.data.shoppingCart
            console.log("data ", data);
     
            data.forEach(element => {
              const getProductById = async () => {
                const productById = await axios(`https://pf-15a.up.railway.app/api/product/${element}`)
                const productData = {
                  _id: productById.data._id,
                  title: productById.data.title,
                  price: productById.data.price,
                  quantity: 1,
                  subtotal: productById.data.price * 1,
                  image: productById.data.image,
                  stock: productById.data.stock,
                }
                console.log("productos ", productData);
                dispatch(addItem(productData));
              }
              getProductById()
            }) */


            /* } else {
              console.error('Error en el inicio de sesión:', loginResponse?.data?.error);
            }
     */
            /* setLoginFormData({
              loginEmail: '',
              loginPassword: '',
            }); */
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }


    })

    //funcion para ocultar la contraseña
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    //const { data, status } = useSession();

    const handleLoginSubmit = () => {

    }
    return (
        <div className="min-h-screen  flex  justify-center bg-white text-brown mt-10">
            <div className="p-4 rounded shadow-xl w-[274px] flex flex-col">
                <h1 className=" text-xl font-bold text-center font-roboto  mx-auto mt-4 mb-2">
                    Iniciar sesión
                </h1>
                <form onSubmit={onSubmit}>
                    {/* Correo Electrónico para inicio de sesión */}
                    <div className="mb-4 mt-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-semibold mb-2"
                        >
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            {...(register("email", {
                                required: {
                                    value: true,
                                    message: "El email es requerido"
                                }
                            }))}
                            id="email"
                            name="email"
                            placeholder="email"
                            className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
                        />
                        {errors.email && (
                            <span className="text-dark-pink text-sm">{errors.email.message}</span>
                        )}
                    </div>

                    {/* Contraseña */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-semibold mb-2"
                        >
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...(register("password", {
                                    required: {
                                        value: true,
                                        message: "La contraseña es requerida"
                                    }
                                }))}
                                id="password"
                                name="password"
                                placeholder="Contraseña"
                                className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                        {errors.password && (
                            <span className="text-dark-pink text-sm">{errors.password.message}</span>
                        )}
                    </div>

                    <div className="mt-2 flex flex-col">

                        <button
                            type="submit"
                            className=" transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mt-2 bg-b-green text-white rounded px-4 py-2 hover:bg-red-800 focus:outline-none"
                        >
                            Iniciar sesión
                        </button>
                        <button
                            type="submit"
                            className="  flex justify-center transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mt-2 bg-amber text-brown rounded px-4 py-2 hover:bg-red-800 focus:outline-none"
                        >
                            <Facebook /> <span className="ml-2">Inicia con facebook</span>
                        </button>
                        <button
                            type="submit"
                            className=" flex  justify-center text-brown transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mt-2 bg-amber  rounded px-4 py-2 hover:bg-red-800 focus:outline-none"
                        >
                            <p className="text-2xl">G</p><span className="ml-3 pt-1">Inicia con google</span>
                        </button>
                        <h2 className="text-center mt-2">¿Aún no tienes cuenta?</h2>
                        <h2 className="text-center">Crear cuenta como</h2>
                        <div className="flex justify-between">
                            <Link href="/Register">
                                <button
                                    type="submit"
                                    className=" transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mt-2 bg-amber text-white rounded px-4 py-2 hover:bg-red-800 focus:outline-none"
                                >
                                    Usuario
                                </button>
                            </Link>
                            <p className="mt-4">´ó</p>
                            <Link href="/SellerRegister">
                                <button
                                    type="submit"
                                    className=" transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mt-2 bg-amber text-white rounded px-4 py-2 hover:bg-red-800 focus:outline-none"
                                >
                                    Vendedor
                                </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
