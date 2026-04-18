import Link from 'next/link';

export function Footer() {
  return (
    <footer
      className="bg-stone-50 dark:bg-stone-950 border-t border-stone-200/10 dark:border-stone-800/20 w-full py-12 px-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        <div className="col-span-1 md:col-span-1">
          <div className="font-bold text-stone-900 dark:text-white text-xl mb-4">
            AlaCater Mitra
          </div>
          <p
            className="text-xs font-normal text-stone-500 dark:text-stone-400 leading-relaxed"
          >
            © {new Date().getFullYear()} AlaCater. All rights reserved. Professional B2B Catering
            Excellence.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-stone-900 dark:text-white text-sm mb-4">
            Platform
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                className="text-xs font-normal text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors underline underline-offset-4"
                href="/solutions"
              >Solutions</Link>
            </li>
            <li>
              <Link
                className="text-xs font-normal text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors underline underline-offset-4"
                href="/pricing"
              >Pricing</Link>
              
            </li>
            <li>
              <Link
                className="text-xs font-normal text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors underline underline-offset-4"
                href="/partner-success"
              >Partner Success</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-stone-900 dark:text-white text-sm mb-4">
            Support
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                className="text-xs font-normal text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors underline underline-offset-4"
                href="/privacy"
              >Privacy Policy</Link>
            </li>
            <li>
              <Link
                className="text-xs font-normal text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors underline underline-offset-4"
                href="/terms"
              >Terms of Service</Link>
              
            </li>
            <li>
              <Link
                className="text-xs font-normal text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors underline underline-offset-4"
                href="/help-center"
              >Help Center</Link>
              
            </li>
            <li>
              <Link
                className="text-xs font-normal text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors underline underline-offset-4"
                href="/contact-support"
              >Contact Support</Link>
              
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-stone-900 dark:text-white text-sm mb-4">
            Newsletter
          </h4>
          <p className="text-xs text-stone-500 mb-4">
            Industry insights for professional caterers.
          </p>
          <div className="flex gap-2">
            <input
              className="bg-white dark:bg-stone-900 border-none text-xs rounded-lg px-3 py-2 w-full focus:ring-1 focus:ring-primary outline-none"
              placeholder="Email"
              type="email"
            />
            <button className="bg-primary text-white p-2 rounded-lg">
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
