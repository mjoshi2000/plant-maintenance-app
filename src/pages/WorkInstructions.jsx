/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  FileText,
  Pencil,
  Plus,
  ShieldCheck,
} from "lucide-react";

const templates = [
  {
    id: 1,
    name: "Hydraulic Assembly Template",
    productFamily: "SUCTION BOX 2 Weekly",
    workCenter: "Mod4 Crank",
    version: "v1.0",
    status: "Available",
  },
  {
    id: 2,
    name: "Mechanical Assembly Template",
    productFamily: "ALFING-2 Weekly PM",
    workCenter: "Mod4 Crank",
    version: "v2.1",
    status: "Draft",
  },
];

const statusStyles = {
  Available:
    "bg-green-100 text-green-700 border-green-200",
  Draft:
    "bg-orange-100 text-orange-700 border-orange-200",
};

const TemplateCard = ({ template }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h2 className="font-semibold text-lg text-slate-900">
          {template.name}
        </h2>
      </div>

      <div className="p-6 space-y-2">
        <p className="text-slate-600">
          <strong>Product Family:</strong>{" "}
          {template.productFamily}
        </p>

        <p className="text-slate-600">
          <strong>Work Center:</strong>{" "}
          {template.workCenter}
        </p>

        <p className="text-slate-600">
          <strong>Version:</strong>{" "}
          {template.version}
        </p>

        <div className="pt-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              statusStyles[template.status]
            }`}
          >
            {template.status}
          </span>
        </div>

        <div className="flex gap-3 pt-5">
          <Link
            to={`/work-instructions/new?template=${template.id}`}
            className="flex-1 text-center bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Use Template
          </Link>

          <Link
            to={`/work-instructions/new?edit=${template.id}`}
            className="flex-1 text-center border border-slate-300 py-3 rounded-xl hover:bg-slate-50 transition"
          >
            Update
          </Link>
        </div>
      </div>
    </div>
  );
};

const WorkInstructions = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Work Instructions
          </h1>

          <p className="mt-1 text-slate-500">
            Create, manage and version control
            maintenance work instruction templates.
          </p>
        </div>

        <Link
          to="/work-instructions/new"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Create Template
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Link
          to="/work-instructions/new"
          className="bg-white border border-dashed border-slate-300 rounded-3xl p-8 hover:border-blue-400 hover:bg-blue-50 transition"
        >
          <div className="h-14 w-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Plus size={28} />
          </div>

          <h2 className="mt-6 text-xl font-semibold text-slate-900">
            Create New Template
          </h2>

          <p className="mt-3 text-slate-500">
            Start building a new maintenance work
            instruction template from scratch.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-blue-600 font-medium">
            <Plus size={16} />
            Create Template
          </div>
        </Link>

        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">
              Total Templates
            </span>

            <FileText
              size={20}
              className="text-blue-600"
            />
          </div>

          <h2 className="mt-3 text-3xl font-bold">
            {templates.length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">
              Approved
            </span>

            <ShieldCheck
              size={20}
              className="text-green-600"
            />
          </div>

          <h2 className="mt-3 text-3xl font-bold text-green-600">
            {
              templates.filter(
                (t) => t.status === "Available"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">
              Drafts
            </span>

            <Pencil
              size={20}
              className="text-orange-600"
            />
          </div>

          <h2 className="mt-3 text-3xl font-bold text-orange-600">
            {
              templates.filter(
                (t) => t.status === "Draft"
              ).length
            }
          </h2>
        </div>
      </div>
    </div>
  );
};

export default WorkInstructions;