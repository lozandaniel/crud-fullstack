export function Header({ handleSubmit, handleChange }) {
  return (
    <div>
      <h2 className='font-lilita-one text-5xl font-bold py-4'>LISTA DE PRODUCTOS</h2>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-y-2 [&>input]:max-w-3/5 [&>input]:w-full'>
        <input onChange={handleChange} name='name' type="text" placeholder='Nombre del producto...' className='px-3 py-2 rounded-lg w-full max-w-3/5' />
        <textarea onChange={handleChange} name='description' type="text" placeholder='Descripcion del producto...' className='w-full max-w-3/5 px-3 py-2 rounded-lg resize-none columns-9' />
        <input onChange={handleChange} name='price' type="number" placeholder='Price...' className='w-full max-w-3/5 px-3 py-2 rounded-lg' />
        <input className='bg-sky-600 px-4 py-2 rounded-lg transition hover:bg-sky-400 cursor-pointer font-semibold' type='submit'
          value='Enviar' />
      </form>
    </div>
  )
}