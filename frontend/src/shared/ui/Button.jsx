import React from 'react'

const Button = ({text, href, styles}) => {
  return (
    <a href={href} className={`ButtonFormSubmit cursor-pointer px-10 py-3 rounded-lg bg-green-600 hover:bg-button-hover transition-all text-base font-normal text-white 768:text-xl ${styles}`}>{text}</a>
  )
}

export default Button