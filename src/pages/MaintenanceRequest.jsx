import { useState } from "react";
import { Flame } from "lucide-react";

const requestTypes = [
  "Leak",
  "Mechanical",
  "Operations",
  "Other",
];

const lines = [
  "Head",
  "Block",
  "Crank",
  "PMR",
];

const leakTypes = [
  "Oil",
  "Coolant",
  "Water",
  "Hydraulic",
  "Air",
  "Other",
];

const severityLevels = [
  "Minor Drip",
  "Steady Leak",
  "Safety Hazard",
];

const MaintenanceRequest = () => {
  const [requestType, setRequestType] =
    useState("Leak");

  const [selectedLine, setSelectedLine] =
    useState("");

  const [leakType, setLeakType] =
    useState("");

  const [severity, setSeverity] =
    useState("");

  const getPriority = () => {
    if (severity === "Safety Hazard")
      return {
        label: "Critical",
        color:
          "bg-red-100 text-red-700 border-red-200",
      };

    if (severity === "Steady Leak")
      return {
        label: "Medium",
        color:
          "bg-orange-100 text-orange-700 border-orange-200",
      };

    return {
      label: "Low",
      color:
        "bg-green-100 text-green-700 border-green-200",
    };
  };

  const priority =
    severity && getPriority();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

        {/* Header */}

        <div className="flex items-center gap-3 mb-3">
          <Flame className="text-orange-500" />

          <h1 className="text-3xl font-bold">
            Maintenance Request
          </h1>
        </div>

        <p className="text-slate-500 mb-10 text-lg">
          Spotted a leak, a mechanical fault,
          or something operations needs from
          maintenance? Tell us where and what.
        </p>

        <div className="space-y-10">

          {/* Request Type */}

          <section>
            <h2 className="font-semibold text-lg mb-4">
              What kind of request?
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {requestTypes.map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    setRequestType(item)
                  }
                  className={`
                    rounded-2xl
                    border
                    py-4
                    text-base
                    font-medium
                    transition-all
                    ${
                      requestType === item
                        ? "bg-blue-50 border-blue-600 text-blue-600"
                        : "hover:bg-slate-50"
                    }
                  `}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {/* Line */}

          <section>
            <h2 className="font-semibold text-lg mb-4">
              Which line?
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {lines.map((line) => (
                <button
                  key={line}
                  onClick={() =>
                    setSelectedLine(line)
                  }
                  className={`
                    rounded-2xl
                    border
                    py-4
                    text-base
                    font-medium
                    transition-all
                    ${
                      selectedLine === line
                        ? "bg-blue-50 border-blue-600 text-blue-600"
                        : "hover:bg-slate-50"
                    }
                  `}
                >
                  {line}
                </button>
              ))}
            </div>
          </section>

          {/* Station */}

          <section>
            <h2 className="font-semibold text-lg mb-4">
              Closest Station
            </h2>

            <select className="w-full border rounded-2xl px-4 py-4 outline-none focus:border-blue-500">
              <option>
                Select a station...
              </option>

              <option>Station 01</option>
              <option>Station 02</option>
              <option>Station 03</option>
            </select>

            <label className="flex items-center gap-3 mt-4">
              <input
                type="checkbox"
                className="h-4 w-4"
              />

              <span>
                Not at a specific station
              </span>
            </label>
          </section>

          {/* Notes */}

          <section>
            <h2 className="font-semibold text-lg mb-4">
              Notes
            </h2>

            <textarea
              rows={4}
              placeholder="Describe the issue..."
              className="
                w-full
                border
                rounded-2xl
                p-4
                resize-none
                outline-none
                focus:border-blue-500
              "
            />
          </section>

          {/* Leak Section */}

          {requestType === "Leak" && (
            <>
              <section>
                <h2 className="font-semibold text-lg mb-4">
                  What's leaking?
                </h2>

                <div className="flex flex-wrap gap-3">
                  {leakTypes.map((item) => (
                    <button
                      key={item}
                      onClick={() =>
                        setLeakType(item)
                      }
                      className={`
                        px-5
                        py-3
                        rounded-full
                        border
                        transition-all
                        ${
                          leakType === item
                            ? "bg-blue-600 text-white border-blue-600"
                            : "hover:bg-slate-50"
                        }
                      `}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-4">
                  How bad is it?
                </h2>

                <div className="flex flex-wrap gap-3">
                  {severityLevels.map(
                    (level) => (
                      <button
                        key={level}
                        onClick={() =>
                          setSeverity(level)
                        }
                        className={`
                        px-5
                        py-3
                        rounded-full
                        border
                        transition-all
                        ${
                          severity === level
                            ? "bg-red-600 text-white border-red-600"
                            : "hover:bg-slate-50"
                        }
                      `}
                      >
                        {level}
                      </button>
                    )
                  )}
                </div>
              </section>

              {/* Suggested Priority */}

              {severity && (
                <section>
                  <div className="bg-slate-50 border rounded-2xl p-5">
                    <h3 className="font-semibold mb-2">
                      Suggested Priority
                    </h3>

                    <span
                      className={`
                        px-4 py-2 rounded-full font-medium border
                        ${priority.color}
                      `}
                    >
                      {priority.label}
                    </span>
                  </div>
                </section>
              )}
            </>
          )}

          {/* Upload Media */}

          <section>
            <h2 className="font-semibold text-lg mb-4">
              Attach Media
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

              <label
                className="
                  border-2
                  border-dashed
                  rounded-2xl
                  p-8
                  text-center
                  cursor-pointer
                  hover:bg-slate-50
                "
              >
                <div className="text-5xl mb-4">
                  📷
                </div>

                <h3 className="font-medium">
                  Take Photo
                </h3>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>

              <label
                className="
                  border-2
                  border-dashed
                  rounded-2xl
                  p-8
                  text-center
                  cursor-pointer
                  hover:bg-slate-50
                "
              >
                <div className="text-5xl mb-4">
                  🎥
                </div>

                <h3 className="font-medium">
                  Record Video
                </h3>

                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                />
              </label>

              <label
                className="
                  border-2
                  border-dashed
                  rounded-2xl
                  p-8
                  text-center
                  cursor-pointer
                  hover:bg-slate-50
                "
              >
                <div className="text-5xl mb-4">
                  📁
                </div>

                <h3 className="font-medium">
                  Upload Files
                </h3>

                <input
                  type="file"
                  multiple
                  className="hidden"
                />
              </label>
            </div>
          </section>

          {/* Submit */}

          <div>
            <button
              className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                py-4
                rounded-2xl
                text-lg
                font-medium
                transition-colors
              "
            >
              Submit Request
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MaintenanceRequest;