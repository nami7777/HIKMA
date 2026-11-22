import React, { useState, useRef } from 'react';
import {
  Check,
  Clock,
  Lock,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Info,
} from 'lucide-react';
import {
  ChildProfile,
  ChildProgressRecord,
  CulturalResource,
  LeafMission,
  SkillId,
} from '../types/hikma';
import { SKILL_BRANCHES, SKILL_MAP } from '../data/skills';
import { CONTEXT_LABELS, LEAF_STATUS_LABELS, UI_COPY } from '../data/translations';
import { ContextIcon, SkillIcon } from './SkillIcon';

interface SkillTreeCanvasProps {
  profile: ChildProfile;
  leaves: LeafMission[];
  resources: CulturalResource[];
  progress: Record<string, ChildProgressRecord>;
  onOpenLeaf: (leafId: string) => void;
  totalCompletedLeaves: number;
  completedBranchesCount: number;
}

interface BranchGeometry {
  id: SkillId;
  path: string;
  labelX: number;
  labelY: number;
  tipX: number;
  tipY: number;
  // Points along the branch where leaves grow organically
  leafAnchors: { x: number; y: number; angle: number }[];
}

// Carefully sculpted organic tree canopy geometry (viewBox 0 0 1100 760)
const BRANCH_GEOMETRIES: Record<SkillId, BranchGeometry> = {
  adaptability: {
    id: 'adaptability',
    path: 'M 522 455 C 430 445, 310 435, 195 395 C 145 378, 110 360, 88 345',
    labelX: 145,
    labelY: 448,
    tipX: 84,
    tipY: 342,
    leafAnchors: [
      { x: 405, y: 422, angle: -25 },
      { x: 332, y: 445, angle: -145 },
      { x: 265, y: 396, angle: -20 },
      { x: 196, y: 412, angle: -140 },
      { x: 132, y: 356, angle: -35 },
      { x: 96, y: 374, angle: -120 },
    ],
  },
  'digital-wisdom': {
    id: 'digital-wisdom',
    path: 'M 525 390 C 445 340, 330 290, 215 245 C 165 225, 130 205, 108 188',
    labelX: 162,
    labelY: 288,
    tipX: 105,
    tipY: 185,
    leafAnchors: [
      { x: 425, y: 318, angle: -35 },
      { x: 365, y: 325, angle: -145 },
      { x: 295, y: 260, angle: -32 },
      { x: 235, y: 268, angle: -142 },
      { x: 168, y: 204, angle: -42 },
      { x: 132, y: 222, angle: -125 },
    ],
  },
  leadership: {
    id: 'leadership',
    path: 'M 535 335 C 485 265, 415 190, 335 125 C 300 95, 275 76, 258 64',
    labelX: 300,
    labelY: 164,
    tipX: 254,
    tipY: 60,
    leafAnchors: [
      { x: 472, y: 242, angle: -50 },
      { x: 448, y: 205, angle: -140 },
      { x: 400, y: 158, angle: -45 },
      { x: 360, y: 145, angle: -148 },
      { x: 306, y: 88, angle: -50 },
      { x: 282, y: 102, angle: -135 },
    ],
  },
  communication: {
    id: 'communication',
    path: 'M 550 315 C 550 235, 550 155, 550 86',
    labelX: 550,
    labelY: 222,
    tipX: 550,
    tipY: 74,
    leafAnchors: [
      { x: 525, y: 258, angle: -72 },
      { x: 575, y: 244, angle: 72 },
      { x: 524, y: 184, angle: -65 },
      { x: 576, y: 168, angle: 65 },
      { x: 532, y: 112, angle: -45 },
      { x: 570, y: 106, angle: 45 },
    ],
  },
  respect: {
    id: 'respect',
    path: 'M 565 335 C 615 265, 685 190, 765 125 C 800 95, 825 76, 842 64',
    labelX: 800,
    labelY: 164,
    tipX: 846,
    tipY: 60,
    leafAnchors: [
      { x: 628, y: 242, angle: 50 },
      { x: 652, y: 205, angle: 140 },
      { x: 700, y: 158, angle: 45 },
      { x: 740, y: 145, angle: 148 },
      { x: 794, y: 88, angle: 50 },
      { x: 818, y: 102, angle: 135 },
    ],
  },
  hospitality: {
    id: 'hospitality',
    path: 'M 575 390 C 655 340, 770 290, 885 245 C 935 225, 970 205, 992 188',
    labelX: 938,
    labelY: 288,
    tipX: 995,
    tipY: 185,
    leafAnchors: [
      { x: 675, y: 318, angle: 35 },
      { x: 735, y: 325, angle: 145 },
      { x: 805, y: 260, angle: 32 },
      { x: 865, y: 268, angle: 142 },
      { x: 932, y: 204, angle: 42 },
      { x: 968, y: 222, angle: 125 },
    ],
  },
  'critical-thinking': {
    id: 'critical-thinking',
    path: 'M 578 455 C 670 445, 790 435, 905 395 C 955 378, 990 360, 1012 345',
    labelX: 955,
    labelY: 448,
    tipX: 1016,
    tipY: 342,
    leafAnchors: [
      { x: 695, y: 422, angle: 25 },
      { x: 768, y: 445, angle: 145 },
      { x: 835, y: 396, angle: 20 },
      { x: 904, y: 412, angle: 140 },
      { x: 968, y: 356, angle: 35 },
      { x: 1004, y: 374, angle: 120 },
    ],
  },
};

