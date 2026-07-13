const WorkInstructionPreview = () => {
  return (
    <div className="bg-white rounded-3xl border p-8">
      <h1 className="text-3xl font-bold">
        Hydraulic Assembly Template
      </h1>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">
          Tools Required
        </h2>

        <ul className="list-disc pl-6">
          <li>Torque Wrench</li>
          <li>Bearing Puller</li>
          <li>Allen Key Set</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">
          Process Steps
        </h2>

        <ol className="list-decimal pl-6 space-y-2">
          <li>Lock machine and isolate power.</li>
          <li>Remove machine guards.</li>
          <li>Replace faulty bearing.</li>
          <li>Reassemble guards.</li>
          <li>Test operation.</li>
        </ol>
      </div>
    </div>
  );
};

export default WorkInstructionPreview;