import type React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { Check, Copy, ArrowUpRight, Zap, Heart } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FoxName — Keyless Roblox Script Hub" },
      { name: "description", content: "The best keyless, always-free Roblox script hub. One loader, every supported game." },
      { property: "og:title", content: "FoxName — Keyless Roblox Script Hub" },
      { property: "og:description", content: "One loader, every supported game. Keyless and always free." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://foxname.vip/images/banner.png" },
      { name: "twitter:image", content: "https://foxname.vip/images/banner.png" },
    ],
  }),
  component: Index,
});

const SCRIPT = 'loadstring(game:HttpGet("https://foxname.vip/loader"))()';
const DISCORD = "https://discord.gg/v8ZPq4y2nD";
const games = [
  { tag: "99NITF", img: "https://tr.rbxcdn.com/180DAY-65eebaac747ed81ff9dfdc85643a1e12/768/432/Image/Webp/noFilter", name: "99 Nights in the Forest", by: "Caomod2077", url: "https://www.roblox.com/games/79546208627805" },
  { tag: "MM2", img: "https://tr.rbxcdn.com/180DAY-fe7335c3ad752e84323cd81ae38de69a/768/432/Image/Webp/noFilter", name: "Murder Mystery 2", by: "!VEGAS", url: "https://www.roblox.com/games/142823291" },
  { tag: "KAT", img: "https://tr.rbxcdn.com/180DAY-08d5199fe7ceeb2b18a793bf6a1eb11d/768/432/Image/Webp/noFilter", name: "Knife Ability Test", by: "!VEGAS", url: "https://www.roblox.com/games/621129760" },
  { tag: "SZA", img: "https://tr.rbxcdn.com/180DAY-b8bca7c261b98ee2f8351b00679ad9e2/768/432/Image/Webp/noFilter", name: "Survive Zombie Arena", by: "Caomod2077", url: "https://www.roblox.com/games/114204398207377" },
  { tag: "DR", img: "https://tr.rbxcdn.com/180DAY-da525289338642275e4838a07d685e93/768/432/Image/Webp/noFilter", name: "Dead Rails", by: "afkar", url: "https://www.roblox.com/games/116495829188952" },
  { tag: "PLS", img: "https://tr.rbxcdn.com/180DAY-bf856da3fb1e19a483987162f5617373/768/432/Image/Webp/noFilter", name: "Pls Donate", by: "!VEGAS", url: "https://www.roblox.com/games/8737602449" },
  { tag: "GG", img: "https://tr.rbxcdn.com/180DAY-11284d966fa04632ec61952d01f39fbe/768/432/Image/Webp/noFilter", name: "Gun Grounds FFA", by: "!VEGAS", url: "https://www.roblox.com/games/12137249458" },
];
const devs = [
  { name: "Caomod2077", role: "Owner · Lead Developer", games: ["99NITF", "SZA", "Animal Hospital", "Build A Ring Farm", "Grow a Garden 2"] },
  { name: "!VEGAS", badge: "https://foxname.vip/images/guns.lol.png", role: "Co-Owner · Script & Web", games: ["MM2", "KAT", "PLS DONATE", "Gun Grounds FFA"], link: "https://github.com/xv3gasx" },
  { name: "afkar", badge: "https://foxname.vip/images/afkar.png", role: "Co-Owner · Script & Web", games: ["Dead Rails"], link: "https://afkar.lol/" },
];

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ "--d": `${delay}ms` } as CSSProperties}>{children}</div>;
}

function Spot({ children, className = "", href }: { children: ReactNode; className?: string; href?: string }) {
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`); el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - y) * 8}deg`); el.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); };
  const cls = `spot glass ${className}`;
  return href
    ? <a href={href} target="_blank" rel="noreferrer" onMouseMove={onMove} onMouseLeave={onLeave} className={cls}>{children}</a>
    : <div onMouseMove={onMove} onMouseLeave={onLeave} className={cls}>{children}</div>;
}

