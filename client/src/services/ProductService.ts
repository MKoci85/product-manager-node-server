import { safeParse, pipe, number, parse, string, transform } from "valibot";
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types"
import axios from "axios";
type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Invalid data')
        }
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if(result.success){
            return result.output
        } else {
            throw new Error('Invalid data')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if(result.success){
            return result.output
        } else {
            throw new Error('Invalid data')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data: ProductData, id: Product['id']) {
    try {
        const NumberSchema = pipe(string(), transform(Number), number())

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: data.availability === 'true' ? true : false
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        } else {
            throw new Error('Invalid data')
        }   
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }   
}

export async function updateAvailability(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url, id)
    } catch (error) {
        console.log(error)
    }
}
