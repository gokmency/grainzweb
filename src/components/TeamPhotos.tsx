import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";

// Team member data with organized photo structure
const teamMembers = [
  {
    id: 1,
    name: "Gökmen",
    role: "Developer",
    photo: "/team/gokmen.jpg",
    bio: `Gökmen previously worked on the community side of Web3 projects; these days, he’s a “vibe coder” constantly building new things. He’s also on his way to becoming a computer engineer.
He writes code, but somehow ends up building ideas too.`,
    twitter: "https://x.com/gokmeneth",
    linkedin: "https://www.linkedin.com/in/gokmencelik/"
  },
  {
    id: 3,
    name: "Sefercan",
    role: "Researcher",
    photo: "/team/sefercan.jpg",
    bio: "Sefercan primarily studies medicine, but contributes here by exploring emerging technologies and shaping project strategies. Balances med school by day and future tech by night.",
    twitter: "https://x.com/sefercan"
   
  },
  {
    id: 6,
    name: "Ercan",
    role: "Researcher",
    photo: "/team/ercan.jpg",
    bio: "Ercan is mainly focused on medical school, while supporting the team with research on technological trends and experimental approaches. Studies anatomy but somehow keeps building roadmaps.",
    twitter: "https://x.com/ercan"
  },
  {
    id: 4,
    name: "Maslak",
    role: "Analyst",
    photo: "/team/maslak.jpg",
    bio: "Maslak analyzes business processes and develops models to improve operational efficiency, building on his industrial engineering background. Speaks fluent Excel and turns chaos into clean tables.",
    twitter: "https://x.com/maslak"
  },
  {
    id: 5,
    name: "Burak",
    role: "Designer", 
    photo: "/team/burak.jpg",
    bio: "With an industrial design background, Burak leads modeling and interface design processes, and has recently been exploring yacht design. Sketches ideas first, then brings them to life.",
    twitter: "https://x.com/100guc",
    linkedin: "https://www.linkedin.com/in/burakyuzguc"
    
  },
  {
    id: 2,
    name: "Akman",
    role: "Researcher",
    photo: "/team/berkay.jpg",
    bio: "Akman mainly focuses on medical school, while supporting the team with research on emerging trends and innovative strategies. Studies medicine full-time, predicts the future part-time.",
    twitter: "https://x.com/Akmangrainz"
    
  },
  {
    id: 7,
    name: "Ceyhun",
    role: "Intern",
    photo: "/team/ceyhun.jpg",
    bio: "Doesn’t know much yet, but learning fast.",
    twitter: "https://x.com/grainzeth"
  },
];

