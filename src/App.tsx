import type { FormEvent, ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'motion/react';
import { 
  Megaphone, 
  MonitorSmartphone, 
  Cpu, 
  Clapperboard, 
  Gamepad2, 
  Lightbulb,
  MapPin,
  Globe,
  ArrowRight,
  ArrowUp,
  Twitter,
  Instagram,
  Linkedin,
  X
} from 'lucide-react';

const translations = {
  en: {
    hero: {
      title: "VIETNAM'S FIRST\nFULL-STACK\nCREATIVE STUDIO",
      subtitle: "Where <span class='text-neon-pink font-semibold'>20+ years of creative experience</span> meets the <span class='text-neon-pink font-semibold'>next generation of Vietnamese talent</span>. A full-stack powerhouse powered by AI, rooted in the heart of Hoi An.",
      cta: "WORK WITH US"
    },
    bridging: {
      title: "BRIDGING WORLDS",
      p1: "Rooted in Hoi An's dynamic creative scene and guided by over two decades of global leadership in UI/UX, games, and digital storytelling, Neon Shaman Studios bridges international best practices with Vietnam's fastest-growing talent pool.",
      p2: "We leverage proprietary AI pipelines and agile prototyping to create full-stack work that combines strategic depth with cultural resonance: marketing campaigns, emerging-tech applications, indie games, immersive experiences, and cinematic AI films.",
      p3: "Every project is designed to perform in competitive markets, spark engagement, and build lasting value—starting in central Vietnam and scaling across SEA and beyond.",
      badge1: "HOI AN ROOTS",
      badge2: "GLOBAL REACH"
    },
    services: {
      title: "WHAT WE DO",
      items: [
        { title: "MARKETING &\nBRANDING", icon: Megaphone },
        { title: "WEB & APP\nDEVELOPMENT", icon: MonitorSmartphone },
        { title: "AI &\nEMERGING TECH", icon: Cpu },
        { title: "VIDEO\nPRODUCTION", icon: Clapperboard },
        { title: "GAME\nDEVELOPMENT", icon: Gamepad2 },
        { title: "CREATIVE\nCONSULTING", icon: Lightbulb }
      ]
    },
    experience: {
      title: "PAST EXPERIENCE"
    },
    team: {
      title: "THE TEAM",
      members: [
        { name: "JODY", role: "FOUNDER &\nCREATIVE DIRECTOR", img: "/images/J.jpg" },
      ]
    },
    cta: {
      title: "READY TO\nEMBRACE THE FUTURE?",
      button: "WORK WITH US"
    },
    contact: {
      title: "WORK WITH US",
      name: "Name",
      phone: "Phone Number",
      email: "Email Address",
      message: "Message",
      submit: "SEND MESSAGE",
      submitting: "SENDING...",
      success: "Message sent successfully!",
      close: "Close"
    },
    footer: {
      copyright: "© 2026 Neon Shaman Studios. Hoi An, Vietnam."
    }
  }
};

export default function App() {
  const t = translations.en;

  // SEO
  useEffect(() => {
    document.title = "Neon Shaman Studios | Vietnam's First Full-Stack Creative Studio";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t.hero.subtitle.replace(/<[^>]*>?/gm, ''));
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = t.hero.subtitle.replace(/<[^>]*>?/gm, '');
      document.head.appendChild(meta);
    }
  }, [t]);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.05) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // NOTE: To make this work, go to web3forms.com, enter jodycoombes@gmail.com, 
          // get your free access key, and paste it here:
          access_key: "1f6d556a-5b83-437d-b41c-f6586fa0f8b3",
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          subject: `New Contact from ${formData.name} - Neon Shaman Studios`,
          from_name: "Neon Shaman Studios Website"
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsContactModalOpen(false);
          setIsSubmitted(false);
          setFormData({ name: '', phone: '', email: '', message: '' });
        }, 2000);
      } else {
        console.error("Form submission error:", result);
        alert("Something went wrong. Please try again or email us directly.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white font-sans selection:bg-neon-pink selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-dark-bg/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          {/* Replace src with your actual logo path, e.g., /logo.png if placed in the public folder */}
          <img 
            src="/images/logo.png" 
            alt="Neon Shaman Studios" 
            className="h-8 md:h-10 w-auto object-contain"
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 pb-12">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute -top-10 left-0 right-0 h-[calc(100%+40px)] z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/60 to-dark-bg z-10" />
          <img 
            src="/images/hero-bg.jpg" 
            alt="Neon Shaman Studios Hero Background"
            className="w-full h-full object-cover object-[center_top]"
          />
        </motion.div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-8">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.2] mb-6 whitespace-pre-line text-glow"
          >
            {t.hero.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t.hero.subtitle }}
          />

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsContactModalOpen(true)}
            className="bg-neon-pink text-white font-display font-semibold tracking-wider px-6 py-3 md:px-8 md:py-4 rounded-full shadow-[0_0_20px_rgba(255,0,85,0.4)] hover:shadow-[0_0_30px_rgba(255,0,85,0.6)] transition-all"
          >
            {t.hero.cta}
          </motion.button>
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      {/* Bridging Worlds */}
      <section className="py-20 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center w-full"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-[4/3] box-glow w-full max-w-lg mx-auto lg:max-w-none border border-neon-pink/40">
              <img 
                // Replace this src with the image you provided
                src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1000&q=80" 
                alt="Bridging Worlds" 
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Vertical Line Below Image */}
            <div className="w-px h-12 bg-neon-pink/50 mt-6" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wide">{t.bridging.title}</h2>
            <div className="w-12 h-1 bg-neon-pink" />
            
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <p>{t.bridging.p1}</p>
              <p>{t.bridging.p2}</p>
              <p>{t.bridging.p3}</p>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Hoi+An,+Vietnam" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/5 hover:bg-neon-pink/10 border border-white/10 hover:border-neon-pink/50 transition-all px-5 py-2.5 rounded-full text-xs font-display tracking-widest uppercase cursor-pointer box-glow-hover"
              >
                <MapPin className="w-4 h-4 text-neon-pink" />
                {t.bridging.badge1}
              </a>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full text-xs font-display tracking-widest uppercase">
                <Globe className="w-4 h-4 text-[#8B5CF6]" />
                {t.bridging.badge2}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      {/* What We Do */}
      <section className="py-20 md:py-24 px-6 md:px-12 bg-[#161616]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wide mb-4">{t.services.title}</h2>
            <div className="w-16 h-1 bg-neon-pink mt-2" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 bg-white/10 gap-px border border-white/10 rounded-3xl overflow-hidden">
            {t.services.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#161616] p-10 md:p-14 flex flex-col items-center justify-center text-center gap-6"
                >
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-neon-pink opacity-80" />
                  </div>
                  <h3 className="font-display font-semibold text-sm tracking-widest whitespace-pre-line leading-relaxed text-gray-300">{item.title}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      {/* Past Experience */}
      <section className="py-20 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-start mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide mb-4">{t.experience.title}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          <motion.div whileHover={{ scale: 1.1 }} className="w-full flex justify-center items-center h-16 md:h-24">
            <img src="/images/ea.png" alt="EA Games" className="max-h-12 md:max-h-16 max-w-[120px] md:max-w-[160px] object-contain" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.3 }} className="w-full flex justify-center items-center h-16 md:h-24">
            <img src="/images/activision.png" alt="Activision" className="max-h-12 md:max-h-16 max-w-[120px] md:max-w-[160px] object-contain" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="w-full flex justify-center items-center h-16 md:h-24">
            <img src="/images/codemasters.png" alt="Codemasters" className="max-h-12 md:max-h-16 max-w-[120px] md:max-w-[160px] object-contain" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="w-full flex justify-center items-center h-16 md:h-24">
            <img src="/images/nhs.png" alt="NHS" className="max-h-12 md:max-h-16 max-w-[120px] md:max-w-[160px] object-contain" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="w-full flex justify-center items-center h-16 md:h-24">
            <img src="/images/levis.png" alt="Levi's" className="max-h-12 md:max-h-16 max-w-[120px] md:max-w-[160px] object-contain" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="w-full flex justify-center items-center h-16 md:h-24">
            <img src="/images/amd.png" alt="AMD" className="max-h-12 md:max-h-16 max-w-[120px] md:max-w-[160px] object-contain" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="w-full flex justify-center items-center h-16 md:h-24">
            <img src="/images/fpt.png" alt="FPT University" className="max-h-12 md:max-h-16 max-w-[120px] md:max-w-[160px] object-contain" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="w-full flex justify-center items-center h-16 md:h-24">
            <img src="/images/swinburne.png" alt="Swinburne University" className="max-h-12 md:max-h-16 max-w-[120px] md:max-w-[160px] object-contain" />
          </motion.div>
        </div>
      </section>


      <div className="w-full h-px bg-white/5" />

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-10 whitespace-pre-line"
          >
            {t.cta.title}
          </motion.h2>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsContactModalOpen(true)}
            className="flex items-center gap-3 bg-neon-pink text-white font-display font-semibold tracking-wider px-8 py-4 rounded-full shadow-[0_0_20px_rgba(255,0,85,0.4)] hover:shadow-[0_0_30px_rgba(255,0,85,0.6)] transition-all"
          >
            {t.cta.button}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-8 px-6 bg-dark-bg overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-pink/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm font-mono">{t.footer.copyright}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 md:bottom-24 md:right-10 z-50 bg-neon-pink text-white p-3 md:p-4 rounded-full shadow-[0_0_15px_rgba(255,0,85,0.4)] hover:shadow-[0_0_25px_rgba(255,0,85,0.6)] transition-shadow border border-white/20"
          >
            <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#121212] border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-md relative shadow-2xl my-auto"
            >
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2"
                aria-label={t.contact.close}
              >
                <X className="w-8 h-8" />
              </button>

              <h2 className="font-display text-xl md:text-2xl font-bold tracking-wide mb-6 text-center">{t.contact.title}</h2>

              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-neon-pink/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-neon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-xl font-medium">{t.contact.success}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-400 mb-1.5">{t.contact.name}</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-pink/50 focus:ring-1 focus:ring-neon-pink/50 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-gray-400 mb-1.5">{t.contact.phone}</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-pink/50 focus:ring-1 focus:ring-neon-pink/50 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-1.5">{t.contact.email}</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-pink/50 focus:ring-1 focus:ring-neon-pink/50 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-gray-400 mb-1.5">{t.contact.message}</label>
                    <textarea 
                      id="message" 
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-pink/50 focus:ring-1 focus:ring-neon-pink/50 transition-all resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 bg-neon-pink hover:bg-neon-pink/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl tracking-widest text-sm transition-all shadow-[0_0_15px_rgba(255,42,109,0.3)] w-full"
                  >
                    {isSubmitting ? t.contact.submitting : t.contact.submit}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
