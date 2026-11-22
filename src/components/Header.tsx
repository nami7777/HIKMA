import React from 'react';
import { Globe } from 'lucide-react';
import { UI_COPY } from '../data/translations';

export type MainTab = 'tree' | 'growth' | 'parent';

interface HeaderProps {
  activeTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  language: 'en' | 'ar';
  onToggleLanguage: () => void;
  pendingApprovalCount: number;
  inEducatorMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  language,
  onToggleLanguage,
  pendingApprovalCount,
  inEducatorMode,
}) => {
  const copy = UI_COPY[language];

  const navItems: { id: MainTab; label: string; count?: number }[] = [
    { id: 'tree', label: copy.navTree },
    { id: 'growth', label: copy.navGrowth },
    {
      id: 'parent',
      label: copy.navParent,
      count: pendingApprovalCount > 0 ? pendingApprovalCount : undefined,
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FAFBFD]/95 backdrop-blur-sm border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single clean wordmark */}
        <button
          type="button"
          onClick={() => onSelectTab('tree')}
          className="text-xl font-bold tracking-tight text-[#16212E] hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 rounded"
        >
          {copy.brand}
        </button>

        {/* Zone 2: Exactly 3 child-facing navigation links */}
        <nav
          aria-label={language === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'}
          className="flex items-center gap-4 sm:gap-8 overflow-x-auto"
        >
          {navItems.map((item) => {
            const isActive = !inEducatorMode && activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`relative py-2 text-sm sm:text-base font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 rounded ${
                  isActive
                    ? 'text-[#16212E] font-semibold'
                    : 'text-slate-600 hover:text-[#16212E]'
                }`}
              >
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <span className="ms-1.5 text-xs font-semibold tabular-nums text-amber-700">
                    ({item.count})
                  </span>
                )}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-emerald-600 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single primary utility button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onToggleLanguage}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            aria-label="Switch language"
          >
            <Globe className="w-4 h-4 text-slate-500" aria-hidden="true" />
            <span>{language === 'en' ? 'العربية' : 'English'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
