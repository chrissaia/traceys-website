import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BookOpen,
  Brain,
  Building2,
  CalendarHeart,
  ChevronDown,
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Mic2,
  Palette,
  Phone,
  Quote,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import './styles.css';

const oceanImage =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85';
const portraitImage =
  'https://images.squarespace-cdn.com/content/v1/6442caccee1a772cba82370e/93cac99a-94d2-453b-9af7-d8570f4d5900/Tracey+Saia.jpg?format=1500w';
const logoImage =
  'https://images.squarespace-cdn.com/content/v1/6442caccee1a772cba82370e/cad0cf61-3b7a-4a7b-bb56-f33649573dcb/Tracey+Saia.png?format=1500w';

const links = {
  email: 'mailto:tracey@traceyesaia.com',
  phone: 'tel:+19735322125',
  map: 'https://www.google.com/maps/search/?api=1&query=84+Maple+Avenue+Morristown+NJ+07960',
  instagram: 'https://www.instagram.com/traceysarttherapy/',
  linkedin: 'https://www.linkedin.com/in/tracey-saia-ms-atr-bc/',
  facebook: 'https://www.facebook.com/profile.php?id=61552748771961',
  newsletter: 'https://www.traceyesaia.com/',
  coloringBook: 'https://www.traceyesaia.com/',
  podcast: 'https://www.traceyesaia.com/',
  neuroArts: 'https://www.neuroartsblueprint.org',
  aata: 'https://arttherapy.org/',
  aspen: 'https://www.youtube.com/watch?v=nfH3N_5Q3N4',
  njata: 'https://www.njarttherapy.com/',
  njBoard: 'https://www.njconsumeraffairs.gov/art',
};

const services = [
  {
    title: 'Adults',
    icon: Heart,
    text: 'A judgment-free therapeutic space to explore difficult life situations, understand your patterns, and build trust in your decisions.',
  },
  {
    title: 'Teens',
    icon: Sparkles,
    text: 'Support for anxiety, stuckness, self-advocacy, and emotional awareness through conversation and visual exploration.',
  },
  {
    title: 'Children',
    icon: Palette,
    text: 'Creative, developmentally responsive sessions that help children express what may not yet be available in words.',
  },
  {
    title: 'Corporate Workshops',
    icon: Building2,
    text: 'Art-based workshops that help teams slow down, connect, regulate, and develop more compassionate communication.',
    href: '/services/corporate-workshops',
  },
];

