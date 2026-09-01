import React from 'react';

export const CTASection = () => {
  return (
    <section className="py-20 md:py-40 max-w-[1440px] mx-auto px-6 lg:px-16 text-center">
      <h2 className="text-4xl md:text-6xl md:text-8xl lg:text-[120px] font-light text-zinc-950 tracking-tighter leading-[0.9] mb-12">
        Begin your <br />
        <span className="italic text-zinc-400">transformation.</span>
      </h2>
      <div className="flex justify-center gap-6 mt-16">
        <button className="bg-zinc-950 text-white px-10 py-5 font-bold uppercase tracking-widest text-sm border border-zinc-950 hover:bg-white hover:text-zinc-950 transition-colors">
          Order a Sample Box
        </button>
        <button className="bg-white border border-zinc-950 text-zinc-950 px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-zinc-950 hover:text-white transition-colors">
          Contact a Consultant
        </button>
      </div>
    </section>
  );
};
