/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRequestStore } from "../app/store/requestStore";

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
  const [requestType, setRequestType] = useState("Leak");
  const [selectedLine, setSelectedLine] = useState("");
  const [selectedStation, setSelectedStation] = useState("");
  const [notSpecificStation, setNotSpecificStation] = useState(false);
  const [notes, setNotes] = useState("");
  const [leakType, setLeakType] = useState("");
  const [severity, setSeverity] = useState("");

  const navigate = useNavigate();
  const addRequest = useRequestStore((state) => state.addRequest);

  const getPriority = () => {
    if (severity === "Safety Hazard") {
      return {
        label: "Critical",
        color: "bg-red-100 text-red-700 border-red-200",
      };
    }

    if (severity === "Steady Leak") {
      return {
        label: "High",
        color: "bg-orange-100 text-orange-700 border-orange-200",
      };
    }

    if (severity === "Minor Drip") {
      return {
        label: "Medium",
        color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      };
    }

    return {
      label: "Low",
      color: "bg-green-100 text-green-700 border-green-200",
    };
  };

  const priority = severity ? getPriority() : null;

  const handleSubmitRequest = () => {
    const generatedId = `MR-${Date.now().toString().slice(-5)}`;

    const finalPriority = getPriority().label;

    const requestTitle =
      requestType === "Leak"
        ? `${leakType || "General"} Leak`
        : `${requestType} Request`;

    const newRequest = {
      id: generatedId,
      title: requestTitle,
      requestType,
      line: selectedLine || "Not selected",
      station: notSpecificStation
        ? "Not at a specific station"
        : selectedStation || "Not selected",
      reporter: "Mayank Joshi",
      priority: finalPriority,
      createdAt: "Just now",
      description:
        notes ||
        "New maintenance request submitted from operator request form.",
      status: "Submitted",
    };

    addRequest(newRequest);

    navigate("/requests");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-3">
          <Flame className="text-orange-500" />

          <h1 className="text-3xl font-bold">
            Maintenance Request
          </h1>
        </div>

        <p className="text-slate-500 mb-10 text-lg">
          Spotted a leak, a mechanical fault, or something operations
          needs from maintenance? Tell us where and what.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="font-semibold text-lg mb-4">
              What kind of request?
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {requestTypes.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => {
                    setRequestType(item);

                    if (item !== "Leak") {
                      setLeakType("");
                      setSeverity("");
                    }
                  }}
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

          <section>
            <h2 className="font-semibold text-lg mb-4">
              Which line?
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {lines.map((line) => (
                <button
                  type="button"
                  key={line}
                  onClick={() => setSelectedLine(line)}
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

          <section>
            <h2 className="font-semibold text-lg mb-4">
              Closest Station
            </h2>

            <select
              value={selectedStation}
              disabled={notSpecificStation}
              onChange={(event) => setSelectedStation(event.target.value)}
              className="w-full border rounded-2xl px-4 py-4 outline-none focus:border-blue-500 disabled:bg-slate-100 disabled:text-slate-400"
            >
              <option value="">
                Select a station...
              </option>

              <option value="Station 01">Station 01</option>
              <option value="Station 02">Station 02</option>
              <option value="Station 03">Station 03</option>
              <option value="Station 04">Station 04</option>
              <option value="Station 05">Station 05</option>
            </select>

            <label className="flex items-center gap-3 mt-4">
              <input
                type="checkbox"
                checked={notSpecificStation}
                onChange={(event) => {
                  setNotSpecificStation(event.target.checked);

                  if (event.target.checked) {
                    setSelectedStation("");
                  }
                }}
                className="h-4 w-4"
              />

              <span>
                Not at a specific station
              </span>
            </label>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-4">
              Notes
            </h2>

            <textarea
              rows={4}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
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

          {requestType === "Leak" && (
            <>
              <section>
                <h2 className="font-semibold text-lg mb-4">
                  What's leaking?
                </h2>

                <div className="flex flex-wrap gap-3">
                  {leakTypes.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setLeakType(item)}
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
                  {severityLevels.map((level) => (
                    <button
                      type="button"
                      key={level}
                      onClick={() => setSeverity(level)}
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
                  ))}
                </div>
              </section>

              {severity && priority && (
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

          <div>
            <button
              type="button"
              onClick={handleSubmitRequest}
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