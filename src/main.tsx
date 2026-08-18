import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarHeart,
  Check,
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
  PenLine,
  Phone,
  Quote,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import './styles.css';

const images = {
  ocean:
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85',
  portrait:
    '/assets/tracey-headshot.webp',
  logo:
    'https://images.squarespace-cdn.com/content/v1/6442caccee1a772cba82370e/cad0cf61-3b7a-4a7b-bb56-f33649573dcb/Tracey+Saia.png?format=1500w',
  office:
    '/assets/tracey-office.webp',
  materials:
    '/assets/child-artwork.webp',
  workshop:
    'https://images.squarespace-cdn.com/content/v1/6442caccee1a772cba82370e/a3d02b06-6c9a-4b6c-b91d-837a45586ce8/IMG_1298+2.jpg?format=1500w',
};

const links = {
  email: 'mailto:tracey@traceyesaia.com',
  phone: 'tel:+19735322125',
  map: 'https://www.google.com/maps/search/?api=1&query=84+Maple+Avenue+Morristown+NJ+07960',
  instagram: 'https://www.instagram.com/traceysarttherapy/',
  linkedin: 'https://www.linkedin.com/in/tracey-saia-ms-atr-bc/',
  facebook: 'https://www.facebook.com/profile.php?id=61552748771961',
  newsletter: 'http://eepurl.com/jryXtY',
  coloringBook:
    'https://www.amazon.com/Color-My-Feelings-Safari-coloring/dp/B0DX78RFS4/',
  aata: 'https://arttherapy.org/',
  njata: 'https://www.njarttherapy.com/',
  anxietyInstitute: 'https://anxietyinstitute.com/',
};

const podcastLinks = [
  {
    title: 'The Body, Feelings, and Art Therapy',
    href: 'https://www.youtube.com/watch?v=xRrHFFM_lD8',
    videoId: 'xRrHFFM_lD8',
  },
  {
    title: 'Creative Reflection in Practice',
    href: 'https://www.youtube.com/watch?v=B_y9XDWqOTc&t=598s',
    videoId: 'B_y9XDWqOTc',
  },
  {
    title: 'Art Therapy Conversation',
    href: 'https://www.youtube.com/watch?v=fNLpwfQAlSg',
    videoId: 'fNLpwfQAlSg',
  },
];

const nav = [
  {
    label: 'Therapy',
    href: '/services',
    children: [
      { label: 'Therapy / Services', href: '/services' },
      { label: 'What to Expect', href: '/expect' },
      { label: 'What Is Art Therapy?', href: '/art-therapy' },
    ],
  },
  { label: 'About Tracey', href: '/about' },
  { label: 'Rewired', href: '/rewired' },
  { label: 'Corporate', href: '/services/corporate-workshops' },
  { label: 'Contact', href: '/contact' },
];

const concerns = [
  'Anxiety and overwhelm',
  'Relationship patterns',
  'Feeling disconnected from yourself',
  'Life transitions',
  'Parenting and family challenges',
  'Trauma',
  'Divorce or separation',
  'Children or teens who are struggling',
  'Feeling stuck without knowing exactly why',
];

const therapyGroups = [
  ['Adults', 'A quiet place to look at the patterns, worries, and inner dialogue that may be shaping your days.'],
  ['Children', 'Creative, age-sensitive support for children who need more than words to show what is happening.'],
  ['Teens', 'A respectful space for identity, anxiety, relationships, school stress, and self-advocacy.'],
  ['Couples and relationships', 'Support for noticing patterns, practicing communication, and making room for honesty.'],
  ['Parents and families', 'Guidance around connection, boundaries, transitions, and the needs of children or teens.'],
];

const artTools = [
  'Conversation',
  'Drawing',
  'Writing',
  'Mind maps',
  'Timelines',
  'Images',
  'Collage',
  'Color',
  'Visual metaphors',
];

