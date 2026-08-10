import {
  Sparkles,
  Calculator,
  FolderOpen,
} from "lucide-react";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TopNavigation({
  activeTab,
  setActiveTab,
}: Props) {
  const tabs = [
    {
      id: "calculator",
      label: "DCF Calculator",
      icon: Calculator,
    },
    {
      id: "intelligence",
      label: "DCF Lab Intelligence",
      icon: Sparkles,
    },
    {
      id: "saved",
      label: "Saved Analysis",
      icon: FolderOpen,
    },
  ];

  return (
    <nav
      className={
        activeTab === "intelligence"
          ? "sticky top-0 z-[100] w-full border-b border-white/10 bg-[#101a2b] backdrop-blur-xl"
          : "sticky top-0 z-[100] w-full border-b border-slate-200/10 bg-white/95 backdrop-blur-xl"
      }
    >
      <div className="mx-auto flex h-[58px] w-full items-center justify-center px-4">
        <div className="flex h-full items-center gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={
                  activeTab === "intelligence"
                    ? isActive
                      ? "relative flex h-full items-center gap-2 px-5 text-sm font-medium text-white transition-all duration-200"
                      : "relative flex h-full items-center gap-2 px-5 text-sm font-medium text-slate-400 transition-all duration-200 hover:text-white"
                    : isActive
                      ? "relative flex h-full items-center gap-2 px-5 text-sm font-medium text-slate-900 transition-all duration-200"
                      : "relative flex h-full items-center gap-2 px-5 text-sm font-medium text-slate-500 transition-all duration-200 hover:text-slate-900"
                }
              >
                <Icon
                  className={
                    isActive
                      ? "h-[17px] w-[17px] text-emerald-500"
                      : activeTab === "intelligence"
                        ? "h-[17px] w-[17px] text-slate-500"
                        : "h-[17px] w-[17px] text-slate-400"
                  }
                />

                <span>{tab.label}</span>

                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-10 -translate-x-1/2 rounded-full bg-emerald-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
