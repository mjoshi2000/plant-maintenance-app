import { create } from "zustand";

export const useWorkOrderStore = create((set) => ({
  workOrders: [],

  addWorkOrder: (workOrder) =>
    set((state) => {
      const alreadyExists = state.workOrders.some(
        (item) => item.id === workOrder.id
      );

      if (alreadyExists) {
        return state;
      }

      return {
        workOrders: [workOrder, ...state.workOrders],
      };
    }),

  assignTechnician: (workOrderId, technicianName) =>
    set((state) => ({
      workOrders: state.workOrders.map((workOrder) =>
        workOrder.id === workOrderId
          ? {
              ...workOrder,
              assignedTo: technicianName,
              status: "Assigned",
            }
          : workOrder
      ),
    })),

  updateWorkOrderStatus: (workOrderId, status) =>
    set((state) => ({
      workOrders: state.workOrders.map((workOrder) =>
        workOrder.id === workOrderId
          ? {
              ...workOrder,
              status,
            }
          : workOrder
      ),
    })),
}));