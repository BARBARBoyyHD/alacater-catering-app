import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="py-24 px-6">
      <div
        className="max-w-5xl mx-auto signature-gradient rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"
        ></div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Become a Culinary Architect Today.
          </h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
            Applications are currently open for professional catering partners
            in major metropolitan areas. Secure your spot in the future of B2B
            dining.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/provider-signup"
              className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-surface-container-low transition-colors"
            >
              Start Your Application
            </Link>
            <Link
              href="/contact-sales"
              className="bg-primary/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-xl font-bold text-lg"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
