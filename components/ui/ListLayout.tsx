import React, { ReactNode } from 'react'

export default function ListLayout({children} : {children: ReactNode}) {
  return (
    <div className="border p-4 rounded-xl">
        {children}
    </div>
  )
}
