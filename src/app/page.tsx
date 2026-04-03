import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full py-5 z-50 bg-[rgba(5,10,24,0.85)] backdrop-blur-[10px] border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <img src="/images/logo.png" alt="GC Proactive Logo" className="h-10" />
            <span className="text-2xl font-extrabold text-white">
              GC <span className="bg-gradient-to-r from-[#007bff] to-[#00c6ff] bg-clip-text text-transparent">PROACTIVE</span>
            </span>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="#about" className="text-[#a0aec0] hover:text-white transition-colors font-medium hidden md:inline">What We Do</Link>
            <Link href="#solutions" className="text-[#a0aec0] hover:text-white transition-colors font-medium hidden md:inline">Solutions</Link>
            <Link href="#pricing" className="text-[#a0aec0] hover:text-white transition-colors font-medium hidden md:inline">Pricing</Link>
            <Link href="#faq" className="text-[#a0aec0] hover:text-white transition-colors font-medium hidden md:inline">FAQ</Link>
            <Link href="/auth/login" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#007bff] to-[#00c6ff] text-white font-semibold text-sm shadow-[0_4px_15px_rgba(0,123,255,0.4)] hover:shadow-[0_8px_25px_rgba(0,123,255,0.4)] hover:-translate-y-0.5 transition-all">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center text-center pt-20">
        <div className="max-w-[900px] px-5 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Turn <span className="bg-gradient-to-r from-[#007bff] to-[#7cfc00] bg-clip-text text-transparent">Manual Work</span> Into <br /> Scalable Systems
          </h1>
          <p className="text-lg md:text-xl text-[#a0aec0] mb-10 max-w-[700px] mx-auto">
            We help small and medium businesses save time, reduce overhead, and scale faster through smart automation and business systems consultancy.
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <a href="https://calendar.app.google/sQyKjCzWBfgym1AF6" target="_blank" className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#007bff] to-[#00c6ff] text-white font-semibold shadow-[0_4px_15px_rgba(0,123,255,0.4)] hover:shadow-[0_8px_25px_rgba(0,123,255,0.4)] hover:-translate-y-0.5 transition-all no-underline">
              Book a Consultation
            </a>
            <Link href="#about" className="px-7 py-3.5 rounded-full border border-white/10 bg-white/[0.03] text-white font-semibold backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition-all no-underline">
              Explore Services
            </Link>
          </div>
          <p className="mt-8 text-sm opacity-60">Trusted by growing agencies, consultants, and service providers.</p>
        </div>
      </section>

      {/* What We Do */}
      <section id="about" className="py-24 px-5 scroll-mt-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Intelligent <span className="bg-gradient-to-r from-[#007bff] to-[#00c6ff] bg-clip-text text-transparent">Automation</span> Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {[
              { title: "Workflow Automation", desc: "Stop doing the same tasks twice. We map and automate your repetitive daily workflows so you can focus on high-value work.", icon: "⚙️" },
              { title: "Lead & CRM Mastery", desc: "Never miss a lead again. We automate lead capture, nurturing, and CRM pipeline management for maximum conversion.", icon: "👥" },
              { title: "Onboarding Systems", desc: "Impress your clients from day one. Automated onboarding ensures consistent experiences and reduces manual admin stress.", icon: "🚀" },
              { title: "Tech Stack Integration", desc: "Connect your favorite tools. We bridge the gap between Slack, CRM, Email, and Project Management for a unified operation.", icon: "🔗" },
            ].map((s, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/10 backdrop-blur-xl p-7 rounded-2xl hover:border-[#00c6ff]/30 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all">
                <div className="w-12 h-12 bg-gradient-to-r from-[#007bff] to-[#00c6ff] rounded-xl flex items-center justify-center mb-5 text-xl">{s.icon}</div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-[#a0aec0] text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Automation */}
      <section className="py-24 px-5 bg-[#020611] scroll-mt-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-left mb-6">
              Stop Fighting <br /><span className="bg-gradient-to-r from-[#7cfc00] to-[#00ff7f] bg-clip-text text-transparent">Inefficiency</span>
            </h2>
            <p className="text-[#a0aec0] mb-8">
              Repetitive admin, slow follow-ups, and disconnected tools are the &quot;silent killers&quot; of growing businesses. If your team is spending 50% of their time on data entry, you aren&apos;t scaling—you&apos;re just getting busier.
            </p>
            <ul className="space-y-4">
              {[
                { bold: "Instant Responses:", text: "Improve speed-to-lead by 400%." },
                { bold: "Zero Manual Errors:", text: "Clean data across all systems." },
                { bold: "Focus on ROI:", text: "Spend time on strategy, not spreadsheets." },
                { bold: "Scalability:", text: "Grow your volume without growing your head-count." },
              ].map((b, i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="w-2.5 h-2.5 bg-gradient-to-r from-[#7cfc00] to-[#00ff7f] rounded-full shadow-[0_0_10px_rgba(124,252,0,0.3)]" />
                  <span><strong>{b.bold}</strong> {b.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-96 flex items-center justify-center">
            <div className="absolute w-[350px] h-[350px] border border-dashed border-[rgba(0,198,255,0.2)] rounded-full animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute w-[250px] h-[250px] border border-[rgba(124,252,0,0.2)] rounded-full animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
            <img src="/images/logo.png" alt="Logo" className="w-20 relative z-10" />
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="py-24 px-5 scroll-mt-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Proactive <span className="bg-gradient-to-r from-[#007bff] to-[#7cfc00] bg-clip-text text-transparent">Solutions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: '"The Speed-to-Lead System"', desc: "Auto-respond to new inquiries with AI-personalized emails and text messages the second they hit your website." },
              { title: '"The Seamless Sync"', desc: "Automatically push every form submission, payment, and booking into your CRM and Slack channels instantly." },
              { title: '"The Auto-Onboarder"', desc: "Triggers contracts, invoices, and introductory tasks the moment a deal is won. No manual clicks required." },
              { title: '"Financial Flow"', desc: "Connect your payment processor to your accounting software and task manager for real-time revenue tracking." },
            ].map((s, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/10 border-l-4 border-l-[#007bff] backdrop-blur-xl p-7 rounded-2xl hover:border-[#00c6ff]/30 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all">
                <h4 className="text-lg font-semibold mb-3">{s.title}</h4>
                <p className="text-[#a0aec0] text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-24 px-5 bg-[#020611] text-center scroll-mt-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Built for <span className="bg-gradient-to-r from-[#007bff] to-[#00c6ff] bg-clip-text text-transparent">Growing</span> SMBs
          </h2>
          <p className="text-[#a0aec0] max-w-[800px] mx-auto mb-12">
            We partner with service businesses, agencies, and consultants who have reached their limit with manual work and are ready to professionalize their backend.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Digital Agencies", "Consultancies", "E-commerce Operators", "Local Service Providers", "Real Estate Teams"].map((t) => (
              <span key={t} className="bg-white/5 px-5 py-2 rounded-full border border-white/10 text-sm font-medium">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-5 text-center scroll-mt-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Our <span className="bg-gradient-to-r from-[#7cfc00] to-[#00ff7f] bg-clip-text text-transparent">3-Step</span> Build Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { num: "01", title: "Discover", desc: "We audit your current tech stack and identify every manual bottleneck in your operation." },
              { num: "02", title: "Design & Build", desc: 'We architect a custom "Automation Map" and build the systems using industry-leading tools.' },
              { num: "03", title: "Optimize", desc: "We train your team, monitor the flows, and refine for maximum performance and ROI." },
            ].map((s) => (
              <div key={s.num}>
                <div className="text-7xl font-black opacity-10 leading-none -mb-6">{s.num}</div>
                <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                <p className="text-[#a0aec0]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-5 scroll-mt-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Simple, <span className="bg-gradient-to-r from-[#007bff] to-[#00c6ff] bg-clip-text text-transparent">Scalable</span> Pricing
          </h2>
          <p className="text-center text-[#a0aec0] max-w-[800px] mx-auto mb-4">Managed automation infrastructure and expert support tailored to your business stage.</p>
          <p className="text-center text-sm text-[#7cfc00] opacity-70 mb-12">* All plans apply after the initial 1-month warranty period.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {[
              {
                badge: "Entry", badgeClass: "bg-[rgba(0,198,255,0.2)] text-[#00c6ff] border border-[#00c6ff]",
                name: "Hosted Essentials", price: "$299", tags: ["1 support hour", "Basic logging", "Managed credits"],
                features: ["Private managed n8n instance", "SSL setup and custom subdomain", "Automated backups", "n8n updates", "Basic monitoring and troubleshooting", "Small workflow fixes", "Basic backend request logging", "Usage tracking", "Basic IP trace"],
                billing: ["Default model: prepaid managed credits", "Optional small monthly AI/usage allowance", "Usage remains under your managed billing layer"],
                cta: "Get Started", ctaClass: "border border-white/10 bg-white/[0.03] hover:bg-white/10"
              },
              {
                badge: "Core", badgeClass: "bg-[rgba(124,252,0,0.2)] text-[#7cfc00] border border-[#7cfc00]",
                name: "Hosted Growth", price: "$699", tags: ["3 support hours", "Per-client tracking", "Credits or monthly billing"],
                features: ["Everything in Essentials", "Priority monitoring and faster troubleshooting", "Workflow optimization", "Small workflow enhancements", "Backend API-based request tracking", "Employee usage logging", "Per-client and per-workflow logging", "Usage and cost monitoring", "IP trace logging"],
                billing: ["Prepaid managed credits or monthly billed usage", "Can include monthly allowance plus overage", "Usage billed separately from the retainer"],
                cta: "Choose Growth", ctaClass: "bg-gradient-to-r from-[#007bff] to-[#00c6ff] shadow-[0_4px_15px_rgba(0,123,255,0.4)]"
              },
              {
                badge: "Premium", badgeClass: "bg-gradient-to-r from-[#007bff] to-[#7cfc00] text-white",
                name: "Hosted Scale", price: "$999", tags: ["5–8 support hours", "Detailed audit controls", "Monthly usage billing"],
                features: ["Dedicated managed automation environment", "Advanced troubleshooting", "Optimization and reliability tuning", "Migration assistance and infra planning", "Full backend API gateway approach", "Detailed request logging", "User/client/workflow tagging", "Usage cost monitoring", "IP trace and investigation support"],
                billing: ["Monthly billed managed usage as default", "Optional dedicated prepaid balance", "Custom usage reporting and dashboarding"],
                cta: "Scale Now", ctaClass: "border border-white/10 bg-white/[0.03] hover:bg-white/10"
              }
            ].map((plan) => (
              <div key={plan.name} className="bg-white/[0.03] border border-white/10 backdrop-blur-xl p-10 rounded-2xl hover:border-[#00c6ff]/30 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all relative flex flex-col">
                <span className={`absolute top-5 right-5 px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${plan.badgeClass}`}>{plan.badge}</span>
                <p className="text-2xl font-bold mb-1">{plan.name}</p>
                <div className="text-3xl font-extrabold mb-4">{plan.price} <span className="text-base font-normal text-[#a0aec0]">/ month</span></div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {plan.tags.map((t) => <span key={t} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-[#a0aec0]">{t}</span>)}
                </div>
                <h4 className="font-semibold mb-3">Included:</h4>
                <ul className="space-y-2 mb-6 flex-grow">
                  {plan.features.map((f) => <li key={f} className="text-sm text-[#a0aec0] pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#7cfc00] before:font-bold">{f}</li>)}
                </ul>
                <div className="border-t border-white/10 pt-4 mt-auto">
                  <h5 className="font-semibold mb-3">Managed usage billing:</h5>
                  <ul className="space-y-2 mb-6">
                    {plan.billing.map((b) => <li key={b} className="text-sm text-[#a0aec0] pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#7cfc00] before:font-bold">{b}</li>)}
                  </ul>
                </div>
                <a href="https://calendar.app.google/sQyKjCzWBfgym1AF6" target="_blank" className={`w-full text-center px-7 py-3.5 rounded-full text-white font-semibold transition-all no-underline ${plan.ctaClass}`}>{plan.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-5 scroll-mt-20">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Common <span className="bg-gradient-to-r from-[#007bff] to-[#00c6ff] bg-clip-text text-transparent">Questions</span>
          </h2>
          <div className="space-y-4">
            {[
              { q: "What kinds of businesses do you work with?", a: "We primarily work with small-to-medium service businesses, agencies, and operations-heavy startups that handle high volumes of leads or client data." },
              { q: "What exactly can be automated?", a: "Almost anything digital: lead intake, CRM updates, client onboarding, invoicing, internal notifications, reporting, and inter-app data syncing." },
              { q: "Do I need special software?", a: "We leverage industry standards like Zapier, Make, and GoHighLevel. We help you choose the most cost-effective stack for your specific needs." },
              { q: "Can you work with our existing tools?", a: 'Yes, we specialize in "connecting the dots" between the software you already use and love.' },
              { q: "How long does automation setup take?", a: "Typical implementations take between 2 to 4 weeks depending on the complexity of the systems." },
              { q: "Is this only for large companies?", a: "Absolutely not. In fact, SMBs benefit most as automation allows them to compete with larger teams without the massive headcount." },
              { q: "Will automation replace human interaction?", a: 'No. It handles the "robot work" (data entry, reminders) so your humans can focus on "human work" (relationships, strategy).' },
            ].map((faq, i) => (
              <details key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden group">
                <summary className="px-6 py-5 font-semibold cursor-pointer flex justify-between items-center list-none">
                  {faq.q}
                  <span className="text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="px-6 pb-5 text-[#a0aec0]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-5 scroll-mt-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-left mb-6">
              Ready to <span className="bg-gradient-to-r from-[#007bff] to-[#7cfc00] bg-clip-text text-transparent">Scale?</span>
            </h2>
            <p className="text-[#a0aec0] mb-8">Let&apos;s build the systems your business deserves. Reach out to schedule your free audit.</p>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-7">
              <p className="mb-2">Email us at:</p>
              <a href="mailto:Support@gcproactive.com" className="text-[#7cfc00] font-bold text-xl no-underline">Support@gcproactive.com</a>
            </div>
          </div>
          <form action="https://api.web3forms.com/submit" method="POST" className="bg-white/[0.03] border border-white/10 rounded-2xl p-7 space-y-5">
            <input type="hidden" name="access_key" value="c3d4d3fb-ae67-4e0a-85ab-89cb2419c9b3" />
            <div>
              <label className="block mb-2 text-sm text-[#a0aec0]">Name</label>
              <input type="text" name="name" placeholder="Your name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#007bff] transition" />
            </div>
            <div>
              <label className="block mb-2 text-sm text-[#a0aec0]">Business Email</label>
              <input type="email" name="email" placeholder="email@company.com" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#007bff] transition" />
            </div>
            <div>
              <label className="block mb-2 text-sm text-[#a0aec0]">Company Name</label>
              <input type="text" name="company" placeholder="Your business" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#007bff] transition" />
            </div>
            <div>
              <label className="block mb-2 text-sm text-[#a0aec0]">How can we help?</label>
              <textarea name="message" placeholder="Tell us about your manual bottlenecks..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#007bff] transition h-28 resize-none" />
            </div>
            <button type="submit" className="w-full px-7 py-3.5 rounded-full bg-gradient-to-r from-[#007bff] to-[#00c6ff] text-white font-semibold shadow-[0_4px_15px_rgba(0,123,255,0.4)] hover:shadow-[0_8px_25px_rgba(0,123,255,0.4)] hover:-translate-y-0.5 transition-all cursor-pointer">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/10 bg-[#020611]">
        <div className="max-w-[1200px] mx-auto px-5 flex flex-col items-center text-center gap-10">
          <div className="flex items-center gap-2.5">
            <img src="/images/logo.png" alt="Logo" className="h-10" />
            <span className="text-2xl font-extrabold text-white">GC <span className="bg-gradient-to-r from-[#007bff] to-[#00c6ff] bg-clip-text text-transparent">PROACTIVE</span></span>
          </div>
          <p className="text-[#a0aec0] max-w-[300px]">Scaling small businesses through intelligent systems.</p>
          <div className="flex gap-8">
            <Link href="#about" className="text-[#a0aec0] hover:text-white transition-colors no-underline">Services</Link>
            <Link href="#solutions" className="text-[#a0aec0] hover:text-white transition-colors no-underline">Solutions</Link>
            <Link href="#pricing" className="text-[#a0aec0] hover:text-white transition-colors no-underline">Pricing</Link>
            <Link href="#faq" className="text-[#a0aec0] hover:text-white transition-colors no-underline">FAQ</Link>
          </div>
          <div className="text-[#718096] text-sm">
            &copy; 2023 GC PROACTIVE. All rights reserved. <br />
            <a href="mailto:Support@gcproactive.com" className="text-[#718096] hover:text-white no-underline">Support@gcproactive.com</a>
          </div>
        </div>
      </footer>
    </>
  );
}