const credentials = ['25+ Years of Experience', 'LPAT', 'ATR-BC', 'ATCS', 'Trauma-Informed', 'Art Psychotherapist'];

const quietQuotes = [
  'Sometimes we understand something intellectually long before we understand how it is affecting us emotionally.',
  'Art can give shape to something that has been hard to say out loud.',
  'You do not need to know exactly what you want to work on before reaching out.',
];

const aboutResources = [
  {
    title: 'Coloring Book',
    body: 'Color My Feelings Safari is a gentle creative resource for naming, noticing, and exploring feelings.',
    href: links.coloringBook,
    icon: BookOpen,
  },
  {
    title: 'Newsletter',
    body: 'Join Tracey\'s list for reflections, updates, resources, and creative prompts.',
    href: links.newsletter,
    icon: Mail,
  },
  {
    title: 'Instagram',
    body: 'Follow Tracey\'s art therapy practice, resources, and creative reflections.',
    href: links.instagram,
    icon: Instagram,
  },
  {
    title: 'LinkedIn',
    body: 'Connect with Tracey professionally for workshops, supervision, education, and speaking.',
    href: links.linkedin,
    icon: Linkedin,
  },
  {
    title: 'Facebook',
    body: 'Find updates from Tracey E. Saia, Art Therapy on Facebook.',
    href: links.facebook,
    icon: Facebook,
  },
];

const workshopPrograms = [
  {
    title: 'The Art of Receiving',
    hook: 'A reflective workshop about feedback, support, and what it takes to let useful input in.',
    challenge: 'Defensiveness, low trust, and teams that struggle to receive feedback.',
    experience: 'Participants use visual prompts and guided reflection to notice their default response patterns.',
    takeaways: ['More self-awareness', 'Better feedback conversations', 'Language for support and resistance'],
    duration: '60-90 minutes',
    audience: 'Leadership teams, managers, and professional development groups',
  },
  {
    title: 'All Fine',
    hook: 'A creative look at the gap between how people appear at work and what they may be carrying.',
    challenge: 'Burnout, emotional masking, and cultures where people say they are fine until they are not.',
    experience: 'Participants explore stress signals, emotional language, and team norms through art-based exercises.',
    takeaways: ['Stress awareness', 'Healthier check-ins', 'Practical regulation tools'],
    duration: '75-120 minutes',
    audience: 'Employee wellness, HR, offsites, and mental-health initiatives',
  },
  {
    title: 'Creating Your Own Mandala',
    hook: 'A structured creative process for focus, self-reflection, and grounded leadership.',
    challenge: 'High-pressure teams that need a restorative but purposeful shared experience.',
    experience: 'Participants create a personal mandala and reflect on balance, attention, and intention.',
    takeaways: ['Calmer focus', 'Shared reflection', 'A memorable visual anchor'],
    duration: '60-90 minutes',
    audience: 'Women\'s leadership groups, conferences, and team retreats',
  },
  {
    title: 'Motivational Quote',
    hook: 'A workshop that turns personal values into a visible reminder of purpose and resilience.',
    challenge: 'Teams that need renewed energy, clarity, or connection to mission.',
    experience: 'Participants choose meaningful language and pair it with color, image, and composition.',
    takeaways: ['Values clarity', 'Creative confidence', 'Individual and group insight'],
    duration: '45-75 minutes',
    audience: 'Conferences, wellness days, and employee experience programs',
  },
];

