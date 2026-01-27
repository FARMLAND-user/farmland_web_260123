import React, { useState, useEffect, useRef } from 'react';
import { Post, SiteConfig } from '../types';
import { ArrowRight, Leaf, Truck, Building2, MapPin, Phone, Mail } from 'lucide-react';
import { motion, useScroll, useTransform, useInView, useSpring, animate, Variants } from 'framer-motion';

interface HomeProps {
  posts: Post[];
  config: SiteConfig;
}

const AnimatedCounter = ({ from, to }: { from: number; to: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.round(value).toLocaleString();
          }
        }
      });
      return () => controls.stop();
    }
  }, [from, to, inView]);

  return <span ref={ref} />;
};

export const Home: React.FC<HomeProps> = ({ posts, config }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { scrollY } = useScroll();
  
  const yBackground = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

  const bannerRef = useRef(null);
  const { scrollYProgress: bannerScroll } = useScroll({
    target: bannerRef,
    offset: ["start end", "end start"]
  });
  const yBanner = useTransform(bannerScroll, [0, 1], [-40, 40]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xlgglpgr", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        alert("문의가 성공적으로 접수되었습니다.");
        form.reset();
      } else {
        alert("오류가 발생했습니다.");
      }
    } catch (error) {
      alert("연결 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const formatText = (text: string) => {
    if (!text) return "";
    return text.split('\n').map((line, i) => {
      const parts = line.split('팜랜드');
      const content = parts.length > 1 ? (
        <>
          {parts.map((part, idx) => (
            <React.Fragment key={idx}>
              {part}
              {idx < parts.length - 1 && <span className="text-primary-light font-black">팜랜드</span>}
            </React.Fragment>
          ))}
        </>
      ) : line;

      return (
        <React.Fragment key={i}>
          {content}
          {i !== text.split('\n').length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <section id="home" className="relative h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-900">
        <motion.div className="absolute inset-0 z-0" style={{ y: yBackground }}>
          <img 
            src={config.heroImage || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"} 
            alt="Hero" 
            className="w-full h-full object-cover scale-110 brightness-[0.7]" 
          />
        </motion.div>

        <motion.div 
          className="relative z-10 container mx-auto px-4 text-center text-white"
          style={{ opacity: opacityHero }}
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          <motion.span variants={fadeInUp} className="block text-accent-beige font-bold tracking-[0.3em] mb-4 uppercase text-xs md:text-sm">
            {config.heroSubtitle}
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight drop-shadow-2xl">
            {formatText(config.heroTitle)}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-base md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-lg whitespace-pre-line">
             {config.heroDescription}
          </motion.p>
          <motion.button 
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})} 
            className="inline-flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur-md px-10 py-4 rounded-full transition-all font-bold tracking-widest text-sm"
          >
            <span>DISCOVER MORE</span>
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              className="w-full md:w-1/2 relative" 
              initial={{ opacity: 0, x: -60 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
               <img 
                 src={config.aboutImage || "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1200"} 
                 alt="Fresh Greens" 
                 className="w-full h-[450px] object-cover rounded-2xl shadow-2xl" 
               />
               <div className="absolute -bottom-6 -right-6 bg-primary text-white p-8 rounded-2xl shadow-xl hidden lg:block">
                 <p className="text-sm font-bold opacity-80 mb-1">Quality First</p>
               </div>
            </motion.div>
            <motion.div 
              className="w-full md:w-1/2" 
              initial={{ opacity: 0, x: 60 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-primary font-bold tracking-widest text-sm mb-4 uppercase">{config.aboutSubtitle}</h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-8 leading-tight">
                {formatText(config.aboutTitle)}
              </h3>
              <p className="text-gray-600 mb-10 leading-loose text-lg font-light whitespace-pre-line">
                {config.aboutDescription}
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                <div>
                  <h4 className="font-black text-5xl text-primary mb-2"><AnimatedCounter from={0} to={24} /></h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">Years of Expertise</p>
                </div>
                <div>
                  <h4 className="font-black text-5xl text-primary mb-2"><AnimatedCounter from={0} to={185} /></h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">Partners</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section id="business" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-primary font-bold tracking-widest text-sm mb-4 uppercase">{config.businessSubtitle}</h2>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900">{config.businessTitle}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Truck, title: "프리미엄 농산물 유통", desc: "전국 산지 직송 시스템을 통해 가장 신선한 상태의 농산물을 대형 마트 및 식자재 마켓에 공급합니다." },
              { icon: Leaf, title: "전처리 시스템", desc: "HACCP 인증 시설에서 세척, 절단, 소분 과정을 거쳐 조리 시간을 단축하는 고효율 식자재를 제공합니다." },
              { icon: Building2, title: "B2B 전략 파트너십", desc: "프랜차이즈 및 외식 기업의 특성에 맞춘 전용 농산물 소싱 및 안정적인 계약 재배 솔루션을 제공합니다." }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                whileHover={{ y: -10 }} 
                className="bg-white p-10 rounded-2xl shadow-xl shadow-black/5 border border-transparent hover:border-primary/10 transition-all"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-8">
                  <item.icon className="text-primary" size={28} />
                </div>
                <h4 className="text-xl font-black mb-5 text-gray-900">{item.title}</h4>
                <p className="text-gray-500 text-[15px] leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trendy Agricultural Banner Section */}
      <section ref={bannerRef} className="relative h-[400px] md:h-[550px] overflow-hidden flex items-center bg-zinc-900">
        <motion.div className="absolute inset-0 z-0" style={{ y: yBanner }}>
          <img 
            src={config.bannerImage || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=2000"} 
            alt="Agricultural Innovation" 
            className="w-full h-[120%] object-cover brightness-[0.6] object-center"
          />
        </motion.div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="max-w-4xl border-l-4 border-primary-light pl-8 md:pl-12"
          >
            <span className="text-primary-light font-bold tracking-[0.4em] text-xs md:text-sm uppercase mb-6 block">{config.bannerSubtitle}</span>
            <h2 className="text-white text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
              {formatText(config.bannerTitle)}
            </h2>
            <p className="text-gray-200 text-lg md:text-2xl font-light leading-relaxed max-w-2xl whitespace-pre-line">
              {config.bannerDescription}
            </p>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
      </section>

      {/* News Section */}
      <section id="news" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h2 className="text-primary font-bold tracking-widest text-sm mb-4 uppercase">{config.newsSubtitle}</h2>
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{config.newsTitle}</h3>
            </div>
            <button className="text-sm font-bold text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
              전체보기 <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {posts.map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl mb-6 aspect-[16/10] shadow-lg">
                  <img 
                    src={post.imageUrl || "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1000"} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" 
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-primary px-2 py-1 bg-primary/5 rounded">{post.category}</span>
                    <span className="text-xs text-gray-300 font-medium">{post.date}</span>
                  </div>
                  <h4 className="font-bold text-xl leading-snug group-hover:text-primary transition-colors line-clamp-2">{post.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 font-light">{post.content}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#1a1a1a] text-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-start gap-20">
            <div className="lg:w-1/2 space-y-16">
              <div>
                <span className="text-primary font-black tracking-[0.3em] text-xs uppercase block mb-6">{config.contactSubtitle}</span>
                <h3 className="text-4xl md:text-5xl font-black mb-10 tracking-tight">{config.contactTitle}</h3>
                <p className="text-gray-400 text-lg font-light leading-relaxed max-w-lg whitespace-pre-line">
                  {config.contactDescription}
                </p>
              </div>

              <div className="space-y-12">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700 group-hover:bg-primary transition-colors">
                    <MapPin className="text-white" size={22} />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg mb-2">Location</h4>
                    <p className="text-gray-400 text-base font-light">{config.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700 group-hover:bg-primary transition-colors">
                    <Phone className="text-white" size={22} />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg mb-2">Call Us</h4>
                    <p className="text-gray-400 text-base font-light">{config.contactPhone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700 group-hover:bg-primary transition-colors">
                    <Mail className="text-white" size={22} />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg mb-2">Email</h4>
                    <p className="text-gray-400 text-base font-light">{config.contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="bg-white rounded-3xl p-10 md:p-14 shadow-2xl relative">
                <div className="absolute top-0 right-10 -translate-y-1/2 w-20 h-20 bg-primary-light rounded-full hidden md:flex items-center justify-center shadow-xl">
                  <Leaf className="text-primary-dark" size={32} />
                </div>
                <form className="space-y-10" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-900 ml-1 uppercase tracking-widest">Name</label>
                      <input type="text" name="name" required className="w-full bg-gray-50 border-b-2 border-gray-100 p-4 text-gray-900 outline-none focus:border-primary transition-all text-sm" placeholder="성함 또는 기업명" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-900 ml-1 uppercase tracking-widest">Contact</label>
                      <input type="text" name="phone" required className="w-full bg-gray-50 border-b-2 border-gray-100 p-4 text-gray-900 outline-none focus:border-primary transition-all text-sm" placeholder="연락처를 남겨주세요" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-900 ml-1 uppercase tracking-widest">Email Address</label>
                    <input type="email" name="email" required className="w-full bg-gray-50 border-b-2 border-gray-100 p-4 text-gray-900 outline-none focus:border-primary transition-all text-sm" placeholder="이메일 주소" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-900 ml-1 uppercase tracking-widest">Your Message</label>
                    <textarea rows={4} name="message" required className="w-full bg-gray-50 border-b-2 border-gray-100 p-4 text-gray-900 outline-none focus:border-primary transition-all resize-none text-sm" placeholder="문의하실 내용을 상세히 적어주시면 빠른 답변이 가능합니다."></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-[#556B2F] text-white font-black py-6 rounded-2xl shadow-2xl shadow-primary/30 hover:bg-primary-dark transition-all text-lg tracking-[0.2em] group overflow-hidden relative">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? '전송 중...' : 'SEND INQUIRY'}
                      <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};