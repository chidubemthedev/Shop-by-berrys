import React from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'

const Navbar = () => {
  const onclicks = () => {}

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/"> Berry&apos;s Fragrances</Link>
      </p>
      <button className='cart-icon' type='button' onClick={onclicks}>
        <AiOutlineShopping />
        <span className="cart-item-qty">1</span>
      </button>
    </div>
  )
}

export default Navbar