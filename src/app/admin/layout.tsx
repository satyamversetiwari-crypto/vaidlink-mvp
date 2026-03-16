import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard | VaidLink',
  description: 'Admin dashboard for VaidLink healthcare platform',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
