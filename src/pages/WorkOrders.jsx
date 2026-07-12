/* eslint-disable react/prop-types */
import {
  ClipboardList,
  PlayCircle,
  CheckCircle2,
  UserCheck,
  Wrench,
} from "lucide-react";

import { useWorkOrderStore } from "../app/store/workOrderStore";
import { useRequestStore } from "../app/store/requestStore";

const statusStyles = {
  Open: "bg-blue-100 text-blue-700 border-blue-200",
  Assigned: "bg-orange-100 text-orange-700 border-orange-200",
  "In Progress": "bg-purple-100 text-purple-700 border-purple-200",
  Completed: "bg-green-100 text-green-700 border-green-200",
};

const priorityStyles = {
  Critical: "bg-red-100 text-red-700 border-red-200",
  High: "bg-orange-100 text-orange-700 border-orange-200",
  Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Low: "bg-blue-100 text-blue-700 border-blue-200",
};

const WorkOrderCard = ({
  workOrder,
  onAssign,
  onStart,
  onComplete,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-400">
            {workOrder.id}
          </p>

          <h3 className="mt-2 font-semibold text-slate-900">
            {workOrder.title}
          </h3>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${
            priorityStyles[workOrder.priority]
          }`}
        >
          {workOrder.priority}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-600">
        <p>
          <strong>Source:</strong> {workOrder.sourceRequestId}
        </p>

        <p>
          <strong>Line:</strong> {workOrder.line}
        </p>

        <p>
          <strong>Station:</strong> {workOrder.station}
        </p>

        <p>
          <strong>Assigned To:</strong> {workOrder.assignedTo}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${
            statusStyles[workOrder.status]
          }`}
        >
          {workOrder.status}
        </span>

        <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
          {workOrder.createdAt}
        </span>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4 space-y-2">
        {workOrder.status === "Open" && (
          <button
            onClick={() => onAssign(workOrder.id)}
            className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition"
          >
            <UserCheck size={18} />
            Assign Technician
          </button>
        )}

        {workOrder.status === "Assigned" && (
          <button
            onClick={() => onStart(workOrder.id)}
            className="w-full inline-flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition"
          >
            <PlayCircle size={18} />
            Start Work
          </button>
        )}

        {workOrder.status === "In Progress" && (
          <button
            onClick={() => onComplete(workOrder.id)}
            className="w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
          >
            <CheckCircle2 size={18} />
            Complete Work
          </button>
        )}

        {workOrder.status === "Completed" && (
          <div className="w-full bg-green-50 text-green-700 py-3 rounded-xl text-center text-sm font-medium">
            Work completed
          </div>
        )}
      </div>
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-12 text-center">
      <div className="mx-auto h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center">
        <Wrench className="text-slate-500" size={28} />
      </div>

      <h2 className="mt-5 text-xl font-semibold text-slate-900">
        No work orders yet
      </h2>

      <p className="mt-2 text-slate-500 max-w-md mx-auto">
        Approve a maintenance request and click Create Work Order.
        Newly created work orders will appear here.
      </p>
    </div>
  );
};

const WorkOrders = () => {
  const workOrders = useWorkOrderStore((state) => state.workOrders);
  const assignTechnician = useWorkOrderStore(
    (state) => state.assignTechnician
  );
  const updateWorkOrderStatus = useWorkOrderStore(
    (state) => state.updateWorkOrderStatus
  );
  const completeRequestById = useRequestStore(
  (state) => state.completeRequestById
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

  const handleAssign = (workOrderId) => {
    assignTechnician(workOrderId, "Technician A");
  };

  const handleStart = (workOrderId) => {
    updateWorkOrderStatus(workOrderId, "In Progress");
  };

  const handleComplete = (workOrderId) => {
  const workOrder = workOrders.find(
    (item) => item.id === workOrderId
  );

  updateWorkOrderStatus(workOrderId, "Completed");

  if (workOrder?.sourceRequestId) {
    completeRequestById(workOrder.sourceRequestId);
  }
};

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Work Orders
        </h1>

        <p className="mt-1 text-slate-500">
          Track maintenance work from assignment to completion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-slate-500">Open</p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {openOrders.length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-slate-500">Assigned</p>

          <h2 className="mt-2 text-3xl font-bold text-orange-600">
            {assignedOrders.length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-slate-500">In Progress</p>

          <h2 className="mt-2 text-3xl font-bold text-purple-600">
            {inProgressOrders.length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-slate-500">Completed</p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {completedOrders.length}
          </h2>
        </div>
      </div>

      {workOrders.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="bg-slate-100 rounded-3xl p-4 min-h-[520px]">
            <div className="flex items-center gap-3 mb-5">
              <ClipboardList size={18} className="text-blue-600" />

              <h2 className="font-semibold">Open</h2>

              <span className="ml-auto bg-white px-3 py-1 rounded-full text-sm text-slate-600">
                {openOrders.length}
              </span>
            </div>

            <div className="space-y-3">
              {openOrders.map((workOrder) => (
                <WorkOrderCard
                  key={workOrder.id}
                  workOrder={workOrder}
                  onAssign={handleAssign}
                  onStart={handleStart}
                  onComplete={handleComplete}
                />
              ))}
            </div>
          </div>

          <div className="bg-slate-100 rounded-3xl p-4 min-h-[520px]">
            <div className="flex items-center gap-3 mb-5">
              <UserCheck size={18} className="text-orange-600" />

              <h2 className="font-semibold">Assigned</h2>

              <span className="ml-auto bg-white px-3 py-1 rounded-full text-sm text-slate-600">
                {assignedOrders.length}
              </span>
            </div>

            <div className="space-y-3">
              {assignedOrders.map((workOrder) => (
                <WorkOrderCard
                  key={workOrder.id}
                  workOrder={workOrder}
                  onAssign={handleAssign}
                  onStart={handleStart}
                  onComplete={handleComplete}
                />
              ))}
            </div>
          </div>

          <div className="bg-slate-100 rounded-3xl p-4 min-h-[520px]">
            <div className="flex items-center gap-3 mb-5">
              <PlayCircle size={18} className="text-purple-600" />

              <h2 className="font-semibold">In Progress</h2>

              <span className="ml-auto bg-white px-3 py-1 rounded-full text-sm text-slate-600">
                {inProgressOrders.length}
              </span>
            </div>

            <div className="space-y-3">
              {inProgressOrders.map((workOrder) => (
                <WorkOrderCard
                  key={workOrder.id}
                  workOrder={workOrder}
                  onAssign={handleAssign}
                  onStart={handleStart}
                  onComplete={handleComplete}
                />
              ))}
            </div>
          </div>

          <div className="bg-slate-100 rounded-3xl p-4 min-h-[520px]">
            <div className="flex items-center gap-3 mb-5">
              <CheckCircle2 size={18} className="text-green-600" />

              <h2 className="font-semibold">Completed</h2>

              <span className="ml-auto bg-white px-3 py-1 rounded-full text-sm text-slate-600">
                {completedOrders.length}
              </span>
            </div>

            <div className="space-y-3">
              {completedOrders.map((workOrder) => (
                <WorkOrderCard
                  key={workOrder.id}
                  workOrder={workOrder}
                  onAssign={handleAssign}
                  onStart={handleStart}
                  onComplete={handleComplete}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkOrders;