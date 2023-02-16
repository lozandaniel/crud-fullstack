import { useState } from "react"
export function useEdit({ products }) {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: 0
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const updateProduct = async (e, product) => {
    e.preventDefault()
    const newProduct = products.map(el => el.id === product.id ? product : el)
    console.log(newProduct)
    setData(newProduct)
    console.log(data)
    await axios.put('http://localhost:4000/api/products/' + product.id, data)
      .then(res => {
        console.log(res)
      })
  }
  return { handleChange, updateProduct }
}