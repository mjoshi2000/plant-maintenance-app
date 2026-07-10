import {
  CheckCircle2,
  Clock3,
  FileCheck,
  XCircle,
} from "lucide-react";

const stats = [
  {
    title: "Pending / Draft",
    value: 8,
    color: "bg-orange-500",
    icon: Clock3,
  },
  {
    title: "Submitted",
    value: 3,
    color: "bg-blue-500",
    icon: FileCheck,
  },
  {
    title: "Approved",
    value: 12,
    color: "bg-green-500",
    icon: CheckCircle2,
  },
  {
    title: "Rejected",
    value: 1,
    color: "bg-red-500",
    icon: XCircle,
  },
];

const maintenanceActivities = [
  {
    order: "5038110",
    title: "Suction Box Weekly",
    workCenter: "Mod4 Crank",
    machine: "M04C01",
    status: "Approved",
    assignedTo: "User1",
  },
  {
    order: "5039826",
    title: "Weekly PM",
    workCenter: "Mod4 Block",
    machine: "M04B01",
    status: "Pending",
    assignedTo: "User2",
  },
  {
    order: "5043324",
    title: "Weekly General",
    workCenter: "Mod4 Crank",
    machine: "M04C02",
    status: "In Progress",
    assignedTo: "User3",
  },
  {
    order: "5043617",
    title: "Block Maintenance",
    workCenter: "Mod4 Block",
    machine: "M04B03",
    status: "Rejected",
    assignedTo: "User4",
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

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Plant Maintenance Dashboard
        </h1>

        <p className="mt-1 text-slate-500">
          Overview of maintenance activities and work orders
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-slate-800">
                    {item.value}
                  </h2>
                </div>

                <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Icon size={24} />
                </div>
              </div>

              <div
                className={`h-2 rounded-full mt-5 ${item.color}`}
              />
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search maintenance activities..."
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
          />

          <select className="border border-slate-300 rounded-xl px-4 py-3">
            <option>Work Center</option>
            <option>Mod4 Crank</option>
            <option>Mod4 Block</option>
          </select>

          <select className="border border-slate-300 rounded-xl px-4 py-3">
            <option>Machine</option>
            <option>M04C01</option>
            <option>M04B01</option>
          </select>

          <select className="border border-slate-300 rounded-xl px-4 py-3">
            <option>Status</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* Activities Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold">
            Recent Maintenance Activities
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">
                  Order
                </th>

                <th className="text-left px-6 py-4 font-semibold">
                  Instruction
                </th>

                <th className="text-left px-6 py-4 font-semibold">
                  Work Center
                </th>

                <th className="text-left px-6 py-4 font-semibold">
                  Machine
                </th>

                <th className="text-left px-6 py-4 font-semibold">
                  Status
                </th>

                <th className="text-left px-6 py-4 font-semibold">
                  Assigned To
                </th>
              </tr>
            </thead>

            <tbody>
              {maintenanceActivities.map((activity) => (
                <tr
                  key={activity.order}
                  className="border-t border-slate-200 hover:bg-slate-50"
                >
                  <td className="px-6 py-4">{activity.order}</td>

                  <td className="px-6 py-4">
                    {activity.title}
                  </td>

                  <td className="px-6 py-4">
                    {activity.workCenter}
                  </td>

                  <td className="px-6 py-4">
                    {activity.machine}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                        activity.status
                      )}`}
                    >
                      {activity.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {activity.assignedTo}
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

export default Dashboard;