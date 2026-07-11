import {
  Eye,
  Pencil,
  Plus,
  Search,
} from "lucide-react";

const maintenancePlans = [
  {
    id: "MP001",
    title: "Weekly PM Inspection",
    machine: "M04C01",
    workCenter: "Mod4 Crank",
    status: "Approved",
    dueDate: "15 Jul 2026",
  },
  {
    id: "MP002",
    title: "Hydraulic Check",
    machine: "M04B01",
    workCenter: "Mod4 Block",
    status: "Pending",
    dueDate: "18 Jul 2026",
  },
  {
    id: "MP003",
    title: "Lubrication Activity",
    machine: "M04C03",
    workCenter: "Mod4 Crank",
    status: "In Progress",
    dueDate: "20 Jul 2026",
  },
  {
    id: "MP004",
    title: "Safety Inspection",
    machine: "M04B02",
    workCenter: "Mod4 Block",
    status: "Rejected",
    dueDate: "25 Jul 2026",
  },
];

const getStatusClass = (status) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-700";

    case "Pending":
      return "bg-orange-100 text-orange-700";

    case "In Progress":
      return "bg-blue-100 text-blue-700";

    case "Rejected":
      return "bg-red-100 text-red-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
};

const MaintenancePlans = () => {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Maintenance Plans
          </h1>

          <p className="mt-1 text-slate-500">
            Manage preventive maintenance schedules
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition-colors">
          <Plus size={18} />
          New Plan
        </button>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-slate-500 text-sm">
            Total Plans
          </p>
          <h2 className="text-3xl font-bold mt-2">
            24
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-slate-500 text-sm">
            Approved
          </p>
          <h2 className="text-3xl font-bold mt-2 text-green-600">
            16
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-slate-500 text-sm">
            Pending
          </p>
          <h2 className="text-3xl font-bold mt-2 text-orange-500">
            6
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-slate-500 text-sm">
            Rejected
          </p>
          <h2 className="text-3xl font-bold mt-2 text-red-500">
            2
          </h2>
        </div>
      </div>

      {/* Filters */}

      <div className="bg-white border rounded-2xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 border rounded-xl px-3">
            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search plans..."
              className="w-full py-3 outline-none"
            />
          </div>

          <select className="border rounded-xl px-4 py-3">
            <option>Work Center</option>
            <option>Mod4 Crank</option>
            <option>Mod4 Block</option>
          </select>

          <select className="border rounded-xl px-4 py-3">
            <option>Status</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>

          <select className="border rounded-xl px-4 py-3">
            <option>Machine</option>
            <option>M04C01</option>
            <option>M04B01</option>
          </select>
        </div>
      </div>

      {/* Table */}

      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="font-semibold text-lg">
            Maintenance Plans List
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-6 py-4">
                  Plan ID
                </th>

                <th className="text-left px-6 py-4">
                  Title
                </th>

                <th className="text-left px-6 py-4">
                  Machine
                </th>

                <th className="text-left px-6 py-4">
                  Work Center
                </th>

                <th className="text-left px-6 py-4">
                  Due Date
                </th>

                <th className="text-left px-6 py-4">
                  Status
                </th>

                <th className="text-left px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {maintenancePlans.map((plan) => (
                <tr
                  key={plan.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    {plan.id}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {plan.title}
                  </td>

                  <td className="px-6 py-4">
                    {plan.machine}
                  </td>

                  <td className="px-6 py-4">
                    {plan.workCenter}
                  </td>

                  <td className="px-6 py-4">
                    {plan.dueDate}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                        plan.status
                      )}`}
                    >
                      {plan.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye size={18} />
                      </button>

                      <button className="text-green-600 hover:text-green-800">
                        <Pencil size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePlans;