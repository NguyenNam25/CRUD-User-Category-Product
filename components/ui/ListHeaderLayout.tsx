import { ReactNode } from 'react'

export default function ListHeaderLayout({content, AddComponent}: {content: string, AddComponent: ReactNode}) {
  return (
    <div className="flex items-center pb-4 justify-between">
        <h2 className="text-2xl">List of {content}</h2>
        {AddComponent}
    </div>
  )
}
