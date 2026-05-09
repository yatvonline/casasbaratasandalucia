import { useEffect, useState } from "react";
import axios from "axios";
import {
  Mail,
  ArrowRight,
  MapPin,
  Eye,
  Users,
  Lock,
  Sparkles,
  Building2,
  Wifi,
  TrendingUp,
  CheckCircle2,
  Clock,
  Send,
  Copy,
  ExternalLink,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const FALLBACK_CONTACT = "dosmaresmagazine@gmail.com";

const PROVINCES = [
  { name: "Cádiz", slug: "cadiz", topic: "Casas baratas en Cádiz" },
  { name: "Málaga", slug: "malaga", topic: "Casas de pueblo en Málaga" },
  { name: "Jaén", slug: "jaen", topic: "Oportunidades inmobiliarias en Jaén" },
  { name: "Granada", slug: "granada", topic: "Viviendas económicas en Granada" },
  { name: "Córdoba", slug: "cordoba", topic: "Casas rurales en Córdoba" },
  { name: "Sevilla", slug: "sevilla", topic: "Casas con patio en Sevilla" },
  { name: "Huelva", slug: "huelva", topic: "Casas de pueblo en Huelva" },
  { name: "Almería", slug: "almeria", topic: "Cortijos y casas en Almería" },
];

const TOPICS = [
  { icon: Wifi, title: "Casas para teletrabajar", text: "Pueblos con fibra, vida tranquila y precios que no existen en ciudades." },
  { icon: TrendingUp, title: "Invertir en pueblos andaluces", text: "Operaciones a 30.000–80.000€ con potencial de reforma y alquiler turístico." },
  { icon: Building2, title: "Viviendas económicas en Andalucía", text: "Casas habitables desde 25.000€ filtradas por colaboradores en cada provincia." },
  { icon: Sparkles, title: "Off-market real", text: "Inmuebles que nunca se publican en Idealista ni en portales generalistas." },
];

const WHY = [
  { icon: Lock, title: "No somos un portal masivo", text: "No competimos con Idealista. Filtramos. Solo entra lo que merece la pena." },
  { icon: Eye, title: "Oportunidades reales", text: "Casas verificadas, precios reales, sin reclamos para enseñar otra cosa." },
  { icon: Users, title: "Colaboradores en cada pueblo", text: "Agentes locales, herencias, propietarios discretos. Acceso que no compra ningún portal." },
  { icon: MapPin, title: "No siempre se publican", text: "Muchas viviendas se reservan en horas. El canal es el primero en verlas." },
];

const SUBJECT = "Solicitud de acceso al canal privado";
const buildBody = (source = "landing") =>
  `Hola,\n\nMe gustaría unirme al canal privado de Oportunidades Pueblos Andalucía.\n\n` +
  `· Provincia(s) que me interesan: \n` +
  `· Tipo de vivienda que busco (pueblo, reforma, inversión, teletrabajo): \n` +
  `· Presupuesto aproximado: \n\n` +
  `Mi nombre / Telegram: \n\n` +
  `Gracias,\n\n— Origen: ${source}`;

const links = (email, source) => {
  const su = encodeURIComponent(SUBJECT);
  const body = encodeURIComponent(buildBody(source));
  return {
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${su}&body=${body}`,
    outlook: `https://outlook.live.com/owa/?path=/mail/action/compose&to=${encodeURIComponent(email)}&subject=${su}&body=${body}`,
    yahoo: `https://compose.mail.yahoo.com/?to=${encodeURIComponent(email)}&subject=${su}&body=${body}`,
    mailto: `mailto:${email}?subject=${su}&body=${body}`,
  };
};

export default function Landing() {
  const [contactEmail, setContactEmail] = useState(FALLBACK_CONTACT);
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("landing");
  const [copied, setCopied] = useState(false);
  const [heroCopied, setHeroCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await axios.get(`${API}/telegram`);
        if (!cancelled && res.data?.contact_email) setContactEmail(res.data.contact_email);
      } catch (e) {
        // keep fallback
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const FAQ = [
    {
      q: "¿Cómo me uno al canal de Telegram?",
      a: `El canal es privado. Para acceder, escríbenos a ${contactEmail} contándonos qué buscas (provincia, tipo de vivienda, presupuesto). Te incluimos manualmente en el canal en 24–48h.`,
    },
    { q: "¿Por qué no es entrada libre?", a: "Filtramos manualmente para mantener el canal limpio: solo gente que de verdad busca casa o invertir. Eso protege la calidad de las oportunidades y la prioridad de los miembros." },
    { q: "¿Cuánto cuesta unirse?", a: "El acceso es gratuito. Solo te pedimos un email de contacto y un poco de contexto sobre lo que buscas para enviarte oportunidades relevantes." },
    { q: "¿Por qué algunas casas no aparecen en Idealista?", a: "Muchas viviendas en pueblos andaluces se venden por boca a boca, por colaboradores locales, herencias o propietarios que prefieren operaciones discretas. Por eso nunca llegan a portales generalistas." },
    { q: "¿Qué tipo de casas se publican?", a: "Casas de pueblo, viviendas para reformar, oportunidades de inversión, casas para teletrabajar, cortijos y operaciones off-market en las 8 provincias andaluzas: Cádiz, Málaga, Jaén, Granada, Córdoba, Sevilla, Huelva y Almería." },
    { q: "¿Sois una inmobiliaria?", a: "No. Somos un canal de difusión independiente. Trabajamos con colaboradores locales y conectamos compradores con oportunidades. La operación se cierra siempre con el agente, propietario o profesional que tramita la venta." },
  ];

  const openContact = (src = "cta") => {
    setSource(src);
    setCopied(false);
    setOpen(true);
  };

  const copyEmail = async (target = "dialog") => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      if (target === "hero") {
        setHeroCopied(true);
        setTimeout(() => setHeroCopied(false), 1800);
      } else {
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      }
    } catch (e) {
      // last-resort fallback
      const ta = document.createElement("textarea");
      ta.value = contactEmail;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (_) {}
      document.body.removeChild(ta);
      if (target === "hero") setHeroCopied(true);
      else setCopied(true);
      setTimeout(() => { setCopied(false); setHeroCopied(false); }, 1800);
    }
  };
const viviendas = [
  {
    titulo: "Casa en Lepe",
    zona: "Lepe · Huelva",
    precio: "125.000€",
    descripcion: "Oportunidad off-market con rentabilidad inmediata."
  }
];
  const L = links(contactEmail, source);

  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden" data-testid="landing-page">
      {/* ============ NAV ============ */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-foreground/10" data-testid="site-header">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 group" data-testid="brand-link">
            <span className="w-2.5 h-2.5 rounded-full bg-primary tg-pulse" />
            <span className="font-serif-display text-[17px] tracking-tight font-semibold">
              Oportunidades Pueblos Andalucía
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-foreground/70">
            <a href="#que-es" className="hover:text-foreground transition-colors" data-testid="nav-que-es">Qué es esto</a>
            <a href="#provincias" className="hover:text-foreground transition-colors" data-testid="nav-provincias">Provincias</a>
            <a href="#faq" className="hover:text-foreground transition-colors" data-testid="nav-faq">FAQ</a>
          </nav>
          <button
            type="button"
            onClick={() => openContact("nav")}
            data-testid="nav-mail-btn"
            className="cta-shine inline-flex items-center gap-2 bg-foreground text-background hover:bg-secondary text-sm font-medium px-4 py-2 rounded-full transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            Solicitar acceso
          </button>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section id="top" className="relative grain-bg pt-20 lg:pt-28 pb-24 lg:pb-32 px-6 lg:px-10" data-testid="hero-section">
        <div className="watermark absolute -left-6 lg:-left-10 top-24 hidden md:block select-none" aria-hidden="true" style={{ fontSize: "clamp(180px, 22vw, 380px)" }}>
          Andalucía
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7 fade-up">
              <p className="eyebrow flex items-center gap-3 mb-8" data-testid="hero-eyebrow">
                <span className="inline-block w-8 h-px bg-secondary" />
                Canal privado · Acceso por invitación
              </p>

              <h1 className="font-serif-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.98] tracking-tight text-foreground" data-testid="hero-title">
                Las oportunidades<br />
                inmobiliarias que <span className="italic text-secondary">no llegan</span><br />a Idealista.
              </h1>

              <p className="mt-8 text-lg lg:text-xl text-foreground/75 max-w-xl leading-relaxed font-sans-body fade-up delay-1" data-testid="hero-sub">
                Casas de pueblo, oportunidades off-market y viviendas económicas en
                Andalucía — antes de que las vea el resto.
              </p>

              <div className="mt-10 fade-up delay-2 max-w-xl" data-testid="hero-cta-block">
                <button
                  type="button"
                  onClick={() => openContact("hero")}
                  data-testid="hero-mail-btn"
                  className="cta-shine inline-flex items-center justify-center gap-3 bg-primary hover:bg-secondary text-primary-foreground font-medium text-base lg:text-lg px-7 py-4 rounded-full transition-all w-full sm:w-auto"
                >
                  <Mail className="w-5 h-5" />
                  Escríbenos para entrar al canal
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => copyEmail("hero")}
                  data-testid="hero-copy-email"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-foreground/65 hover:text-secondary transition-colors group"
                >
                  <span className="font-mono text-foreground/85 group-hover:text-secondary border-b border-dashed border-foreground/30 group-hover:border-secondary">
                    {contactEmail}
                  </span>
                  {heroCopied ? (
                    <span className="text-xs text-primary inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> copiado
                    </span>
                  ) : (
                    <span className="text-xs">copiar</span>
                  )}
                </button>

                <p className="mt-5 text-xs text-foreground/55 flex items-start gap-2 max-w-md" data-testid="hero-disclaimer">
                  <Lock className="w-3 h-3 mt-0.5 shrink-0" />
                  El canal es privado y filtrado a mano. Cuéntanos qué buscas y te
                  incluimos en 24–48h.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-6 text-sm text-foreground/60 fade-up delay-3" data-testid="hero-trust">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Respuesta en 24–48h</span>
                </div>
                <span className="hidden sm:block w-px h-4 bg-foreground/20" />
                <div className="hidden sm:flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>8 provincias andaluzas</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 fade-up delay-2" data-testid="hero-visual">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/40 rounded-[2rem] -rotate-2" aria-hidden="true" />
                <div className="relative bg-card border border-foreground/10 rounded-[1.5rem] p-7 shadow-[0_30px_80px_-30px_hsl(14_64%_28%/0.4)]">
                  <div className="flex items-center justify-between mb-5">
                    <span className="eyebrow">Última publicación</span>
                    <span className="text-xs text-primary font-mono">hace 14 min</span>
                  </div>
                  <h3 className="font-serif-display text-[28px] leading-tight">
                    Casa de pueblo en <span className="italic">Sierra de Cádiz</span>
                  </h3>
                  <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                    220 m², 4 dormitorios, patio andaluz, lista para entrar. Particular,
                    sin comisión añadida. <strong className="text-secondary">38.000 €</strong>.
                  </p>
                  <div className="hairline my-5" />
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2 text-foreground/80"><CheckCircle2 className="w-4 h-4 text-primary" /> Off-market — no en Idealista</li>
                    <li className="flex items-center gap-2 text-foreground/80"><CheckCircle2 className="w-4 h-4 text-primary" /> Verificada por colaborador local</li>
                    <li className="flex items-center gap-2 text-foreground/80"><CheckCircle2 className="w-4 h-4 text-primary" /> Reserva en menos de 48h habitual</li>
                  </ul>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs text-foreground/50 italic">Vista previa simulada · Real en el canal</span>
                    <button type="button" onClick={() => openContact("preview-card")} className="text-sm font-medium text-primary hover:text-secondary inline-flex items-center gap-1" data-testid="preview-card-btn">
                      Solicitar acceso <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ QUÉ ES ESTO ============ */}
      <section id="que-es" className="relative px-6 lg:px-10 py-24 lg:py-32 border-t border-foreground/10 bg-card" data-testid="que-es-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-6">01 — Qué es esto</p>
              <h2 className="font-serif-display text-4xl lg:text-5xl leading-[1.05] tracking-tight">
                Un canal,<br />
                <span className="italic text-secondary">no un portal.</span>
              </h2>
              <p className="mt-6 text-base text-foreground/70 leading-relaxed max-w-md">
                No competimos con Idealista, Fotocasa ni Habitaclia. Hacemos lo
                contrario: filtramos lo que ellos no ven.
              </p>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
              {WHY.map((w, i) => (
                <div key={w.title} className="lift bg-background border border-foreground/10 rounded-2xl p-7" data-testid={`why-card-${i}`}>
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-5">
                    <w.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif-display text-2xl mb-2">{w.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{w.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROVINCIAS / SEO ============ */}
      <section id="provincias" className="relative px-6 lg:px-10 py-24 lg:py-32 grain-bg border-t border-foreground/10" data-testid="provincias-section">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <p className="eyebrow mb-6">02 — Cobertura</p>
              <h2 className="font-serif-display text-4xl lg:text-5xl leading-[1.05] tracking-tight max-w-2xl">
                Las ocho provincias. <span className="italic">Cientos de pueblos.</span>
              </h2>
            </div>
            <p className="max-w-sm text-foreground/65 text-sm leading-relaxed">
              Buscamos en cada esquina de Andalucía. Estos son los temas que más
              pregunta la gente — pronto cada uno tendrá su propia página.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {PROVINCES.map((p, i) => (
              <button
                type="button"
                key={p.slug}
                onClick={() => openContact(`province-${p.slug}`)}
                className="lift group bg-card border border-foreground/10 rounded-2xl p-6 flex flex-col text-left"
                data-testid={`province-card-${p.slug}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[11px] text-foreground/40">{String(i + 1).padStart(2, "0")}</span>
                  <ArrowRight className="w-4 h-4 text-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-serif-display text-2xl mb-1">{p.name}</h3>
                <p className="text-xs text-foreground/55 leading-relaxed">{p.topic}</p>
              </button>
            ))}
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOPICS.map((t) => (
              <div key={t.title} className="border-l-2 border-primary/40 pl-5 py-2" data-testid={`topic-${t.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <t.icon className="w-5 h-5 text-primary mb-3" />
                <h4 className="font-serif-display text-lg mb-1">{t.title}</h4>
                <p className="text-xs text-foreground/65 leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CÓMO FUNCIONA ============ */}
      <section className="px-6 lg:px-10 py-24 lg:py-32 bg-card border-t border-foreground/10" data-testid="como-section">
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow mb-6">03 — Cómo funciona</p>
          <h2 className="font-serif-display text-4xl lg:text-5xl leading-[1.05] mb-12 max-w-3xl">
            Tres pasos. <span className="italic text-secondary">Cero ruido.</span>
          </h2>

          <ol className="num-counter space-y-8">
            <li className="flex items-start gap-3">
              <div>
                <h3 className="font-serif-display text-2xl mb-1">Nos escribes un email</h3>
                <p className="text-foreground/70 leading-relaxed max-w-xl">
                  A <span className="font-mono text-secondary">{contactEmail}</span> contándonos
                  qué buscas: provincia, tipo de vivienda y presupuesto.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div>
                <h3 className="font-serif-display text-2xl mb-1">Te incluimos a mano en el canal</h3>
                <p className="text-foreground/70 leading-relaxed max-w-xl">
                  Filtramos manualmente para mantener la calidad. Te respondemos
                  en 24–48h con tu invitación al canal privado de Telegram.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div>
                <h3 className="font-serif-display text-2xl mb-1">Actúas antes que el resto</h3>
                <p className="text-foreground/70 leading-relaxed max-w-xl">
                  Cuando una oportunidad sale al canal, tienes horas — no semanas —
                  para decidir. El canal es la ventaja.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ============ CTA BRUTAL ============ */}
      <section id="captura" className="relative px-6 lg:px-10 py-28 lg:py-40 bg-secondary text-secondary-foreground overflow-hidden" data-testid="cta-section">
        <div className="watermark absolute right-[-4%] top-1/2 -translate-y-1/2 hidden md:block" style={{ fontSize: "clamp(220px, 28vw, 480px)", color: "rgba(251,247,241,0.06)" }} aria-hidden="true">
          Email
        </div>

        <div className="max-w-4xl mx-auto relative text-center">
          <p className="eyebrow text-accent mb-8">04 — Únete</p>
          <h2 className="font-serif-display text-[clamp(2.4rem,6.5vw,5.5rem)] leading-[0.98] tracking-tight">
            Las mejores oportunidades<br />
            duran <span className="italic">horas.</span>
          </h2>
          <p className="mt-7 text-lg text-secondary-foreground/85 max-w-2xl mx-auto leading-relaxed">
            Escríbenos un email contándonos qué buscas y te incluimos a mano en el
            canal privado de Telegram. Sin formularios, sin filtros automáticos —
            personas hablando con personas.
          </p>

          <div className="mt-12" data-testid="cta-mail-block">
            <button
              type="button"
              onClick={() => openContact("cta-bottom")}
              data-testid="cta-mail-btn"
              className="cta-shine inline-flex items-center justify-center gap-3 bg-primary hover:bg-background hover:text-primary text-primary-foreground font-medium text-base lg:text-lg px-9 py-5 rounded-full transition-all"
            >
              <Mail className="w-5 h-5" />
              Escribir a {contactEmail}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="mt-8 text-xs text-secondary-foreground/60 italic">
            Te abrimos un panel con Gmail, Outlook, tu cliente de email o copiar la
            dirección — lo que prefieras.
          </p>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="px-6 lg:px-10 py-24 lg:py-32 grain-bg border-t border-foreground/10" data-testid="faq-section">
        <div className="max-w-4xl mx-auto">
          <p className="eyebrow mb-6">05 — Preguntas frecuentes</p>
          <h2 className="font-serif-display text-4xl lg:text-5xl leading-[1.05] mb-14 max-w-2xl">
            Lo que la gente <span className="italic text-secondary">pregunta</span> antes de entrar.
          </h2>

          <Accordion type="single" collapsible className="space-y-3" data-testid="faq-accordion">
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-foreground/10 rounded-2xl px-6 data-[state=open]:border-primary/40 transition-colors" data-testid={`faq-item-${i}`}>
                <AccordionTrigger className="font-serif-display text-lg lg:text-xl text-left hover:no-underline py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/75 leading-relaxed text-base pb-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <button type="button" onClick={() => openContact("faq-bottom")} data-testid="faq-mail-btn" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary">
              <Send className="w-4 h-4" />
              ¿Más preguntas? Escríbenos a {contactEmail}
            </button>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="px-6 lg:px-10 py-16 bg-foreground text-background" data-testid="site-footer">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <h3 className="font-serif-display text-2xl mb-3">Oportunidades Pueblos Andalucía</h3>
              <p className="text-background/70 text-sm leading-relaxed max-w-md">
                Difusión independiente de oportunidades inmobiliarias off-market en
                pueblos de Andalucía. No somos una inmobiliaria.
              </p>
            </div>
            <div className="md:col-span-3">
              <p className="eyebrow text-accent mb-4">Provincias</p>
              <ul className="space-y-2 text-sm text-background/70">
                {PROVINCES.slice(0, 4).map((p) => (
                  <li key={p.slug}><a href="#provincias" className="hover:text-background transition-colors">{p.topic}</a></li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <p className="eyebrow text-accent mb-4">Más</p>
              <ul className="space-y-2 text-sm text-background/70">
                {PROVINCES.slice(4).map((p) => (
                  <li key={p.slug}><a href="#provincias" className="hover:text-background transition-colors">{p.name}</a></li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <p className="eyebrow text-accent mb-4">Contacto</p>
              <button type="button" onClick={() => openContact("footer")} className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors break-all" data-testid="footer-mail-btn">
                <Mail className="w-4 h-4 shrink-0" />
                {contactEmail}
              </button>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-background/15 flex flex-col sm:flex-row justify-between gap-3 text-xs text-background/50">
            <span>© {new Date().getFullYear()} Oportunidades Pueblos Andalucía · Andalucía, España</span>
            <span className="italic font-serif-display">Hecho con cariño para los que buscan algo distinto.</span>
          </div>
        </div>
      </footer>

      {/* ============ CONTACT DIALOG ============ */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md bg-background border-foreground/15" data-testid="contact-dialog">
          <DialogHeader>
            <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
              <Mail className="w-5 h-5" />
            </div>
            <DialogTitle className="font-serif-display text-2xl leading-tight text-foreground">
              Solicitar acceso al canal
            </DialogTitle>
            <DialogDescription className="text-foreground/65 leading-relaxed text-sm">
              Elige cómo quieres enviarnos el email. Te incluimos a mano en el canal privado en 24–48h.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 space-y-2">
            <a
              href={L.gmail}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="dialog-gmail-btn"
              className="flex items-center justify-between gap-3 p-4 rounded-xl bg-card border border-foreground/10 hover:border-primary/50 hover:bg-accent/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#EA4335]/10 text-[#EA4335] flex items-center justify-center font-bold text-sm">
                  G
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">Abrir en Gmail</p>
                  <p className="text-xs text-foreground/55">Compone en el navegador</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-foreground/40 group-hover:text-primary" />
            </a>

            <a
              href={L.outlook}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="dialog-outlook-btn"
              className="flex items-center justify-between gap-3 p-4 rounded-xl bg-card border border-foreground/10 hover:border-primary/50 hover:bg-accent/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0078D4]/10 text-[#0078D4] flex items-center justify-center font-bold text-sm">
                  O
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">Abrir en Outlook</p>
                  <p className="text-xs text-foreground/55">Outlook web · Hotmail · Live</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-foreground/40 group-hover:text-primary" />
            </a>

            <a
              href={L.mailto}
              data-testid="dialog-mailto-btn"
              className="flex items-center justify-between gap-3 p-4 rounded-xl bg-card border border-foreground/10 hover:border-primary/50 hover:bg-accent/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-foreground/10 text-foreground flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">Mi cliente de email</p>
                  <p className="text-xs text-foreground/55">Mail.app, Thunderbird, Outlook…</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-foreground/40 group-hover:text-primary" />
            </a>

            <button
              type="button"
              onClick={() => copyEmail("dialog")}
              data-testid="dialog-copy-btn"
              className="w-full flex items-center justify-between gap-3 p-4 rounded-xl bg-card border border-foreground/10 hover:border-primary/50 hover:bg-accent/30 transition-all group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">
                    {copied ? "¡Email copiado!" : "Copiar dirección"}
                  </p>
                  <p className="text-xs text-foreground/55 font-mono">{contactEmail}</p>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-foreground/10">
            <p className="text-xs text-foreground/55 leading-relaxed">
              <strong className="text-foreground/75">Asunto sugerido:</strong> {SUBJECT}
            </p>
            <p className="mt-2 text-xs text-foreground/55 leading-relaxed">
              Cuéntanos: <em>provincia que te interesa, tipo de vivienda y presupuesto aproximado</em>.
            </p>
          </div>
        </DialogContent>
      </Dialog><section style={{
  padding:"60px 20px",
  maxWidth:"1200px",
  margin:"0 auto"
}}>

  <h2 style={{
    fontSize:"42px",
    marginBottom:"40px",
    color:"white"
  }}>
    Últimas oportunidades
  </h2>

  {viviendas.map((vivienda, index) => (
    <div
      key={index}
      style={{
        background:"#111",
        border:"1px solid #333",
        borderRadius:"20px",
        padding:"30px",
        marginBottom:"20px"
      }}
    >
      <h3 style={{fontSize:"30px"}}>
        {vivienda.titulo}
      </h3>

      <p style={{opacity:0.7}}>
        {vivienda.zona}
      </p>

      <p style={{
        fontSize:"28px",
        color:"#c97a49",
        fontWeight:"bold"
      }}>
        {vivienda.precio}
      </p>

      <p style={{
        marginTop:"20px",
        lineHeight:"1.7"
      }}>
        {vivienda.descripcion}
      </p>
    </div>
  ))}

</section>
    </main>
  );
}const adminAccess = () => {
  const password = prompt("Introduce contraseña admin");

  if (password === "casasadmin2026") {
    alert("Acceso concedido");
    window.location.href = "/admin";
  } else {
    alert("Contraseña incorrecta");
  }
};
