import { Bell, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 bg-white border-b px-6 flex justify-between items-center">
      <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl w-80">
        <Search size={18} />

        <input
          placeholder="Search maintenance plans..."
          className="bg-transparent outline-none flex-1"
        />
      </div>

      <div className="flex items-center gap-5">
        <Bell size={20} />

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
            MJ
          </div>

          <div>
            <p className="font-medium text-sm">
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