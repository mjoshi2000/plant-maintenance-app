import {
  AlertTriangle,
  Clock3,
  CheckCircle2,
  CircleDashed,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

const requests = {
  submitted: [
    {
      id: "MR-001",
      title: "Hydraulic Leak",
      line: "Crank",
      station: "Station 12",
      reporter: "Operator A",
      priority: "Critical",
      createdAt: "20 mins ago",
    },
    {
      id: "MR-002",
      title: "Coolant Leak",
      line: "Head",
      station: "Station 08",
      reporter: "Operator B",
      priority: "Medium",
      createdAt: "45 mins ago",
    },
  ],

  review: [
    {
      id: "MR-003",
      title: "Motor Fault",
      line: "Block",
      station: "Station 05",
      reporter: "Operator C",
      priority: "High",
      createdAt: "1 hr ago",
    },
  ],

  approved: [
    {
      id: "MR-004",
      title: "Bearing Replacement",
      line: "PMR",
      station: "Station 15",
      reporter: "Operator D",
      priority: "Medium",
      createdAt: "2 hrs ago",
    },
  ],

  completed: [
    {
      id: "MR-005",
      title: "Sensor Check",
      line: "Head",
      station: "Station 02",
      reporter: "Operator E",
      priority: "Low",
      createdAt: "Yesterday",
    },
  ],
};

const priorityStyles = {
  Critical: "bg-red-100 text-red-700 border-red-200",
  High: "bg-orange-100 text-orange-700 border-orange-200",
  Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Low: "bg-blue-100 text-blue-700 border-blue-200",
};

const RequestCard = ({ request }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-slate-400">
          {request.id}
        </span>

        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityStyles[request.priority]}`}
        >
          {request.priority}
        </span>
      </div>

      <h3 className="mt-3 font-semibold text-slate-800">
        {request.title}
      </h3>

      <div className="mt-3 space-y-1 text-sm text-slate-500">
        <p>
          <strong>Line:</strong> {request.line}
        </p>

        <p>
          <strong>Station:</strong> {request.station}
        </p>

        <p>
          <strong>Reporter:</strong> {request.reporter}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {request.createdAt}
        </span>

        <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
          View
        </button>
      </div>
    </div>
  );
};

const Column = ({
  title,
  items,
  color,
  icon: Icon,
}) => {
  return (
    <div className="bg-slate-100 rounded-3xl p-4 min-h-[600px]">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className={`h-3 w-3 rounded-full ${color}`}
          />

          <Icon
            size={18}
            className="text-slate-600"
          />

          <h2 className="font-semibold">
            {title}
          </h2>
        </div>

        <span className="bg-white px-3 py-1 rounded-full text-sm text-slate-600">
          {items.length}
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <RequestCard
            key={item.id}
            request={item}
          />
        ))}
      </div>
    </div>
  );
};

const RequestsQueue = () => {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Maintenance Requests
          </h1>

          <p className="mt-1 text-slate-500">
            Review, approve and track incoming
            maintenance requests.
          </p>
        </div>

        <Link
  to="/maintenance-request"
  className="
    mt-4 md:mt-0
    inline-flex
    items-center
    gap-2
    bg-blue-600
    text-white
    px-5
    py-3
    rounded-xl
    hover:bg-blue-700
    transition
  "
>
  <Plus size={18} />
  New Request
</Link>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-slate-500 text-sm">
            Submitted
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {requests.submitted.length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-slate-500 text-sm">
            In Review
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {requests.review.length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-slate-500 text-sm">
            Approved
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {requests.approved.length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-slate-500 text-sm">
            Completed
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {requests.completed.length}
          </h2>
        </div>
      </div>

      {/* Kanban Board */}

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <Column
          title="Submitted"
          items={requests.submitted}
          color="bg-blue-500"
          icon={CircleDashed}
        />

        <Column
          title="In Review"
          items={requests.review}
          color="bg-orange-500"
          icon={Clock3}
        />

        <Column
          title="Approved"
          items={requests.approved}
          color="bg-green-500"
          icon={CheckCircle2}
        />

        <Column
          title="Completed"
          items={requests.completed}
          color="bg-slate-500"
          icon={AlertTriangle}
        />
      </div>
    </div>
  );
};

export default RequestsQueue;