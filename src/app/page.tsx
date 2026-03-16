import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-blue-600">VaidLink</h1>
            <p className="text-sm text-gray-600">Healthcare Platform</p>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Welcome to VaidLink
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              A comprehensive healthcare management platform connecting patients, doctors, and administrators.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h3 className="mb-12 text-center text-2xl font-bold text-gray-900">Dashboard Access</h3>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
                <h4 className="mb-4 text-xl font-semibold text-gray-900">Patient Dashboard</h4>
                <p className="mb-6 text-gray-600">
                  Manage your appointments, medical records, and prescriptions.
                </p>
                <Link href="/patient">
                  <Button className="w-full">Access Patient Dashboard</Button>
                </Link>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
                <h4 className="mb-4 text-xl font-semibold text-gray-900">Doctor Dashboard</h4>
                <p className="mb-6 text-gray-600">
                  View appointments, manage patient records, and issue prescriptions.
                </p>
                <Link href="/doctor">
                  <Button className="w-full">Access Doctor Dashboard</Button>
                </Link>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
                <h4 className="mb-4 text-xl font-semibold text-gray-900">Admin Dashboard</h4>
                <p className="mb-6 text-gray-600">
                  Monitor system statistics and manage platform users.
                </p>
                <Link href="/admin">
                  <Button className="w-full">Access Admin Dashboard</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600">
            © 2024 VaidLink. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
