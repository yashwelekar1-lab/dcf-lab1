```tsx
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
    <div
      className={`
        sticky
        top-0
        z-[100]
        w-full
        border-b
        border-slate-200/10
        backdrop-blur-xl
        ${
          activeTab === "intelligence"
            ? "bg-[#101a2b]"
            : "bg-white/95"
        }
      `}
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
                className={`
                  relative
                  flex
                  h-full
                  items-center
                  gap-2
                  px-5
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  ${
                    activeTab === "intelligence"
                      ? isActive
                        ? "text-white"
                        : "text-slate-400 hover:text-white"
                      : isActive
                        ? "text-slate-900"
                        : "text-slate-500 hover:text-slate-900"
                  }
                `}
              >
                <Icon
                  className={`
                    h-[17px]
                    w-[17px]
                    transition-colors
                    ${
                      isActive
                        ? "text-emerald-500"
                        : activeTab === "intelligence"
                          ? "text-slate-500"
                          : "text-slate-400"
                    }
                  `}
                />

                <span>{tab.label}</span>

                {isActive && (
                  <span
                    className="
                      absolute
                      bottom-0
                      left-1/2
                      h-[2px]
                      w-10
                      -translate-x-1/2
                      rounded-full
                      bg-emerald-500
                    "
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```
