import React from 'react'
import items from './data.json';

function App() {
  return (
    <div className="content-grid bg-Rose-50">
      <div className=' py-16 flex-col flex md:flex-row items-center md:items-start gap-8'>
        <div className='flex-1'>
          <h1 className="text-5xl font-bold">
          Desserts
          </h1>
          <div className="items pt-12">
            {
              items.map((item) => {
                return (
                  <div className='grid gap-8'>
                    <div className='relative'>
                      <img className='size-full object-cover rounded-lg' src={`${item.image.desktop}`} alt={`${item.name}-image`}/>
                      <div className='bg-white absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-6 py-2 rounded-full ring-2 ring-Rose-300 hover:ring-Red transition-colors flex gap-2 font-semibold'>
                       <img src="/assets/images/icon-add-to-cart.svg" alt=""/>
                        Add to Cart
                      </div>
                    </div>
                    <div className="">
                      <p className='text-base font-medium text-Rose-400'>{item.category}</p>
                      <h2 className='text-lg font-semibold'>{item.name}</h2>
                      <h3 className='text-xl font-semibold text-Red'>$ {item.price}</h3>
                    </div>
                  </div>
                )
              }
            )
            }
          </div>
        </div>
        <div className='sticky top-16 bg-white cart w-80  rounded-xl p-6 flex flex-col gap-4 items-center'>
          <h2 className='text-3xl font-bold text-Red w-full text-left'>Your Cart (0)</h2>
          <img className='' src="/assets/images/illustration-empty-cart.svg" alt=""/>
          <p className='text-center text-Rose-500'>Your added items will appear here</p>
      
        </div>
      </div>
    </div>
  )
}

export default App
