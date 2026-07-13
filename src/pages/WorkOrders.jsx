/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState,useEffect } from "react";

import {
  ClipboardList,
  PlayCircle,
  CheckCircle2,
  UserCheck,
  Wrench,
  X,
  CalendarDays,
} from "lucide-react";

import { useWorkOrderStore } from "../app/store/workOrderStore";
import { useRequestStore } from "../app/store/requestStore";

const technicians = [
  "Technician A",
  "Technician B",
  "Technician C",
  "Technician D",
];

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
  onOpenAssignModal,
  onStart,
  onComplete,
  onView,
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
  <p><strong>Work Instruction:</strong></p>{" "}
  {workOrder.workInstructionName || "Not Linked"}
</p>
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

        {workOrder.dueDate && (
          <p>
            <strong>Due Date:</strong> {workOrder.dueDate}
          </p>
        )}
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
            type="button"
            onClick={() => onOpenAssignModal(workOrder)}
            className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition"
          >
            <UserCheck size={18} />
            Assign Technician
          </button>
        )}

        {workOrder.status === "Assigned" && (
          <button
            type="button"
            onClick={() => onStart(workOrder.id)}
            className="w-full inline-flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition"
          >
            <PlayCircle size={18} />
            Start Work
          </button>
        )}

        {workOrder.status === "In Progress" && (
          <button
            type="button"
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
      <div className="mt-3">
  <button
    onClick={() => onView(workOrder)}
    className="w-full border border-slate-300 py-2 rounded-xl hover:bg-slate-50"
  >
    View Details
  </button>
</div>
    </div>
  );
};


