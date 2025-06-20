import { ChevronDown } from "lucide-react";

export function CollapsibleCard({ open, onClick, title, icon, color, bg, children, scrollList }) {
  return (
    <div className={`${bg} rounded-xl shadow border`}>
      <button
        type="button"
        onClick={onClick}
        className={`w-full flex items-center justify-between px-4 py-3 cursor-pointer select-none rounded-xl transition hover:bg-opacity-80 ${color} font-semibold`}
        style={{ background: "transparent" }}
      >
        <span className="flex items-center gap-2">
          <span>{icon}</span>
          <span>{title}</span>
        </span>
        <span
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <ChevronDown size={24} />
        </span>
      </button>
      <div
        className={`
          overflow-hidden
          transition-[max-height,padding]
          duration-300
          px-4
          ${open ? "max-h-[9999px] py-4" : "max-h-0 py-0"}
        `}
      >
        {open &&
          (scrollList ? (
            <ul className="list-disc ml-4 space-y-1 pr-2 max-h-80 overflow-y-auto">
              {children}
            </ul>
          ) : (
            children
          ))
        }
      </div>
    </div>
  );
}
