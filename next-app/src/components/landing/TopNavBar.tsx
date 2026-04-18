import Link from 'next/link';

export function TopNavBar() {
  return (
    <header
      className="bg-white/80 dark:bg-stone-950/80 backdrop-blur-md shadow-sm dark:shadow-none docked full-width top-0 sticky z-50"
    >
      <nav
        className="flex justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto font-sans antialiased tracking-tight"
      >
        <div
          className="text-2xl font-black tracking-tighter text-orange-600 dark:text-orange-500"
        >
          AlaCater Mitra
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a
            className="text-orange-600 dark:text-orange-500 font-bold border-b-2 border-orange-600 transition-colors duration-200"
            href="#"
          >Solutions</a
          >
          <a
            className="text-stone-600 dark:text-stone-400 hover:text-orange-600 transition-colors duration-200"
            href="#"
          >Benefits</a
          >
          <a
            className="text-stone-600 dark:text-stone-400 hover:text-orange-600 transition-colors duration-200"
            href="#"
          >How it Works</a
          >
          <a
            className="text-stone-600 dark:text-stone-400 hover:text-orange-600 transition-colors duration-200"
            href="#"
          >Testimonials</a
          >
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="text-stone-600 font-semibold px-4 py-2 transition-transform scale-95 active:scale-90"
          >
            Partner Login
          </button>
          <button
            className="signature-gradient text-white font-bold px-6 py-2 rounded-md transition-transform scale-95 active:scale-90"
          >
            Register Now
          </button>
        </div>
      </nav>
    </header>
  );
}