export const SkillTreeCanvas: React.FC<SkillTreeCanvasProps> = ({
  profile,
  leaves,
  resources,
  progress,
  onOpenLeaf,
  totalCompletedLeaves,
  completedBranchesCount,
}) => {
  const lang = profile.preferredLanguage;
  const copy = UI_COPY[lang];
  const isRtl = lang === 'ar';

  const [selectedBranchId, setSelectedBranchId] = useState<SkillId>(
    profile.startingSkill || 'communication'
  );
  const [lockedMessage, setLockedMessage] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragRef = useRef<{ dragging: boolean; startX: number; startY: number; origX: number; origY: number }>({
    dragging: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
  });

  const selectedBranch = SKILL_MAP[selectedBranchId];
  const selectedBranchLeaves = leaves
    .filter((l) => l.branchId === selectedBranchId)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  const selectedBranchCompletedCount = selectedBranchLeaves.filter(
    (l) => progress[l.id]?.status === 'completed'
  ).length;

  const allBranchesComplete = completedBranchesCount === SKILL_BRANCHES.length;

  const handleLeafClick = (leaf: LeafMission) => {
    const rec = progress[leaf.id];
    const status = rec?.status || 'locked';
    setSelectedBranchId(leaf.branchId);
    if (status === 'locked') {
      setLockedMessage(
        lang === 'ar'
          ? `أكمل الورقة ${leaf.orderIndex - 1} في فرع ${SKILL_MAP[leaf.branchId].nameAr} أولاً لفتح هذه الورقة.`
          : `Complete Leaf ${leaf.orderIndex - 1} in ${SKILL_MAP[leaf.branchId].name} first to unlock "${leaf.title}".`
      );
      return;
    }
    setLockedMessage(null);
    onOpenLeaf(leaf.id);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    if ((e.target as HTMLElement).closest('button, g[role="button"]')) return;
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      origX: pan.x,
      origY: pan.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPan({
      x: Math.max(-220, Math.min(220, dragRef.current.origX + dx)),
      y: Math.max(-160, Math.min(160, dragRef.current.origY + dy)),
    });
  };

  const handlePointerUp = () => {
    dragRef.current.dragging = false;
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const getBranchLeafAnchor = (branchId: SkillId, idx: number) => {
    const geom = BRANCH_GEOMETRIES[branchId];
    if (idx < geom.leafAnchors.length) {
      return geom.leafAnchors[idx];
    }
    // Graceful organic placement for extra educator-added leaves (#7+)
    const extraOffset = idx - geom.leafAnchors.length + 1;
    return {
      x: geom.tipX + (extraOffset % 2 === 0 ? 22 : -22),
      y: geom.tipY - 18 * extraOffset,
      angle: extraOffset % 2 === 0 ? 45 : -45,
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6 space-y-6">
      {/* Gentle Hero Intro Banner */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-emerald-700">
            {lang === 'ar'
              ? `أهلاً ${profile.nickname} · ${copy.tagline}`
              : `Welcome, ${profile.nickname} · ${copy.tagline}`}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#16212E] mt-1 text-balance">
            {copy.centralMessage}
          </h1>
          <p className="text-sm text-slate-600 mt-1.5">{copy.stepsSimple}</p>
        </div>

        <div className="flex items-center gap-6 shrink-0 text-sm">
          <div>
            <span className="block text-xs text-slate-500">
              {lang === 'ar' ? 'الأوراق المكتملة' : 'Leaves Grown'}
            </span>
            <span className="text-xl font-bold tabular-nums text-[#16212E]">
              {totalCompletedLeaves} / {leaves.length}
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200" aria-hidden="true" />
          <div>
            <span className="block text-xs text-slate-500">
              {lang === 'ar' ? 'الفروع المزهرة' : 'Branches Bloomed'}
            </span>
            <span className="text-xl font-bold tabular-nums text-emerald-700">
              {completedBranchesCount} / 7
            </span>
          </div>
        </div>
      </section>

      {/* Main Layout: Illustrated Tree Stage (Left/Top) + Branch Explorer Deck (Right/Bottom) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Interactive Illustrated Tree Canvas */}
        <section
          aria-label={lang === 'ar' ? 'شجرة الحكمة التفاعلية' : 'Interactive Wisdom Tree'}
          className="xl:col-span-8 relative rounded-2xl border border-slate-200/90 bg-gradient-to-b from-[#E5F3FB] via-[#F2F8F4] to-[#EFE8D6] overflow-hidden shadow-xs"
        >
          {/* Zoom & Pan Controls (especially helpful on mobile) */}
          <div className="absolute top-3 end-3 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-xs border border-slate-200 rounded-xl p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.9, Number((z - 0.25).toFixed(2))))}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
              aria-label="Zoom out tree"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-1.5 text-xs font-semibold tabular-nums text-slate-700">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(2, Number((z + 0.25).toFixed(2))))}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
              aria-label="Zoom in tree"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {(zoom !== 1 || pan.x !== 0 || pan.y !== 0) && (
              <button
                type="button"
                onClick={resetView}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
                aria-label="Reset tree view"
                title="Reset view"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Whole Tree Blossom Banner */}
          {allBranchesComplete && (
            <div className="absolute top-3 start-3 z-10 bg-amber-50 border border-amber-300 text-amber-950 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                {lang === 'ar'
                  ? 'أزهرت شجرة حكمتك بالكامل! أحسنت!'
                  : 'Your entire Wisdom Tree is in full bloom!'}
              </span>
            </div>
          )}

          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`w-full touch-pan-y select-none ${zoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
          >
            <div
              className="transition-transform duration-200 ease-out origin-center"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              }}
            >
              <svg
                viewBox="0 0 1100 760"
                className="w-full h-auto block"
                role="img"
                aria-label="HIKMA illustrated life skills tree with roots labeled Family and Culture and seven colorful branches"
              >
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#DDF0FC" />
                    <stop offset="68%" stopColor="#F3F8F1" />
                    <stop offset="100%" stopColor="#EFE6D0" />
                  </linearGradient>
                  <linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6D4730" />
                    <stop offset="45%" stopColor="#8B5E3C" />
                    <stop offset="100%" stopColor="#633F2A" />
                  </linearGradient>
                  <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#DFC99E" />
                    <stop offset="40%" stopColor="#C9A874" />
                    <stop offset="100%" stopColor="#A98253" />
                  </linearGradient>
                  <radialGradient id="canopyGlow" cx="50%" cy="42%" r="48%">
                    <stop offset="0%" stopColor="#DCFCE7" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#DCFCE7" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Sky Backdrop */}
                <rect width="1100" height="760" fill="url(#skyGrad)" />

                {/* Warm Sun */}
                <circle cx="965" cy="92" r="46" fill="#FDE68A" opacity="0.7" />
                <circle cx="965" cy="92" r="32" fill="#FCD34D" opacity="0.85" />

                {/* Soft Drifting Clouds */}
                <g className="animate-cloud-slow" opacity="0.88">
                  <path
                    d="M 120 96 C 120 82, 134 72, 148 75 C 156 60, 180 58, 192 72 C 206 70, 218 80, 218 96 Z"
                    fill="#FFFFFF"
                  />
                  <path
                    d="M 730 108 C 730 96, 742 88, 754 91 C 762 78, 782 77, 792 89 C 804 88, 814 96, 814 108 Z"
                    fill="#FFFFFF"
                  />
                </g>

                {/* Distant Warm Desert Dunes & Oasis Horizon */}
                <path
                  d="M 0 570 Q 220 520, 480 555 T 1100 545 L 1100 760 L 0 760 Z"
                  fill="#E8DEC2"
                />
                <path
                  d="M 0 595 Q 310 560, 620 588 T 1100 580 L 1100 760 L 0 760 Z"
                  fill="#D6E5BE"
                  opacity="0.7"
                />

                {/* Soft Canopy Halo Behind Branches */}
                <ellipse cx="550" cy="275" rx="460" ry="235" fill="url(#canopyGlow)" />

                {/* Earth / Root Soil Layer */}
                <path
                  d="M 0 608 Q 290 588, 550 594 Q 820 600, 1100 592 L 1100 760 L 0 760 Z"
                  fill="url(#soilGrad)"
                />

                {/* Grass Tufts Along Soil Line */}
                <path
                  d="M 180 602 Q 186 588, 194 602 M 190 602 Q 198 584, 204 602 M 880 596 Q 886 580, 894 596 M 892 596 Q 900 582, 906 596"
                  stroke="#5F8D4E"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* ROOTS: Culture (Left) & Family (Right) */}
                <g>
                  {/* Main Left Roots */}
                  <path
                    d="M 520 585 C 480 622, 415 645, 325 668 C 280 680, 240 695, 208 712"
                    stroke="#6B462D"
                    strokeWidth="24"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 526 592 C 472 640, 428 672, 378 720"
                    stroke="#5C3B24"
                    strokeWidth="15"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 415 645 C 380 632, 345 630, 305 636"
                    stroke="#754E33"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Main Right Roots */}
                  <path
                    d="M 580 585 C 620 622, 685 645, 775 668 C 820 680, 860 695, 892 712"
                    stroke="#6B462D"
                    strokeWidth="24"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 574 592 C 628 640, 672 672, 722 720"
                    stroke="#5C3B24"
                    strokeWidth="15"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 685 645 C 720 632, 755 630, 795 636"
                    stroke="#754E33"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Center Deep Taproot */}
                  <path
                    d="M 550 590 C 550 640, 546 680, 550 732"
                    stroke="#5A3923"
                    strokeWidth="18"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Root Plaques: CULTURE & FAMILY */}
                  <g transform="translate(278, 666)">
                    <rect
                      x="-74"
                      y="-20"
                      width="148"
                      height="40"
                      rx="12"
                      fill="#FFFBEB"
                      stroke="#92633E"
                      strokeWidth="2.5"
                    />
                    <text
                      x="0"
                      y="6"
                      textAnchor="middle"
                      fill="#5A3923"
                      fontSize="17"
                      fontWeight="700"
                      fontFamily="Outfit, Noto Sans Arabic, sans-serif"
                    >
                      {copy.rootsCulture}
                    </text>
                  </g>

                  <g transform="translate(822, 666)">
                    <rect
                      x="-74"
                      y="-20"
                      width="148"
                      height="40"
                      rx="12"
                      fill="#FFFBEB"
                      stroke="#92633E"
                      strokeWidth="2.5"
                    />
                    <text
                      x="0"
                      y="6"
                      textAnchor="middle"
                      fill="#5A3923"
                      fontSize="17"
                      fontWeight="700"
                      fontFamily="Outfit, Noto Sans Arabic, sans-serif"
                    >
                      {copy.rootsFamily}
                    </text>
                  </g>
                </g>

                {/* THICK ORGANIC TRUNK */}
                <path
                  d="M 505 595 C 512 525, 518 455, 518 370 C 518 335, 526 305, 550 295 C 574 305, 582 335, 582 370 C 582 455, 588 525, 595 595 Z"
                  fill="url(#trunkGrad)"
                />
                {/* Bark texture lines */}
                <path
                  d="M 536 560 C 538 505, 537 450, 540 390 M 563 570 C 562 512, 560 455, 558 395"
                  stroke="#543521"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.45"
                />

                {/* Trunk Nameplate */}
                <g transform="translate(550, 512)">
                  <rect
                    x="-62"
                    y="-19"
                    width="124"
                    height="38"
                    rx="10"
                    fill="#FEF3C7"
                    stroke="#784E32"
                    strokeWidth="2"
                  />
                  <text
                    x="0"
                    y="5"
                    textAnchor="middle"
                    fill="#4A2E1B"
                    fontSize="14"
                    fontWeight="700"
                    fontFamily="Outfit, Noto Sans Arabic, sans-serif"
                  >
                    {profile.nickname}
                  </text>
                </g>

                {/* SEVEN ORGANICALLY CURVED BRANCHES */}
                {SKILL_BRANCHES.map((branch) => {
                  const geom = BRANCH_GEOMETRIES[branch.id];
                  const branchLeaves = leaves
                    .filter((l) => l.branchId === branch.id)
                    .sort((a, b) => a.orderIndex - b.orderIndex);
                  const completedCount = branchLeaves.filter(
                    (l) => progress[l.id]?.status === 'completed'
                  ).length;
                  const isBranchDone =
                    branchLeaves.length > 0 && completedCount === branchLeaves.length;
                  const isSelected = selectedBranchId === branch.id;

                  // Branch becomes greener visually as leaves are completed
                  const barkColor =
                    completedCount >= 3 ? '#4C6B42' : completedCount >= 1 ? '#6A5B3E' : '#7C5338';

                  return (
                    <g key={branch.id}>
                      {/* Selection highlight halo */}
                      {isSelected && (
                        <path
                          d={geom.path}
                          stroke={branch.colorHex}
                          strokeWidth="28"
                          fill="none"
                          strokeLinecap="round"
                          opacity="0.18"
                        />
                      )}

                      {/* Wood Branch */}
                      <path
                        d={geom.path}
                        stroke={barkColor}
                        strokeWidth="16"
                        fill="none"
                        strokeLinecap="round"
                        className="cursor-pointer transition-colors duration-300"
                        onClick={() => {
                          setSelectedBranchId(branch.id);
                          setLockedMessage(null);
                        }}
                      />
                      {/* Colored Sap / Growth Vein along Branch */}
                      <path
                        d={geom.path}
                        stroke={branch.colorHex}
                        strokeWidth="4.5"
                        fill="none"
                        strokeLinecap="round"
                        opacity={0.35 + (completedCount / Math.max(1, branchLeaves.length)) * 0.55}
                        className="pointer-events-none"
                      />

                      {/* Branch Label Card */}
                      <g
                        transform={`translate(${geom.labelX}, ${geom.labelY})`}
                        className="cursor-pointer"
                        role="button"
                        tabIndex={0}
                        aria-label={`${lang === 'ar' ? branch.nameAr : branch.name}: ${completedCount} of ${branchLeaves.length} completed`}
                        onClick={() => {
                          setSelectedBranchId(branch.id);
                          setLockedMessage(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedBranchId(branch.id);
                          }
                        }}
                      >
                        <rect
                          x="-78"
                          y="-20"
                          width="156"
                          height="40"
                          rx="11"
                          fill={isSelected ? branch.colorHex : '#FFFFFF'}
                          stroke={branch.colorHex}
                          strokeWidth={isSelected ? 2.5 : 2}
                        />
                        <text
                          x="0"
                          y="-1"
                          textAnchor="middle"
                          fill={isSelected ? '#FFFFFF' : '#16212E'}
                          fontSize="13"
                          fontWeight="700"
                          fontFamily="Outfit, Noto Sans Arabic, sans-serif"
                        >
                          {lang === 'ar' ? branch.nameAr : branch.name}
                        </text>
                        <text
                          x="0"
                          y="14"
                          textAnchor="middle"
                          fill={isSelected ? '#F8FAFC' : '#64748B'}
                          fontSize="10.5"
                          fontWeight="600"
                        >
                          {completedCount}/{branchLeaves.length}
                        </text>
                      </g>

                      {/* Branch Completion Flower / Blossom */}
                      {isBranchDone && (
                        <g
                          transform={`translate(${geom.tipX}, ${geom.tipY})`}
                          className="animate-blossom pointer-events-none"
                        >
                          {[0, 60, 120, 180, 240, 300].map((deg) => (
                            <ellipse
                              key={deg}
                              cx="0"
                              cy="-13"
                              rx="7"
                              ry="12"
                              fill="#FFF7ED"
                              stroke={branch.colorHex}
                              strokeWidth="1.5"
                              transform={`rotate(${deg})`}
                            />
                          ))}
                          <circle cx="0" cy="0" r="7" fill="#F59E0B" />
                        </g>
                      )}

                      {/* Whole-Tree Completion Extra Blossoms */}
                      {allBranchesComplete && (
                        <circle
                          cx={(geom.tipX + 550) / 2}
                          cy={(geom.tipY + 260) / 2}
                          r="7"
                          fill="#FEF08A"
                          stroke="#F59E0B"
                          strokeWidth="1.5"
                          className="animate-blossom pointer-events-none"
                        />
                      )}

                      {/* LEAVES ON THIS BRANCH */}
                      {branchLeaves.map((leaf, idx) => {
                        const anchor = getBranchLeafAnchor(branch.id, idx);
                        const rec = progress[leaf.id];
                        const status = rec?.status || 'locked';

                        let fill = '#E2E8F0';
                        let stroke = '#94A3B8';
                        let opacity = 0.72;
                        if (status === 'available') {
                          fill = branch.colorHex;
                          stroke = branch.darkColorHex;
                          opacity = 1;
                        } else if (status === 'waiting_parent') {
                          fill = '#F59E0B';
                          stroke = '#B45309';
                          opacity = 1;
                        } else if (status === 'completed') {
                          fill = '#16A34A';
                          stroke = '#15803D';
                          opacity = 1;
                        }

                        return (
                          <g
                            key={leaf.id}
                            transform={`translate(${anchor.x}, ${anchor.y})`}
                            role="button"
                            tabIndex={0}
                            aria-label={`${leaf.title} (${LEAF_STATUS_LABELS[status].en})`}
                            onClick={() => handleLeafClick(leaf)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleLeafClick(leaf);
                              }
                            }}
                            className={`cursor-pointer focus:outline-none ${
                              status === 'available' ? 'animate-leaf-sway' : ''
                            }`}
                          >
                            {/* Large invisible hit area (>=44px touch target) */}
                            <circle cx="0" cy="0" r="27" fill="transparent" />

                            {/* Botanical Leaf Shape */}
                            <g transform={`rotate(${anchor.angle})`}>
                              <path
                                d="M 0 22 C -17 12, -19 -8, 0 -24 C 19 -8, 17 12, 0 22 Z"
                                fill={fill}
                                stroke={stroke}
                                strokeWidth="2.2"
                                opacity={opacity}
                              />
                              <path
                                d="M 0 20 L 0 -16"
                                stroke="#FFFFFF"
                                strokeWidth="1.5"
                                opacity="0.5"
                                strokeLinecap="round"
                              />
                            </g>

                            {/* Status Emblem (Color + Icon/Number so never hue-only!) */}
                            <circle
                              cx="0"
                              cy="0"
                              r="11"
                              fill="#FFFFFF"
                              opacity={status === 'locked' ? 0.85 : 0.96}
                            />
                            {status === 'completed' && (
                              <path
                                d="M -4.5 0.5 L -1.5 3.5 L 5 -3.5"
                                stroke="#15803D"
                                strokeWidth="2.4"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            )}
                            {status === 'waiting_parent' && (
                              <text
                                x="0"
                                y="4"
                                textAnchor="middle"
                                fill="#B45309"
                                fontSize="11"
                                fontWeight="800"
                              >
                                …
                              </text>
                            )}
                            {status === 'available' && (
                              <text
                                x="0"
                                y="4"
                                textAnchor="middle"
                                fill={branch.darkColorHex}
                                fontSize="12"
                                fontWeight="800"
                              >
                                {leaf.orderIndex}
                              </text>
                            )}
                            {status === 'locked' && (
                              <text
                                x="0"
                                y="4"
                                textAnchor="middle"
                                fill="#64748B"
                                fontSize="10"
                                fontWeight="700"
                              >
                                {leaf.orderIndex}
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Tree Legend & Locked Feedback */}
          <div className="bg-white/95 border-t border-slate-200/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                {LEAF_STATUS_LABELS.locked[lang]}
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium text-slate-800">
                <span className="w-3 h-3 rounded-full bg-violet-600 inline-block" />
                {LEAF_STATUS_LABELS.available[lang]}
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium text-amber-800">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                {LEAF_STATUS_LABELS.waiting_parent[lang]}
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-800">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                {LEAF_STATUS_LABELS.completed[lang]}
              </span>
            </div>
            {lockedMessage && (
              <span className="text-amber-800 font-medium">{lockedMessage}</span>
            )}
          </div>
        </section>

        {/* Right / Bottom Selected Branch Explorer Deck */}
        <aside className="xl:col-span-4 space-y-4">
          {/* Quick Branch Switcher Strip */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <h2 className="text-sm font-semibold text-slate-500 mb-3">
              {lang === 'ar' ? 'اختر فرع مهارة' : 'Choose a Skill Branch'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-2 gap-2">
              {SKILL_BRANCHES.map((branch) => {
                const active = branch.id === selectedBranchId;
                const bLeaves = leaves.filter((l) => l.branchId === branch.id);
                const bDone = bLeaves.filter(
                  (l) => progress[l.id]?.status === 'completed'
                ).length;

                return (
                  <button
                    key={branch.id}
                    type="button"
                    onClick={() => {
                      setSelectedBranchId(branch.id);
                      setLockedMessage(null);
                    }}
                    className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border text-start transition-all cursor-pointer ${
                      active ? 'font-semibold shadow-xs' : 'border-slate-200 hover:border-slate-300'
                    }`}
                    style={
                      active
                        ? {
                            borderColor: branch.colorHex,
                            backgroundColor: branch.softBgHex,
                            color: branch.darkColorHex,
                          }
                        : undefined
                    }
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <SkillIcon
                        skillId={branch.id}
                        className="w-4 h-4 shrink-0"
                        color={branch.colorHex}
                      />
                      <span className="text-xs sm:text-sm truncate">
                        {lang === 'ar' ? branch.nameAr : branch.name}
                      </span>
                    </span>
                    <span className="text-xs tabular-nums opacity-75 shrink-0">
                      {bDone}/{bLeaves.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Branch Details + Sequential Leaves */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: selectedBranch.softBgHex }}
                >
                  <SkillIcon
                    skillId={selectedBranch.id}
                    className="w-6 h-6"
                    color={selectedBranch.colorHex}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#16212E]">
                    {lang === 'ar' ? selectedBranch.nameAr : selectedBranch.name}
                  </h2>
                  <p className="text-xs font-medium text-slate-500 tabular-nums">
                    {lang === 'ar'
                      ? `اكتمل ${selectedBranchCompletedCount} من ${selectedBranchLeaves.length} أوراق`
                      : `${selectedBranchCompletedCount} of ${selectedBranchLeaves.length} leaves completed`}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {lang === 'ar' ? selectedBranch.descriptionAr : selectedBranch.description}
            </p>

            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500 mb-1">
                {lang === 'ar' ? 'الارتباط الثقافي الإماراتي' : 'Emirati Cultural Connection'}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {lang === 'ar'
                  ? selectedBranch.culturalConnectionAr
                  : selectedBranch.culturalConnection}
              </p>
            </div>

            {/* Leaves List for Selected Branch */}
            <div className="space-y-2 pt-1">
              {selectedBranchLeaves.map((leaf) => {
                const rec = progress[leaf.id];
                const status = rec?.status || 'locked';
                const res = resources.find((r) => r.id === leaf.resourceId);
                const context = res?.contextSetting || 'family';
                const ArrowIcon = isRtl ? ChevronLeft : ChevronRight;

                return (
                  <button
                    key={leaf.id}
                    type="button"
                    onClick={() => handleLeafClick(leaf)}
                    className={`w-full flex items-center justify-between gap-3 p-3.5 rounded-xl border text-start transition-all ${
                      status === 'locked'
                        ? 'bg-slate-50 border-slate-200/80 text-slate-400 cursor-not-allowed'
                        : status === 'completed'
                        ? 'bg-emerald-50/60 border-emerald-200 hover:border-emerald-300 text-[#16212E] cursor-pointer'
                        : status === 'waiting_parent'
                        ? 'bg-amber-50/70 border-amber-200 hover:border-amber-300 text-[#16212E] cursor-pointer'
                        : 'bg-white border-slate-200 hover:border-slate-400 text-[#16212E] cursor-pointer shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 tabular-nums"
                        style={
                          status === 'completed'
                            ? { backgroundColor: '#16A34A', color: '#FFFFFF' }
                            : status === 'waiting_parent'
                            ? { backgroundColor: '#F59E0B', color: '#FFFFFF' }
                            : status === 'available'
                            ? {
                                backgroundColor: selectedBranch.softBgHex,
                                color: selectedBranch.darkColorHex,
                              }
                            : { backgroundColor: '#E2E8F0', color: '#64748B' }
                        }
                      >
                        {status === 'completed' ? (
                          <Check className="w-4 h-4" />
                        ) : status === 'waiting_parent' ? (
                          <Clock className="w-4 h-4" />
                        ) : status === 'locked' ? (
                          <Lock className="w-3.5 h-3.5" />
                        ) : (
                          leaf.orderIndex
                        )}
                      </span>

                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate">
                          {lang === 'ar' ? leaf.titleAr : leaf.title}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                          <ContextIcon context={context} className="w-3.5 h-3.5 shrink-0" />
                          <span>{CONTEXT_LABELS[context][lang]}</span>
                          <span aria-hidden="true">·</span>
                          <span>{LEAF_STATUS_LABELS[status][lang]}</span>
                        </div>
                      </div>
                    </div>

                    {status !== 'locked' && (
                      <ArrowIcon className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Transparent Framework Notice */}
          <div className="rounded-xl border border-slate-200/80 bg-white/80 p-3.5 flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
            <p>{copy.frameworkDisclaimer}</p>
          </div>
        </aside>
      </div>
    </div>
  );
};
