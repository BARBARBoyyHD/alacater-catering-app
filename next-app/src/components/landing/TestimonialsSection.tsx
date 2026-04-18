
export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <h2
              className="text-4xl font-extrabold text-on-surface tracking-tight mb-2"
            >
              Partner Stories
            </h2>
            <p className="text-on-surface-variant">
              Real impact from the culinary frontlines.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className="p-3 rounded-full border border-outline-variant hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined">west</span>
            </button>
            <button
              className="p-3 rounded-full bg-primary text-white transition-colors"
            >
              <span className="material-symbols-outlined">east</span>
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          
          <div className="bg-surface-container-low p-10 rounded-3xl relative">
            <span
              className="material-symbols-outlined text-primary-container text-6xl opacity-20 absolute top-8 right-8"
            >format_quote</span
            >
            <div className="relative z-10">
              <p className="text-xl italic text-on-surface mb-8 leading-relaxed">
                "AlaCater Mitra transformed our idle kitchen hours into
                high-margin corporate revenue. The automated ordering system
                cut our admin time by 70%."
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full overflow-hidden bg-stone-200"
                >
                  <img
                    alt="Chef Sarah"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWNBnQp15CLGHNUNzb0LOD5joK8iWkPixx520Q9f9GDGUbt-wEs3IBoImbH4yOi7Jgw-rhG7TFulqfe-OcWE94zf3vdL_Z0mBEk01fegkiXQywG1ntkqE3nPInCA6yCa8tO0Df4oye3GIgd_IrpDmUAa1axKbmXjH8q8xAvvpkL8LmLu9NiWOjva6FWylvnQCmEKNDUWxPLWCfYrs-xQwu2H86Iok93bUwlODyVKdEqIW0iiJnwXb94DxRRncFRwkzUvxsSyKzG8me"
                  />
                </div>
                <div>
                  <p className="font-bold text-on-surface">
                    Chef Elena Rodriguez
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    Artisan Kitchens Group
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-highest p-10 rounded-3xl relative">
            <span
              className="material-symbols-outlined text-primary-container text-6xl opacity-20 absolute top-8 right-8"
            >format_quote</span
            >
            <div className="relative z-10">
              <p className="text-xl italic text-on-surface mb-8 leading-relaxed">
                "The transparency in payments is what sold us. No more chasing
                invoices. AlaCater handles the B2B complexity while we focus
                on the food."
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full overflow-hidden bg-stone-200"
                >
                  <img
                    alt="Marcus"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyoKMpBkGp6wwYZs96cLvGqiGv7gCyQNBb5rvThlJf6xv0-o9wGGocgPhB3d5MnBAEmZwuiXmpzPUxGa27KTSLpriSZCcT7jg2tktKitAWpvFRqUivpYACO0YiOTJnl5SOjmR1d-8jpFgUWXzTqM5y-jBu2o5d42SKB6eODv7waPB9Z317WW_ybFKdE2PEdcY3M2iJxrTkjTxrSE5cXoJXjrtbqsNWC2TtI-OPaE4Mn-lZEsMt6kJgOJOpNLarY_hfHVuoB6cvoGFI"
                  />
                </div>
                <div>
                  <p className="font-bold text-on-surface">Marcus Thorne</p>
                  <p className="text-sm text-on-surface-variant">
                    Founder, Epicurean Events
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
