import React, { useState } from 'react';
import { Sprout } from 'lucide-react';
import { ChildProfile, SkillId } from '../types/hikma';
import { SKILL_BRANCHES } from '../data/skills';
import { UI_COPY } from '../data/translations';

interface OnboardingModalProps {
  initialProfile: ChildProfile;
  onComplete: (profile: Omit<ChildProfile, 'onboarded'>) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  initialProfile,
  onComplete,
}) => {
  const [nickname, setNickname] = useState(initialProfile.nickname || 'Noor');
  const [ageBand, setAgeBand] = useState<'8-9' | '10-12'>(initialProfile.ageBand);
  const [preferredLanguage, setPreferredLanguage] = useState<'en' | 'ar'>(
    initialProfile.preferredLanguage
  );
  const [startingSkill, setStartingSkill] = useState<SkillId>(
    initialProfile.startingSkill || 'communication'
  );

  const copy = UI_COPY[preferredLanguage];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      nickname: nickname.trim() || 'Explorer',
      ageBand,
      preferredLanguage,
      startingSkill,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      dir={preferredLanguage === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 my-auto">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 mb-2">
              <Sprout className="w-5 h-5" aria-hidden="true" />
              <span className="text-sm font-semibold">HIKMA · {copy.tagline}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#16212E]">
              {copy.onboardingTitle}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed">
              {copy.onboardingSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              setPreferredLanguage((prev) => (prev === 'en' ? 'ar' : 'en'))
            }
            className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
          >
            {preferredLanguage === 'en' ? 'العربية' : 'English'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="hikma-nickname"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {copy.nicknameLabel}
            </label>
            <input
              id="hikma-nickname"
              type="text"
              maxLength={24}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={preferredLanguage === 'ar' ? 'مثال: نور أو صقر' : 'e.g. Noor or Falcon9'}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="block text-sm font-semibold text-slate-800 mb-1.5">
                {copy.ageBandLabel}
              </span>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                {(['8-9', '10-12'] as const).map((band) => (
                  <button
                    key={band}
                    type="button"
                    onClick={() => setAgeBand(band)}
                    className={`py-2 px-3 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                      ageBand === band
                        ? 'bg-white text-[#16212E] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {band} {preferredLanguage === 'ar' ? 'سنوات' : 'yrs'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-sm font-semibold text-slate-800 mb-1.5">
                {copy.languageLabel}
              </span>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setPreferredLanguage('en')}
                  className={`py-2 px-3 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    preferredLanguage === 'en'
                      ? 'bg-white text-[#16212E] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setPreferredLanguage('ar')}
                  className={`py-2 px-3 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    preferredLanguage === 'ar'
                      ? 'bg-white text-[#16212E] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  العربية
                </button>
              </div>
            </div>
          </div>

          <div>
            <span className="block text-sm font-semibold text-slate-800 mb-2">
              {copy.startSkillLabel}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SKILL_BRANCHES.map((branch) => {
                const selected = startingSkill === branch.id;
                return (
                  <button
                    key={branch.id}
                    type="button"
                    onClick={() => setStartingSkill(branch.id)}
                    className={`px-3 py-2.5 rounded-xl border text-start transition-all ${
                      selected
                        ? 'border-2 shadow-xs font-semibold'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                    style={
                      selected
                        ? {
                            borderColor: branch.colorHex,
                            backgroundColor: branch.softBgHex,
                            color: branch.darkColorHex,
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: branch.colorHex }}
                        aria-hidden="true"
                      />
                      <span className="text-xs sm:text-sm truncate">
                        {preferredLanguage === 'ar' ? branch.nameAr : branch.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="submit"
              className="flex-1 py-3 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-base transition-colors cursor-pointer"
            >
              {copy.startButton}
            </button>
            <button
              type="button"
              onClick={() =>
                onComplete({
                  nickname: 'Noor',
                  ageBand: '8-9',
                  preferredLanguage,
                  startingSkill: 'communication',
                })
              }
              className="py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              {copy.useDemoExplorer}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