const nav = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [{ label: 'Corporate Workshops', href: '/services/corporate-workshops' }],
  },
  { label: 'What To Expect', href: '/expect' },
  { label: 'What Is Art Therapy', href: '/art-therapy' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const resourceCards = [
  {
    title: 'Coloring Book',
    icon: BookOpen,
    text: 'A creative resource for reflection, regulation, and gentle self-connection.',
    href: links.coloringBook,
  },
  {
    title: 'Podcasts',
    icon: Mic2,
    text: 'Conversations and appearances that make art therapy approachable and human.',
    href: links.podcast,
  },
  {
    title: 'Newsletter',
    icon: Mail,
    text: 'Notes from Tracey with practical ideas for emotional awareness and creative practice.',
    href: links.newsletter,
  },
];

const testimonials = [
  'Tracey creates a safe and non-judgmental space where meaningful change feels possible.',
  'The work helped me understand the connection between my thoughts, feelings, and behavior.',
  'Tracey brings experience, steadiness, and genuine care into every session.',
];

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const page = useMemo(() => routeFor(path), [path]);

  const navigate = (href: string) => {
    window.history.pushState({}, '', href);
    setPath(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Nav currentPath={path} onNavigate={navigate} />
      <main>{page(navigate)}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

function routeFor(path: string) {
  if (path === '/services') return ServicesPage;
  if (path === '/services/corporate-workshops' || path === '/corporate-workshops') return WorkshopsPage;
  if (path === '/expect' || path === '/what-to-expect-when-you-work-with-tracey') return ExpectPage;
  if (path === '/art-therapy' || path === '/what-is-art-therapy') return ArtTherapyPage;
  if (path === '/testimonials') return TestimonialsPage;
  if (path === '/about') return AboutPage;
  if (path === '/contact') return ContactPage;
  if (path === '/course') return RemovedCoursePage;
  return HomePage;
}

function Nav({ currentPath, onNavigate }: { currentPath: string; onNavigate: (href: string) => void }) {
  const [open, setOpen] = useState(false);

  const go = (href: string) => {
    setOpen(false);
    onNavigate(href);
  };

  return (
    <header className="site-header">
      <button className="brand" onClick={() => go('/')} aria-label="Tracey E. Saia home">
        <img src={logoImage} alt="" />
      </button>

      <nav className="desktop-nav" aria-label="Main navigation">
        {nav.map((item) => (
          <div className="nav-item" key={item.href}>
            <button
              className={currentPath === item.href ? 'active' : ''}
              onClick={() => go(item.href)}
            >
              {item.label}
              {item.children ? <ChevronDown size={14} /> : null}
            </button>
            {item.children ? (
              <div className="submenu">
                {item.children.map((child) => (
                  <button key={child.href} onClick={() => go(child.href)}>
                    {child.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </nav>

      <a className="header-cta" href={links.email}>
        Let&apos;s Talk
      </a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        {open ? <X /> : <Menu />}
      </button>

      {open ? (
        <motion.nav
          className="mobile-nav"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          aria-label="Mobile navigation"
        >
          {nav.flatMap((item) => [item, ...(item.children ?? [])]).map((item) => (
            <button key={item.href} onClick={() => go(item.href)}>
              {item.label}
            </button>
          ))}
          <a href={links.email}>Let&apos;s Talk</a>
        </motion.nav>
      ) : null}
    </header>
  );
}

function HomePage(onNavigate: (href: string) => void) {
  return (
    <>
      <Hero
        eyebrow="Tracey Saia LPAT, MS, ATR-BC, ATCS"
        title="Trust Yourself"
        body="Art therapy for people ready to make positive change, understand themselves more clearly, and regain a sense of control in their lives."
        cta="Schedule a Free Introductory Session"
        onCta={() => onNavigate('/contact')}
      />
      <Section eyebrow="Start Here" title="When words are not enough, art can make room.">
        <div className="split">
          <Reveal className="copy-stack">
            <p>
              Tracey creates a safe and judgment-free therapeutic environment to explore
              the thoughts, feelings, and behaviors that arise in difficult life situations.
            </p>
            <p>
              Therapy can increase awareness of how thoughts and feelings are connected.
              Visual exploration gives the brain the why behind feelings, choices, and behaviors.
            </p>
          </Reveal>
          <Reveal className="quote-panel">
            <Quote />
            <p>“I am not what happened to me, I am what I choose to become.”</p>
            <span>- Carl Jung</span>
          </Reveal>
        </div>
      </Section>
      <ServicesGrid limit={4} />
      <Section eyebrow="Resources" title="A practice that extends beyond the session.">
        <CardGrid>
          {resourceCards.map((card) => (
            <ResourceCard key={card.title} {...card} />
          ))}
        </CardGrid>
      </Section>
      <Section eyebrow="Meet Tracey" title="Prepared, experienced, and deeply human.">
        <BioBlock onNavigate={onNavigate} />
      </Section>
      <FinalCta onNavigate={onNavigate} />
    </>
  );
}

function ServicesPage(onNavigate: (href: string) => void) {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Support for adults, teens, children, and teams."
        body="Tracey's work combines clinical experience, creative exploration, and steady therapeutic care."
      />
      <ServicesGrid />
      <Section eyebrow="How It Helps" title="Build awareness. Practice regulation. Move forward.">
        <div className="three-column">
          {['Anxiety and worry', 'Feeling stuck', 'Emotional overwhelm'].map((item) => (
            <Reveal className="soft-card" key={item}>
              <Brain />
              <h3>{item}</h3>
              <p>
                Explore practical and empowering techniques that help you notice what is
                happening inside and choose your next step with more confidence.
              </p>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section eyebrow="Workshops" title="Corporate workshops now live under Services.">
        <Reveal className="wide-feature">
          <Building2 />
          <div>
            <h3>Creative workshops for workplace wellbeing</h3>
            <p>
              Art-based group experiences can help teams reconnect, communicate, and
              regulate in a way that feels approachable rather than clinical.
            </p>
          </div>
          <button onClick={() => onNavigate('/services/corporate-workshops')}>
            View workshops <ArrowRight size={18} />
          </button>
        </Reveal>
      </Section>
    </>
  );
}

function ExpectPage() {
  return (
    <>
      <PageHero
        eyebrow="What To Expect When You Work With Tracey"
        title="A grounded process for understanding what is happening within you."
        body="Sessions are collaborative, creative, and paced around safety, insight, and practical change."
      />
      <Section eyebrow="The Experience" title="A calm path into deeper self-trust.">
        <div className="timeline">
          {[
            ['First conversation', 'Begin with a free introductory session to understand your needs and fit.'],
            ['Safe exploration', 'Use conversation and creative reflection to notice thoughts, feelings, and behavior.'],
            ['Meaning-making', 'Visual explorations help reveal patterns and the why behind reactions and choices.'],
            ['New practice', 'Build skills for self-advocacy, regulation, and confident decision-making.'],
          ].map(([title, text], index) => (
            <Reveal className="timeline-item" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

function ArtTherapyPage() {
  return (
    <>
      <PageHero
        eyebrow="What Is Art Therapy?"
        title="Art therapy helps people express, understand, and integrate experience."
        body="Art can reach the parts of us where ordinary language runs out."
      />
      <Section eyebrow="Art Therapy Works For Everyone" title="You do not need to be an artist.">
        <div className="split">
          <Reveal className="copy-stack">
            <p>
              Art therapy uses creative process, imagery, and therapeutic relationship
              to support mental health, self-awareness, and emotional growth.
            </p>
            <p>
              The artwork is not judged as good or bad. It becomes a visible record of
              inner experience, helping clients find language, insight, and choice.
            </p>
          </Reveal>
          <Reveal className="quote-panel">
            <Quote />
            <p>“Art washes away from the soul the dust of everyday life.”</p>
            <span>- Pablo Picasso</span>
          </Reveal>
        </div>
      </Section>
      <Section eyebrow="Educational Resources" title="Connected to the wider field.">
        <CardGrid>
          {[
            ['American Art Therapy Association', links.aata],
            ['New Jersey Art Therapy Association', links.njata],
            ['NeuroArts Blueprint', links.neuroArts],
            ['The Aspen Institute', links.aspen],
          ].map(([item, href]) => (
            <Reveal className="resource-card" key={item}>
              <Sparkles />
              <h3>{item}</h3>
              <p>Reference point for learning more about the art therapy and neuroarts field.</p>
              <a href={href} target="_blank" rel="noreferrer">
                Visit resource <ArrowRight size={16} />
              </a>
            </Reveal>
          ))}
        </CardGrid>
      </Section>
    </>
  );
}

function WorkshopsPage() {
  return (
    <>
      <PageHero
        eyebrow="Services / Corporate Workshops"
        title="Creative workplace sessions for teams that need to breathe together."
        body="Tracey brings art therapy-informed experiences to corporate groups, helping teams practice reflection, communication, and nervous-system awareness."
      />
      <Section eyebrow="For Teams" title="A workshop can be restorative without being fluffy.">
        <div className="three-column">
          {[
            ['Connection', 'Shared creative prompts give teams a low-pressure way to see one another differently.'],
            ['Regulation', 'Hands-on process helps participants slow down and notice stress signals.'],
            ['Insight', 'Reflection turns the artwork into conversation, language, and practical next steps.'],
          ].map(([title, text]) => (
            <Reveal className="soft-card" key={title}>
              <Users />
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="A record of trust, care, and change."
        body="A refreshed place for client and workshop feedback, presented with warmth and privacy."
      />
      <Section eyebrow="Kind Words" title="The work leaves people feeling seen.">
        <CardGrid>
          {testimonials.map((text) => (
            <Reveal className="testimonial-card" key={text}>
              <Quote />
              <p>{text}</p>
            </Reveal>
          ))}
        </CardGrid>
      </Section>
    </>
  );
}

function AboutPage(onNavigate: (href: string) => void) {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Tracey Saia LPAT, MS, ATR-BC, ATCS"
        body="A licensed professional art therapist with deep experience helping people explore what they feel, why it matters, and how to move forward."
      />
      <Section eyebrow="Meet Tracey" title="Prepared care with creative depth.">
        <BioBlock onNavigate={onNavigate} />
      </Section>
      <Section eyebrow="Affiliations" title="Connected to professional standards and the field.">
        <CardGrid>
          {[
            ['American Art Therapy Association', links.aata],
            ['New Jersey Art Therapy Association', links.njata],
            ['Board of Creative Arts and Activities Therapies (NJ)', links.njBoard],
          ].map(([item, href]) => (
            <Reveal className="resource-card" key={item}>
              <CalendarHeart />
              <h3>{item}</h3>
              <p>Professional grounding for ethical, informed, art therapy practice.</p>
              <a href={href} target="_blank" rel="noreferrer">
                Visit resource <ArrowRight size={16} />
              </a>
            </Reveal>
          ))}
        </CardGrid>
      </Section>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Take the first step today."
        body="Schedule a free introductory session with Tracey or reach out about speaking engagements and corporate workshops."
      />
      <Section eyebrow="Let's Talk" title="Tracey E. Saia, A.R.T. Therapy, LLC.">
        <div className="contact-grid">
          <Reveal className="contact-card">
            <Mail />
            <h3>Email</h3>
            <a href={links.email}>tracey@traceyesaia.com</a>
          </Reveal>
          <Reveal className="contact-card">
            <Phone />
            <h3>Phone</h3>
            <a href={links.phone}>973-532-2125</a>
          </Reveal>
          <Reveal className="contact-card">
            <MapPin />
            <h3>Office</h3>
            <a href={links.map} target="_blank" rel="noreferrer">
              84 Maple Avenue, Morristown, NJ 07960
            </a>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function RemovedCoursePage(onNavigate: (href: string) => void) {
  return (
    <>
      <PageHero
        eyebrow="Removed"
        title="The online course page is not part of this new site."
        body="This redesign keeps Tracey's practice, services, workshops, resources, testimonials, about page, and contact pathways focused and easy to browse."
      />
      <section className="final-cta compact">
        <Reveal>
          <p className="eyebrow">Next Step</p>
          <h2>Looking for Tracey&apos;s work?</h2>
          <p>Start with services or reach out directly.</p>
          <button className="primary-button" onClick={() => onNavigate('/services')}>
            View Services <ArrowRight size={18} />
          </button>
        </Reveal>
      </section>
    </>
  );
}

function Hero({
  eyebrow,
  title,
  body,
  cta,
  onCta,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  onCta: () => void;
}) {
  return (
    <section className="hero">
      <motion.div className="hero-bg" style={{ backgroundImage: `url("${oceanImage}")` }} />
      <div className="hero-overlay" />
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{body}</p>
        <div className="hero-actions">
          <button className="primary-button" onClick={onCta}>
            {cta} <ArrowRight size={18} />
          </button>
          <a className="ghost-button" href={links.instagram} target="_blank" rel="noreferrer">
            Follow Tracey
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function PageHero({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <section className="page-hero">
      <div className="waterline" />
      <Reveal className="page-hero-inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{body}</p>
      </Reveal>
    </section>
  );
}

function ServicesGrid({ limit }: { limit?: number }) {
  return (
    <Section eyebrow="Services" title="Creative therapy for real-life change.">
      <CardGrid>
        {services.slice(0, limit).map((service) => (
          <Reveal className="service-card" key={service.title}>
            <service.icon />
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            {service.href ? <a href={service.href}>Explore workshops</a> : null}
          </Reveal>
        ))}
      </CardGrid>
    </Section>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section">
      <Reveal className="section-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="card-grid">{children}</div>;
}

function ResourceCard({
  title,
  text,
  href,
  icon: Icon,
}: {
  title: string;
  text: string;
  href: string;
  icon: typeof BookOpen;
}) {
  return (
    <Reveal className="resource-card">
      <Icon />
      <h3>{title}</h3>
      <p>{text}</p>
      <a href={href} target="_blank" rel="noreferrer">
        Open resource <ArrowRight size={16} />
      </a>
    </Reveal>
  );
}

function BioBlock({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <div className="bio">
      <Reveal className="portrait-wrap">
        <img src={portraitImage} alt="Tracey Saia" />
      </Reveal>
      <Reveal className="copy-stack">
        <p>
          Tracey helps people who are ready to make positive change in their lives.
          Together, clients learn skills that support self-trust, emotional awareness,
          and more confident decision-making.
        </p>
        <p>
          Her site also collects the parts of her work people often ask about:
          therapy services, corporate workshops, educational resources, podcast
          appearances, newsletter writing, social channels, and creative tools.
        </p>
        <button className="primary-button" onClick={() => onNavigate('/contact')}>
          Contact Tracey <ArrowRight size={18} />
        </button>
      </Reveal>
    </div>
  );
}

function FinalCta({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <section className="final-cta">
      <Reveal>
        <p className="eyebrow">Ready</p>
        <h2>Take the first step today.</h2>
        <p>Schedule your free introductory session with Tracey.</p>
        <button className="primary-button" onClick={() => onNavigate('/contact')}>
          Let&apos;s Talk <ArrowRight size={18} />
        </button>
      </Reveal>
    </section>
  );
}

function Footer({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <footer className="footer">
      <div>
        <strong>Tracey E. Saia, Art Therapy</strong>
        <p>84 Maple Avenue, Morristown, NJ 07960</p>
        <p>
          <a href={links.email}>tracey@traceyesaia.com</a> · <a href={links.phone}>973-532-2125</a>
        </p>
      </div>
      <div className="footer-nav">
        {nav.map((item) => (
          <button key={item.href} onClick={() => onNavigate(item.href)}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="socials">
        <a href={links.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
          <Instagram />
        </a>
        <a href={links.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
          <Linkedin />
        </a>
        <a href={links.facebook} aria-label="Facebook" target="_blank" rel="noreferrer">
          <Facebook />
        </a>
      </div>
      <p className="copyright">2025 A.R.T. Therapy, LLC. All rights reserved.</p>
    </footer>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
