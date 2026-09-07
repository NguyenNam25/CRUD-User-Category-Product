import React, { ReactNode } from 'react'

export default function ListLayout({children} : {children: ReactNode}) {
  return (
    <div className="border p-4 mx-2 mt-4 rounded-xl flex flex-col">
        {children}
    </div>
  )
}
