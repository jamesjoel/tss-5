const navItems = ['Home', 'Programs', 'Admissions', 'Placements', 'Contact']

const Header = () => {
  return (
    <header className="sticky top-0 z-20 px-6 pt-5 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/75 px-6 py-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-lg font-black text-white">
            M
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wide text-slate-950">MediCaps</h1>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Future-ready campus</p>
          </div>
        </div>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href="/"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-950 hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

        <button className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
          Enquire now
        </button>
      </div>
    </header>
  )
}

export default Header
