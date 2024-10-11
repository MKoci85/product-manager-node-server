import { LoaderFunctionArgs } from "react-router-dom";
import { getProductById, getProducts } from "../services/ProductService";

export async function productLoader() {
    const products = await getProducts()
    return { products }
}

export async function editProductLoader({params}: LoaderFunctionArgs) {
    if(params.id !== undefined){
        const product = await getProductById(+params.id)
        if(!product){
            throw new Response('', {status: 404, statusText: 'Product not found'})
        }
        return {product}
    }
}