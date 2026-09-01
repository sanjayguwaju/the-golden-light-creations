import React from 'react';

export const ExperienceGridSection = () => {
  return (
    <section className="py-16 md:py-32 bg-zinc-50">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-7xl text-reliance-navy tracking-tight uppercase">Beyond the surface.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-reliance-navy/20 border border-reliance-navy/20 md:auto-rows-[400px]">
          <div className="md:col-span-2 bg-reliance-navy p-6 md:p-12 flex flex-col justify-end relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1000&q=80')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000"></div>
            <div className="relative z-10 border-l-2 border-reliance-gold pl-6">
              <h3 className="text-3xl md:text-4xl text-white mb-3 uppercase tracking-tight">Architectural Durability</h3>
              <p className="text-zinc-300 text-sm font-bold uppercase tracking-widest max-w-md">Engineered for high-traffic environments without compromising the luxury matte finish.</p>
            </div>
          </div>
          <div className="bg-white p-10 flex flex-col justify-end border-t-0">
            <h3 className="text-2xl text-reliance-navy mb-3 uppercase tracking-tight">Eco-Architecture</h3>
            <p className="text-reliance-grey text-xs font-bold uppercase tracking-widest">Zero-VOC formulations that contribute to LEED certification.</p>
          </div>
          <div className="bg-white p-10 flex flex-col justify-end">
            <h3 className="text-2xl text-reliance-navy mb-3 uppercase tracking-tight">Color Consultancy</h3>
            <p className="text-reliance-grey text-xs font-bold uppercase tracking-widest">Bespoke palette development with our in-house chromatic experts.</p>
          </div>
          <div className="md:col-span-2 bg-reliance-offwhite p-6 md:p-12 flex flex-col justify-end relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=1000&q=80')] bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-1000"></div>
            <div className="relative z-10 border-l-2 border-reliance-navy pl-6">
              <h3 className="text-3xl md:text-4xl text-reliance-navy mb-3 uppercase tracking-tight">Extreme Weather Protection</h3>
              <p className="text-reliance-grey text-sm font-bold uppercase tracking-widest max-w-md">Breathable elastomeric properties that expand and contract with facade structures.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
