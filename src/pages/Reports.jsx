import { useMemo, useState } from "react";
import {
  Download,
  RefreshCw,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Wrench,
  TrendingUp,
} from "lucide-react";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const lines = ["Head", "Block", "Crank", "PMR"];
const shifts = ["Red", "Green", "Blue", "White"];
const priorities = ["Low", "Medium", "High", "Critical"];
const statuses = ["Completed", "Open", "In Review"];

const issueTypes = [
  "Hydraulic Leak",
  "Sensor Failure",
  "Bearing Wear",
  "Cooling Fault",
  "Motor Fault",
  "Air Leak",
];

const lineColors = {
  Head: "#3b82f6",
  Block: "#ef4444",
  Crank: "#22c55e",
  PMR: "#f97316",
};

const priorityColors = {
  Low: "#3b82f6",
  Medium: "#eab308",
  High: "#f97316",
  Critical: "#ef4444",
};

const pieColors = ["#22c55e", "#f97316", "#3b82f6"];

const createMockReports = () => {
  return Array.from({ length: 411 }, (_, index) => {
    const day = String((index % 11) + 1).padStart(2, "0");

    const line =
      index % 25 === 0
        ? "PMR"
        : lines[index % 3];

    const priority =
      index % 17 === 0
        ? "Critical"
        : index % 3 === 0
        ? "High"
        : index % 4 === 0
        ? "Medium"
        : "Low";

    const status =
      index % 13 === 0
        ? "Open"
        : index % 11 === 0
        ? "In Review"
        : "Completed";

    return {
      id: `MR-${String(index + 1).padStart(4, "0")}`,
      date: `2026-07-${day}`,
      line,
      shift: shifts[index % shifts.length],
      priority,
      status,
      issue: issueTypes[index % issueTypes.length],
      durationMinutes: 35 + (index % 180),
      firstTimeFix: index % 22 !== 0,
    };
  });
};

const mockReports = createMockReports();

