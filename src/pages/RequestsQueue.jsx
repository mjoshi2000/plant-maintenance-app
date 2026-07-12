import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  AlertTriangle,
  Ban,
  CalendarClock,
  CheckCircle2,
  CircleDashed,
  ClipboardCheck,
  Clock3,
  MapPin,
  Plus,
  User,
  Wrench,
  X,
} from "lucide-react";

import { useRequestStore } from "../app/store/requestStore";
import { useWorkOrderStore } from "../app/store/workOrderStore";

const priorityStyles = {
  Critical: "bg-red-100 text-red-700 border-red-200",
  High: "bg-orange-100 text-orange-700 border-orange-200",
  Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Low: "bg-blue-100 text-blue-700 border-blue-200",
};

const statusStyles = {
  Submitted: "bg-blue-100 text-blue-700",
  "In Review": "bg-orange-100 text-orange-700",
  Approved: "bg-green-100 text-green-700",
  "Work Order Created": "bg-purple-100 text-purple-700",
  Rejected: "bg-red-100 text-red-700",
  Completed: "bg-slate-100 text-slate-700",
};

const getSafeRequestGroups = (groups) => {
  return {
    submitted: groups?.submitted ?? [],
    review: groups?.review ?? [],
    approved: groups?.approved ?? [],
    workOrderCreated: groups?.workOrderCreated ?? [],
    rejected: groups?.rejected ?? [],
    completed: groups?.completed ?? [],
  };
};

