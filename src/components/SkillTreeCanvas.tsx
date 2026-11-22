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
  // Filled organic tapered limb silhouette
  limbFillPath: string;
  // Centerline / highlight path for wood grain & selection glow
  centerPath: string;
  // Subtle secondary twig accents
  twigs: string[];
  labelX: number;
  labelY: number;
  tipX: number;
  tipY: number;
  leafAnchors: { x: number; y: number; angle: number; stemTo: [number, number] }[];
}

// Storybook-sculpted organic tree geometry (viewBox 0 0 1100 760)
const BRANCH_GEOMETRIES: Record<SkillId, BranchGeometry> = {
  adaptability: {
    id: 'adaptability',
    limbFillPath:
      'M 526 458 C 436 446, 315 436, 198 394 C 148 376, 112 356, 90 340 C 87 338, 90 332, 95 335 C 120 349, 155 366, 204 382 C 318 418, 436 426, 526 432 Z',
    centerPath: 'M 526 445 C 436 436, 316 427, 200 388 C 150 370, 116 352, 92 337',
    twigs: [
      'M 368 430 C 350 446, 336 454, 320 458',
      'M 252 406 C 236 390, 224 378, 210 372',
    ],
    labelX: 175,
    labelY: 462,
    tipX: 88,
    tipY: 334,
    leafAnchors: [
      { x: 420, y: 406, angle: -24, stemTo: [426, 434] },
      { x: 350, y: 444, angle: -146, stemTo: [358, 424] },
      { x: 278, y: 382, angle: -22, stemTo: [286, 408] },
      { x: 212, y: 408, angle: -138, stemTo: [220, 388] },
      { x: 142, y: 338, angle: -36, stemTo: [152, 362] },
      { x: 102, y: 368, angle: -120, stemTo: [112, 348] },
    ],
  },
  'digital-wisdom': {
    id: 'digital-wisdom',
    limbFillPath:
      'M 528 392 C 448 342, 334 290, 222 242 C 174 221, 138 198, 118 180 C 115 177, 119 172, 124 175 C 146 191, 182 211, 230 230 C 340 274, 452 322, 530 366 Z',
    centerPath: 'M 528 379 C 450 332, 337 282, 226 236 C 178 216, 142 194, 121 177',
    twigs: [
      'M 382 308 C 362 322, 348 332, 334 338',
      'M 264 252 C 248 236, 238 224, 228 214',
    ],
    labelX: 158,
    labelY: 298,
    tipX: 116,
    tipY: 174,
    leafAnchors: [
      { x: 430, y: 302, angle: -34, stemTo: [436, 330] },
      { x: 372, y: 330, angle: -144, stemTo: [380, 306] },
      { x: 304, y: 244, angle: -30, stemTo: [312, 270] },
      { x: 248, y: 266, angle: -140, stemTo: [256, 244] },
      { x: 178, y: 186, angle: -42, stemTo: [188, 212] },
      { x: 132, y: 212, angle: -126, stemTo: [144, 194] },
    ],
  },
  leadership: {
    id: 'leadership',
    limbFillPath:
      'M 538 338 C 488 268, 418 192, 340 126 C 306 96, 282 78, 266 66 C 263 63, 267 58, 272 61 C 290 72, 314 88, 350 116 C 426 178, 496 250, 544 316 Z',
    centerPath: 'M 540 327 C 492 259, 422 185, 345 121 C 310 92, 286 74, 269 63',
    twigs: [
      'M 454 226 C 434 224, 420 220, 408 214',
      'M 378 150 C 384 132, 388 118, 394 106',
    ],
    labelX: 244,
    labelY: 162,
    tipX: 264,
    tipY: 60,
    leafAnchors: [
      { x: 478, y: 234, angle: -48, stemTo: [478, 258] },
      { x: 438, y: 216, angle: -136, stemTo: [452, 224] },
      { x: 406, y: 148, angle: -44, stemTo: [404, 174] },
      { x: 364, y: 144, angle: -142, stemTo: [380, 152] },
      { x: 316, y: 80, angle: -48, stemTo: [316, 102] },
      { x: 280, y: 98, angle: -132, stemTo: [298, 86] },
    ],
  },
  communication: {
    id: 'communication',
    limbFillPath:
      'M 536 322 C 538 248, 542 168, 546 96 C 546 91, 554 91, 554 96 C 558 168, 562 248, 564 322 Z',
    centerPath: 'M 550 320 C 550 246, 550 168, 550 96',
    twigs: [
      'M 547 238 C 534 228, 524 220, 514 214',
      'M 553 198 C 566 188, 576 180, 586 174',
    ],
    labelX: 550,
    labelY: 38,
    tipX: 550,
    tipY: 88,
    leafAnchors: [
      { x: 516, y: 260, angle: -66, stemTo: [544, 266] },
      { x: 584, y: 246, angle: 66, stemTo: [556, 252] },
      { x: 516, y: 194, angle: -62, stemTo: [544, 200] },
      { x: 584, y: 178, angle: 62, stemTo: [556, 184] },
      { x: 526, y: 128, angle: -42, stemTo: [546, 138] },
      { x: 574, y: 120, angle: 42, stemTo: [554, 130] },
    ],
  },
  respect: {
    id: 'respect',
    limbFillPath:
      'M 562 338 C 612 268, 682 192, 760 126 C 794 96, 818 78, 834 66 C 837 63, 833 58, 828 61 C 810 72, 786 88, 750 116 C 674 178, 604 250, 556 316 Z',
    centerPath: 'M 560 327 C 608 259, 678 185, 755 121 C 790 92, 814 74, 831 63',
    twigs: [
      'M 646 226 C 666 224, 680 220, 692 214',
      'M 722 150 C 716 132, 712 118, 706 106',
    ],
    labelX: 856,
    labelY: 162,
    tipX: 836,
    tipY: 60,
    leafAnchors: [
      { x: 622, y: 234, angle: 48, stemTo: [622, 258] },
      { x: 662, y: 216, angle: 136, stemTo: [648, 224] },
      { x: 694, y: 148, angle: 44, stemTo: [696, 174] },
      { x: 736, y: 144, angle: 142, stemTo: [720, 152] },
      { x: 784, y: 80, angle: 48, stemTo: [784, 102] },
      { x: 820, y: 98, angle: 132, stemTo: [802, 86] },
    ],
  },
  hospitality: {
    id: 'hospitality',
    limbFillPath:
      'M 572 392 C 652 342, 766 290, 878 242 C 926 221, 962 198, 982 180 C 985 177, 981 172, 976 175 C 954 191, 918 211, 870 230 C 760 274, 648 322, 570 366 Z',
    centerPath: 'M 572 379 C 650 332, 763 282, 874 236 C 922 216, 958 194, 979 177',
    twigs: [
      'M 718 308 C 738 322, 752 332, 766 338',
      'M 836 252 C 852 236, 862 224, 872 214',
    ],
    labelX: 942,
    labelY: 298,
    tipX: 984,
    tipY: 174,
    leafAnchors: [
      { x: 670, y: 302, angle: 34, stemTo: [664, 330] },
      { x: 728, y: 330, angle: 144, stemTo: [720, 306] },
      { x: 796, y: 244, angle: 30, stemTo: [788, 270] },
      { x: 852, y: 266, angle: 140, stemTo: [844, 244] },
      { x: 922, y: 186, angle: 42, stemTo: [912, 212] },
      { x: 968, y: 212, angle: 126, stemTo: [956, 194] },
    ],
  },
  'critical-thinking': {
    id: 'critical-thinking',
    limbFillPath:
      'M 574 458 C 664 446, 785 436, 902 394 C 952 376, 988 356, 1010 340 C 1013 338, 1010 332, 1005 335 C 980 349, 945 366, 896 382 C 782 418, 664 426, 574 432 Z',
    centerPath: 'M 574 445 C 664 436, 784 427, 900 388 C 950 370, 984 352, 1008 337',
    twigs: [
      'M 732 430 C 750 446, 764 454, 780 458',
      'M 848 406 C 864 390, 876 378, 890 372',
    ],
    labelX: 925,
    labelY: 462,
    tipX: 1012,
    tipY: 334,
    leafAnchors: [
      { x: 680, y: 406, angle: 24, stemTo: [674, 434] },
      { x: 750, y: 444, angle: 146, stemTo: [742, 424] },
      { x: 822, y: 382, angle: 22, stemTo: [814, 408] },
      { x: 888, y: 408, angle: 138, stemTo: [880, 388] },
      { x: 958, y: 338, angle: 36, stemTo: [948, 362] },
      { x: 998, y: 368, angle: 120, stemTo: [988, 348] },
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
  const dragRef = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  }>({
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
    const extraOffset = idx - geom.leafAnchors.length + 1;
    return {
      x: geom.tipX + (extraOffset % 2 === 0 ? 22 : -22),
      y: geom.tipY - 18 * extraOffset,
      angle: extraOffset % 2 === 0 ? 45 : -45,
      stemTo: [geom.tipX, geom.tipY] as [number, number],
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
        {/* Interactive Storybook Illustrated Tree Canvas */}
        <section
          aria-label={lang === 'ar' ? 'شجرة الحكمة التفاعلية' : 'Interactive Wisdom Tree'}
          className="xl:col-span-8 relative rounded-2xl border border-slate-200/90 bg-[#E6F3FA] overflow-hidden shadow-xs"
        >
          {/* Zoom & Pan Controls */}
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
                aria-label="HIKMA storybook illustrated life skills tree with roots labeled Culture and Family and seven colorful branches"
              >
                <defs>
                  {/* Warm Morning Sky Gradient */}
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0.1" y2="1">
                    <stop offset="0%" stopColor="#CBE8F8" />
                    <stop offset="45%" stopColor="#E7F4EE" />
                    <stop offset="82%" stopColor="#FCF3DE" />
                    <stop offset="100%" stopColor="#F5E5C5" />
                  </linearGradient>

                  {/* Soft Sun Radiance */}
                  <radialGradient id="sunHalo" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.95" />
                    <stop offset="45%" stopColor="#FDE68A" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
                  </radialGradient>

                  {/* Trunk & Bark Shading */}
                  <linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8E603E" />
                    <stop offset="28%" stopColor="#7A5033" />
                    <stop offset="72%" stopColor="#5D3B24" />
                    <stop offset="100%" stopColor="#462A18" />
                  </linearGradient>

                  {/* Root Earth Shading */}
                  <linearGradient id="rootGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#764D31" />
                    <stop offset="55%" stopColor="#5C3A23" />
                    <stop offset="100%" stopColor="#452A18" />
                  </linearGradient>

                  {/* Layered Oasis Meadow & Warm Soil */}
                  <linearGradient id="meadowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A9CE7D" />
                    <stop offset="100%" stopColor="#7DA758" />
                  </linearGradient>
                  <linearGradient id="soilTopGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D7BC8D" />
                    <stop offset="35%" stopColor="#BF9B67" />
                    <stop offset="100%" stopColor="#946D42" />
                  </linearGradient>

                  {/* Canopy Foliage Depth Gradients */}
                  <radialGradient id="canopyDeep" cx="45%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#4B8854" />
                    <stop offset="100%" stopColor="#2F5E3B" />
                  </radialGradient>
                  <radialGradient id="canopyMid" cx="42%" cy="30%" r="68%">
                    <stop offset="0%" stopColor="#77B66B" />
                    <stop offset="65%" stopColor="#529258" />
                    <stop offset="100%" stopColor="#3B7146" />
                  </radialGradient>
                  <radialGradient id="canopyLight" cx="40%" cy="28%" r="65%">
                    <stop offset="0%" stopColor="#AED984" />
                    <stop offset="65%" stopColor="#78B86A" />
                    <stop offset="100%" stopColor="#539256" />
                  </radialGradient>

                  {/* Soft Drop Shadows */}
                  <filter id="canopyShadow" x="-10%" y="-10%" width="120%" height="125%">
                    <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#23412B" floodOpacity="0.16" />
                  </filter>
                  <filter id="leafShadow" x="-25%" y="-25%" width="150%" height="150%">
                    <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#1E293B" floodOpacity="0.22" />
                  </filter>
                  <filter id="plaqueShadow" x="-15%" y="-15%" width="130%" height="140%">
                    <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#1E293B" floodOpacity="0.14" />
                  </filter>
                </defs>

                {/* SKY & SUNLIGHT */}
                <rect width="1100" height="760" fill="url(#skyGrad)" />

                {/* Sun Halo & Disc */}
                <circle cx="945" cy="94" r="120" fill="url(#sunHalo)" />
                <circle cx="945" cy="94" r="34" fill="#FDE68A" opacity="0.95" />
                <circle cx="945" cy="94" r="26" fill="#FCD34D" />

                {/* Gentle Diagonal Sunbeams */}
                <g opacity="0.12" fill="#FEF9C3" className="pointer-events-none">
                  <polygon points="880,100 960,115 620,620 470,620" />
                  <polygon points="920,120 990,145 810,620 690,620" />
                </g>

                {/* Soft Layered Storybook Clouds */}
                <g className="animate-cloud-slow" opacity="0.92">
                  <g transform="translate(88, 72)">
                    <path
                      d="M 16 42 C 4 42, -2 32, 4 22 C 8 14, 20 14, 26 18 C 34 2, 58 -2, 72 10 C 84 4, 102 10, 106 22 C 118 22, 126 32, 120 42 Z"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M 12 42 C 35 37, 88 37, 120 42 Z"
                      fill="#DCECF5"
                      opacity="0.7"
                    />
                  </g>
                  <g transform="translate(715, 86) scale(0.86)">
                    <path
                      d="M 16 42 C 4 42, -2 32, 4 22 C 8 14, 20 14, 26 18 C 34 2, 58 -2, 72 10 C 84 4, 102 10, 106 22 C 118 22, 126 32, 120 42 Z"
                      fill="#FFFFFF"
                    />
                  </g>
                </g>

                {/* DISTANT ABU DHABI DUNES & OASIS HILLS */}
                <path
                  d="M 0 548 Q 210 502, 440 538 T 910 526 Q 1020 518, 1100 532 L 1100 620 L 0 620 Z"
                  fill="#EADBB9"
                />
                <path
                  d="M 0 564 Q 280 532, 560 558 T 1100 546 L 1100 620 L 0 620 Z"
                  fill="#CFE0AF"
                  opacity="0.75"
                />

                {/* Distant Oasis Date Palm Silhouettes (Left & Right Horizon) */}
                <g fill="#7FA468" opacity="0.55">
                  <path d="M 78 552 Q 82 518, 86 492 L 90 492 Q 87 520, 84 552 Z" />
                  <path d="M 88 494 Q 68 486, 56 498 Q 72 496, 88 496 Q 66 502, 58 514 Q 76 505, 88 498 Q 106 488, 118 498 Q 104 498, 90 498 Q 112 504, 118 516 Q 102 506, 88 498 Z" />
                  <path d="M 1018 544 Q 1021 516, 1024 494 L 1028 494 Q 1026 518, 1023 544 Z" />
                  <path d="M 1026 496 Q 1008 488, 998 498 Q 1012 496, 1026 498 Q 1006 504, 1000 514 Q 1016 506, 1026 500 Q 1044 490, 1054 500 Q 1040 498, 1028 500 Q 1046 506, 1052 516 Q 1038 506, 1026 500 Z" />
                </g>

                {/* Rolling Foreground Meadow */}
                <path
                  d="M 0 578 Q 260 548, 550 564 Q 840 578, 1100 558 L 1100 628 L 0 628 Z"
                  fill="url(#meadowGrad)"
                />

                {/* Soft Ground Shadow Under Tree Canopy */}
                <ellipse cx="550" cy="590" rx="260" ry="22" fill="#466837" opacity="0.22" />

                {/* ===================================================== */}
                {/* LAYERED STORYBOOK FOLIAGE CANOPY (Behind Limbs)       */}
                {/* ===================================================== */}
                <g filter="url(#canopyShadow)" className="pointer-events-none">
                  {/* Deep Back Shadow Foliage Masses */}
                  <path
                    d="M 150 400 C 80 390, 62 325, 115 288 C 78 232, 118 162, 188 164 C 214 98, 304 62, 376 92 C 425 32, 515 22, 552 44 C 595 20, 682 32, 728 92 C 802 64, 888 100, 914 166 C 986 164, 1024 234, 986 290 C 1040 326, 1020 394, 948 402 C 910 444, 825 456, 755 436 C 690 462, 610 456, 550 438 C 490 456, 410 462, 345 436 C 275 456, 190 444, 150 400 Z"
                    fill="url(#canopyDeep)"
                    opacity={0.78 + Math.min(0.18, totalCompletedLeaves * 0.008)}
                  />

                  {/* Mid-Tone Lush Foliage Clusters */}
                  <g fill="url(#canopyMid)" opacity="0.88">
                    <circle cx="176" cy="348" r="78" />
                    <circle cx="212" cy="222" r="82" />
                    <circle cx="348" cy="144" r="94" />
                    <circle cx="550" cy="128" r="108" />
                    <circle cx="752" cy="144" r="94" />
                    <circle cx="888" cy="222" r="82" />
                    <circle cx="924" cy="348" r="78" />
                    <circle cx="340" cy="368" r="86" />
                    <circle cx="760" cy="368" r="86" />
                    <circle cx="550" cy="276" r="118" />
                  </g>

                  {/* Sunlit Top Canopy Highlights */}
                  <g fill="url(#canopyLight)" opacity="0.62">
                    <circle cx="332" cy="120" r="64" />
                    <circle cx="545" cy="98" r="74" />
                    <circle cx="755" cy="122" r="62" />
                    <circle cx="195" cy="196" r="54" />
                    <circle cx="892" cy="198" r="52" />
                    <circle cx="145" cy="322" r="48" />
                    <circle cx="945" cy="324" r="48" />
                  </g>

                  {/* Dappled Sunlight Spots inside Crown */}
                  <g fill="#D9F99D" opacity="0.22">
                    <circle cx="468" cy="168" r="18" />
                    <circle cx="628" cy="160" r="22" />
                    <circle cx="364" cy="264" r="16" />
                    <circle cx="732" cy="252" r="18" />
                    <circle cx="256" cy="316" r="14" />
                    <circle cx="842" cy="312" r="15" />
                  </g>
                </g>

                {/* ===================================================== */}
                {/* LAYERED SOIL CROSS-SECTION & SCULPTED ROOTS           */}
                {/* ===================================================== */}
                <path
                  d="M 0 606 Q 280 584, 550 594 Q 820 602, 1100 588 L 1100 760 L 0 760 Z"
                  fill="url(#soilTopGrad)"
                />
                {/* Subtle soil strata wave */}
                <path
                  d="M 0 662 Q 310 644, 550 658 Q 810 672, 1100 650 L 1100 760 L 0 760 Z"
                  fill="#9C7547"
                  opacity="0.35"
                />
                {/* Grass collar tufts & tiny desert wildflowers */}
                <g stroke="#4E7C3A" strokeWidth="2.6" fill="none" strokeLinecap="round">
                  <path d="M 162 598 Q 165 582, 158 574 M 168 598 Q 172 580, 178 574 M 174 599 Q 182 586, 188 582" />
                  <path d="M 432 592 Q 436 578, 430 570 M 438 592 Q 444 576, 450 572" />
                  <path d="M 656 593 Q 652 578, 646 572 M 662 593 Q 668 576, 672 570" />
                  <path d="M 914 595 Q 918 580, 912 572 M 920 595 Q 926 578, 932 574" />
                </g>
                <g>
                  <circle cx="158" cy="573" r="3.5" fill="#FDE047" />
                  <circle cx="451" cy="571" r="3.5" fill="#FBBF24" />
                  <circle cx="673" cy="569" r="3.5" fill="#FDE047" />
                  <circle cx="933" cy="573" r="3.5" fill="#F9A8D4" />
                </g>

                {/* Sculpted Tapering Roots: Culture & Family */}
                <g>
                  {/* Left Primary Root (Culture) */}
                  <path
                    d="M 512 582 C 474 624, 396 648, 304 672 C 254 685, 214 700, 182 718 C 176 721, 180 726, 187 724 C 228 708, 272 696, 326 684 C 414 664, 488 646, 532 598 Z"
                    fill="url(#rootGrad)"
                  />
                  {/* Left Secondary Rootlet */}
                  <path
                    d="M 526 592 C 478 640, 434 678, 386 724 C 382 728, 387 732, 393 729 C 442 690, 492 652, 540 598 Z"
                    fill="#5B3922"
                  />
                  {/* Left Upper Root Branch */}
                  <path
                    d="M 410 648 C 374 634, 336 632, 294 640 C 288 641, 289 647, 296 647 C 334 644, 368 648, 398 660 Z"
                    fill="#6E472D"
                  />

                  {/* Right Primary Root (Family) */}
                  <path
                    d="M 588 582 C 626 624, 704 648, 796 672 C 846 685, 886 700, 918 718 C 924 721, 920 726, 913 724 C 872 708, 828 696, 774 684 C 686 664, 612 646, 568 598 Z"
                    fill="url(#rootGrad)"
                  />
                  {/* Right Secondary Rootlet */}
                  <path
                    d="M 574 592 C 622 640, 666 678, 714 724 C 718 728, 713 732, 707 729 C 658 690, 608 652, 560 598 Z"
                    fill="#5B3922"
                  />
                  {/* Right Upper Root Branch */}
                  <path
                    d="M 690 648 C 726 634, 764 632, 806 640 C 812 641, 811 647, 804 647 C 766 644, 732 648, 702 660 Z"
                    fill="#6E472D"
                  />

                  {/* Center Deep Taproot */}
                  <path
                    d="M 540 592 C 542 642, 544 686, 548 736 C 549 740, 553 740, 554 736 C 558 686, 560 642, 562 592 Z"
                    fill="#4D301C"
                  />

                  {/* Warm Root Highlight Lines */}
                  <path
                    d="M 488 616 C 430 644, 360 662, 275 684 M 612 616 C 670 644, 740 662, 825 684"
                    stroke="#A6744E"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.55"
                  />

                  {/* Root Plaques: CULTURE & FAMILY */}
                  <g transform="translate(274, 668)" filter="url(#plaqueShadow)">
                    <rect
                      x="-74"
                      y="-21"
                      width="148"
                      height="42"
                      rx="14"
                      fill="#FFFBEB"
                      stroke="#A4764B"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="-69"
                      y="-16"
                      width="138"
                      height="32"
                      rx="10"
                      fill="none"
                      stroke="#E7D3AC"
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="6"
                      textAnchor="middle"
                      fill="#4A2F1B"
                      fontSize="16"
                      fontWeight="700"
                      fontFamily="Outfit, Noto Sans Arabic, sans-serif"
                    >
                      {copy.rootsCulture}
                    </text>
                  </g>

                  <g transform="translate(826, 668)" filter="url(#plaqueShadow)">
                    <rect
                      x="-74"
                      y="-21"
                      width="148"
                      height="42"
                      rx="14"
                      fill="#FFFBEB"
                      stroke="#A4764B"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="-69"
                      y="-16"
                      width="138"
                      height="32"
                      rx="10"
                      fill="none"
                      stroke="#E7D3AC"
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="6"
                      textAnchor="middle"
                      fill="#4A2F1B"
                      fontSize="16"
                      fontWeight="700"
                      fontFamily="Outfit, Noto Sans Arabic, sans-serif"
                    >
                      {copy.rootsFamily}
                    </text>
                  </g>
                </g>

                {/* ===================================================== */}
                {/* SCULPTED ORGANIC TRUNK                                */}
                {/* ===================================================== */}
                <path
                  d="M 488 598 C 508 558, 518 492, 518 400 C 518 354, 526 320, 550 306 C 574 320, 582 354, 582 400 C 582 492, 592 558, 612 598 C 582 592, 518 592, 488 598 Z"
                  fill="url(#trunkGrad)"
                />
                {/* Bark grain & sunlit left highlight */}
                <path
                  d="M 524 574 C 528 518, 528 456, 527 388"
                  stroke="#A87650"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.5"
                />
                <path
                  d="M 544 580 C 546 520, 544 452, 545 378 M 566 578 C 564 516, 564 456, 562 392"
                  stroke="#3F2414"
                  strokeWidth="2.4"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.38"
                />
                {/* Cute organic bark hollow / knot */}
                <ellipse cx="536" cy="466" rx="5.5" ry="9" fill="#462A18" opacity="0.65" />
                <ellipse cx="536" cy="466" rx="3" ry="5.5" fill="#2D190E" opacity="0.6" />

                {/* Child Trunk Nameplate */}
                <g transform="translate(550, 520)" filter="url(#plaqueShadow)">
                  <rect
                    x="-62"
                    y="-19"
                    width="124"
                    height="38"
                    rx="12"
                    fill="#FEF8E7"
                    stroke="#8E603E"
                    strokeWidth="1.5"
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

                {/* ===================================================== */}
                {/* SEVEN TAPERED ORGANIC BRANCHES & BOTANICAL LEAVES     */}
                {/* ===================================================== */}
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

                  // Branch wood naturally warms and turns living olive-green as leaves grow
                  const woodFill =
                    completedCount >= 3
                      ? '#4C6F43'
                      : completedCount >= 1
                      ? '#68593D'
                      : '#724B30';

                  return (
                    <g key={branch.id}>
                      {/* Selection Aura Halo */}
                      {isSelected && (
                        <path
                          d={geom.centerPath}
                          stroke={branch.colorHex}
                          strokeWidth="30"
                          fill="none"
                          strokeLinecap="round"
                          opacity="0.18"
                        />
                      )}

                      {/* Tapered Organic Wood Limb */}
                      <path
                        d={geom.limbFillPath}
                        fill={woodFill}
                        className="cursor-pointer transition-colors duration-300"
                        onClick={() => {
                          setSelectedBranchId(branch.id);
                          setLockedMessage(null);
                        }}
                      />

                      {/* Delicate Secondary Twigs */}
                      <g
                        stroke={woodFill}
                        strokeWidth="4.2"
                        fill="none"
                        strokeLinecap="round"
                        className="pointer-events-none"
                      >
                        {geom.twigs.map((twig, tIdx) => (
                          <path key={tIdx} d={twig} />
                        ))}
                      </g>

                      {/* Living Skill Sap Vein along Limb */}
                      <path
                        d={geom.centerPath}
                        stroke={branch.colorHex}
                        strokeWidth="3.5"
                        fill="none"
                        strokeLinecap="round"
                        opacity={0.38 + (completedCount / Math.max(1, branchLeaves.length)) * 0.55}
                        className="pointer-events-none"
                      />

                      {/* Branch Completion Flower / Blossom (outer translate, inner animate!) */}
                      {isBranchDone && (
                        <g
                          transform={`translate(${geom.tipX}, ${geom.tipY})`}
                          className="pointer-events-none"
                        >
                          <g className="animate-blossom">
                            {[0, 60, 120, 180, 240, 300].map((deg) => (
                              <ellipse
                                key={deg}
                                cx="0"
                                cy="-13"
                                rx="7"
                                ry="12"
                                fill="#FFF7ED"
                                stroke={branch.colorHex}
                                strokeWidth="1.4"
                                transform={`rotate(${deg})`}
                              />
                            ))}
                            <circle cx="0" cy="0" r="6.5" fill="#F59E0B" />
                          </g>
                        </g>
                      )}

                      {/* Whole-Tree Completion Extra Blossoms */}
                      {allBranchesComplete && (
                        <g
                          transform={`translate(${(geom.tipX + 550) / 2}, ${(geom.tipY + 260) / 2})`}
                          className="pointer-events-none"
                        >
                          <circle
                            cx="0"
                            cy="0"
                            r="7"
                            fill="#FEF08A"
                            stroke="#F59E0B"
                            strokeWidth="1.5"
                            className="animate-blossom"
                          />
                        </g>
                      )}

                      {/* LEAVES ON THIS BRANCH */}
                      {branchLeaves.map((leaf, idx) => {
                        const anchor = getBranchLeafAnchor(branch.id, idx);
                        const rec = progress[leaf.id];
                        const status = rec?.status || 'locked';

                        // Painterly two-tone palette per leaf state
                        let lightHalf = '#E2E8F0';
                        let darkHalf = '#CBD5E1';
                        let stroke = '#94A3B8';
                        let veinColor = '#94A3B8';
                        let opacity = 0.86;

                        if (status === 'available') {
                          lightHalf = branch.colorHex;
                          darkHalf = branch.darkColorHex;
                          stroke = branch.darkColorHex;
                          veinColor = '#FFFFFF';
                          opacity = 1;
                        } else if (status === 'waiting_parent') {
                          lightHalf = '#FBBF24';
                          darkHalf = '#D97706';
                          stroke = '#B45309';
                          veinColor = '#FFFBEB';
                          opacity = 1;
                        } else if (status === 'completed') {
                          lightHalf = '#22C55E';
                          darkHalf = '#15803D';
                          stroke = '#166534';
                          veinColor = '#DCFCE7';
                          opacity = 1;
                        }

                        return (
                          <g key={leaf.id}>
                            {/* Organic Curved Petiole (Stem) connecting leaf to limb */}
                            <path
                              d={`M ${anchor.x} ${anchor.y} Q ${(anchor.x + anchor.stemTo[0]) / 2} ${(anchor.y + anchor.stemTo[1]) / 2 + 4}, ${anchor.stemTo[0]} ${anchor.stemTo[1]}`}
                              stroke={woodFill}
                              strokeWidth="2.8"
                              fill="none"
                              strokeLinecap="round"
                              className="pointer-events-none"
                            />

                            {/* Outer Positioned Interactive Group (NEVER put CSS transform animation on this element!) */}
                            <g
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
                              className="cursor-pointer focus:outline-none group"
                            >
                              {/* Generous touch target (>=44px) */}
                              <circle cx="0" cy="0" r="28" fill="transparent" />

                              {/* Inner Animated & Hover-Responsive Botanical Leaf */}
                              <g
                                className={`${
                                  status === 'available' ? 'animate-leaf-sway' : ''
                                } transition-transform duration-150 group-hover:scale-110`}
                              >
                                {/* Subtle Glow Halo on Ready-to-Explore Leaves */}
                                {status === 'available' && (
                                  <g transform={`rotate(${anchor.angle})`}>
                                    <path
                                      d="M 0 24 C -20 13, -23 -9, 0 -29 C 23 -9, 20 13, 0 24 Z"
                                      fill={branch.colorHex}
                                      opacity="0.24"
                                    />
                                  </g>
                                )}

                                {/* Two-Tone Veined Botanical Leaf Silhouette */}
                                <g
                                  transform={`rotate(${anchor.angle})`}
                                  filter="url(#leafShadow)"
                                  opacity={opacity}
                                >
                                  {/* Sunlit Left Half */}
                                  <path
                                    d="M 0 21 C -16 11, -19 -8, 0 -25 L 0 21 Z"
                                    fill={lightHalf}
                                  />
                                  {/* Shaded Right Half */}
                                  <path
                                    d="M 0 21 C 16 11, 19 -8, 0 -25 L 0 21 Z"
                                    fill={darkHalf}
                                  />
                                  {/* Crisp Botanical Outline */}
                                  <path
                                    d="M 0 21 C -16 11, -19 -8, 0 -25 C 19 -8, 16 11, 0 21 Z"
                                    fill="none"
                                    stroke={stroke}
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                  />
                                  {/* Central Midrib + Delicate Side Veins */}
                                  <path
                                    d="M 0 19 L 0 -19 M 0 8 L -7 2 M 0 8 L 7 2 M 0 -1 L -7 -7 M 0 -1 L 7 -7 M 0 -9 L -4 -14 M 0 -9 L 4 -14"
                                    stroke={veinColor}
                                    strokeWidth="1.2"
                                    opacity="0.55"
                                    strokeLinecap="round"
                                    fill="none"
                                  />
                                </g>

                                {/* Clean Status Medallion (Dual-Coded: Number / Icon + Color) */}
                                <circle
                                  cx="0"
                                  cy="0"
                                  r="10.5"
                                  fill="#FFFFFF"
                                  stroke={stroke}
                                  strokeWidth="1.2"
                                  opacity={status === 'locked' ? 0.92 : 0.98}
                                />
                                {status === 'completed' && (
                                  <path
                                    d="M -4.2 0.4 L -1.2 3.4 L 4.6 -3.2"
                                    stroke="#15803D"
                                    strokeWidth="2.3"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                )}
                                {status === 'waiting_parent' && (
                                  <g stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" fill="none">
                                    <path d="M 0 -4 L 0 0.5 L 3 2" />
                                  </g>
                                )}
                                {status === 'available' && (
                                  <text
                                    x="0"
                                    y="4"
                                    textAnchor="middle"
                                    fill={branch.darkColorHex}
                                    fontSize="12"
                                    fontWeight="800"
                                    fontFamily="Outfit, sans-serif"
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
                                    fontSize="10.5"
                                    fontWeight="700"
                                    fontFamily="Outfit, sans-serif"
                                  >
                                    {leaf.orderIndex}
                                  </text>
                                )}
                              </g>
                            </g>
                          </g>
                        );
                      })}
                    </g>
                  );
                })}

                {/* ===================================================== */}
                {/* TOP LAYER: BRANCH LABEL BANNERS (NEVER COVERED)       */}
                {/* ===================================================== */}
                {SKILL_BRANCHES.map((branch) => {
                  const geom = BRANCH_GEOMETRIES[branch.id];
                  const branchLeaves = leaves.filter((l) => l.branchId === branch.id);
                  const completedCount = branchLeaves.filter(
                    (l) => progress[l.id]?.status === 'completed'
                  ).length;
                  const isSelected = selectedBranchId === branch.id;

                  return (
                    <g
                      key={`label-${branch.id}`}
                      transform={`translate(${geom.labelX}, ${geom.labelY})`}
                      filter="url(#plaqueShadow)"
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
                        rx="13"
                        fill={isSelected ? branch.colorHex : '#FFFFFF'}
                        stroke={branch.colorHex}
                        strokeWidth={isSelected ? 2 : 1.4}
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
