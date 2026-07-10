import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUIStore } from "../../app/store/uiStore";

import {
  LayoutDashboard,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Wrench,
  Settings,
  BookOpen,
  FolderOpen,
} from "lucide-react";

const Sidebar = () => {
  const [operationsOpen, setOperationsOpen] = useState(true);
  const [configurationOpen, setConfigurationOpen] = useState(true);

  const { sidebarCollapsed, toggleSidebar } =
    useUIStore();

  return (
    <aside
      className={`bg-white border-r transition-all duration-300 ${
        sidebarCollapsed ? "w-20" : "w-72"
      }`}
    >
      <div className="h-16 flex items-center justify-between px-5 border-b">
        {!sidebarCollapsed && (
          <h2 className="font-bold text-xl text-blue-600">
            Plant Maintenance App
          </h2>
        )}

        <button onClick={toggleSidebar}>
          {sidebarCollapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      </div>

      <div className="p-3">

        <NavLink
          to="/"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
        >
          <LayoutDashboard size={20} />
          {!sidebarCollapsed && <span>Dashboard</span>}
        </NavLink>

        {!sidebarCollapsed && (
          <>
            <div className="mt-6">

              <button
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-500"
                onClick={() => setOperationsOpen(!operationsOpen)}
              >
                OPERATIONS
                <ChevronDown size={16} />
              </button>

              {operationsOpen && (
                <div className="ml-4 mt-2 space-y-2">

                  <NavLink
                    to="/maintenance-plans"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100"
                  >
                    <Wrench size={18} />
                    Maintenance Plans
                  </NavLink>

                  <NavLink
                    to="/reports"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100"
                  >
                    <FileText size={18} />
                    Reports
                  </NavLink>

                </div>
              )}
            </div>

            <div className="mt-6">

              <button
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-500"
                onClick={() =>
                  setConfigurationOpen(!configurationOpen)
                }
              >
                CONFIGURATION
                <ChevronDown size={16} />
              </button>

              {configurationOpen && (
                <div className="ml-4 mt-2 space-y-2">

                  <NavLink
                    to="/work-instructions"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100"
                  >
                    <BookOpen size={18} />
                    Work Instructions
                  </NavLink>

                  <NavLink
                    to="/documents"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100"
                  >
                    <FolderOpen size={18} />
                    Documents
                  </NavLink>

                </div>
              )}
            </div>

            <div className="mt-6">
              <NavLink
                to="/settings"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
              >
                <Settings size={20} />
                Settings
              </NavLink>
            </div>

          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;