import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUIStore } from "../../app/store/uiStore";

import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  CalendarDays,
  Wrench,
  CheckSquare,
  BookOpen,
  FolderOpen,
  BarChart3,
  Users,
  Settings,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const [requestsOpen, setRequestsOpen] = useState(true);
  const [planningOpen, setPlanningOpen] = useState(true);
  const [executionOpen, setExecutionOpen] = useState(true);
  const [knowledgeOpen, setKnowledgeOpen] = useState(true);

  const { sidebarCollapsed, toggleSidebar } =
    useUIStore();

  const navClass = ({ isActive }) =>
    `
      flex items-center
      ${
        sidebarCollapsed
          ? "justify-center"
          : "gap-3"
      }
      px-3 py-3
      rounded-xl
      transition-all
      duration-200
      ${
        isActive
          ? "bg-blue-50 text-blue-600"
          : "text-slate-700 hover:bg-slate-100"
      }
    `;

  return (
    <aside
      className={`
        bg-white
        border-r
        border-slate-200
        transition-all
        duration-300
        min-h-screen
        ${
          sidebarCollapsed
            ? "w-20"
            : "w-72"
        }
      `}
    >
      {/* Logo */}

      <div className="h-16 border-b border-slate-200 px-4 flex items-center justify-between">
        {!sidebarCollapsed && (
          <h1 className="text-xl font-bold text-blue-600">
            EPMC PMS
          </h1>
        )}

        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-100"
        >
          {sidebarCollapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      <div className="p-3 space-y-1">

        {/* Dashboard */}

        <NavLink
          to="/"
          end
          className={navClass}
          title="Dashboard"
        >
          <LayoutDashboard size={20} />

          {!sidebarCollapsed && (
            <span>Dashboard</span>
          )}
        </NavLink>

        {/* REQUESTS */}

        {!sidebarCollapsed && (
          <div className="pt-4">
            <button
              onClick={() =>
                setRequestsOpen(!requestsOpen)
              }
              className="w-full flex items-center justify-between px-3 py-2"
            >
              <span className="text-xs font-semibold tracking-wider text-slate-500">
                REQUESTS
              </span>

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  requestsOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>
          </div>
        )}

        {(requestsOpen ||
          sidebarCollapsed) && (
          <>
            <NavLink
              to="/maintenance-request"
              className={navClass}
              title="New Request"
            >
              <PlusCircle size={20} />

              {!sidebarCollapsed && (
                <span>New Request</span>
              )}
            </NavLink>

            <NavLink
              to="/requests"
              className={navClass}
              title="Requests Queue"
            >
              <ClipboardList size={20} />

              {!sidebarCollapsed && (
                <span>
                  Requests Queue
                </span>
              )}
            </NavLink>
          </>
        )}

        {/* PLANNING */}

        {!sidebarCollapsed && (
          <div className="pt-4">
            <button
              onClick={() =>
                setPlanningOpen(
                  !planningOpen
                )
              }
              className="w-full flex items-center justify-between px-3 py-2"
            >
              <span className="text-xs font-semibold tracking-wider text-slate-500">
                PLANNING
              </span>

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  planningOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>
          </div>
        )}

        {(planningOpen ||
          sidebarCollapsed) && (
          <>
            <NavLink
              to="/maintenance-plans"
              className={navClass}
              title="Maintenance Plans"
            >
              <CalendarDays size={20} />

              {!sidebarCollapsed && (
                <span>
                  Maintenance Plans
                </span>
              )}
            </NavLink>

            <NavLink
              to="/schedules"
              className={navClass}
              title="Schedules"
            >
              <CalendarDays size={20} />

              {!sidebarCollapsed && (
                <span>Schedules</span>
              )}
            </NavLink>
          </>
        )}

        {/* EXECUTION */}

        {!sidebarCollapsed && (
          <div className="pt-4">
            <button
              onClick={() =>
                setExecutionOpen(
                  !executionOpen
                )
              }
              className="w-full flex items-center justify-between px-3 py-2"
            >
              <span className="text-xs font-semibold tracking-wider text-slate-500">
                EXECUTION
              </span>

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  executionOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>
          </div>
        )}

        {(executionOpen ||
          sidebarCollapsed) && (
          <>
            <NavLink
              to="/work-orders"
              className={navClass}
              title="Work Orders"
            >
              <Wrench size={20} />

              {!sidebarCollapsed && (
                <span>Work Orders</span>
              )}
            </NavLink>

            <NavLink
              to="/tasks"
              className={navClass}
              title="Tasks"
            >
              <CheckSquare size={20} />

              {!sidebarCollapsed && (
                <span>Tasks</span>
              )}
            </NavLink>
          </>
        )}

        {/* KNOWLEDGE */}

        {!sidebarCollapsed && (
          <div className="pt-4">
            <button
              onClick={() =>
                setKnowledgeOpen(
                  !knowledgeOpen
                )
              }
              className="w-full flex items-center justify-between px-3 py-2"
            >
              <span className="text-xs font-semibold tracking-wider text-slate-500">
                KNOWLEDGE
              </span>

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  knowledgeOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>
          </div>
        )}

        {(knowledgeOpen ||
          sidebarCollapsed) && (
          <>
            <NavLink
              to="/work-instructions"
              className={navClass}
              title="Work Instructions"
            >
              <BookOpen size={20} />

              {!sidebarCollapsed && (
                <span>
                  Work Instructions
                </span>
              )}
            </NavLink>

            <NavLink
              to="/documents"
              className={navClass}
              title="Documents"
            >
              <FolderOpen size={20} />

              {!sidebarCollapsed && (
                <span>Documents</span>
              )}
            </NavLink>
          </>
        )}

        {/* ANALYTICS */}

        {!sidebarCollapsed && (
          <div className="pt-4">
            <span className="px-3 text-xs font-semibold tracking-wider text-slate-500">
              ANALYTICS
            </span>
          </div>
        )}

        <NavLink
          to="/reports"
          className={navClass}
          title="Reports"
        >
          <BarChart3 size={20} />

          {!sidebarCollapsed && (
            <span>Reports</span>
          )}
        </NavLink>

        {/* ADMIN */}

        {!sidebarCollapsed && (
          <div className="pt-4">
            <span className="px-3 text-xs font-semibold tracking-wider text-slate-500">
              ADMIN
            </span>
          </div>
        )}

        <NavLink
          to="/users"
          className={navClass}
          title="Users"
        >
          <Users size={20} />

          {!sidebarCollapsed && (
            <span>Users</span>
          )}
        </NavLink>

        <NavLink
          to="/settings"
          className={navClass}
          title="Settings"
        >
          <Settings size={20} />

          {!sidebarCollapsed && (
            <span>Settings</span>
          )}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;