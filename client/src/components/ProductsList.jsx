import { DeleteIcon, EditIcon } from "./Icons"
export function ProductList({ products, updateProduct, deleteProduct }) {

  return (
    <div className='grid md:grid-cols-2 gap-5 justify-center py-4 place-items-center'>
      {products.length === 0
        ? <h2 className='text-center'>Sin productos para ingresar</h2>
        : products.map((pr) => (
          <div className='bg-[#3B3B3B] flex flex-col items-center justify-center p-3 rounded-lg text-clip max-w-44 w-full' key={pr.id} >
            <h4 className='text-lg font-semibold break-normal capitalize'>{pr.name}</h4>
            <p className='text-zinc-400 break-normal'>{pr.description}</p>
            <p>$ {pr.price}</p>
            <div className='flex gap-2 mt-3'>
              <button onClick={() => deleteProduct(pr.id)} className='font-medium transition rounded-lg hover:bg-red-900 hover:scale-105'>
                {<DeleteIcon />}
              </button>
              <button onClick={() => updateProduct(pr)} className=' transition font-medium rounded-lg hover:bg-cyan-900 hover:scale-105'>
                {<EditIcon />}
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}