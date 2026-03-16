export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Welcome to Admin Panel</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-medium text-gray-900">Users</h3>
            <p className="mt-2 text-2xl font-semibold text-gray-900">0</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-medium text-gray-900">Doctors</h3>
            <p className="mt-2 text-2xl font-semibold text-gray-900">0</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-medium text-gray-900">Patients</h3>
            <p className="mt-2 text-2xl font-semibold text-gray-900">0</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-medium text-gray-900">Appointments</h3>
            <p className="mt-2 text-2xl font-semibold text-gray-900">0</p>
          </div>
        </div>
      </div>
    </div>
  )
}