const WorkOrderColumn = ({
  title,
  icon: Icon,
  iconColor,
  items,
  children,
}) => {
  return (
    <div className="bg-slate-100 rounded-3xl p-4 min-h-[520px]">
      <div className="flex items-center gap-3 mb-5">
        <Icon size={18} className={iconColor} />

        <h2 className="font-semibold">{title}</h2>

        <span className="ml-auto bg-white px-3 py-1 rounded-full text-sm text-slate-600">
          {items.length}
        </span>
      </div>

      <div className="space-y-3">
        {items.length > 0 ? (
          children
        ) : (
          <div className="border border-dashed border-slate-300 rounded-2xl p-6 text-center text-sm text-slate-400">
            No work orders
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

const AssignTechnicianModal = ({
  workOrder,
  onClose,
  onAssign,
}) => {
  const [selectedTechnician, setSelectedTechnician] =
    useState("Technician A");

  const [dueDate, setDueDate] = useState("");

  if (!workOrder) {
    return null;
  }

  const handleAssign = () => {
    onAssign(workOrder.id, selectedTechnician, dueDate);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-slate-900/40"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6">
        <div className="flex items-start justify-between border-b border-slate-200 pb-5">
          <div>
            <p className="text-sm text-slate-500">
              {workOrder.id}
            </p>

            <h2 className="text-2xl font-bold mt-1">
              Assign Technician
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Assign this work order to a maintenance team member.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 space-y-5">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <p className="text-xs text-slate-500">
              Work Order
            </p>

            <h3 className="font-semibold text-slate-900 mt-1">
              {workOrder.title}
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              {workOrder.line} - {workOrder.station}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Technician
            </label>

            <select
              value={selectedTechnician}
              onChange={(event) =>
                setSelectedTechnician(event.target.value)
              }
              className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
            >
              {technicians.map((technician) => (
                <option key={technician} value={technician}>
                  {technician}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Due Date
            </label>

            <div className="flex items-center gap-3 border border-slate-300 rounded-2xl px-4 py-3">
              <CalendarDays size={18} className="text-slate-400" />

              <input
                type="date"
                value={dueDate}
                onChange={(event) =>
                  setDueDate(event.target.value)
                }
                className="flex-1 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-slate-300 py-3 rounded-xl hover:bg-slate-50 transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleAssign}
              className="flex-1 bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition"
            >
              Assign Work Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const WorkOrderDetailsDrawer = ({
  workOrder,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (workOrder) {
      setTimeout(() => setIsOpen(true), 10);
    }
  }, [workOrder]);

  if (!workOrder) {
    return null;
  }

  const closeDrawer = () => {
    setIsOpen(false);

    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className="fixed top-8 right-0 bottom-0 left-0 z-50 pointer-events-none">
      <div
        onClick={closeDrawer}
        className={`absolute inset-0 bg-black/40 pointer-events-auto transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute right-0 top-0 h-full w-full max-w-xl bg-white pointer-events-auto shadow-2xl p-6 overflow-y-auto transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-start border-b pb-5">
          <div>
            <p className="text-sm text-slate-500">
              {workOrder.id}
            </p>

            <h2 className="text-2xl font-bold">
              {workOrder.title}
            </h2>
          </div>
          <div className="border rounded-2xl p-4">
  <p className="text-sm text-slate-500">
    Due Date
  </p>

  <p className="font-semibold">
    {workOrder.dueDate || "Not Assigned"}
  </p>
</div>
<div className="border rounded-2xl p-4">
  <p className="text-sm text-slate-500">
    Created
  </p>

  <p className="font-semibold">
    {workOrder.createdAt}
  </p>
</div>

          <button
            onClick={closeDrawer}
            className="p-2 rounded-xl hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="border rounded-2xl p-4">
            <p className="text-sm text-slate-500">
              Priority
            </p>

            <p className="font-semibold">
              {workOrder.priority}
            </p>
          </div>

          <div className="border rounded-2xl p-4">
            <p className="text-sm text-slate-500">
              Status
            </p>

            <p className="font-semibold">
              {workOrder.status}
            </p>
          </div>

          <div className="border rounded-2xl p-4">
            <p className="text-sm text-slate-500">
              Technician
            </p>

            <p className="font-semibold">
              {workOrder.assignedTo}
            </p>
          </div>

          <div className="border rounded-2xl p-4">
            <p className="text-sm text-slate-500">
              Linked Request
            </p>

            <p className="font-semibold">
              {workOrder.sourceRequestId}
            </p>
          </div>

          <div className="border rounded-2xl p-4">
            <p className="text-sm text-slate-500">
              Work Instruction
            </p>

            <p className="font-semibold">
              {workOrder.workInstructionName ||
                "Not Linked"}
            </p>
          </div>

          <div className="border rounded-2xl p-4">
            <p className="text-sm text-slate-500">
              Description
            </p>

            <p className="mt-2 text-slate-600">
              {workOrder.description}
            </p>
          </div>

          <button
  onClick={() => {
    alert(
      `Opening ${workOrder.workInstructionName}`
    );
  }}
  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
>
  View Work Instruction
</button>
        </div>
      </div>
    </div>
  );
};

const WorkOrders = () => {
  const [selectedWorkOrder, setSelectedWorkOrder] =
  useState(null);

const [selectedWorkOrderForAssignment, setSelectedWorkOrderForAssignment] =
  useState(null);

  const workOrders = useWorkOrderStore(
    (state) => state.workOrders
  );

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

 const handleAssign = (
  workOrderId,
  technicianName,
  dueDate
) => {
  assignTechnician(
    workOrderId,
    technicianName,
    dueDate
  );

  setSelectedWorkOrderForAssignment(null);
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
          <WorkOrderColumn
            title="Open"
            icon={ClipboardList}
            iconColor="text-blue-600"
            items={openOrders}
          >
            {openOrders.map((workOrder) => (
              <WorkOrderCard
                key={workOrder.id}
                workOrder={workOrder}
                onOpenAssignModal={setSelectedWorkOrderForAssignment}
                onStart={handleStart}
                onComplete={handleComplete}
                onView={setSelectedWorkOrder}
              />
            ))}
          </WorkOrderColumn>

          <WorkOrderColumn
            title="Assigned"
            icon={UserCheck}
            iconColor="text-orange-600"
            items={assignedOrders}
          >
            {assignedOrders.map((workOrder) => (
              <WorkOrderCard
                key={workOrder.id}
                workOrder={workOrder}
                onOpenAssignModal={setSelectedWorkOrderForAssignment}
                onStart={handleStart}
                onComplete={handleComplete}
                onView={setSelectedWorkOrder}
              />
            ))}
          </WorkOrderColumn>

          <WorkOrderColumn
            title="In Progress"
            icon={PlayCircle}
            iconColor="text-purple-600"
            items={inProgressOrders}
          >
            {inProgressOrders.map((workOrder) => (
              <WorkOrderCard
                key={workOrder.id}
                workOrder={workOrder}
                onOpenAssignModal={setSelectedWorkOrderForAssignment}
                onStart={handleStart}
                onComplete={handleComplete}
                onView={setSelectedWorkOrder}
              />
            ))}
          </WorkOrderColumn>

          <WorkOrderColumn
            title="Completed"
            icon={CheckCircle2}
            iconColor="text-green-600"
            items={completedOrders}
          >
            {completedOrders.map((workOrder) => (
              <WorkOrderCard
                key={workOrder.id}
                workOrder={workOrder}
                onOpenAssignModal={setSelectedWorkOrderForAssignment}
                onStart={handleStart}
                onComplete={handleComplete}
                onView={setSelectedWorkOrder}
              />
            ))}
          </WorkOrderColumn>
        </div>
      )}

      <AssignTechnicianModal
  workOrder={selectedWorkOrderForAssignment}
  onClose={() =>
    setSelectedWorkOrderForAssignment(null)
  }
  onAssign={handleAssign}
/>
      <WorkOrderDetailsDrawer
  workOrder={selectedWorkOrder}
  onClose={() => setSelectedWorkOrder(null)}
/>
    </div>
  );
};

export default WorkOrders;