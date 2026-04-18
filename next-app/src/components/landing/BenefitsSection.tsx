interface Benefits {
  title?: string;
  description?: string;
  image?: string;
}

function LargeBenefitCard({ title, description, image }: Benefits) {
  return (
    <div className="md:col-span-2 bg-surface-container-low rounded-3xl p-10 flex flex-col justify-between relative overflow-hidden group">
      <div className="z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">
          {title}
        </h3>

        <p className="text-on-surface-variant max-w-md">{description}</p>
      </div>

      {image && (
        <img
          alt={title}
          src={image}
          className="absolute right-[-5%] bottom-[-5%] w-1/2 opacity-10 group-hover:scale-110 transition-transform duration-700"
        />
      )}
    </div>
  );
}

function CenterBenefitCard({ title, description }: Benefits) {
  return (
    <div className="bg-surface-container-highest rounded-3xl p-8 text-center flex flex-col justify-center">
      <h3 className="text-xl font-bold text-on-surface mb-2">{title}</h3>
      <p className="text-on-surface-variant text-sm">{description}</p>
    </div>
  );
}

function HorizontalBenefitCard({ title, description }: Benefits) {
  return (
    <div className="bg-secondary-container rounded-3xl p-6 flex gap-4 items-start">
      <div>
        <h3 className="text-lg font-bold text-on-secondary-container">
          {title}
        </h3>
        <p className="text-on-secondary-container/80 text-sm">{description}</p>
      </div>
    </div>
  );
}

function AnalyticsCard({ title, description }: Benefits) {
  return (
    <div className="md:col-span-2 bg-white rounded-3xl p-8 flex items-center justify-between border border-outline-variant/10 shadow-sm">
      <div className="max-w-xs">
        <h3 className="text-xl font-bold text-on-surface mb-2">{title}</h3>
        <p className="text-on-surface-variant text-sm">{description}</p>
      </div>

      <div className="flex items-end gap-2">
        <div className="h-16 w-2 bg-primary/20 rounded-full"></div>
        <div className="h-24 w-2 bg-primary/40 rounded-full"></div>
        <div className="h-32 w-2 bg-primary rounded-full"></div>
        <div className="h-20 w-2 bg-primary/60 rounded-full"></div>
      </div>
    </div>
  );
}

export function BenefitsSection() {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4">
            Precision Benefits
          </h2>
          <p className="text-on-surface-variant">
            We don't just find you customers; we architect your operational
            success.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LargeBenefitCard
            title="Exponential Reach"
            description="Connect with top-tier corporate clients and large-scale event planners actively looking for professional catering excellence."
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuA1amHP7jucAW3D9UakrspY3BwySSmklc2mJPtR1dVr_WMZA8VTfREck96Bfc_8f85iK_S52aszx1c78pMcb_4dnXXQksrUVmpkq3olwkfFlmmZJZkYXNFUaSsyrZ9znkXGuAxE6vhmDrSnWQoZvQnYfRr0Ib24vHJ8ncng1NMqohgF582Th2mqUCP19u_B3Io5sTwvwElCYQnljKuZlv2sSWhy_EwN2_40FnNxI26jiRmFJk3NHUPDWgarUIlxc6gflNncRIPjwver"
          />

          <CenterBenefitCard
            title="Smart Automation"
            description="Eliminate manual data entry. Orders flow directly into your kitchen workflow with precise specs."
          />

          <HorizontalBenefitCard
            title="Seamless Payments"
            description="Automated invoicing and instant digital settlements for every order."
          />

          <AnalyticsCard
            title="Deep Analytics"
            description="Track margins, popular menu items, and client feedback in real-time."
          />
        </div>
      </div>
    </section>
  );
}
