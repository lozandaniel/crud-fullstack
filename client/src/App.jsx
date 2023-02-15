import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { CloseIcon } from './components/Icons'

function EditProduct({ form, setEdit, products, product }) {

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
        return (
          <div class="flex p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800 z-10" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">Success alert!</span> {res.status}
            </div>
          </div>
        )
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
        <input onChange={handleChange} name='name' type="text" placeholder='Nombre del producto...' defaultValue={form.name} className='px-3 py-2 rounded-lg' />
        <input onChange={handleChange} name='description' type="text" placeholder='Descripcion del producto...' defaultValue={form.description} className='px-3 py-2 rounded-lg' />
        <input onChange={handleChange} name='price' type="number" placeholder='Price' defaultValue={form.price} className='px-3 py-2 rounded-lg' />
        <input className='bg-sky-600 px-4 py-2 rounded-lg transition hover:bg-sky-400 cursor-pointer font-semibold' type='submit'
          value={'Editar'} />
      </form>
    </dialog>
  )
}

function App() {
  const [edit, setEdit] = useState(null)
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null)
  const [form, setForm] = useState({
    id: Date.now(),
    name: "",
    description: "",
    price: null
  });

  useEffect(() => {
    axios.get('http://localhost:4000/api/products')
      .then(res => {
        setProducts(res.data)
      })
      .catch(err => console.log(err))
  }, [])


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/api/products', form)
    setProducts([...products, form])
    console.log(form)
  };

  const updateProduct = (prod) => {
    setEdit(true)
    setProduct(prod)
    console.log(prod)
  }

  const deleteProduct = (id) => {
    axios.delete('http://localhost:4000/api/products/' + id, form)
    setProducts(products.filter((task) => task.id !== id));
  }


  return (
    <div>
      <h2 className='font-lilita-one text-5xl font-bold py-4'>LISTA DE PRODUCTOS</h2>
      <div className='relative'>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-y-2 [&>input]:w-3/5'>
          <input onChange={handleChange} name='name' type="text" placeholder='Nombre del producto...' className='px-3 py-2 rounded-lg' />
          <input onChange={handleChange} name='description' type="text" placeholder='Descripcion del producto...' className='px-3 py-2 rounded-lg' />
          <input onChange={handleChange} name='price' type="number" placeholder='Price' className='px-3 py-2 rounded-lg' />
          <input className='bg-sky-600 px-4 py-2 rounded-lg transition hover:bg-sky-400 cursor-pointer font-semibold' type='submit'
            value='Enviar' />
        </form>
        {edit
          ? <EditProduct form={form} setEdit={setEdit} product={product} products={products} />
          : <div className='grid md:grid-cols-2 md:w-[65%] mx-auto items-center justify-center content-center gap-y-4 py-4 place-items-center break-all'>
            {products.length === 0
              ? <h2 className='text-center'>Sin productos</h2>
              : products.map((pr) => (
                <div className='bg-[#3B3B3B] flex flex-col items-center justify-center w-full md:w-3/4 p-3 rounded-lg text-clip' key={pr.id} >
                  <h4 className='text-lg font-semibold break-normal'>{pr.name}</h4>
                  <p className='text-zinc-400 break-normal'>{pr.description}</p>
                  <p>$ {pr.price}</p>
                  <div className='flex gap-2 mt-3'>
                    <button onClick={() => deleteProduct(pr.id)} className='bg-red-600 py-1 px-2 font-medium transition rounded-lg hover:bg-red-800'>Eliminar</button>
                    <button onClick={() => updateProduct(pr)} className='bg-orange-600 py-1 px-2 transition font-medium rounded-lg hover:bg-orange-800'>Editar</button>
                  </div>
                </div>
              ))}
          </div>}
      </div>

    </div>
  )
}
export default App
