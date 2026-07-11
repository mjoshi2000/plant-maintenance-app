import {
  Bell,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { useUIStore } from "../../app/store/uiStore";

const Header = () => {
  const { darkMode, toggleDarkMode } =
    useUIStore();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      {/* Search */}
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

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
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

        {/* Notifications */}
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

        {/* Divider */}
        <div className="h-8 w-px bg-slate-200" />

        {/* User Profile */}
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
