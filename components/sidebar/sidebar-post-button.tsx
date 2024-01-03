import { Feather } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SidebarPostButton = () => {
  return (
    <Link href={'/'} className="flex items-center justify-center w-full">
        {/* MOBILE POST  */}
        <div className='mt-6 lg:hidden rounded-full h-10 w-10 p-2 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer'>
          <Feather size={24} color={'white'}/>
        </div>

        {/* DESCTOP POST */}
        <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer w-full">
          <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
            POST
          </p>
        </div>
    </Link>
  )
}

export default SidebarPostButton