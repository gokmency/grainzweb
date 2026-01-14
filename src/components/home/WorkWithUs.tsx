import React from 'react';
import OutlineButton from '@/components/OutlineButton';
import { CONFIG } from '@/config/constants';
import { toast } from "sonner";

export const WorkWithUs: React.FC = () => {
  const handleDesignClick = () => {
    toast.info("Design page coming soon!", {
      description: "We are working hard to bring this page to life.",
      duration: 3000,
    });
  };

  const handleDevelopmentClick = () => {
    toast.info("Development page coming soon!", {
      description: "We are working hard to bring this page to life.",
      duration: 3000,
    });
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
        {CONFIG.text.workWithUs.title}
      </h2>
      <div className="grid grid-cols-2 gap-2 md:gap-3 mx-auto md:mx-0">
        <OutlineButton onClick={handleDesignClick} className="w-full">
          Design
        </OutlineButton>
        <OutlineButton onClick={handleDevelopmentClick} className="w-full">
          Development
        </OutlineButton>
        <OutlineButton onClick={handleCommunityClick} className="w-full">
          Community
        </OutlineButton>
        <OutlineButton onClick={handleJoinTeamClick} className="w-full">
          Join our team
        </OutlineButton>
      </div>
    </div>
  );
};
