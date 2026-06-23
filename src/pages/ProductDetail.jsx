import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { productService } from "@/services/productService"

export default function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadProduct() {
            try {
                setError(null)
                const data = await productService.getProductById(id)
                setProduct(data)
            } catch (err) {
                setError(err.message)
            }
        }

        loadProduct()
    }, [id])

    if (error) return <div className="text-red-600 p-4">{error}</div>
    if (!product) return <div className="p-4">Loading...</div>

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6">
            {product.image_url && (
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="rounded-xl mb-4 w-full h-48 object-cover"
                />
            )}
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-1">Kategori: -</p>
            <p className="text-gray-600 mb-1">Brand: -</p>
            <p className="text-gray-800 font-semibold text-lg">
                Harga: Rp {Number(product.price || 0).toLocaleString("id-ID")}
            </p>
        </div>
    )
}