const TeamPhotos: React.FC = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (memberId: number, event: React.MouseEvent | React.TouchEvent) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    
    const rect = event.currentTarget.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Calculate safe position within viewport
    const popupWidth = 320; // 80 * 4 (w-80)
    const popupHeight = 300; // estimated popup height
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let x = rect.left + scrollLeft + rect.width / 2;
    let y = rect.bottom + scrollTop + 10;
    
    // Adjust x position if popup would go off screen
    if (x + popupWidth / 2 > viewportWidth - 20) {
      x = viewportWidth - popupWidth / 2 - 20;
    }
    if (x - popupWidth / 2 < 20) {
      x = popupWidth / 2 + 20;
    }
    
    // Adjust y position if popup would go off screen
    if (y + popupHeight > scrollTop + viewportHeight - 20) {
      y = rect.top + scrollTop - popupHeight - 10;
    }
    
    setPopupPosition({ x, y });
    setHoveredMember(memberId);
  };

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setHoveredMember(null);
    }, 150);
  };

  const handlePopupMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  };

  const handlePopupMouseLeave = () => {
    setHoveredMember(null);
  };


  const handleTwitterClick = (memberId: number) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (member?.twitter) {
      window.open(member.twitter, '_blank');
    }
    setHoveredMember(null);
  };

  const handleLinkedInClick = (memberId: number) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (member?.linkedin) {
      window.open(member.linkedin, '_blank');
    }
    setHoveredMember(null);
  };

  // Split team members: first 4 in left column, remaining 3 in right column
  const leftColumnMembers = teamMembers.slice(0, 4);
  const rightColumnMembers = teamMembers.slice(4, 7);

  return (
    <div className="relative">
      {/* Desktop Grid Layout */}
      <div className="hidden md:grid grid-cols-2 gap-2 max-w-[180px]">
        {/* Left Column - 4 members */}
        <div className="space-y-2">
          {leftColumnMembers.map((member) => {
            const isHovered = member.id === hoveredMember;
            
            return (
              <div
                key={member.id}
                onMouseEnter={(e) => handleMouseEnter(member.id, e)}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => handleMouseEnter(member.id, e)}
                onTouchStart={(e) => handleMouseEnter(member.id, e)}
                className={`group rounded-lg overflow-hidden relative border-2 transition-all duration-200 flex-shrink-0 bg-white w-full aspect-square cursor-pointer
                  ${isHovered ? "border-[#C8102E] shadow-lg scale-105 z-10" : "border-transparent hover:border-[#9D174D]"} 
                `}
                aria-label={member.name}
              >
                <img
                  src={member.photo}
                  alt={`${member.name} - ${member.role} at Grainz`}
                  className={`w-full h-full object-cover transition-all duration-200 ${
                    isHovered ? "grayscale-0" : "grayscale hover:grayscale-0"
                  }`}
                  draggable={false}
                />
                {isHovered && (
                  <span
                    className="absolute inset-0 border-[3px] border-[#FBBF24] pointer-events-none rounded-lg"
                    aria-hidden
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column - 3 members */}
        <div className="space-y-2">
          {rightColumnMembers.map((member) => {
            const isHovered = member.id === hoveredMember;
            
            return (
              <div
                key={member.id}
                onMouseEnter={(e) => handleMouseEnter(member.id, e)}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => handleMouseEnter(member.id, e)}
                onTouchStart={(e) => handleMouseEnter(member.id, e)}
                className={`group rounded-lg overflow-hidden relative border-2 transition-all duration-200 flex-shrink-0 bg-white w-full aspect-square cursor-pointer
                  ${isHovered ? "border-[#C8102E] shadow-lg scale-105 z-10" : "border-transparent hover:border-[#9D174D]"} 
                `}
                aria-label={member.name}
              >
                <img
                  src={member.photo}
                  alt={`${member.name} - ${member.role} at Grainz`}
                  className={`w-full h-full object-cover transition-all duration-200 ${
                    isHovered ? "grayscale-0" : "grayscale hover:grayscale-0"
                  }`}
                  draggable={false}
                />
                {isHovered && (
                  <span
                    className="absolute inset-0 border-[3px] border-[#FBBF24] pointer-events-none rounded-lg"
                    aria-hidden
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Grid Layout */}
      <div className="grid md:hidden grid-cols-4 gap-1 max-w-[200px] mx-auto">
        {teamMembers.map((member) => {
          const isHovered = member.id === hoveredMember;
          
          return (
            <div
              key={member.id}
              onMouseEnter={(e) => handleMouseEnter(member.id, e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleMouseEnter(member.id, e)}
              onTouchStart={(e) => handleMouseEnter(member.id, e)}
              className={`group rounded-lg overflow-hidden relative border-2 transition-all duration-200 flex-shrink-0 bg-white w-full aspect-square cursor-pointer
                ${isHovered ? "border-[#C8102E] shadow-lg scale-105 z-10" : "border-transparent hover:border-[#9D174D]"} 
              `}
              aria-label={member.name}
            >
              <img
                src={member.photo}
                alt={`${member.name} - ${member.role} at Grainz`}
                className={`w-full h-full object-cover transition-all duration-200 ${
                  isHovered ? "grayscale-0" : "grayscale hover:grayscale-0"
                }`}
                style={{
                  objectPosition: 'center 25%'
                }}
                draggable={false}
              />
              {isHovered && (
                <span
                  className="absolute inset-0 border-[3px] border-[#FBBF24] pointer-events-none rounded-lg"
                  aria-hidden
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Team Member Popup - Portal to body */}
      {hoveredMember && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed z-[9999] transform -translate-x-1/2 pointer-events-auto"
          style={{
            left: `${popupPosition.x}px`,
            top: `${popupPosition.y}px`,
          }}
        >
          <div
            onMouseEnter={handlePopupMouseEnter}
            onMouseLeave={handlePopupMouseLeave}
            className="relative bg-white rounded-xl shadow-2xl w-80 max-w-[90vw] p-4 transform transition-all duration-300 ease-out scale-100 opacity-100 border border-gray-200"
            style={{
              fontFamily: "'Tomorrow', sans-serif"
            }}
          >

            {/* Social Media buttons */}
            <div className="absolute right-3 top-3 flex gap-2">
              {/* LinkedIn button */}
              {teamMembers.find(m => m.id === hoveredMember)?.linkedin && (
                <button
                  onClick={() => handleLinkedInClick(hoveredMember)}
                  className="w-6 h-6 text-gray-400 hover:text-blue-700 transition-colors z-10 flex items-center justify-center rounded-full hover:bg-gray-100"
                  aria-label="Visit LinkedIn profile"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              )}
              
              {/* Twitter button */}
              <button
                onClick={() => handleTwitterClick(hoveredMember)}
                className="w-6 h-6 text-gray-400 hover:text-blue-500 transition-colors z-10 flex items-center justify-center rounded-full hover:bg-gray-100"
                aria-label="Visit X.com profile"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
            </div>

            {/* Name */}
            <div className="font-bold text-xl mb-1 text-gray-900" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
              {teamMembers.find(m => m.id === hoveredMember)?.name}
            </div>
            
            {/* Role */}
            <div className="font-semibold text-[#C8102E] mb-4 text-sm uppercase tracking-wide" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
              {teamMembers.find(m => m.id === hoveredMember)?.role}
            </div>
            
            {/* Bio */}
            <div className="text-gray-700 leading-relaxed text-sm" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
              {teamMembers.find(m => m.id === hoveredMember)?.bio}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default TeamPhotos;