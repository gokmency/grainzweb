import { Marquee } from "@/components/ui/marquee"

// Brand logos - loaded from /public/brands/ directory
const BrandLogos = {
  sandbox: () => (
    <div className="h-6 md:h-8 flex items-center justify-center">
      <img 
        src="/brands/the-sandbox-game-logo.png" 
        alt="The Sandbox" 
        className="h-full w-auto object-contain"
        style={{ 
          maxHeight: '32px',
          maxWidth: '120px'
        }}
        onError={(e) => {
          console.error('Failed to load Sandbox logo:', e);
          e.currentTarget.outerHTML = '<span class="text-white text-sm font-medium">The Sandbox</span>';
        }}
      />
    </div>
  ),
  aavegotchi: () => (
    <div className="h-6 md:h-8 flex items-center justify-center">
      <img 
        src="/brands/aavegotchi-logo.png" 
        alt="Aavegotchi" 
        className="h-full w-auto object-contain"
        style={{ 
          maxHeight: '32px',
          maxWidth: '120px'
        }}
        onError={(e) => {
          console.error('Failed to load Aavegotchi logo:', e);
          e.currentTarget.outerHTML = '<span class="text-white text-sm font-medium">Aavegotchi</span>';
        }}
      />
    </div>
  ),
  immutable: () => (
    <div className="h-6 md:h-8 flex items-center justify-center">
      <img 
        src="/brands/immutable-logo.png" 
        alt="Immutable" 
        className="h-full w-auto object-contain"
        style={{ 
          maxHeight: '32px',
          maxWidth: '120px'
        }}
        onError={(e) => {
          console.error('Failed to load Immutable logo:', e);
          e.currentTarget.outerHTML = '<span class="text-white text-sm font-medium">Immutable</span>';
        }}
      />
    </div>
  ),
};

export function WorksWith() {
  const partners = [
    BrandLogos.sandbox, 
    BrandLogos.aavegotchi, 
    BrandLogos.immutable
  ];

  return (
    <div className="w-full">
      <h2 
        className="text-sm md:text-lg font-bold text-white mb-3 md:mb-4 text-center md:text-left"
        style={{ letterSpacing: '1px md:2px', fontFamily: "'Tomorrow', sans-serif" }}
      >
        WORKED WITH
      </h2>
      <Marquee speed={20} pauseOnHover className="sm:mt-0 mt-0">
        {partners.map((Partner, index) => (
          <div
            key={index}
            className="relative h-full w-fit mx-6 md:mx-12 flex items-center justify-center"
          >
            <Partner />
          </div>
        ))}
      </Marquee>
    </div>
  )
}