const RequestCard = ({ request, onView }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-slate-400">
          {request.id}
        </span>

        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border ${
            priorityStyles[request.priority]
          }`}
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

        <button
          type="button"
          onClick={() => onView(request)}
          className="text-blue-600 text-sm font-medium hover:text-blue-700"
        >
          View
        </button>
      </div>
    </div>
  );
};

const Column = ({ title, items, color, icon: Icon, onView }) => {
  return (
    <div className="bg-slate-100 rounded-3xl p-4 min-h-[560px]">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`h-3 w-3 rounded-full ${color}`} />

          <Icon size={18} className="text-slate-600" />

          <h2 className="font-semibold text-sm">
            {title}
          </h2>
        </div>

        <span className="bg-white px-3 py-1 rounded-full text-sm text-slate-600">
          {items.length}
        </span>
      </div>

      <div className="space-y-3">
        {items.length > 0 ? (
          items.map((item) => (
            <RequestCard
              key={item.id}
              request={item}
              onView={onView}
            />
          ))
        ) : (
          <div className="border border-dashed border-slate-300 rounded-2xl p-6 text-center text-sm text-slate-400">
            No requests
          </div>
        )}
      </div>
    </div>
  );
};

const RequestDetailsDrawer = ({
  request,
  onClose,
  onApprove,
  onReject,
  onCreateWorkOrder,
}) => {
  const [drawerRequest, setDrawerRequest] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (request) {
      setDrawerRequest(request);

      setTimeout(() => {
        setIsOpen(true);
      }, 10);
    }
  }, [request]);

  const handleClose = () => {
    setIsOpen(false);

    setTimeout(() => {
      setDrawerRequest(null);
      onClose();
    }, 300);
  };

  if (!drawerRequest) {
    return null;
  }

  const canApprove =
    drawerRequest.status === "Submitted" ||
    drawerRequest.status === "In Review";

  const canReject =
    drawerRequest.status === "Submitted" ||
    drawerRequest.status === "In Review";

  const canCreateWorkOrder =
    drawerRequest.status === "Approved";

  return (
    <div className="fixed top-16 right-0 bottom-0 left-0 z-40 pointer-events-none">
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-slate-900/40 transition-opacity duration-300 pointer-events-auto ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl p-6 overflow-y-auto pointer-events-auto transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between border-b pb-5">
          <div>
            <p className="text-sm text-slate-500">
              {drawerRequest.id}
            </p>

            <h2 className="text-2xl font-bold mt-1">
              {drawerRequest.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-xl hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              priorityStyles[drawerRequest.priority]
            }`}
          >
            {drawerRequest.priority}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              statusStyles[drawerRequest.status]
            }`}
          >
            {drawerRequest.status}
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-2xl p-4">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <MapPin size={16} />
              Line
            </div>

            <p className="font-semibold mt-2">
              {drawerRequest.line}
            </p>
          </div>

          <div className="border rounded-2xl p-4">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <MapPin size={16} />
              Station
            </div>

            <p className="font-semibold mt-2">
              {drawerRequest.station}
            </p>
          </div>

          <div className="border rounded-2xl p-4">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <User size={16} />
              Reporter
            </div>

            <p className="font-semibold mt-2">
              {drawerRequest.reporter}
            </p>
          </div>

          <div className="border rounded-2xl p-4">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <CalendarClock size={16} />
              Created
            </div>

            <p className="font-semibold mt-2">
              {drawerRequest.createdAt}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold text-lg">
            Description
          </h3>

          <p className="mt-3 text-slate-600 leading-relaxed">
            {drawerRequest.description}
          </p>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold text-lg">
            Attached Media
          </h3>

          <div className="mt-3 border-2 border-dashed rounded-2xl p-8 text-center text-slate-500">
            No media preview available in mock data
          </div>
        </div>

        <div className="mt-8 border-t pt-6 space-y-3">
          {canApprove && (
            <button
              type="button"
              onClick={() => {
                onApprove(drawerRequest);
                handleClose();
              }}
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
            >
              Approve Request
            </button>
          )}

          {canCreateWorkOrder && (
            <button
              type="button"
              onClick={() => {
                onCreateWorkOrder(drawerRequest);
                handleClose();
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Wrench size={18} />
              Create Work Order
            </button>
          )}

          {canReject && (
            <button
              type="button"
              onClick={() => {
                onReject(drawerRequest);
                handleClose();
              }}
              className="w-full bg-red-50 text-red-600 py-3 rounded-xl hover:bg-red-100 transition"
            >
              Reject Request
            </button>
          )}

          {!canApprove && !canReject && !canCreateWorkOrder && (
            <div className="rounded-2xl bg-slate-50 border p-4 text-center text-sm text-slate-500">
              No actions available for this request.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RequestsQueue = () => {
  const rawRequestGroups = useRequestStore(
    (state) => state.requestGroups
  );

  const requestGroups = getSafeRequestGroups(rawRequestGroups);

  const moveRequest = useRequestStore(
    (state) => state.moveRequest
  );

  const addWorkOrder = useWorkOrderStore(
    (state) => state.addWorkOrder
  );

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [message, setMessage] = useState("");

  const handleApprove = (request) => {
    moveRequest(request, "approved", "Approved");
    setMessage(`${request.id} approved successfully.`);
  };

  const handleReject = (request) => {
    moveRequest(request, "rejected", "Rejected");
    setMessage(`${request.id} rejected.`);
  };

  const handleCreateWorkOrder = (request) => {
    const workOrderId = `WO-${request.id.replace("MR-", "")}`;

    const newWorkOrder = {
      id: workOrderId,
      sourceRequestId: request.id,
      title: request.title,
      line: request.line,
      station: request.station,
      priority: request.priority,
      status: "Open",
      assignedTo: "Unassigned",
      createdAt: "Just now",
      description: request.description,
    };

    addWorkOrder(newWorkOrder);

    moveRequest(
      request,
      "workOrderCreated",
      "Work Order Created"
    );

    setMessage(`${workOrderId} created from ${request.id}.`);
  };

  const totalRequests =
    requestGroups.submitted.length +
    requestGroups.review.length +
    requestGroups.approved.length +
    requestGroups.workOrderCreated.length +
    requestGroups.rejected.length +
    requestGroups.completed.length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Maintenance Requests
          </h1>

          <p className="mt-1 text-slate-500">
            Review, approve and track incoming maintenance requests.
          </p>
        </div>

        <Link
          to="/maintenance-request"
          className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          New Request
        </Link>
      </div>

      {message && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-2xl p-4 flex items-center justify-between">
          <span>{message}</span>

          <button
            type="button"
            onClick={() => setMessage("")}
            className="text-sm font-medium hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-slate-500 text-sm">
            Total
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {totalRequests}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-slate-500 text-sm">
            Submitted
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {requestGroups.submitted.length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-slate-500 text-sm">
            Approved
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-600">
            {requestGroups.approved.length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-slate-500 text-sm">
            Work Orders Created
          </p>

          <h2 className="text-3xl font-bold mt-2 text-purple-600">
            {requestGroups.workOrderCreated.length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-slate-500 text-sm">
            Rejected
          </p>

          <h2 className="text-3xl font-bold mt-2 text-red-600">
            {requestGroups.rejected.length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-slate-500 text-sm">
            Completed
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {requestGroups.completed.length}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-6 gap-6">
        <Column
          title="Submitted"
          items={requestGroups.submitted}
          color="bg-blue-500"
          icon={CircleDashed}
          onView={setSelectedRequest}
        />

        <Column
          title="In Review"
          items={requestGroups.review}
          color="bg-orange-500"
          icon={Clock3}
          onView={setSelectedRequest}
        />

        <Column
          title="Approved"
          items={requestGroups.approved}
          color="bg-green-500"
          icon={CheckCircle2}
          onView={setSelectedRequest}
        />

        <Column
          title="WO Created"
          items={requestGroups.workOrderCreated}
          color="bg-purple-500"
          icon={ClipboardCheck}
          onView={setSelectedRequest}
        />

        <Column
          title="Rejected"
          items={requestGroups.rejected}
          color="bg-red-500"
          icon={Ban}
          onView={setSelectedRequest}
        />

        <Column
          title="Completed"
          items={requestGroups.completed}
          color="bg-slate-500"
          icon={AlertTriangle}
          onView={setSelectedRequest}
        />
      </div>

      <RequestDetailsDrawer
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onApprove={handleApprove}
        onReject={handleReject}
        onCreateWorkOrder={handleCreateWorkOrder}
      />
    </div>
  );
};

export default RequestsQueue;