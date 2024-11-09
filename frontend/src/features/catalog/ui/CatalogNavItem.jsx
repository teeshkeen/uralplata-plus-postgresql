import React from 'react'
import handleCardClick from '../../../shared/utils/scroll'

const CatalogNavItem = ({title}) => {
  return (
    <div onClick={handleCardClick} className='cursor-pointer flex items-center w-full p-2 bg-clickable-default hover:bg-clickable-hover active:bg-clickable-active hover:rounded-lg hover:text-white'>
        <button className='flex text-lg font-gilroyLight'>{title}</button>
    </div>
  )
}

export default CatalogNavItem