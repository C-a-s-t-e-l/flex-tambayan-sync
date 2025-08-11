import { useEffect, useState } from "react";

const tabs = ["dashboard", "workouts", "community", "profile"] as const;

type Tab = typeof tabs[number];

const TabButton = ({ id, active, onClick, label }: { id: Tab; active: boolean; onClick: (t: Tab) => void; label: string }) => (
  <button
    role="tab"
    aria-selected={active}
    onClick={() => onClick(id)}
    className={`flex flex-col items-center justify-center gap-1 py-3 transition-colors ${
      active ? "text-primary" : "text-muted-foreground hover:text-foreground"
    }`}
  >
    <span className="text-sm font-medium capitalize">{label}</span>
  </button>
);

const SectionCard = ({ title, children, right }: { title: string; children: React.ReactNode; right?: React.ReactNode }) => (
  <section className="rounded-lg border bg-card card-elev">
    <div className="flex items-center justify-between border-b p-4">
      <h3 className="text-base font-semibold">{title}</h3>
      {right}
    </div>
    <div className="p-4">{children}</div>
  </section>
);

const Index = () => {
  const [active, setActive] = useState<Tab>("dashboard");

  useEffect(() => {
    const t = active.charAt(0).toUpperCase() + active.slice(1);
    document.title = `Lift! • ${t}`;
  }, [active]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-background/75 border-b">
        <div className="container flex h-16 items-center justify-between">
          <a href="#" className="inline-flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-accent glow-ring" aria-hidden />
            <span className="text-xl font-extrabold tracking-wide">Lift!</span>
          </a>
          <nav aria-label="Top" className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`capitalize ${active === t ? "text-primary" : "hover:text-foreground"}`}
              >
                {t}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container flex-1 py-6 hero-sport-sheen">
        {/* Dashboard */}
        {active === "dashboard" && (
          <article role="tabpanel" aria-labelledby="tab-dashboard" className="space-y-6">
            <header>
              <h1 id="tab-dashboard" className="text-3xl md:text-4xl font-extrabold">Your Day at a Glance</h1>
              <p className="text-muted-foreground mt-1">Macros, streaks, and progress—keep the momentum.</p>
            </header>

            <div className="grid gap-4 md:grid-cols-2">
              <SectionCard title="Daily Macros">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: "Calories", val: "1,650 / 2,200", cls: "progress-75" },
                    { label: "Protein", val: "105g / 140g", cls: "progress-75" },
                    { label: "Carbs", val: "180g / 240g", cls: "progress-50" },
                    { label: "Fat", val: "40g / 60g", cls: "progress-50" },
                  ].map((m) => (
                    <div key={m.label} className="flex flex-col items-center">
                      <div className={`progress-ring ${m.cls} glow-ring h-28 w-28 p-[6px]`}>
                        <div className="h-full w-full rounded-full bg-card grid place-items-center border">
                          <span className="text-xs text-muted-foreground">{m.val}</span>
                        </div>
                      </div>
                      <span className="mt-3 text-sm font-medium">{m.label}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Streak & Calendar">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">8-day streak—keep it up!</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-6 rounded-md border ${i % 3 === 0 ? "bg-primary/20" : "bg-muted"}`}
                      />
                    ))}
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Weight Progress">
                <div className="aspect-[3/1] rounded-md bg-muted grid place-items-center">
                  <svg viewBox="0 0 300 100" className="w-[92%] h-[70%]">
                    <polyline
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      points="0,80 40,75 80,70 120,68 160,65 200,58 240,55 280,50"
                    />
                  </svg>
                  <span className="text-xs text-muted-foreground">Static preview</span>
                </div>
              </SectionCard>

              <SectionCard title="Quick Actions">
                <div className="flex flex-wrap gap-3">
                  {[
                    "Log Food",
                    "Start Workout",
                    "Water +250ml",
                    "Check Programs",
                  ].map((a) => (
                    <button
                      key={a}
                      className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </SectionCard>
            </div>
          </article>
        )}

        {/* Workouts */}
        {active === "workouts" && (
          <article role="tabpanel" aria-labelledby="tab-workouts" className="space-y-6">
            <header>
              <h1 id="tab-workouts" className="text-3xl md:text-4xl font-extrabold">Workouts</h1>
              <p className="text-muted-foreground mt-1">Explore muscles, pick exercises, and plan your session.</p>
            </header>

            <SectionCard title="Filters">
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Gym" },
                  { label: "Home (Dumbbell)" },
                  { label: "Calisthenics" },
                ].map((f, i) => (
                  <button
                    key={f.label}
                    className={`rounded-full border px-4 py-1.5 text-sm ${i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent hover:text-accent-foreground"}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Muscle Explorer (static)">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border bg-muted aspect-square grid place-items-center">
                  <span className="text-sm text-muted-foreground">Body SVG preview</span>
                </div>
                <div className="space-y-3">
                  {["Bench Press", "Goblet Squat", "Pull-ups"].map((ex, i) => (
                    <div key={ex} className="rounded-md border bg-card p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{ex}</p>
                        <p className="text-xs text-muted-foreground">Chest • Equipment varies</p>
                      </div>
                      <button className="rounded-md border px-3 py-1.5 text-sm bg-secondary hover:bg-accent hover:text-accent-foreground">
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Utilities">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-md border bg-card p-4">
                  <p className="font-semibold mb-2">Plate Calculator (static)</p>
                  <div className="grid gap-2">
                    <input className="rounded-md border bg-background px-3 py-2 text-sm" placeholder="Target weight (kg)" />
                    <input className="rounded-md border bg-background px-3 py-2 text-sm" placeholder="Bar weight (kg)" />
                    <button className="rounded-md border px-3 py-2 text-sm bg-primary text-primary-foreground">Calculate</button>
                  </div>
                </div>
                <div className="rounded-md border bg-card p-4">
                  <p className="font-semibold mb-2">Today's Workout (preview)</p>
                  <p className="text-sm text-muted-foreground">Add exercises and log sets/reps here.</p>
                </div>
                <div className="rounded-md border bg-card p-4">
                  <p className="font-semibold mb-2">Programs Library</p>
                  <p className="text-sm text-muted-foreground">3-Day Home Dumbbell Plan and more.</p>
                </div>
              </div>
            </SectionCard>
          </article>
        )}

        {/* Community */}
        {active === "community" && (
          <article role="tabpanel" aria-labelledby="tab-community" className="space-y-6">
            <header>
              <h1 id="tab-community" className="text-3xl md:text-4xl font-extrabold">Community • Workout Jams</h1>
              <p className="text-muted-foreground mt-1">Join a session to sweat together—music synced, chat live.</p>
            </header>

            <SectionCard title="Active Sessions">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Leg Day Power Hour", vibe: "Rock", listeners: 23, song: "Foo Fighters – Everlong" },
                  { name: "OPM Throwback", vibe: "OPM", listeners: 14, song: "Eraserheads – Ang Huling El Bimbo" },
                  { name: "Sabayan mo 'ko!", vibe: "Hype", listeners: 31, song: "Kendrick – HUMBLE." },
                  { name: "Push/Pull Groove", vibe: "Hip-Hop", listeners: 18, song: "Drake – God's Plan" },
                  { name: "Morning Mobility", vibe: "Chill", listeners: 9, song: "lofi – morning beats" },
                  { name: "Core Crusher", vibe: "EDM", listeners: 27, song: "Avicii – Levels" },
                ].map((s) => (
                  <article key={s.name} className="rounded-lg border bg-card p-4 flex flex-col gap-3 hover:shadow-lg transition-shadow">
                    <header className="flex items-center justify-between">
                      <h3 className="font-semibold">{s.name}</h3>
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">{s.vibe}</span>
                    </header>
                    <p className="text-sm text-muted-foreground">Now playing: {s.song}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{s.listeners} listening</span>
                      <button className="rounded-md border px-3 py-1.5 text-sm bg-primary text-primary-foreground">Join Jam</button>
                    </div>
                  </article>
                ))}
              </div>
            </SectionCard>
          </article>
        )}

        {/* Profile */}
        {active === "profile" && (
          <article role="tabpanel" aria-labelledby="tab-profile" className="space-y-6">
            <header>
              <h1 id="tab-profile" className="text-3xl md:text-4xl font-extrabold">Profile & Goals</h1>
              <p className="text-muted-foreground mt-1">Sign in and set your targets to personalize Lift!.</p>
            </header>

            <div className="grid gap-4 md:grid-cols-2">
              <SectionCard title="Authentication">
                <button className="rounded-md border px-4 py-2 text-sm bg-secondary hover:bg-accent hover:text-accent-foreground">
                  Continue with Google
                </button>
              </SectionCard>

              <SectionCard title="Your Stats">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { p: "Age", ph: "25" },
                    { p: "Gender", ph: "Select" },
                    { p: "Height (cm)", ph: "170" },
                    { p: "Weight (kg)", ph: "70" },
                    { p: "Activity", ph: "Moderate" },
                    { p: "Goal", ph: "Maintain" },
                  ].map((f) => (
                    <div key={f.p} className="space-y-1.5">
                      <label className="text-xs text-muted-foreground">{f.p}</label>
                      <input className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder={f.ph} />
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Automated Targets">
                <div className="grid grid-cols-2 gap-4">
                  {["Calories", "Protein", "Carbs", "Fat"].map((t, i) => (
                    <div key={t} className="rounded-md border bg-muted p-3">
                      <p className="text-xs text-muted-foreground">{t}</p>
                      <p className="text-lg font-semibold mt-1">{["2200 kcal","140 g","240 g","60 g"][i]}</p>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </article>
        )}
      </main>

      <nav
        role="tablist"
        aria-label="Bottom navigation"
        className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/75"
      >
        <div className="container grid grid-cols-4">
          <TabButton id="dashboard" label="Dashboard" active={active === "dashboard"} onClick={setActive} />
          <TabButton id="workouts" label="Workouts" active={active === "workouts"} onClick={setActive} />
          <TabButton id="community" label="Community" active={active === "community"} onClick={setActive} />
          <TabButton id="profile" label="Profile" active={active === "profile"} onClick={setActive} />
        </div>
      </nav>
    </div>
  );
};

export default Index;
