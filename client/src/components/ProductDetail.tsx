import { useNavigate, Form, ActionFunctionArgs, redirect, useFetcher } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailProps = {
    product: Product
}

export async function action({params}: ActionFunctionArgs) {
    if(params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect('/')
    }
    return null
}


export default function ProductDetail({ product }: ProductDetailProps) {

    const fetcher = useFetcher()
    const navigate = useNavigate()
  
return (
    <tr className="border-b text-center">
        <td className="p-3 text-lg text-gray-800 text-left">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
            <fetcher.Form method="POST">
                <button
                    type="submit"
                    name="id"
                    value={product.id}
                    className="rounded-lg p-2 text-xs uppercase font-bold w-full border border-black hover:cursor-pointer"
                >
                    {product.availability ? <span className="text-green-500">Available</span> : <span className="text-red-500">Not Available</span>}
                </button>
            </fetcher.Form>
            
        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => navigate(`/products/${product.id}/edit`)}
                    className="rounded-md bg-indigo-600 p-3 w-full text-sm text-white shadow-sm hover:bg-indigo-500"
                >
                    Edit
                </button>
                <Form 
                    className="w-full"
                    method="post"
                    action={`/products/${product.id}/delete`}
                    onSubmit={(e) => {
                       if(!confirm('Are you sure you want to delete this product?')){
                        e.preventDefault()
                       }
                    }}
                >
                    <input
                        type='submit'
                        value='Delete'
                        className="rounded-md bg-red-600 p-3 w-full text-sm text-white shadow-sm hover:bg-red-500"
                    />
                </Form>
            </div>
        </td>
    </tr> 
  )
}
