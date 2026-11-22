import React from 'react';
import {
  ShieldCheck,
  Compass,
  MessageCircle,
  HeartHandshake,
  Coffee,
  Wind,
  Lightbulb,
  Home,
  GraduationCap,
  Users,
  Landmark,
  Monitor,
} from 'lucide-react';
import { EcosystemContext, SkillId } from '../types/hikma';

export const SkillIcon: React.FC<{
  skillId: SkillId;
  className?: string;
  color?: string;
}> = ({ skillId, className = 'w-5 h-5', color }) => {
  const props = { className, style: color ? { color } : undefined, 'aria-hidden': true as const };
  switch (skillId) {
    case 'digital-wisdom':
      return <ShieldCheck {...props} />;
    case 'leadership':
      return <Compass {...props} />;
    case 'communication':
      return <MessageCircle {...props} />;
    case 'respect':
      return <HeartHandshake {...props} />;
    case 'hospitality':
      return <Coffee {...props} />;
    case 'adaptability':
      return <Wind {...props} />;
    case 'critical-thinking':
      return <Lightbulb {...props} />;
  }
};

export const ContextIcon: React.FC<{
  context: EcosystemContext;
  className?: string;
}> = ({ context, className = 'w-4 h-4' }) => {
  const props = { className, 'aria-hidden': true as const };
  switch (context) {
    case 'family':
      return <Home {...props} />;
    case 'school':
      return <GraduationCap {...props} />;
    case 'community':
      return <Users {...props} />;
    case 'public-spaces':
      return <Landmark {...props} />;
    case 'digital':
      return <Monitor {...props} />;
  }
};
