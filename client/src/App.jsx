import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { ProductList } from './components/ProductsList'
import { EditProduct } from './components/EditProduct'
import { Header } from './components/Header'

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
    axios.get('http://localhost:4000/api/products')
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
    axios.post('http://localhost:4000/api/products', form)
    setProducts(prevState => [...prevState, form])
  };

  const updateProduct = (prod) => {
    setEdit(true)
    const idItem = products.find(el => el.id === prod.id)
    setProduct(idItem)
  }

  const deleteProduct = (id) => {
    axios.delete('http://localhost:4000/api/products/' + id, form)
    setProducts(prevState => prevState.filter((task) => task.id !== id));
  }


  return (
    <>
      <Header handleChange={handleChange} handleSubmit={handleSubmit} />
      {edit
        ? <EditProduct form={form} setEdit={setEdit} product={product} products={products} />
        : <ProductList products={products} updateProduct={updateProduct} deleteProduct={deleteProduct} />
      }
    </>
  )
}
export default App
