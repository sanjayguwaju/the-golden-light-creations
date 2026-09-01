import React from 'react';

export const TrustIndicatorsSection = () => {
  const stats = [
    { label: 'Years of Craft', value: '25+' },
    { label: 'Bespoke Pigments', value: '10k' },
    { label: 'Global Studios', value: '42' },
    { label: 'Design Awards', value: '18' },
  ];
  
  return (
    <section className="py-12 md:py-24 border-y border-zinc-200">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 lg:gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="text-3xl md:text-5xl lg:text-6xl font-light text-zinc-950 tracking-tighter">{stat.value}</div>
            <div className="text-xs font-semibold tracking-widest uppercase text-zinc-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
