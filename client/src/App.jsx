import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import { ProductList } from './components/ProductsList'
import { EditProduct } from './components/EditProduct'
import { Header } from './components/Header'
import { URL_API } from './utils/utils'
import { Footer } from './components/Footer'

function App() {
  const [edit, setEdit] = useState(false)
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null)
  const [form, setForm] = useState({
    id: Date.now(),
    name: "",
    description: "",
    price: null
  });

  useEffect(() => {
    axios.get(URL_API)
      .then(res => {
        setProducts(res.data)
      })
      .catch(err => console.log(err))
  }, [])


  const handleChange = (e) => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, price } = form
    if (name === '' || description === '' || price === '') return;

    axios.post(URL_API, form)
    setProducts(prevState => [...prevState, form])
  }

  const updateProduct = (prod) => {
    setEdit(true)
    const idItem = products.find(el => el.id === prod.id)
    setProduct(idItem)
  }

  const deleteProduct = (id) => {
    axios.delete(URL_API + id, form)
    setProducts(prevState => prevState.filter((task) => task.id !== id));
  }

  return (
    <div className='container px-10'>
      <Header handleChange={handleChange} handleSubmit={handleSubmit} />
      {edit
        ? <EditProduct setEdit={setEdit} product={product} products={products} />
        : <ProductList products={products} updateProduct={updateProduct} deleteProduct={deleteProduct} />
      }
      <Footer />
    </div>
  )
}
export default App
