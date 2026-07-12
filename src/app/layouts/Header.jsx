import { useEffect, useState } from "react";
import {
  Bell,
  Moon,
  Search,
  Sun,
  CalendarClock,
} from "lucide-react";
import { useUIStore } from "../../app/store/uiStore";

const Header = () => {
  const { darkMode, toggleDarkMode } = useUIStore();

  const [currentDateTime, setCurrentDateTime] = useState(
    new Date()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString(
    "en-IN",
    {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  const formattedTime = currentDateTime.toLocaleTimeString(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }
  );

  return (
    <header className="sticky top-0 z-50 h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl w-96">
        <Search
          size={18}
          className="text-slate-500"
        />

        <input
          type="text"
          placeholder="Search maintenance plans..."
          className="
            flex-1
            bg-transparent
            outline-none
            text-sm
            placeholder:text-slate-400
          "
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden xl:flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-100 text-slate-700">
          <CalendarClock
            size={18}
            className="text-slate-500"
          />

          <div className="leading-tight">
            <p className="text-xs text-slate-500">
              {formattedDate}
            </p>

            <p className="text-sm font-semibold text-slate-800">
              {formattedTime}
            </p>
          </div>
        </div>

        <button
          onClick={toggleDarkMode}
          className="
            p-2
            rounded-lg
            hover:bg-slate-100
            transition-colors
          "
        >
          {darkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        <button
          className="
            relative
            p-2
            rounded-lg
            hover:bg-slate-100
            transition-colors
          "
        >
          <Bell size={20} />

          <span
            className="
              absolute
              top-1
              right-1
              h-2
              w-2
              rounded-full
              bg-red-500
            "
          />
        </button>

        <div className="h-8 w-px bg-slate-200" />

        <div className="flex items-center gap-3 cursor-pointer">
          <div
            className="
              h-10
              w-10
              rounded-full
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              font-semibold
            "
          >
            MJ
          </div>

          <div className="hidden md:block">
            <p className="font-medium text-sm text-slate-800">
              Mayank Joshi
            </p>

            <p className="text-xs text-slate-500">
              Developer
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;