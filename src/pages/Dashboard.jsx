/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FilePlus2,
  ListChecks,
  Plus,
  TrendingUp,
  Wrench,
} from "lucide-react";

import { useWorkOrderStore } from "../app/store/workOrderStore";

const requestStats = [
  {
    title: "Submitted Requests",
    value: 2,
    color: "text-blue-600",
    bg: "bg-blue-50",
    icon: ClipboardList,
  },
  {
    title: "In Review",
    value: 1,
    color: "text-orange-600",
    bg: "bg-orange-50",
    icon: Clock3,
  },
  {
    title: "Approved",
    value: 1,
    color: "text-green-600",
    bg: "bg-green-50",
    icon: CheckCircle2,
  },
  {
    title: "Critical Issues",
    value: 1,
    color: "text-red-600",
    bg: "bg-red-50",
    icon: AlertTriangle,
  },
];

const recentActivities = [
  {
    id: 1,
    title: "Hydraulic Leak request submitted",
    description: "Crank line - Station 12",
    time: "20 mins ago",
    type: "Critical",
  },
  {
    id: 2,
    title: "Bearing Replacement approved",
    description: "PMR line - Station 15",
    time: "2 hrs ago",
    type: "Approved",
  },
  {
    id: 3,
    title: "Sensor Check completed",
    description: "Head line - Station 02",
    time: "Yesterday",
    type: "Completed",
  },
];

const criticalIssues = [
  {
    id: "MR-001",
    title: "Hydraulic Leak",
    line: "Crank",
    station: "Station 12",
    priority: "Critical",
  },
  {
    id: "MR-003",
    title: "Motor Fault",
    line: "Block",
    station: "Station 05",
    priority: "High",
  },
];

const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  to,
  color,
}) => {
  return (
    <Link
      to={to}
      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
    >
      <div
        className={`h-12 w-12 rounded-xl flex items-center justify-center ${color}`}
      >
        <Icon size={22} />
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>
    </Link>
  );
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  bg,
  subtitle,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2
            className={`mt-2 text-3xl font-bold ${color}`}
          >
            {value}
          </h2>

          {subtitle ? (
            <p className="mt-2 text-xs text-slate-500">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div
          className={`h-11 w-11 rounded-xl flex items-center justify-center ${bg} ${color}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
};

const WorkOrderSummaryCard = ({
  title,
  value,
  color,
  icon: Icon,
}) => {
  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2
            className={`mt-2 text-3xl font-bold ${color}`}
          >
            {value}
          </h2>
        </div>

        <Icon className={color} size={24} />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const workOrders = useWorkOrderStore(
    (state) => state.workOrders
  );

  const openOrders = workOrders.filter(
    (workOrder) => workOrder.status === "Open"
  );

  const assignedOrders = workOrders.filter(
    (workOrder) => workOrder.status === "Assigned"
  );

  const inProgressOrders = workOrders.filter(
    (workOrder) => workOrder.status === "In Progress"
  );

  const completedOrders = workOrders.filter(
    (workOrder) => workOrder.status === "Completed"
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Plant Maintenance Dashboard
          </h1>

          <p className="mt-1 text-slate-500">
            Monitor requests, work orders, critical issues and maintenance performance.
          </p>
        </div>

        <Link
          to="/maintenance-request"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          New Maintenance Request
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <QuickActionCard
          title="New Request"
          description="Report leak, fault or operational issue"
          icon={FilePlus2}
          to="/maintenance-request"
          color="bg-blue-50 text-blue-600"
        />

        <QuickActionCard
          title="Requests Queue"
          description="Review and approve incoming requests"
          icon={ClipboardList}
          to="/requests"
          color="bg-orange-50 text-orange-600"
        />

        <QuickActionCard
          title="Work Orders"
          description="Assign, start and complete maintenance work"
          icon={Wrench}
          to="/work-orders"
          color="bg-green-50 text-green-600"
        />

        <QuickActionCard
          title="Analytics"
          description="View maintenance trends and performance"
          icon={BarChart3}
          to="/reports"
          color="bg-purple-50 text-purple-600"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Request Overview
            </h2>

            <p className="text-sm text-slate-500">
              Current maintenance request status summary.
            </p>
          </div>

          <Link
            to="/requests"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {requestStats.map((item) => (
            <StatCard
              key={item.title}
              title={item.title}
              value={item.value}
              icon={item.icon}
              color={item.color}
              bg={item.bg}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Work Order Overview
            </h2>

            <p className="text-sm text-slate-500">
              Live summary from created work orders.
            </p>
          </div>

          <Link
            to="/work-orders"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View work orders
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <WorkOrderSummaryCard
            title="Open"
            value={openOrders.length}
            color="text-blue-600"
            icon={ClipboardList}
          />

          <WorkOrderSummaryCard
            title="Assigned"
            value={assignedOrders.length}
            color="text-orange-600"
            icon={ListChecks}
          />

          <WorkOrderSummaryCard
            title="In Progress"
            value={inProgressOrders.length}
            color="text-purple-600"
            icon={TrendingUp}
          />

          <WorkOrderSummaryCard
            title="Completed"
            value={completedOrders.length}
            color="text-green-600"
            icon={CheckCircle2}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Recent Activity
              </h2>

              <p className="text-sm text-slate-500">
                Latest maintenance activity across the plant.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 border-b border-slate-100 pb-4 last:border-b-0"
              >
                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Clock3 size={18} className="text-slate-500" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                    <h3 className="font-medium text-slate-900">
                      {activity.title}
                    </h3>

                    <span className="text-xs text-slate-400">
                      {activity.time}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 mt-1">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-11 w-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle size={22} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Critical Attention
              </h2>

              <p className="text-sm text-slate-500">
                Issues needing urgent review.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {criticalIssues.map((issue) => (
              <div
                key={issue.id}
                className="border border-slate-200 rounded-2xl p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-slate-400">
                      {issue.id}
                    </p>

                    <h3 className="mt-1 font-semibold text-slate-900">
                      {issue.title}
                    </h3>
                  </div>

                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      issue.priority === "Critical"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {issue.priority}
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-500">
                  {issue.line} - {issue.station}
                </p>
              </div>
            ))}
          </div>

          <Link
            to="/requests"
            className="mt-5 inline-flex w-full items-center justify-center bg-red-50 text-red-600 py-3 rounded-xl hover:bg-red-100 transition"
          >
            Review Critical Issues
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;