const formatMinutesToHours = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}:${String(remainingMinutes).padStart(2, "0")}`;
};

const roundToOneDecimal = (value) => {
  return Math.round(value * 10) / 10;
};

const StatCard = ({ title, value, subtitle, icon: Icon, color }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2
            className={`mt-2 text-3xl font-bold ${
              color || "text-slate-900"
            }`}
          >
            {value}
          </h2>

          {subtitle ? (
            <p className="mt-2 text-xs text-slate-500">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="h-11 w-11 rounded-xl bg-slate-100 flex items-center justify-center">
          <Icon
            size={21}
            className={color || "text-slate-700"}
          />
        </div>
      </div>
    </div>
  );
};

const Reports = () => {
  const [startDate, setStartDate] = useState("2026-07-01");
  const [endDate, setEndDate] = useState("2026-07-11");
  const [selectedLine, setSelectedLine] = useState("All Lines");
  const [selectedShift, setSelectedShift] = useState("All Shifts");
  const [selectedPriority, setSelectedPriority] =
    useState("All Priorities");

  const filteredReports = useMemo(() => {
    return mockReports.filter((report) => {
      const isAfterStart = report.date >= startDate;
      const isBeforeEnd = report.date <= endDate;

      const matchesLine =
        selectedLine === "All Lines" ||
        report.line === selectedLine;

      const matchesShift =
        selectedShift === "All Shifts" ||
        report.shift === selectedShift;

      const matchesPriority =
        selectedPriority === "All Priorities" ||
        report.priority === selectedPriority;

      return (
        isAfterStart &&
        isBeforeEnd &&
        matchesLine &&
        matchesShift &&
        matchesPriority
      );
    });
  }, [
    startDate,
    endDate,
    selectedLine,
    selectedShift,
    selectedPriority,
  ]);

  const lineData = useMemo(() => {
    return lines.map((line) => ({
      name: line,
      value: filteredReports.filter(
        (report) => report.line === line
      ).length,
    }));
  }, [filteredReports]);

  const priorityData = useMemo(() => {
    return priorities.map((priority) => ({
      name: priority,
      value: filteredReports.filter(
        (report) => report.priority === priority
      ).length,
    }));
  }, [filteredReports]);

  const statusData = useMemo(() => {
    return statuses.map((status) => ({
      name: status,
      value: filteredReports.filter(
        (report) => report.status === status
      ).length,
    }));
  }, [filteredReports]);

  const trendData = useMemo(() => {
    const dateMap = {};

    filteredReports.forEach((report) => {
      if (!dateMap[report.date]) {
        dateMap[report.date] = {
          date: report.date.slice(5),
          requests: 0,
          completed: 0,
        };
      }

      dateMap[report.date].requests += 1;

      if (report.status === "Completed") {
        dateMap[report.date].completed += 1;
      }
    });

    return Object.values(dateMap);
  }, [filteredReports]);

  const downtimeByLineOverTime = useMemo(() => {
    const dateMap = {};

    filteredReports.forEach((report) => {
      if (!dateMap[report.date]) {
        dateMap[report.date] = {
          date: report.date.slice(5),
          Head: 0,
          Block: 0,
          Crank: 0,
          PMR: 0,
        };
      }

      dateMap[report.date][report.line] += report.durationMinutes;
    });

    return Object.values(dateMap).map((item) => ({
      ...item,
      Head: roundToOneDecimal(item.Head / 60),
      Block: roundToOneDecimal(item.Block / 60),
      Crank: roundToOneDecimal(item.Crank / 60),
      PMR: roundToOneDecimal(item.PMR / 60),
    }));
  }, [filteredReports]);

  const mttrByLine = useMemo(() => {
    return lines.map((line) => {
      const completedForLine = filteredReports.filter(
        (report) =>
          report.line === line &&
          report.status === "Completed"
      );

      const totalDuration = completedForLine.reduce(
        (sum, report) => sum + report.durationMinutes,
        0
      );

      const averageMinutes =
        completedForLine.length > 0
          ? totalDuration / completedForLine.length
          : 0;

      return {
        name: line,
        value: roundToOneDecimal(averageMinutes / 60),
      };
    });
  }, [filteredReports]);

  const recurringIssues = useMemo(() => {
    return issueTypes
      .map((issue) => ({
        name: issue,
        count: filteredReports.filter(
          (report) => report.issue === issue
        ).length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [filteredReports]);

  const totalRequests = filteredReports.length;

  const openRequests = filteredReports.filter(
    (report) => report.status !== "Completed"
  ).length;

  const completedRequests = filteredReports.filter(
    (report) => report.status === "Completed"
  );

  const totalMinutes = filteredReports.reduce(
    (sum, report) => sum + report.durationMinutes,
    0
  );

  const averageResolutionMinutes =
    completedRequests.length > 0
      ? Math.round(
          completedRequests.reduce(
            (sum, report) => sum + report.durationMinutes,
            0
          ) / completedRequests.length
        )
      : 0;

  const firstTimeFixCount = completedRequests.filter(
    (report) => report.firstTimeFix
  ).length;

  const firstTimeFixRate =
    completedRequests.length > 0
      ? Math.round(
          (firstTimeFixCount / completedRequests.length) * 100
        )
      : 0;

  const criticalIssues = filteredReports.filter(
    (report) => report.priority === "Critical"
  ).length;

  const handleRefresh = () => {
    console.log("Filters refreshed", {
      startDate,
      endDate,
      selectedLine,
      selectedShift,
      selectedPriority,
      totalResults: filteredReports.length,
    });
  };

  const handleExportCsv = () => {
    const rows = [
      [
        "ID",
        "Date",
        "Line",
        "Shift",
        "Priority",
        "Status",
        "Issue",
        "Duration Minutes",
        "First Time Fix",
      ],
      ...filteredReports.map((report) => [
        report.id,
        report.date,
        report.line,
        report.shift,
        report.priority,
        report.status,
        report.issue,
        report.durationMinutes,
        report.firstTimeFix ? "Yes" : "No",
      ]),
    ];

    const csvContent = rows
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "filtered-maintenance-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Hub Analytics
          </h1>

          <p className="mt-1 text-slate-500">
            Breakdowns, requests, work orders and maintenance
            performance.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-4 py-3 border border-slate-300 rounded-xl bg-white hover:bg-slate-50"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Start Date
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(event) =>
                setStartDate(event.target.value)
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(event) =>
                setEndDate(event.target.value)
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Line
            </label>

            <select
              value={selectedLine}
              onChange={(event) =>
                setSelectedLine(event.target.value)
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            >
              <option>All Lines</option>
              <option>Head</option>
              <option>Block</option>
              <option>Crank</option>
              <option>PMR</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Shift
            </label>

            <select
              value={selectedShift}
              onChange={(event) =>
                setSelectedShift(event.target.value)
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            >
              <option>All Shifts</option>
              <option>Red</option>
              <option>Green</option>
              <option>Blue</option>
              <option>White</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Priority
            </label>

            <select
              value={selectedPriority}
              onChange={(event) =>
                setSelectedPriority(event.target.value)
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            >
              <option>All Priorities</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-300 rounded-2xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle
            className="text-orange-500"
            size={22}
          />

          <div>
            <p className="font-semibold text-slate-800">
              {openRequests} open work entries
            </p>

            <p className="text-sm text-slate-500">
              These requests match the selected filters and require
              maintenance review.
            </p>
          </div>
        </div>

        <button className="text-sm font-medium text-orange-700">
          Expand
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-5">
        <StatCard
          title="Total Requests"
          value={totalRequests}
          subtitle="Filtered result count"
          icon={Wrench}
        />

        <StatCard
          title="Open"
          value={openRequests}
          subtitle="Open or in review"
          icon={AlertTriangle}
          color="text-orange-500"
        />

        <StatCard
          title="Personnel Hours"
          value={formatMinutesToHours(totalMinutes)}
          subtitle="Total maintenance effort"
          icon={Clock3}
          color="text-green-600"
        />

        <StatCard
          title="MTTR"
          value={`${formatMinutesToHours(
            averageResolutionMinutes
          )}h`}
          subtitle="Average resolution time"
          icon={TrendingUp}
          color="text-blue-600"
        />

        <StatCard
          title="First Time Fix"
          value={`${firstTimeFixRate}%`}
          subtitle={`${firstTimeFixCount} / ${completedRequests.length} completed`}
          icon={CheckCircle2}
          color="text-green-600"
        />

        <StatCard
          title="Critical Issues"
          value={criticalIssues}
          subtitle="Needs attention"
          icon={Activity}
          color="text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Breakdowns by Line
          </h2>

          <p className="text-sm text-slate-500 mt-1 mb-6">
            Count based on selected filters
          </p>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lineData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar
                  dataKey="value"
                  radius={[8, 8, 0, 0]}
                >
                  {lineData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={lineColors[entry.name]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Breakdowns by Priority
          </h2>

          <p className="text-sm text-slate-500 mt-1 mb-6">
            Request count by priority
          </p>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar
                  dataKey="value"
                  radius={[8, 8, 0, 0]}
                >
                  {priorityData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={priorityColors[entry.name]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Status Distribution
          </h2>

          <p className="text-sm text-slate-500 mt-1 mb-6">
            Completed, open and review status
          </p>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Request Trend
          </h2>

          <p className="text-sm text-slate-500 mt-1 mb-6">
            Requests created vs completed
          </p>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="requests"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Downtime by Line Over Time
          </h2>

          <p className="text-sm text-slate-500 mt-1 mb-6">
            Total downtime hours by production line.
          </p>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={downtimeByLineOverTime}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="Head"
                  stroke={lineColors.Head}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

                <Line
                  type="monotone"
                  dataKey="Block"
                  stroke={lineColors.Block}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

                <Line
                  type="monotone"
                  dataKey="Crank"
                  stroke={lineColors.Crank}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

                <Line
                  type="monotone"
                  dataKey="PMR"
                  stroke={lineColors.PMR}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            MTTR by Line
          </h2>

          <p className="text-sm text-slate-500 mt-1 mb-6">
            Average resolution time in hours by production line.
          </p>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mttrByLine}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="value"
                  radius={[8, 8, 0, 0]}
                >
                  {mttrByLine.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={lineColors[entry.name]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Top Recurring Issues
        </h2>

        <p className="text-sm text-slate-500 mt-1 mb-6">
          Most frequently reported maintenance problems based on
          selected filters.
        </p>

        <div className="space-y-4">
          {recurringIssues.map((issue, index) => (
            <div
              key={issue.name}
              className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-600">
                  {index + 1}
                </div>

                <span className="font-medium text-slate-800">
                  {issue.name}
                </span>
              </div>

              <span className="font-bold text-slate-900">
                {issue.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;