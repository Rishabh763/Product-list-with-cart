import React, { useState } from 'react';
import itemsData from './data.json';

function App() {
  const [items, setItems] = useState(itemsData);
  const [modal, setModal] = useState(false);

  const incrementCart = (index) => {
    setItems(prevItems => 
      prevItems.map((item, i) => 
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementCart = (index) => {
    setItems(prevItems => 
      prevItems.map((item, i) => 
        i === index ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const clearCart = (index) => {
    setItems(prevItems => 
      prevItems.map((item, i) => 
        i === index ? { ...item, quantity: 0 } : item
      )
    );
  };

  const handleModal = () => {
    setModal(!modal);
    if (modal === true){
      setItems(prevItems =>
        prevItems.map((item, i) => i > -1 ? { ...item, quantity: 0 } : item
        )
      );
    }
  }

  return (
    <div className="content-grid bg-Rose-50">

      {/* Confirmation Modal */}
      {modal && (
        <div className="modal-bg fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-75">
          <div className="modal bg-white p-8 sm:rounded-t-lg  rounded-lg sm:w-128 max-w-full flex flex-col gap-4 fixed bottom-0 left-0 right-0 sm:static">
            <img className='size-16' src="\assets\images\icon-order-confirmed.svg" loading="lazy" alt=""/>
            <h2 className="text-4xl font-bold">Order Confirmed</h2>
            <p className='font-semibold text-Rose-500'>We hope you enjoy your food!</p>
            <div className="bg-Rose-50 p-4 rounded-md">
              <div className="max-h-60 overflow-y-auto transition-all">
                {items.filter(item => item.quantity > 0).map((item, index) => (
                    <li key={index} className='w-full border-b-[1px] pr-2 border-Rose-300 py-2 flex gap-2 justify-between items-center'>
                      <div className="">
                        <h2 className='text-base font-semibold text-Rose-900'>{item.name}</h2>
                        <div>
                          <span className='font-semibold text-Red'>{item.quantity}x</span>
                          <span className='ml-4 text-sm text-Rose-300'>@${(item.price).toFixed(2)}</span>
                        </div>
                      </div>
                          <span className='ml-2 text-sm font-semibold text-Rose-500'>${(item.quantity * item.price).toFixed(2)}</span>
                    </li>
                  ))}
              </div>
                <div className='flex items-center justify-between py-4'>
                  <p className='capitalize'>order total</p>
                  <h2 className='text-2xl font-bold'>
                    $ {items.reduce((total, item) =>  total + (item.price * item.quantity) ,0).toFixed(2)}
                  </h2>
                </div>
            </div>
              <button className="bg-Red text-white py-2 px-4 rounded-full font-semibold cursor-pointer" onClick={() => handleModal()}>Start New Order</button>
          </div>
        </div>
      )}

      <div className='py-16 flex-col flex md:flex-row items-center md:items-start gap-8'>
        <div className='flex-1'>
          <h1 className="text-5xl font-bold">Desserts</h1>
          <div className="items pt-12">
            {items.map((item, index) => (
              <div key={index}>
                <div className='mb-8 relative'>
                  <picture className={`${item.quantity > 0 ? "ring-2 ring-Red" : ""} size-full object-cover rounded-lg`}>
                      <source 
                      media='(min-width: 1200px)'
                      srcSet={`${item.image.desktop}`}
                      />
                      <source 
                      media='(min-width: 768px)'
                      srcSet={`${item.image.tablet}`}
                      />
                      <img
                        src={`${item.image.mobile}`}
                        alt={`${item.name}-image`}
                      />
                  </picture>
                  {item.quantity === 0 ? (
                    <div
                      className='bg-white absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-6 py-2 rounded-full ring-2 ring-Rose-300 hover:ring-Red transition-colors hover:text-Red flex gap-2 font-semibold cursor-pointer w-max'
                      onClick={() => incrementCart(index)}
                    >
                      <img src="/assets/images/icon-add-to-cart.svg" alt="" />
                      Add to Cart
                    </div>
                  ) : (
                    <div
                      className='bg-Red absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-3 py-2 min-w-40 rounded-full ring-2 ring-Red flex items-center gap-2 font-semibold cursor-pointer'
                    >
                      <img className='rounded-full size-6 p-[5px] border-2 border-white text-white  transition-colors hover:fill-Red' src="/assets/images/icon-decrement-quantity.svg" alt="" onClick={() => decrementCart(index)}/>
                      <div className='flex-1 text-center text-white'>
                        {item.quantity}
                      </div>
                      <img className='rounded-full size-6 p-[5px] border-2 border-white text-white  transition-colors hover:fill-Red'src="/assets/images/icon-increment-quantity.svg" alt="" onClick={() => incrementCart(index)}/>
                    </div>
                  )}
                </div>
                <div className="">
                  <p className='text-base font-medium text-Rose-500'>{item.category}</p>
                  <h2 className='text-lg font-semibold'>{item.name}</h2>
                  <h3 className='text-xl font-semibold text-Red'>$ {(item.price).toFixed(2)}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='sticky top-16 bg-white cart w-96 max-w-full rounded-xl p-6 flex flex-col gap-4  items-center'>
          <h2 className='text-3xl font-bold text-Red w-full text-left'>Your Cart ({items.filter(item => item.quantity > 0).length})</h2>
          {items.filter(item => item.quantity > 0).length === 0 ? (
            <>
              <img src="/assets/images/illustration-empty-cart.svg" alt="" />
              <p className='text-center text-Rose-500'>Your added items will appear here</p>
            </>
          ) : (
            <ul className='w-full'>
              <div className='max-h-80 overflow-y-auto overflow-x-clip'>
                {items.filter(item => item.quantity > 0).map((item, index) => (
                  <li key={index} className='items-card w-full border-b-[1px] border-Rose-300 py-2 pr-2 flex gap-2 justify-between items-center'>
                    <div className="">
                      <h2 className='text-base font-semibold text-Rose-900'>{item.name}</h2>
                      <div>
                        <span className='font-semibold text-Red'>{item.quantity}x</span>
                        <span className='ml-4 text-sm text-Rose-300'>@${(item.price).toFixed(2)}</span>
                        <span className='ml-2 text-sm font-semibold text-Rose-500'>${(item.quantity * item.price).toFixed(2)}</span>
                      </div>
                    </div>
                    <button className='cursor-pointer w-fit h-fit' onClick={() => clearCart(item.id)}><img className='size-4 ring-2 ring-[#CAAFA7] rounded-full' src="/assets/images/icon-remove-item.svg" alt=""/></button>
                  </li>
                ))}
              </div>
              <div className='flex items-center justify-between py-4'>
                <p className='capitalize'>order total</p>
                <h2 className='text-2xl font-bold'>
                  $ {items.reduce((total, item) =>  total + (item.price * item.quantity) ,0).toFixed(2)}
                </h2>
              </div>
              <div className='py-2 text-sm flex items-center gap-1 justify-center bg-Rose-50 mb-4'>
                <img src="/assets/images/icon-carbon-neutral.svg" alt=""/> This is a <span className='text-black font-semibold'>carbon-neutral</span> delivery
              </div>
              <button className='bg-Red capitalize w-full py-3 rounded-full text-Rose-50 font-semibold cursor-pointer' onClick={handleModal}>confirm order</button>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