type PageProps = {
  onNavigate: (href: string) => void;
};

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const Page = useMemo(() => routeFor(path), [path]);

  const navigate = useCallback((href: string) => {
    const url = new URL(href, window.location.origin);
    const nextPath = url.pathname === '/' ? '/' : url.pathname.replace(/\/$/, '');
    window.history.pushState({}, '', `${nextPath}${url.hash}`);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest('a[href]') as HTMLAnchorElement | null;

      if (!anchor || anchor.target || anchor.hasAttribute('download')) return;

      const url = new URL(anchor.href);
      const samePageHash = url.pathname === window.location.pathname && Boolean(url.hash);

      if (url.origin !== window.location.origin || samePageHash || anchor.href.startsWith('mailto:') || anchor.href.startsWith('tel:')) {
        return;
      }

      event.preventDefault();
      navigate(`${url.pathname}${url.hash}`);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  return (
    <div>
      <Nav currentPath={path} onNavigate={navigate} />
      <main>
        <Page onNavigate={navigate} />
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

function routeFor(path: string) {
  if (path === '/services') return TherapyPage;
  if (path === '/expect' || path === '/what-to-expect-when-you-work-with-tracey') return ExpectPage;
  if (path === '/art-therapy' || path === '/what-is-art-therapy') return ArtTherapyPage;
  if (path === '/about') return AboutPage;
  if (path === '/rewired') return RewiredPage;
  if (path === '/services/corporate-workshops' || path === '/corporate-workshops') return CorporatePage;
  if (path === '/contact') return ContactPage;
  if (path === '/course') return RemovedCoursePage;
  if (path === '/testimonials') return TestimonialsPage;
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
        <img src={images.logo} alt="" />
        <span>Home</span>
      </button>
      <nav className="desktop-nav" aria-label="Main navigation">
        {nav.map((item) => (
          <div className="nav-item" key={item.href}>
            <button className={currentPath === item.href ? 'active' : ''} onClick={() => go(item.href)}>
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
      <a className="header-link" href={links.email}>
        Reach Out
      </a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        {open ? <X /> : <Menu />}
      </button>
      {open ? (
        <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          {nav.flatMap((item) => [item, ...(item.children ?? [])]).map((item) => (
            <button key={item.href} onClick={() => go(item.href)}>
              {item.label}
            </button>
          ))}
        </motion.nav>
      ) : null}
    </header>
  );
}

function HomePage({ onNavigate }: PageProps) {
  return (
    <>
      <section className="home-hero">
        <div className="hero-photo" style={{ backgroundImage: `url("${images.ocean}")` }} />
        <div className="hero-shade" />
        <div className="hero-color-field" />
        <Reveal className="home-hero-copy">
          <p className="eyebrow">Tracey Saia, LPAT, MS, ATR-BC, ATCS</p>
          <h1>Trust Yourself</h1>
          <p>
            Art therapy and psychotherapy in Morristown, NJ with a creative, grounded, deeply human approach.
          </p>
          <div className="soft-actions">
            <button className="soft-button light" onClick={() => onNavigate('/art-therapy')}>
              Learn About My Approach <ArrowRight size={17} />
            </button>
            <button className="text-button light-text" onClick={() => onNavigate('/contact')}>
              Contact Tracey
            </button>
          </div>
        </Reveal>
        <Reveal className="hero-note">
          <span>25+ years</span>
          <p>Psychotherapy, creativity, visual thinking, and room to understand yourself differently.</p>
        </Reveal>
      </section>

      <Section eyebrow="Introduction" title="Hi, I'm Tracey." className="intro-section">
        <div className="portrait-intro">
          <Reveal className="portrait-card cutout-portrait">
            <img src={images.portrait} alt="Tracey Saia" />
          </Reveal>
          <Reveal className="first-person">
            <p>
              I create a safe and judgment-free therapeutic environment where we can explore the thoughts,
              feelings, and behaviors that show up during difficult life situations.
            </p>
            <p>
              I want to help people who are ready to make positive change in their lives. Together, we work
              toward self-understanding, emotional awareness, and the ability to trust your own decisions.
            </p>
            <QuietQuote text={quietQuotes[0]} />
          </Reveal>
        </div>
      </Section>

      <Section eyebrow="What Brings People Here" title="People come to therapy for all kinds of reasons.">
        <Reveal className="concern-cloud">
          {concerns.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </Reveal>
      </Section>

      <OfficeSection />
      <ArtTherapyIntro onNavigate={onNavigate} />
      <Credentials />

      <Section eyebrow="More From Tracey" title="Other ways Tracey's work takes shape.">
        <div className="feature-pair">
          <Reveal className="editorial-feature">
            <BookOpen />
            <h3>Rewired</h3>
            <p>
              A 10-week program about regulation, reflection, and understanding your inner patterns with
              more clarity and compassion.
            </p>
            <button className="text-button" onClick={() => onNavigate('/rewired')}>
              Learn About Rewired <ArrowRight size={16} />
            </button>
          </Reveal>
          <Reveal className="business-feature">
            <BriefcaseBusiness />
            <h3>Corporate Workshops</h3>
            <p>
              Experiential workshops for teams, leaders, wellness programs, and conferences that want
              emotional intelligence to become something people can actually practice.
            </p>
            <button className="corporate-button" onClick={() => onNavigate('/services/corporate-workshops')}>
              Explore Workshops <ArrowRight size={17} />
            </button>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function TherapyPage(_: PageProps) {
  return (
    <>
      <PageHero
        eyebrow="Therapy / Services"
        title="There is no single reason someone begins therapy."
        body="Some people arrive with a clear question. Others only know that something feels off. Tracey's work creates room for both."
      />
      <Section eyebrow="Who Tracey Works With" title="Therapy for different ages, relationships, and seasons of life.">
        <div className="text-list">
          {therapyGroups.map(([title, text]) => (
            <Reveal className="text-list-item" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </Section>
      <OfficeSection compact />
      <Section eyebrow="Common Threads" title="What we notice together often becomes easier to hold.">
        <div className="two-column-copy">
          <Reveal>
            <p>
              Therapy can increase awareness of how thoughts and feelings are connected. You may begin to
              notice the impact of inner dialogue, old stories, family patterns, or stress on the choices
              available to you.
            </p>
          </Reveal>
          <QuietQuote text="Your negative self-talk may be holding you back, but it can also become something you learn to recognize." />
        </div>
      </Section>
    </>
  );
}

function ExpectPage(_: PageProps) {
  const steps = [
    ['Reaching Out', 'You do not need to have the perfect words. A short message is enough to begin.'],
    ['Our First Conversation', 'Tracey listens for what you are looking for, what feels hard, and whether the fit feels right.'],
    ['Your First Session', 'You can talk, reflect, make art, or simply begin with what feels most accessible.'],
    ['Working Together', 'Over time, you build awareness, practice new skills, and make meaning at a pace that feels safe.'],
  ];

  return (
    <>
      <PageHero
        eyebrow="What to Expect"
        title="A first session does not require having everything figured out."
        body="This page is here to reduce uncertainty. Therapy with Tracey is collaborative, thoughtful, and grounded in safety."
      />
      <section className="office-band">
        <Reveal className="wide-image">
          <img src={images.office} alt="A calm therapy office with comfortable seating" />
        </Reveal>
        <Reveal className="office-band-copy">
          <h2>A space to slow down, talk, create, and reflect.</h2>
          <p>
            Sessions take place in Tracey's Morristown office, with telehealth available where appropriate.
            Art materials may be present, but creating art is never a requirement.
          </p>
        </Reveal>
      </section>
      <Section eyebrow="The Process" title="What happens next.">
        <div className="process-line">
          {steps.map(([title, text], index) => (
            <Reveal className="process-step" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section eyebrow="Practical Details" title="Simple information, all in one place.">
        <div className="detail-strip">
          {['Morristown office', 'Telehealth when appropriate', 'Free introductory conversation', 'Email or phone to begin'].map((item) => (
            <Reveal className="detail-item" key={item}>
              <Check size={18} />
              {item}
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

function ArtTherapyPage(_: PageProps) {
  const faqs = [
    ['Do I have to make art?', 'No. Art materials may help, but not every session needs to involve art.'],
    ['What if I am not creative?', 'You do not need artistic skill. The process is about expression, noticing, and meaning.'],
    ['Is art therapy just for children?', 'No. Adults, teens, children, families, and groups can all benefit from visual thinking.'],
    ['Will we still talk?', 'Yes. Conversation remains part of the work. Art simply gives us another way in.'],
    ['What actually happens?', 'You might draw, write, make a timeline, use images, build a metaphor, or talk through what is present.'],
  ];

  return (
    <>
      <PageHero
        eyebrow="What Is Art Therapy?"
        title="You do not have to be an artist."
        body="Art therapy is not about making something beautiful. It is about giving shape to what may be difficult to explain."
      />
      <Section eyebrow="Everyday Language" title="Sometimes words are not the easiest place to start.">
        <div className="art-flow">
          {['Experience', 'Express', 'Notice', 'Understand'].map((item) => (
            <Reveal className="flow-card" key={item}>
              <PenLine />
              <h3>{item}</h3>
            </Reveal>
          ))}
        </div>
      </Section>
      <section className="image-copy-section">
        <Reveal className="image-reveal">
          <img src={images.materials} alt="Art materials arranged on a table" />
        </Reveal>
        <Reveal className="copy-panel">
          <h2>Art therapy can include many ways of thinking.</h2>
          <p>
            Tracey may use visual metaphors, timelines, drawing, writing, collage, color, images, or
            traditional conversation. The point is not performance. The point is to see something in a different way.
          </p>
          <div className="tool-grid">
            {artTools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </Reveal>
      </section>
      <Section eyebrow="FAQ" title="Questions people often have about art therapy.">
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <Reveal className="faq-item" key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

function AboutPage(_: PageProps) {
  return (
    <>
      <PageHero
        eyebrow="About Tracey"
        title="Hi, I'm Tracey."
        body="I am an art psychotherapist, educator, supervisor, facilitator, and someone who believes creative reflection can help people understand themselves more clearly."
        image={images.portrait}
        imageAlt="Tracey Saia"
      />
      <section className="about-affiliations" aria-label="Professional affiliations">
        {[
          ['American Art Therapy Association', links.aata],
          ['New Jersey Art Therapy Association', links.njata],
          ['Anxiety Institute', links.anxietyInstitute],
        ].map(([title, href]) => (
          <a href={href} target="_blank" rel="noreferrer" key={title}>
            {title}
          </a>
        ))}
      </section>
      <Section eyebrow="Tracey the Person" title="Therapy is relational before it is anything else.">
        <div className="portrait-intro reverse">
          <Reveal className="first-person">
            <p>
              After more than 25 years in this work, I have learned that people are often carrying more than
              they can easily explain. Creativity can give us a gentle way to approach what feels tangled,
              hidden, or too familiar to notice.
            </p>
            <p>
              I value honesty, humor, steadiness, and the kind of therapeutic relationship where a person
              can feel both supported and respectfully challenged.
            </p>
            <QuietQuote text="I found I could say things with colour and shapes that I couldn't say any other way." attribution="- Georgia O'Keeffe" />
          </Reveal>
          <Reveal className="logo-showcase">
            <img src={images.logo} alt="Tracey Saia Art Therapy" />
          </Reveal>
        </div>
      </Section>
      <Credentials />
      <Section eyebrow="Podcasts" title="Conversations with Tracey.">
        <div className="podcast-grid">
          {podcastLinks.map((podcast, index) => (
            <Reveal className="podcast-card" key={podcast.videoId}>
              <a href={podcast.href} target="_blank" rel="noreferrer" aria-label={`Watch ${podcast.title} on YouTube`}>
                <img
                  src={`https://img.youtube.com/vi/${podcast.videoId}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                />
                <span className="play-mark">
                  <Mic2 size={18} />
                  Watch
                </span>
              </a>
              <div>
                <p className="eyebrow">Episode {index + 1}</p>
                <h3>{podcast.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section eyebrow="Resources & Media" title="Coloring book, newsletter, and social media.">
        <div className="media-grid">
          {aboutResources.map(({ title, body, href, icon: Icon }) => (
            <Reveal className="media-card" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{body}</p>
              <a className="text-button" href={href} target="_blank" rel="noreferrer">
                Visit <ArrowRight size={16} />
              </a>
            </Reveal>
          ))}
        </div>
      </Section>
      <section className="quote-feature">
        <Reveal>
          <p className="eyebrow">Tracey On The Work</p>
          <blockquote>
            As more research comes out, we find that a lot of emotion starts in the body. The idea that
            feelings and emotions are only in our head is no longer true.
          </blockquote>
          <p className="quote-attribution">- Tracey Saia</p>
        </Reveal>
      </section>
    </>
  );
}

function RewiredPage({ onNavigate }: PageProps) {
  return (
    <>
      <PageHero
        eyebrow="Rewired"
        title="A 10-week journey toward regulation, reflection, and self-understanding."
        body="Rewired is a structured program connected to Tracey's belief that change begins when we can notice what is happening within us."
      />
      <Section eyebrow="What Is Rewired?" title="A program for understanding patterns from the inside out.">
        <div className="two-column-copy">
          <Reveal>
            <p>
              Rewired is designed for people who want a clearer relationship with their nervous system,
              inner dialogue, choices, and emotional patterns.
            </p>
            <p>
              The course gives the work a simple rhythm so people can return to the ideas between sessions and keep practicing in ordinary life.
            </p>
          </Reveal>
          <QuietQuote text="You cannot change what is going on around you until you change what is going on within you." attribution="- Zig Ziglar" />
        </div>
      </Section>
      <Section eyebrow="The 10-Week Journey" title="Each week builds a little more language for what is happening inside.">
        <div className="journey-grid">
          {Array.from({ length: 10 }, (_, index) => (
            <Reveal className="journey-card" key={index}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>Week {index + 1}</h3>
              <p>Reflection, regulation, creative exploration, and practical integration.</p>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section eyebrow="How to Participate" title="Interested in Rewired?">
        <Reveal className="program-cta">
          <p>Reach out to Tracey to ask about upcoming availability, format, and fit.</p>
          <button className="soft-button" onClick={() => onNavigate('/contact')}>
            Ask About Rewired <ArrowRight size={17} />
          </button>
        </Reveal>
      </Section>
    </>
  );
}

function CorporatePage({ onNavigate }: PageProps) {
  return (
    <>
      <section className="corporate-hero">
        <Reveal className="corporate-hero-copy">
          <p className="eyebrow">Corporate Workshops</p>
          <h1>The Art of Leadership</h1>
          <h2>Unlocking Emotional Intelligence Through Creativity</h2>
          <p>
            Tracey designs experiential workshops that help teams practice emotional intelligence,
            communication, self-awareness, resilience, leadership, and creative problem-solving.
          </p>
          <div className="soft-actions">
            <button className="corporate-button" onClick={() => onNavigate('/contact')}>
              Bring Tracey to Your Organization <ArrowRight size={17} />
            </button>
            <a className="outline-button" href="#workshops">
              Explore Workshops
            </a>
          </div>
        </Reveal>
        <Reveal className="corporate-image">
          <img src={images.workshop} alt="Tracey facilitating a creative corporate workshop" />
        </Reveal>
      </section>
      <Section eyebrow="Designed For" title="Built for teams that need more than another slide deck.">
        <div className="designed-grid">
          {['Leadership teams', 'Employee wellness', 'Team offsites', 'Women\'s leadership groups', 'Mental-health initiatives', 'Conferences', 'Professional development'].map((item) => (
            <Reveal className="designed-item" key={item}>
              {item}
            </Reveal>
          ))}
        </div>
      </Section>
      <Section eyebrow="Workshop Programs" title="Experiential, memorable, and practical." id="workshops">
        <div className="workshop-grid">
          {workshopPrograms.map((program) => (
            <Reveal className="workshop-card" key={program.title}>
              <h3>{program.title}</h3>
              <p className="hook">{program.hook}</p>
              <dl>
                <dt>Challenge</dt>
                <dd>{program.challenge}</dd>
                <dt>Experience</dt>
                <dd>{program.experience}</dd>
                <dt>Duration</dt>
                <dd>{program.duration}</dd>
                <dt>Ideal Audience</dt>
                <dd>{program.audience}</dd>
              </dl>
              <ul>
                {program.takeaways.map((takeaway) => (
                  <li key={takeaway}>
                    <Check size={15} /> {takeaway}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section eyebrow="What Makes It Different" title="Clinical depth meets creative facilitation.">
        <div className="outcomes">
          {['25+ years of psychotherapy experience', 'Art therapy-informed facilitation', 'Emotional intelligence made experiential', 'Virtual or in-person availability', 'A warm but professional room tone'].map((item) => (
            <Reveal className="outcome" key={item}>
              <Sparkles />
              <p>{item}</p>
            </Reveal>
          ))}
        </div>
      </Section>
      <section className="corporate-close">
        <Reveal>
          <h2>Bring Tracey to your organization.</h2>
          <p>Plan a workshop for your leadership group, offsite, wellness initiative, or conference.</p>
          <button className="corporate-button" onClick={() => onNavigate('/contact')}>
            Discuss a Workshop <ArrowRight size={18} />
          </button>
        </Reveal>
      </section>
    </>
  );
}

function ContactPage(_: PageProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', reason: 'Therapy', message: '' });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nReaching out about: ${form.reason}\n\n${form.message}`,
    );
    window.location.href = `${links.email}?subject=${encodeURIComponent(`Website inquiry: ${form.reason}`)}&body=${body}`;
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach out when you're ready."
        body="You do not need to know exactly what you want to work on before contacting Tracey."
      />
      <section className="contact-layout">
        <Reveal className="contact-aside">
          <img className="contact-logo" src={images.logo} alt="Tracey Saia Art Therapy" />
          <h2>Let's talk.</h2>
          <p>Therapy, Rewired, workshops, speaking, or a question that does not fit neatly anywhere.</p>
          <a href={links.phone}><Phone size={17} /> 973-532-2125</a>
          <a href={links.email}><Mail size={17} /> tracey@traceyesaia.com</a>
          <a href={links.map} target="_blank" rel="noreferrer"><MapPin size={17} /> 84 Maple Avenue, Morristown, NJ 07960</a>
        </Reveal>
        <Reveal>
          <form className="contact-form" onSubmit={submit}>
            <label>
              Name
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <label>
              Email
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>
            <label>
              Phone <span>optional</span>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </label>
            <label>
              What are you reaching out about?
              <select value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })}>
                <option>Therapy</option>
                <option>Rewired</option>
                <option>Corporate Workshop</option>
                <option>Speaking</option>
                <option>Other</option>
              </select>
            </label>
            <label className="full">
              Message
              <textarea required rows={7} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </label>
            <button className="soft-button" type="submit">
              Send Message <ArrowRight size={17} />
            </button>
          </form>
        </Reveal>
      </section>
    </>
  );
}

function TestimonialsPage(_: PageProps) {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Quiet reflections from people who have worked with Tracey."
        body="Testimonials are no longer a main navigation item, but the reflections are preserved here and woven through the site."
      />
      <Section eyebrow="Reflections" title="A few words about the work.">
        <div className="quote-grid">
          {quietQuotes.map((quote) => (
            <QuietQuote key={quote} text={quote} />
          ))}
        </div>
      </Section>
    </>
  );
}

function RemovedCoursePage({ onNavigate }: PageProps) {
  return (
    <>
      <PageHero
        eyebrow="Removed"
        title="The old course page is no longer part of the main site."
        body="Rewired now has a public-facing program page, while participant login and course controls can stay separate."
      />
      <section className="program-cta">
        <button className="soft-button" onClick={() => onNavigate('/rewired')}>
          Learn About Rewired <ArrowRight size={17} />
        </button>
      </section>
    </>
  );
}

function OfficeSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? 'office-story compact-office' : 'office-story'}>
      <Reveal className="office-image">
        <img src={images.office} alt="A calm therapy office with comfortable seating and natural light" />
      </Reveal>
      <Reveal className="office-copy">
        <p className="eyebrow">Morristown Office</p>
        <h2>A space to feel comfortable being yourself.</h2>
        <p>
          Sessions take place in Tracey's Morristown office, with telehealth available where appropriate.
          Art materials may be present, but art is always optional and you are not expected to produce or be good at art.
        </p>
      </Reveal>
    </section>
  );
}

function ArtTherapyIntro({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <Section eyebrow="Art Therapy" title="Sometimes words are not the easiest place to start.">
      <div className="image-copy-section">
        <Reveal className="copy-panel">
          <p>
            Art therapy is a way of noticing and expressing what may be difficult to access through conversation alone.
          </p>
          <div className="tool-grid">
            {artTools.slice(0, 8).map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
          <button className="text-button" onClick={() => onNavigate('/art-therapy')}>
            Learn About Art Therapy <ArrowRight size={16} />
          </button>
        </Reveal>
        <Reveal className="image-reveal">
          <img src={images.materials} alt="Art materials used for reflection and visual exploration" />
        </Reveal>
      </div>
    </Section>
  );
}

function Credentials() {
  return (
    <Section eyebrow="Credentials" title="Training, credentials, and experience that support the work.">
      <Reveal className="credential-row">
        {credentials.map((credential) => (
          <span key={credential}>{credential}</span>
        ))}
      </Reveal>
    </Section>
  );
}

function PageHero({
  eyebrow,
  title,
  body,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="page-hero">
      <div className="organic-mark" />
      <div className={image ? 'page-hero-split' : ''}>
        <Reveal className="page-hero-inner">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{body}</p>
        </Reveal>
        {image ? (
          <Reveal className="page-hero-photo">
            <img src={image} alt={imageAlt ?? ''} />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

function Section({
  eyebrow,
  title,
  children,
  className = '',
  id,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section className={`section ${className}`} id={id}>
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function QuietQuote({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <Reveal className="quiet-quote">
      <Quote />
      <p>{text}</p>
      {attribution ? <span>{attribution}</span> : null}
    </Reveal>
  );
}

function Footer({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <footer className="footer">
      <div>
        <strong>Tracey E. Saia, Art Therapy</strong>
        <p>LPAT, MS, ATR-BC, ATCS</p>
        <p>84 Maple Avenue, Morristown, NJ 07960</p>
      </div>
      <nav className="footer-nav" aria-label="Footer navigation">
        {[
          ['Therapy', '/services'],
          ['About', '/about'],
          ['Art Therapy', '/art-therapy'],
          ['Rewired', '/rewired'],
          ['Corporate', '/services/corporate-workshops'],
          ['Contact', '/contact'],
        ].map(([label, href]) => (
          <button key={href} onClick={() => onNavigate(href)}>
            {label}
          </button>
        ))}
      </nav>
      <div className="footer-contact">
        <a href={links.email}>tracey@traceyesaia.com</a>
        <a href={links.phone}>973-532-2125</a>
        <div className="socials">
          <a href={links.instagram} aria-label="Instagram" target="_blank" rel="noreferrer"><Instagram /></a>
          <a href={links.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin /></a>
          <a href={links.facebook} aria-label="Facebook" target="_blank" rel="noreferrer"><Facebook /></a>
        </div>
      </div>
      <p className="copyright">2025 A.R.T. Therapy, LLC. All rights reserved.</p>
    </footer>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
