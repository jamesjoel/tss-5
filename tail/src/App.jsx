import Header from './component/Header'

const highlights = [
  {
    title: 'Career-Focused Programs',
    text: 'Industry-aligned degrees in engineering, design, management, and emerging technologies.',
  },
  {
    title: 'Modern Learning Spaces',
    text: 'Smart classrooms, maker labs, and collaborative studios built for hands-on practice.',
  },
  {
    title: 'Placement Momentum',
    text: 'Mentorship, interview preparation, and recruiter connections that help students launch well.',
  },
]

const programs = [
  {
    name: 'B.Tech & Innovation',
    detail: 'AI, data, cloud, and software tracks with live projects and startup exposure.',
  },
  {
    name: 'Management Studies',
    detail: 'Business programs focused on leadership, strategy, analytics, and entrepreneurship.',
  },
  {
    name: 'Design & Media',
    detail: 'Creative labs for branding, UX, animation, digital storytelling, and visual production.',
  },
]

const steps = [
  'Submit your online application with academic details.',
  'Connect with our advisors to choose the right program.',
  'Complete document verification and scholarship screening.',
  'Confirm admission and begin your campus journey.',
]

const metrics = [
  { value: '12K+', label: 'Active students' },
  { value: '95%', label: 'Placement support reach' },
  { value: '40+', label: 'Innovation labs' },
  { value: '150+', label: 'Recruiting partners' },
]

function App() {
  return (
    <div className="min-h-screen bg-[var(--surface)] text-slate-900">
      <div className="absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_top_left,_rgba(22,163,74,0.18),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(14,116,144,0.22),_transparent_30%),linear-gradient(180deg,_#f8fff8_0%,_#eef7ff_48%,_#f7f4ed_100%)]" />
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-6 pb-16 pt-8 lg:px-10">
        <section className="grid items-center gap-12 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:pt-16">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-sm font-medium text-emerald-900 backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Admissions open for 2026 intake
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">
                Build, lead, and create with confidence
              </p>
              <h1 className="max-w-3xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
                A bold campus experience designed for ambitious students.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Discover a modern university environment where strong academics, practical exposure,
                and career preparation move together from day one.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="rounded-full bg-slate-950 px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700">
                Apply now
              </button>
              <button className="rounded-full border border-slate-300 bg-white/80 px-7 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-cyan-700 hover:text-cyan-800">
                Explore programs
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-white/70 bg-white/75 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur"
                >
                  <h2 className="mb-2 text-base font-bold text-slate-900">{item.title}</h2>
                  <p className="text-sm leading-6 text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 h-32 w-32 rounded-full bg-emerald-300/40 blur-3xl" />
            <div className="absolute bottom-10 right-0 h-40 w-40 rounded-full bg-cyan-300/40 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-slate-950 p-7 text-white shadow-[0_28px_90px_rgba(15,23,42,0.24)]">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">Student Journey</p>
                  <h2 className="mt-2 text-2xl font-bold">Campus at a glance</h2>
                </div>
                <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-100">
                  Ranked for growth
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl bg-white/8 p-5">
                    <p className="text-3xl font-black text-white">{metric.value}</p>
                    <p className="mt-2 text-sm text-slate-300">{metric.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl bg-[linear-gradient(135deg,_rgba(16,185,129,0.25),_rgba(14,165,233,0.22))] p-6">
                <p className="text-sm font-medium text-emerald-100">Why students stay ahead</p>
                <p className="mt-3 text-base leading-7 text-slate-100">
                  Personal mentoring, practical labs, collaborative clubs, and placement guidance
                  combine to create a campus rhythm that feels energetic and future-ready.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 rounded-[2rem] border border-slate-200/80 bg-white/80 p-8 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur lg:grid-cols-3">
          {programs.map((program) => (
            <article key={program.name} className="rounded-[1.75rem] bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white">
              <p className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
                Featured
              </p>
              <h3 className="text-2xl font-bold text-slate-950">{program.name}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{program.detail}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">Admissions</p>
            <h2 className="text-4xl font-black tracking-tight text-slate-950">
              A simple process with support at every step.
            </h2>
            <p className="max-w-xl text-base leading-8 text-slate-600">
              From the first form to your first day on campus, the experience should feel clear,
              welcoming, and organized. This section gives the UI a practical structure and a strong
              call to action.
            </p>
          </div>

          <div className="grid gap-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
                  0{index + 1}
                </div>
                <p className="pt-1 text-sm leading-7 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-slate-950 px-8 py-10 text-white shadow-[0_24px_80px_rgba(15,23,42,0.2)]">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Ready to start?</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight">
                Create a first impression that feels premium and student-friendly.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                This UI is structured like a landing page, so it is easy to keep extending with real
                sections such as faculty profiles, events, gallery cards, or a contact form.
              </p>
            </div>
            <div className="rounded-[1.75rem] bg-white/8 p-6">
              <p className="text-sm text-slate-300">Quick contact</p>
              <div className="mt-5 space-y-3 text-sm text-slate-100">
                <p>hello@medicaps.example</p>
                <p>+91 90000 00000</p>
                <p>Rau, Indore, Madhya Pradesh</p>
              </div>
              <button className="mt-6 w-full rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
                Book a campus visit
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
