"use client";
import { useGetProductByIdQuery } from "@/redux/services/productApi";
import Image from "next/image";

export default function DetailID({ params }) {
    const { _id } = params;

    const {
        data: productById,
        error,
        isLoading,
        isFetching,
    } = useGetProductByIdQuery(_id, {
        refetchOnMountOrArgChange: true,
        refetchInterval: 4000,
    });

    if (isLoading || isFetching) return <p className="mt-15 text-cream">Cargando...</p>;

    if (error) {
        console.error("Error al obtener el producto:", error);
        return <p className="mt-15 text-cream">Hubo un error al obtener el producto.</p>;
    }
    console.log(productById);





    return (
        <div className="bg-cream text-brown min-h-screen">

            <div className="container mx-auto p-4 mt-10">
                <a href="#" className="text-xl underline">&#8592; Volver</a>
                <h1 className="text-center text-xl font-bold pt-2">Detalles del Producto</h1>
                <div className="md:flex  md:gap-2">
                    <div className="mx-auto mt-4 w-[205px] md:w-[50%] h-[161px] md:h-[300px] border-solid border-2 bg-amber">
                        <div>
                            <Image
                                src={productById.data.product.images[0]}
                                alt={productById.data.product.name}
                                width={620}
                                height={300}
                                priority={true}
                                className="mt-2  md:mt-6 m-auto border-none object-contain w-[242px] h-[140px] md:w-[500px] md:h-[240px] transition-transform transform hover:scale-110"
                            />
                        </div>

                    </div>

                    <div className="product-info  md:justify-center md:w-[50%] border-t border-gray-300 mt-4 pt-4">
                        <div className="flex justify-around">
                            <h2 className="text-2xl font-bold">$ {productById.data.product.originalPrice} </h2>
                            <div className="rating flex items-center gap-2 my-2">
                                <span className="text-yellow-500">★★★★★</span>
                                <span className="text-gray-600">(50000)</span>
                            </div>
                        </div>
                        <p className="description my-2 text-xl font-bold text-center">
                            {productById.data.product.name}
                        </p>
                        <span className="text-center md:mx-4">{productById.data.product.description} </span>


                        <div className="additional-info flex text-center flex-col gap-1 my-2">
                            <span>Envíos a todo el país</span>
                            <span>No se acepta devolución</span>
                            <span>Tablas.Deco.SG</span>
                            <span>CABA, Argentina</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center md:gap-4">
                    <div className="action-buttons flex gap-1 md:gap-4 mt-4">
                        <button className="bg-brown text-cream py-2 px-1 rounded-lg">3 cuotas con tarjeta</button>
                        <button className="bg-brown text-cream py-2 px-1 rounded-lg">5 en stock</button>
                        <button className="bg-b-green text-cream py-2 px-4 rounded-lg hover:bg-brown hover:text-white">Ir a la bolsa</button>
                    </div>
                    <div className="product-info border-t border-gray-300 mt-4 pt-4"></div>

                </div>
            </div>
        </div>
    );
}