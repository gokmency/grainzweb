import React from 'react';
import OutlineButton from '@/components/OutlineButton';
import { CONFIG } from '@/config/constants';
import { useLanguage } from '@/hooks/useLanguage';

export const WorkWithUs: React.FC = () => {
  const lang = useLanguage();
  const handleDesignClick = () => {
    window.open(CONFIG.links.grainzStudioInstagram, '_blank');
  };

  const handleDevelopmentClick = () => {
    window.open(CONFIG.links.grainzDigital, '_blank');
  };

  const handleCommunityClick = () => {
    window.open(CONFIG.links.grainzLegacy, '_blank');
  };

  const handleJoinTeamClick = () => {
    window.open(CONFIG.links.joinTeamTypeform, '_blank');
  };

  return (
    <div className="w-full md:max-w-sm bg-black/10 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-lg md:rounded-none p-3 md:p-0 border md:border-none border-white/20">
      <h2
        className="text-sm md:text-lg font-bold text-white mb-2 md:mb-4 text-center md:text-left"
        style={{ letterSpacing: '2px', fontFamily: "'Tomorrow', sans-serif" }}
      >
        {CONFIG.text.workWithUs.title[lang]}
      </h2>
      <div className="grid grid-cols-2 gap-2 md:gap-3 mx-auto md:mx-0">
        <OutlineButton onClick={handleDesignClick} className="w-full">
          {CONFIG.text.buttons.design[lang]}
        </OutlineButton>
        <OutlineButton onClick={handleDevelopmentClick} className="w-full">
          {CONFIG.text.buttons.development[lang]}
        </OutlineButton>
        <OutlineButton onClick={handleCommunityClick} className="w-full">
          {CONFIG.text.buttons.community[lang]}
        </OutlineButton>
        <OutlineButton onClick={handleJoinTeamClick} className="w-full">
          {CONFIG.text.buttons.joinTeam[lang]}
        </OutlineButton>
      </div>
    </div>
  );
};
