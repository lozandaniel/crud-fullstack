import { useState } from "react"
import { CloseIcon } from "./Icons"

export function EditProduct({ setEdit, products, product }) {
  console.log

  const [data, setData] = useState({
    name: '',
    description: '',
    price: 0
  })

  const handleChange = (e) => {
    setData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const updateProduct = async (e, product) => {
    e.preventDefault()
    await axios.put('http://localhost:4000/api/products/' + product.id, data)
      .then(res => {
        console.log(res)
      })
  }

  return (
    <dialog open className='w-full h-96 absolute top-[0] backdrop-blur-xl backdrop-brightness-100 rounded-lg z-10'>
      <div className='flex justify-between items-center w-3/5 mx-auto'>
        <h2 className='font-lilita-one text-3xl font-bold py-4' >Editar producto</h2>
        <button onClick={() => setEdit(false)}>
          <CloseIcon />
        </button>
      </div>
      <form onSubmit={(e) => updateProduct(e, product)} className='flex flex-col justify-center items-center gap-y-2 [&>input]:w-3/5'>
        <input onChange={handleChange} name='name' type="text" placeholder='Nombre del producto...' className='px-3 py-2 rounded-lg' />
        <input onChange={handleChange} name='description' type="text" placeholder='Descripcion del producto...' className='px-3 py-2 rounded-lg' />
        <input onChange={handleChange} name='price' type="number" placeholder='Price' className='px-3 py-2 rounded-lg' />
        <input className='bg-sky-600 px-4 py-2 rounded-lg transition hover:bg-sky-400 cursor-pointer font-semibold' type='submit'
          value={'Editar'} />
      </form>
    </dialog>
  )
}