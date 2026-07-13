import { useState } from "react";
import {
  Plus,
  Save,
  Send,
  Eye,
} from "lucide-react";

const tabs = [
  "General Information",
  "Pre Task",
  "Process Steps",
  "Overflow Sheet",
  "Revision History",
];

const safetyChecks = [
  "All EC-PL procedures are adhered to, including No Lock, No Entry.",
"All personnel are competent to complete the task and have received the required training.",
"Ensure that all associated permits to work are in place and fully adhered to.",
"Follow the work instructions at all times; if there are any questions, ask before proceeding.",
"Adhere to the specified PPE requirements outlined in the Risk Assessment for the activity being undertaken.",
"Use the specified tools only for their intended purpose, and report any defective tools immediately.",
"Leave the workplace clean and tidy after completing the activity, and ensure that all machine guards are correctly fitted and in place.",
];

const WorkInstructionBuilder = () => {
  const [activeTab, setActiveTab] =
    useState("General Information");

  const [parts, setParts] = useState([
    {
      description: "",
      wisSheet: "",
      processNo: "",
      code: "",
      qty: 1,
    },
  ]);

  const [steps, setSteps] = useState([
    {
      stepNo: "10",
      description: "",
      type: "",
      time: "",
      keyPoint: "",
    },
  ]);

  const [revisions, setRevisions] = useState([
    {
      revNo: "1",
      date: "",
      revisedBy: "",
      comment: "",
      approvedBy: "",
    },
  ]);

  const addPart = () => {
    setParts([
      ...parts,
      {
        description: "",
        wisSheet: "",
        processNo: "",
        code: "",
        qty: 1,
      },
    ]);
  };

  const addStep = () => {
    setSteps([
      ...steps,
      {
        stepNo: `${(steps.length + 1) * 10}`,
        description: "",
        type: "",
        time: "",
        keyPoint: "",
      },
    ]);
  };

  const addRevision = () => {
    setRevisions([
      ...revisions,
      {
        revNo: `${revisions.length + 1}`,
        date: "",
        revisedBy: "",
        comment: "",
        approvedBy: "",
      },
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="sticky top-16 z-20 bg-slate-50 border rounded-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Work Instruction Template
          </h1>

          <p className="text-sm text-slate-500">
            Build and maintain standard work instructions.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="border px-4 py-2 rounded-xl flex items-center gap-2">
            <Save size={18} />
            Save Draft
          </button>

          <button className="border px-4 py-2 rounded-xl flex items-center gap-2">
            <Eye size={18} />
            Preview
          </button>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2">
            <Send size={18} />
            Submit Approval
          </button>
        </div>
      </div>

      {/* Tabs */}

      <div className="bg-white border rounded-2xl p-2 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* GENERAL INFORMATION */}

      {activeTab === "General Information" && (
        <div className="bg-white border rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-6">
            General Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              placeholder="Issued By"
              className="border rounded-xl p-3"
            />

            <input
              type="date"
              className="border rounded-xl p-3"
            />

            <input
              placeholder="Authorised By"
              className="border rounded-xl p-3"
            />

            <input
              placeholder="Document Reference"
              className="border rounded-xl p-3"
            />

            <input
              placeholder="PM Type"
              className="border rounded-xl p-3"
            />

            <input
              placeholder="PM Category"
              className="border rounded-xl p-3"
            />

            <input
              placeholder="People Required"
              className="border rounded-xl p-3"
            />

            <input
              placeholder="Work Center"
              className="border rounded-xl p-3"
            />
          </div>

          <textarea
            rows={5}
            placeholder="Task Description"
            className="w-full mt-6 border rounded-xl p-3"
          />
        </div>
      )}

      {/* PRE TASK */}

      {activeTab === "Pre Task" && (
        <div className="bg-white border rounded-3xl p-8 space-y-8">
          <h2 className="text-xl font-semibold">
            Pre Task Information
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">
                Safety Checklist
              </h3>

              <div className="space-y-3">
                {safetyChecks.map((item) => (
                  <label
                    key={item}
                    className="flex gap-3"
                  >
                    <input type="checkbox" />

                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">
                Documents
              </h3>

              <div className="space-y-3">
                {[
                  "Manual",
                  "Drawing",
                  "Program",
                  "Safety",
                ].map((doc) => (
                  <label
                    key={doc}
                    className="flex gap-3"
                  >
                    <input type="checkbox" />

                    <span>{doc}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <textarea
            rows={5}
            placeholder="Preparation Notes"
            className="w-full border rounded-xl p-3"
          />

          <textarea
            rows={4}
            placeholder="Tools Required"
            className="w-full border rounded-xl p-3"
          />

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">
                Parts & Equipment
              </h3>

              <button
                onClick={addPart}
                className="text-blue-600 flex items-center gap-2"
              >
                <Plus size={16} />
                Add Part
              </button>
            </div>

            {parts.map((part, index) => (
              <div
                key={index}
                className="grid md:grid-cols-5 gap-3 mb-3"
              >
                <input
                  placeholder="Description"
                  className="border rounded-xl p-3"
                />

                <input
                  placeholder="WIS Sheet"
                  className="border rounded-xl p-3"
                />

                <input
                  placeholder="Process No."
                  className="border rounded-xl p-3"
                />

                <input
                  placeholder="Code"
                  className="border rounded-xl p-3"
                />

                <input
                  placeholder="Qty"
                  className="border rounded-xl p-3"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROCESS STEPS */}

      {activeTab === "Process Steps" && (
        <div className="bg-white border rounded-3xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Process Steps
            </h2>

            <button
              onClick={addStep}
              className="text-blue-600 flex items-center gap-2"
            >
              <Plus size={16} />
              Add Step
            </button>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="grid md:grid-cols-6 gap-3 border rounded-2xl p-4"
              >
                <input
                  defaultValue={step.stepNo}
                  className="border rounded-xl p-3"
                />

                <input
                  placeholder="Description"
                  className="border rounded-xl p-3"
                />

                <input
                  placeholder="Type"
                  className="border rounded-xl p-3"
                />

                <input
                  placeholder="Time"
                  className="border rounded-xl p-3"
                />

                <input
                  placeholder="Key Point"
                  className="border rounded-xl p-3"
                />

                <input
                  type="file"
                  className="border rounded-xl p-2"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OVERFLOW */}

      {activeTab === "Overflow Sheet" && (
        <div className="bg-white border rounded-3xl p-8 space-y-6">
          <h2 className="text-xl font-semibold">
            Overflow Sheet
          </h2>

          <textarea
            rows={6}
            placeholder="Additional Steps"
            className="w-full border rounded-xl p-3"
          />

          <textarea
            rows={6}
            placeholder="Additional Notes"
            className="w-full border rounded-xl p-3"
          />

          <textarea
            rows={6}
            placeholder="Continuation of Pre Task Information"
            className="w-full border rounded-xl p-3"
          />
        </div>
      )}

      {/* REVISION HISTORY */}

      {activeTab === "Revision History" && (
        <div className="bg-white border rounded-3xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Revision History
            </h2>

            <button
              onClick={addRevision}
              className="text-blue-600 flex gap-2 items-center"
            >
              <Plus size={16} />
              Add Revision
            </button>
          </div>

          <div className="space-y-4">
            {revisions.map((revision, index) => (
              <div
                key={index}
                className="grid md:grid-cols-5 gap-3"
              >
                <input
                  defaultValue={revision.revNo}
                  className="border rounded-xl p-3"
                />

                <input
                  type="date"
                  className="border rounded-xl p-3"
                />

                <input
                  placeholder="Revised By"
                  className="border rounded-xl p-3"
                />

                <input
                  placeholder="Comment"
                  className="border rounded-xl p-3"
                />

                <input
                  placeholder="Approved By"
                  className="border rounded-xl p-3"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkInstructionBuilder;