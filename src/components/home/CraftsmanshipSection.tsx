import React from 'react';

export const CraftsmanshipSection = () => {
  const steps = [
    { step: '01', title: 'Sourcing', desc: 'We source pure earth pigments and sustainable binders from the most ethically managed quarries worldwide.' },
    { step: '02', title: 'Milling', desc: 'Pigments are micro-milled to ensure unparalleled depth, dispersion, and an enduring fade-resistant lifecycle.' },
    { step: '03', title: 'Testing', desc: 'Subjected to rigorous accelerated weathering tests, our finishes outlast industry standards by a factor of three.' }
  ];

  return (
    <section className="py-16 md:py-32 max-w-[1440px] mx-auto px-6 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
        <div className="lg:col-span-5 sticky top-40 space-y-8">
          <h5 className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Process</h5>
          <h2 className="text-3xl md:text-5xl font-light text-zinc-950 tracking-tighter leading-tight">The pursuit of absolute perfection.</h2>
          <p className="text-lg text-zinc-500 font-light leading-relaxed">Every drop of our finish is the culmination of decades of material science and artisan collaboration.</p>
        </div>
        <div className="lg:col-span-7 space-y-24">
          {steps.map((item, i) => (
            <div key={i} className="flex gap-8 border-t border-zinc-200 pt-8">
              <span className="text-3xl font-light text-zinc-300">{item.step}</span>
              <div>
                <h3 className="text-3xl font-medium text-zinc-950 mb-4">{item.title}</h3>
                <p className="text-xl text-zinc-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
