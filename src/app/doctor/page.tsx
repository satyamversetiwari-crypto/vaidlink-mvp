export default function DoctorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Welcome to Your Practice Dashboard</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-medium text-gray-900">Today's Appointments</h3>
            <p className="mt-2 text-gray-600">Manage your appointments</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-medium text-gray-900">Patient Records</h3>
            <p className="mt-2 text-gray-600">Access patient information</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-medium text-gray-900">Prescriptions</h3>
            <p className="mt-2 text-gray-600">Manage prescriptions</p>
          </div>
        </div>
      </div>
    </div>
  )
}
