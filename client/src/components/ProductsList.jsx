
export function ProductList({ products, updateProduct, deleteProduct }) {

  return (
    <div className='grid md:grid-cols-2 md:w-[65%] mx-auto items-center justify-center content-center gap-y-4 py-4 place-items-center break-all'>
      {products.length === 0
        ? <h2 className='text-center'>Sin productos</h2>
        : products.map((pr) => (
          <div className='bg-[#3B3B3B] flex flex-col items-center justify-center w-72 md:w-3/4 p-3 rounded-lg text-clip' key={pr.id} >
            <h4 className='text-lg font-semibold break-normal'>{pr.name}</h4>
            <p className='text-zinc-400 break-normal'>{pr.description}</p>
            <p>$ {pr.price}</p>
            <div className='flex gap-2 mt-3'>
              <button onClick={() => deleteProduct(pr.id)} className='bg-red-600 py-1 px-2 font-medium transition rounded-lg hover:bg-red-800'>Eliminar</button>
              <button onClick={() => updateProduct(pr)} className='bg-orange-600 py-1 px-2 transition font-medium rounded-lg hover:bg-orange-800'>Editar</button>
            </div>
          </div>
        ))}
    </div>
  )
}