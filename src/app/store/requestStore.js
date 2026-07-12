import { create } from "zustand";

const initialRequests = {
  submitted: [
    {
      id: "MR-001",
      title: "Hydraulic Leak",
      requestType: "Leak",
      line: "Crank",
      station: "Station 12",
      reporter: "Operator A",
      priority: "Critical",
      createdAt: "20 mins ago",
      description:
        "Hydraulic oil leak spotted near crank line station 12. Leakage appears continuous and needs urgent review.",
      status: "Submitted",
    },
    {
      id: "MR-002",
      title: "Coolant Leak",
      requestType: "Leak",
      line: "Head",
      station: "Station 08",
      reporter: "Operator B",
      priority: "Medium",
      createdAt: "45 mins ago",
      description:
        "Coolant leakage seen below machine guard. No safety risk currently, but needs inspection.",
      status: "Submitted",
    },
  ],

  review: [
    {
      id: "MR-003",
      title: "Motor Fault",
      requestType: "Mechanical",
      line: "Block",
      station: "Station 05",
      reporter: "Operator C",
      priority: "High",
      createdAt: "1 hr ago",
      description:
        "Motor vibration increased during operation. Maintenance review required before next shift.",
      status: "In Review",
    },
  ],

  approved: [
    {
      id: "MR-004",
      title: "Bearing Replacement",
      requestType: "Mechanical",
      line: "PMR",
      station: "Station 15",
      reporter: "Operator D",
      priority: "Medium",
      createdAt: "2 hrs ago",
      description:
        "Bearing noise reported during routine operation. Approved for replacement activity.",
      status: "Approved",
    },
  ],

  workOrderCreated: [],

  rejected: [],

  completed: [
    {
      id: "MR-005",
      title: "Sensor Check",
      requestType: "Operations",
      line: "Head",
      station: "Station 02",
      reporter: "Operator E",
      priority: "Low",
      createdAt: "Yesterday",
      description:
        "Sensor reading was inconsistent. Maintenance team checked and resolved issue.",
      status: "Completed",
    },
  ],
};

const getSafeGroups = (groups) => {
  return {
    submitted: groups?.submitted ?? [],
    review: groups?.review ?? [],
    approved: groups?.approved ?? [],
    workOrderCreated: groups?.workOrderCreated ?? [],
    rejected: groups?.rejected ?? [],
    completed: groups?.completed ?? [],
  };
};

export const useRequestStore = create((set) => ({
  requestGroups: initialRequests,

  addRequest: (request) =>
    set((state) => {
      const currentGroups = getSafeGroups(state.requestGroups);

      return {
        requestGroups: {
          ...currentGroups,
          submitted: [request, ...currentGroups.submitted],
        },
      };
    }),

  moveRequest: (request, targetColumn, targetStatus) =>
    set((state) => {
      const currentGroups = getSafeGroups(state.requestGroups);

      const updatedGroups = {
        submitted: currentGroups.submitted.filter(
          (item) => item.id !== request.id
        ),
        review: currentGroups.review.filter(
          (item) => item.id !== request.id
        ),
        approved: currentGroups.approved.filter(
          (item) => item.id !== request.id
        ),
        workOrderCreated: currentGroups.workOrderCreated.filter(
          (item) => item.id !== request.id
        ),
        rejected: currentGroups.rejected.filter(
          (item) => item.id !== request.id
        ),
        completed: currentGroups.completed.filter(
          (item) => item.id !== request.id
        ),
      };

      const updatedRequest = {
        ...request,
        status: targetStatus,
      };

      return {
        requestGroups: {
          ...updatedGroups,
          [targetColumn]:[
            updatedRequest,
            ...updatedGroups[targetColumn],
          ],
        },
      };
    }),

  completeRequestById: (requestId) =>
    set((state) => {
      const currentGroups = getSafeGroups(state.requestGroups);

      const allRequests = [
        ...currentGroups.submitted,
        ...currentGroups.review,
        ...currentGroups.approved,
        ...currentGroups.workOrderCreated,
        ...currentGroups.rejected,
        ...currentGroups.completed,
      ];

      const requestToComplete = allRequests.find(
        (request) => request.id === requestId
      );

      if (!requestToComplete) {
        return state;
      }

      const updatedRequest = {
        ...requestToComplete,
        status: "Completed",
      };

      return {
        requestGroups: {
          submitted: currentGroups.submitted.filter(
            (request) => request.id !== requestId
          ),
          review: currentGroups.review.filter(
            (request) => request.id !== requestId
          ),
          approved: currentGroups.approved.filter(
            (request) => request.id !== requestId
          ),
          workOrderCreated: currentGroups.workOrderCreated.filter(
            (request) => request.id !== requestId
          ),
          rejected: currentGroups.rejected.filter(
            (request) => request.id !== requestId
          ),
          completed: [
            updatedRequest,
            ...currentGroups.completed.filter(
              (request) => request.id !== requestId
            ),
          ],
        },
      };
    }),
}));