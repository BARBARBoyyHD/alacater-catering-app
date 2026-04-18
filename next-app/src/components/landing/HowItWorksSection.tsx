import Link from "next/link";
export function HowItWorksSection() {
  return (
    <section className="py-24 px-6 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2
            className="text-4xl md:text-5xl font-black text-on-surface tracking-tighter mb-4"
          >
            The Onboarding Blueprint
          </h2>
          <p className="text-on-surface-variant">
            Three steps from kitchen setup to high-volume revenue.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="relative">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-on-surface mb-4">
                Digital Profile Setup
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                Showcase your culinary range, certifications, and capacity.
                Our team helps you curate a menu optimized for B2B
                procurement.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-on-surface mb-4">
                Smart Order Matching
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                Our algorithm matches your specialty with corporate requests.
                Accept orders with a single tap through the Mitra Portal.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-on-surface mb-4">
                Deliver &amp; Get Paid
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                Execute the order. Once delivery is confirmed via the app,
                your payment is processed automatically within our secure
                network.
              </p>
            </div>
          </div>
        </div>
        <div
          className="mt-20 rounded-3xl overflow-hidden bg-on-surface h-96 relative group"
        >
          <img
            alt="Logistics"
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjW394e65jicvPCJuuRHoxvKMpBFUpDUyF7Fn0MEMj_risLFlIDrIQMgLbZxs_ZJXM2JikSbIolNllWNFlVYu2l2inOSkeAWnRkfiORTSAG6W712L3DrSmaLIO33T7YorDMjmjh-1msKeE4NYv4BLV7BusUvyVFjzgCVmdTfqh0dhlsxIta6Hv6QDGJnMZrQQGgj9u_woNeYWkofVaL3t-dCWrdZoz0pwqGnpCQJlEjLzozIisJgyhN-OBIntpT8GKsYAbgC-A1fBC"
          />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <h4 className="text-3xl font-bold text-white mb-4">
              Ready to Architect Your Future?
            </h4>
            <Link
              href="/provider-signup"
              className="signature-gradient text-white px-10 py-4 rounded-xl font-bold text-lg"
            >
              Apply to Join Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
