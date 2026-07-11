import { useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const segments = pathname
    .split("/")
    .filter(Boolean);

  return (
    <div className="text-sm text-slate-500 mb-4">
      <span>Home</span>

      {segments.map((segment, index) => (
        <span key={index}>
          {" / "}
          {segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
``