function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span ref={ref} className="magnetic inline-block transition-transform duration-300 ease-out"
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--tx", `${(e.clientX - r.left - r.width / 2) * 0.25}px`); e.currentTarget.style.setProperty("--tyy", `${(e.clientY - r.top - r.height / 2) * 0.35}px`); }}
      onMouseLeave={(e) => { e.currentTarget.style.setProperty("--tx", "0px"); e.currentTarget.style.setProperty("--tyy", "0px"); }}>
      {children}
    </span>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return; io.disconnect();
      const start = performance.now();
      const tick = (t: number) => { const k = Math.min(1, (t - start) / 1600); setN(Math.round(to * (1 - Math.pow(1 - k, 4)))); if (k < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function Index() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      h.style.setProperty("--p", String(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)));
      h.style.setProperty("--sy", String(h.scrollTop * 0.3));
      setScrolled(h.scrollTop > 20);
    };
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen overflow-x-clip">
      <div className="progress" />
      <nav className={`sticky top-0 z-50 border-x-0 border-t-0 transition-all duration-500 ${scrolled ? "glass" : "border-b border-transparent"}`}>
        <div className={`nav-shell mx-auto flex ${scrolled ? "h-14" : "h-20"} max-w-6xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2 font-display text-lg font-extrabold"><img src="https://foxname.vip/images/icon_corner.png" alt="" className="h-8 w-8 rounded-lg" />fox<span className="text-gradient-fox">name</span></a>
          <div className="hidden gap-8 text-sm text-muted-foreground md:flex">
            {["script", "games", "team"].map((s) => (
              <a key={s} href={`#${s}`} className="group relative capitalize transition-colors hover:text-foreground">{s}<span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-fox transition-transform duration-300 group-hover:scale-x-100" /></a>
            ))}
          </div>
          <a href={DISCORD} target="_blank" rel="noreferrer" className="btn btn-ghost h-10 px-4 text-sm">Discord</a>
        </div>
      </nav>

      <header className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 text-center">
        <div className="parallax absolute inset-0 -z-10"><div className="orb left-[10%] top-10 h-64 w-64 bg-fox/30" />
        <div className="orb right-[8%] top-40 h-72 w-72 bg-fox-glow/20" style={{ animationDelay: "-6s" }} /></div>
        <img src="https://foxname.vip/images/icon_corner.png" alt="FoxName logo" className="rise floaty relative mx-auto mb-8 h-24 w-24 rounded-3xl shadow-fox" />
        <span className="rise relative inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-muted-foreground">
          <span className="ping h-2 w-2 rounded-full bg-fox" /> 100% Keyless · Always Free
        </span>
        <h1 className="mt-8 font-display text-5xl font-extrabold leading-[1.08] tracking-tight md:text-7xl">
          {["The", "best"].map((w, i) => <span key={w} className="word mr-[0.25em]" style={{ animationDelay: `${150 + i * 90}ms` }}>{w}</span>)}
          <span className="word text-shine" style={{ animationDelay: "330ms" }}>keyless</span><br />
          {["Roblox", "script", "hub"].map((w, i) => <span key={w} className="word mr-[0.25em] last:mr-0" style={{ animationDelay: `${420 + i * 90}ms` }}>{w}</span>)}
        </h1>
        <p className="rise mx-auto mt-6 max-w-xl text-lg text-muted-foreground" style={{ animationDelay: ".2s" }}>
          One loader. Every supported game. No keys, no ads, no nonsense.
        </p>
        <div className="rise mt-10 flex flex-wrap justify-center gap-3" style={{ animationDelay: ".3s" }}>
          <Magnetic><a href="#script" className="btn btn-primary"><Zap className="h-4 w-4" /> Get Script</a></Magnetic>
          <Magnetic><a href={DISCORD} target="_blank" rel="noreferrer" className="btn btn-ghost">Join Discord <ArrowUpRight className="h-4 w-4" /></a></Magnetic>
        </div>
      </header>

      <section id="script" className="mx-auto max-w-3xl scroll-mt-24 px-6">
        <div className="rise glass floaty rounded-3xl p-2 shadow-fox" style={{ animationDelay: ".4s" }}>
          <div className="flex items-center gap-2 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-destructive" />
            <span className="h-3 w-3 rounded-full bg-fox-glow" />
            <span className="h-3 w-3 rounded-full bg-fox" />
            <span className="ml-3 text-xs text-muted-foreground">loader.lua</span>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl bg-background p-4 sm:flex-row sm:items-center">
            <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-fox-glow">{SCRIPT}</code>
            <button onClick={copy} className="btn btn-primary h-11 shrink-0" aria-live="polite">
              {copied ? <span key="c" className="pop inline-flex items-center gap-2"><Check className="h-4 w-4" /> Copied!</span> : <span key="n" className="inline-flex items-center gap-2"><Copy className="h-4 w-4" /> Copy</span>}
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4 px-6">
        {[{ v: games.length, s: "", l: "Games" }, { v: 100, s: "%", l: "Keyless" }, { v: 0, s: "$", l: "Forever" }].map((x, i) => (
          <Reveal key={x.l} delay={i * 100}>
            <Spot className="rounded-2xl p-5 text-center">
              <div className="font-display text-3xl font-extrabold text-gradient-fox md:text-4xl"><Counter to={x.v} suffix={x.s} /></div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{x.l}</div>
            </Spot>
          </Reveal>
        ))}
      </section>

      <div className="marquee-wrap mt-20 overflow-hidden border-y border-border py-5">
        <div className="marquee gap-12 pr-12">
          {[...games, ...games].map((g, i) => (
            <span key={i} className="flex items-center gap-3 whitespace-nowrap text-lg font-bold text-muted-foreground">
              <img src={g.img} alt="" className="h-8 w-14 rounded-md object-cover" />{g.name}<span className="text-fox">✦</span>
            </span>
          ))}
        </div>
      </div>

      <section id="games" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-32">
        <Reveal><h2 className="font-display text-3xl font-extrabold md:text-4xl">Supported games</h2>
        <p className="mt-2 text-muted-foreground">{games.length} games and counting.</p></Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g, i) => (
            <Reveal key={g.tag} delay={i * 70}>
            <Spot href={g.url} className="group block overflow-hidden rounded-2xl">
              <div className="relative aspect-video overflow-hidden">
                <img src={g.img} alt={g.name} loading="lazy" className="thumb h-full w-full object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-gradient-fox px-3 py-1 text-xs font-extrabold text-primary-foreground">{g.tag}</span>
              </div>
              <div className="flex items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <div className="truncate font-bold">{g.name}</div>
                  <div className="text-sm text-muted-foreground">by {g.by}</div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fox" />
              </div>
            </Spot>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="team" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-32">
        <Reveal><h2 className="font-display text-3xl font-extrabold md:text-4xl">The team</h2></Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {devs.map((d, i) => (
            <Reveal key={d.name} delay={i * 100}><Spot className="h-full rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <img src="https://foxname.vip/images/icon_corner.png" alt="" className="h-12 w-12 rounded-full ring-2 ring-fox" />
                <div>
                  <div className="font-bold">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.role}</div>
                </div>
                {d.link && <a href={d.link} target="_blank" rel="noreferrer" className="ml-auto text-muted-foreground transition-colors hover:text-fox" aria-label={`${d.name} link`}>{d.badge ? <img src={d.badge} alt="" className="h-6 w-6 rounded" /> : <ArrowUpRight className="h-5 w-5" />}</a>}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {d.games.map((x) => <span key={x} className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{x}</span>)}
              </div>
            </Spot></Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-32">
        <Reveal><div className="glass relative overflow-hidden rounded-3xl p-10 text-center md:p-16">
          <Heart className="mx-auto h-8 w-8 animate-pulse fill-fox text-fox" />
          <h2 className="mt-4 font-display text-3xl font-extrabold">Keep it free</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">Support us with a gamepass, or donate via crypto and gift cards in our Discord.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Magnetic><a href="https://www.roblox.com/games/133631279826388/Untitled-Experience#!/store" target="_blank" rel="noreferrer" className="btn btn-primary">Donate on Roblox</a></Magnetic>
            <Magnetic><a href={DISCORD} target="_blank" rel="noreferrer" className="btn btn-ghost">Other ways</a></Magnetic>
          </div>
        </div></Reveal>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">© foxname · keyless forever</footer>
    </div>
  );
}
