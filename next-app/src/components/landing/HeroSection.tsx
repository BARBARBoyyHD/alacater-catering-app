import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa";
import { PiTrendUpBold } from "react-icons/pi";

export function HeroSection() {
  return (
    <section className="relative min-h-[870px] flex items-center overflow-hidden bg-surface-container-low px-6">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold tracking-widest uppercase">
            The Culinary Architect
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface leading-[1.05] tracking-tight mb-6">
            Scale Your
            <span className="text-primary-container">Catering Empire</span> with
            Precision.
          </h1>
          <p className="text-lg text-on-surface-variant mb-10 max-w-lg leading-relaxed">
            Join the elite B2B network where culinary excellence meets automated
            logistics. Empower your kitchen with the tools designed for master
            chefs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/provider-signup"
              className="signature-gradient text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 group transition-all shadow-lg"
            >
              Join as Partner
              <FaLocationArrow />
            </Link>
            <Link
              href="/solutions"
              className="bg-surface-container-lowest text-on-surface px-8 py-4 rounded-xl font-bold text-lg border border-outline-variant/20 hover:bg-white transition-all"
            >
              View Solutions
            </Link>
          </div>
        </div>
        <div className="relative hidden md:block">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl"></div>
          <div className="rounded-3xl overflow-hidden shadow-2xl rotate-2 relative z-10 border-[12px] border-white">
            <img
              alt="Chef at Work"
              className="w-full h-[600px] object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNCtdaw5SvJdd_3CNGbFJcBEAYjSxQzV3XT1oCo0LIGz4Yw3prn0S02_P74seS6I8bztYwwdCA2Dlh4pny7X2ubvrZuyEdqm-MbZ2U3fqJe5i1z2FjUCakH8ragVDHrVS-g8Pk-DaRZIxlkUrryWkQxGlRjbCPp38QlCC7k1kjuIM7dJPGPDK4SAirZoe1RRmlbJqTZ_KfigOd0ngbPA2sM6pEoxuFpEHxxNiQvGTP17EngRaOEHV5SUqQqWAfOKi02QCNpRHSsDmg"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 glass-card p-6 rounded-2xl shadow-xl z-20 max-w-xs">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-2 bg-tertiary/10 rounded-lg">
                <PiTrendUpBold />
              </div>
              <span className="font-bold text-on-surface">
                Live Performance
              </span>
            </div>
            <p className="text-2xl font-black text-primary tracking-tighter">
              +42% Reach
            </p>
            <p className="text-xs text-on-surface-variant">
              Average growth for new partners in first 90 days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
