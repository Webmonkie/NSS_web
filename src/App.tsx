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
  Linkedin
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
        { name: "JODY", role: "CREATIVE\nDIRECTOR", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80" },
        { name: "EMINAM", role: "FOUNDING\nDEVELOPER", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80" },
        { name: "TIEN", role: "FOUNDING\nDEVELOPER", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80" }
      ]
    },
    cta: {
      title: "READY TO\nEMBRACE THE FUTURE?",
      button: "WORK WITH US"
    },
    footer: {
      copyright: "© 2023 Neon Shaman Studios. Hoi An, Vietnam."
    }
  },
  vi: {
    hero: {
      title: "STUDIO SÁNG TẠO\nFULL-STACK ĐẦU TIÊN\nTẠI VIỆT NAM",
      subtitle: "Nơi <span class='text-neon-pink font-semibold'>hơn 20 năm kinh nghiệm sáng tạo</span> hội tụ cùng <span class='text-neon-pink font-semibold'>thế hệ tài năng trẻ Việt Nam</span>. Một trung tâm sức mạnh full-stack được thúc đẩy bởi AI, bắt nguồn từ trái tim Hội An.",
      cta: "HỢP TÁC VỚI CHÚNG TÔI"
    },
    bridging: {
      title: "KẾT NỐI THẾ GIỚI",
      p1: "Bắt nguồn từ bối cảnh sáng tạo năng động của Hội An và được dẫn dắt bởi hơn hai thập kỷ lãnh đạo toàn cầu về UI/UX, trò chơi và kể chuyện kỹ thuật số, Neon Shaman Studios kết nối các phương pháp thực hành tốt nhất quốc tế với nguồn nhân lực phát triển nhanh nhất Việt Nam.",
      p2: "Chúng tôi tận dụng các quy trình AI độc quyền và tạo mẫu nhanh để tạo ra các sản phẩm full-stack kết hợp chiều sâu chiến lược với sự cộng hưởng văn hóa: chiến dịch tiếp thị, ứng dụng công nghệ mới nổi, trò chơi độc lập, trải nghiệm nhập vai và phim AI điện ảnh.",
      p3: "Mỗi dự án đều được thiết kế để hoạt động hiệu quả trong các thị trường cạnh tranh, khơi dậy sự tương tác và xây dựng giá trị lâu dài—bắt đầu từ miền Trung Việt Nam và mở rộng ra toàn khu vực Đông Nam Á và hơn thế nữa.",
      badge1: "GỐC RỄ HỘI AN",
      badge2: "TẦM VƯƠN TOÀN CẦU"
    },
    services: {
      title: "CHÚNG TÔI LÀM GÌ",
      items: [
        { title: "TIẾP THỊ &\nTHƯƠNG HIỆU", icon: Megaphone },
        { title: "PHÁT TRIỂN\nWEB & APP", icon: MonitorSmartphone },
        { title: "AI &\nCÔNG NGHỆ MỚI", icon: Cpu },
        { title: "SẢN XUẤT\nVIDEO", icon: Clapperboard },
        { title: "PHÁT TRIỂN\nGAME", icon: Gamepad2 },
        { title: "TƯ VẤN\nSÁNG TẠO", icon: Lightbulb }
      ]
    },
    experience: {
      title: "KINH NGHIỆM"
    },
    team: {
      title: "ĐỘI NGŨ",
      members: [
        { name: "JODY", role: "GIÁM ĐỐC\nSÁNG TẠO", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80" },
        { name: "EMINAM", role: "NHÀ PHÁT TRIỂN\nSÁNG LẬP", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80" },
        { name: "TIEN", role: "NHÀ PHÁT TRIỂN\nSÁNG LẬP", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80" }
      ]
    },
    cta: {
      title: "SẴN SÀNG ĐÓN NHẬN\nTƯƠNG LAI?",
      button: "HỢP TÁC VỚI CHÚNG TÔI"
    },
    footer: {
      copyright: "© 2023 Neon Shaman Studios. Hội An, Việt Nam."
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'vi'>('en');
  const t = translations[lang];

  // SEO
  useEffect(() => {
    document.title = lang === 'en' ? "Neon Shaman Studios | Vietnam's First Full-Stack Creative Studio" : "Neon Shaman Studios | Studio Sáng Tạo Full-Stack Đầu Tiên Tại Việt Nam";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t.hero.subtitle.replace(/<[^>]*>?/gm, ''));
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = t.hero.subtitle.replace(/<[^>]*>?/gm, '');
      document.head.appendChild(meta);
    }
  }, [lang, t]);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [showScrollTop, setShowScrollTop] = useState(false);

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

  return (
    <div className="min-h-screen bg-dark-bg text-white font-sans selection:bg-neon-pink selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-dark-bg/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="font-display font-bold text-xl tracking-wider flex flex-col leading-none">
            <span>NEON SHAMAN</span>
            <span className="text-[0.5rem] tracking-[0.3em] text-gray-400 ml-1">STUDIOS</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
            className="flex items-center gap-2 text-sm font-medium bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors"
          >
            <span className={lang === 'en' ? 'text-white' : 'text-gray-500'}>EN</span>
            <span className="text-gray-600">/</span>
            <span className={lang === 'vi' ? 'text-white' : 'text-gray-500'}>VI</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 pb-12">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/60 to-dark-bg z-10" />
          <div className="absolute inset-0 bg-dark-bg/40 z-10" />
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover object-center"
          >
            {/* Replace this src with your actual video URL or local path */}
            <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" type="video/mp4" />
          </video>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="border border-neon-pink/30 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center gap-6 bg-[#121212] hover:bg-[#1a1a1a] box-glow-hover transition-all duration-300 cursor-pointer group relative"
                >
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-neon-pink/20 transition-colors">
                    <Icon className="w-8 h-8 text-neon-pink" />
                  </div>
                  <h3 className="font-display font-semibold text-sm tracking-widest whitespace-pre-line leading-relaxed">{item.title}</h3>
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Simulated Logos */}
          <motion.div whileHover={{ scale: 1.1 }} className="font-display font-bold italic text-2xl md:text-3xl">EA GAMES</motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="font-display tracking-[0.2em] text-xl md:text-2xl">ACTIVISION</motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="font-sans font-bold italic text-xl md:text-2xl">CODEMASTERS</motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="font-sans font-black bg-white text-black px-3 py-1 text-2xl md:text-3xl">NHS</motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="font-sans font-bold bg-red-600 text-white px-4 py-1 rounded-t-full rounded-b-md text-xl md:text-2xl">Levi's</motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="font-sans font-black text-white text-3xl md:text-4xl tracking-tighter">AMD</motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2">
            <span className="font-sans font-black text-orange-500 text-3xl md:text-4xl italic">FPT</span>
            <span className="text-xs max-w-[50px] leading-tight">Fpt University</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="font-serif text-red-600 text-center leading-tight">
            <div className="text-xl md:text-2xl font-bold">SWINBURNE</div>
            <div className="text-[0.6rem] tracking-widest">UNIVERSITY OF TECHNOLOGY</div>
          </motion.div>
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      {/* The Team */}
      <section className="py-20 md:py-24 px-6 md:px-12 bg-[#161616]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-start mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide mb-4">{t.team.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.team.members.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-card-bg rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors group"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 text-center flex flex-col items-center bg-[#1A1A1A]">
                  <h3 className="font-display font-bold text-2xl mb-2 tracking-wider uppercase">{member.name}</h3>
                  <p className="text-gray-400 font-display text-xs tracking-[0.2em] whitespace-pre-line leading-relaxed uppercase">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
    </div>
  );
}
