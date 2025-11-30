import React from 'react'

interface DocumentsLayoutProps {
    children: React.ReactNode
}

const layout = ({children}: DocumentsLayoutProps) => {
  return (
    <div className='flex flex-col gap-y-4 '>
        <nav className="w-full bg-red-500">Documents navbar</nav>
        {children}
        </div>
  )
}

export default layout