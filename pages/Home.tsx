
import React, { useState, useEffect, useRef } from 'react';
import { Post, SiteConfig } from '../types';
import { ArrowRight, Leaf, Truck, Building2, MapPin, Phone, Mail } from 'lucide-react';
// Import Variants from framer-motion for correct TypeScript typing of animation objects
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
  
  const yBackground = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

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

  // Define variants with the Variants type to ensure 'ease' property is correctly inferred as an Easing type
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // Define variants with the Variants type for consistency
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const formatTitle = (text: string) => {
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
      <section id="home" className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: yBackground }}>
          <img src={config.heroImage} alt="Hero" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>

        <motion.div 
          className="relative z-10 container mx-auto px-4 text-center text-white"
          style={{ opacity: opacityHero }}
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          <motion.span variants={fadeInUp} className="block text-accent-beige font-bold tracking-[0.3em] mb-4 uppercase text-xs md:text-sm drop-shadow-md">
            {config.heroSubtitle}
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight drop-shadow-xl">
            {formatTitle(config.heroTitle)}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto mb-10 font-normal leading-relaxed drop-shadow-sm">
             {config.heroDescription}
          </motion.p>
          <motion.button 
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})} 
            className="inline-flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur-md px-8 py-4 rounded-full transition-all font-bold tracking-wide"
          >
            <span>더 알아보기</span>
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div className="w-full md:w-1/2" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
               <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070" alt="About" className="w-full h-[400px] object-cover rounded-lg shadow-xl" />
            </motion.div>
            <motion.div className="w-full md:w-1/2" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-primary font-bold tracking-widest text-sm mb-3">ABOUT US</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-snug">
                건강한 식탁을 위한<br />
                <span className="text-primary-light">끊임없는 연구와 노력</span>
              </h3>
              <p className="text-gray-600 mb-8 leading-loose text-base">
                {config.companyName}는 단순히 농산물을 전달하는 것을 넘어, 철저한 품질 관리와 최적화된 전처리 공정을 통해 고객사의 비즈니스에 가치를 더합니다.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                <div>
                  <h4 className="font-black text-4xl text-primary mb-1"><AnimatedCounter from={0} to={23} />+</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Years Exp</p>
                </div>
                <div>
                  <h4 className="font-black text-4xl text-primary mb-1"><AnimatedCounter from={0} to={170} />+</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Partners</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section id="business" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold tracking-widest text-sm mb-2">OUR BUSINESS</h2>
            <h3 className="text-3xl font-extrabold text-gray-900">핵심 사업 영역</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Truck, title: "농산물 유통", desc: "전국 도매시장 및 대형 마트에 고품질 농산물을 공급합니다." },
              { icon: Leaf, title: "전처리 공정", desc: "최신 자동화 설비에서 즉시 조리 가능한 식자재를 제공합니다." },
              { icon: Building2, title: "B2B 사업영역", desc: "대형 프랜차이즈 및 외식 기업의 파트너로 함께합니다." }
            ].map((item, index) => (
              <motion.div key={index} whileHover={{ y: -5 }} className="bg-white p-8 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <item.icon className="text-primary" size={24} />
                </div>
                <h4 className="text-lg font-bold mb-3">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-primary font-bold tracking-widest text-sm mb-2">NEWS</h2>
              <h3 className="text-3xl font-extrabold text-gray-900">새로운 소식</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-xl mb-4 aspect-[4/3] shadow-sm">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                </div>
                <span className="text-xs text-gray-400 mb-2 block">{post.date}</span>
                <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{post.title}</h4>
                <p className="text-gray-500 text-sm line-clamp-2">{post.content}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Restored to match image */}
      <section id="contact" className="py-24 bg-[#222] text-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-start gap-16">
            {/* Left Content */}
            <div className="lg:w-1/2 space-y-12">
              <div>
                <span className="text-primary font-bold tracking-widest text-[13px] uppercase block mb-4">CONTACT US</span>
                <h3 className="text-4xl font-black mb-8">비즈니스 문의</h3>
                <p className="text-gray-400 text-base font-light leading-relaxed">
                  FARMLAND와 함께 성장할 파트너를 찾습니다.<br />
                  농산물 대량 공급, 계약 재배, 기타 협력 제안 등 무엇이든 문의해 주세요.
                </p>
              </div>

              <div className="space-y-10">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg mb-1">Address</h4>
                    <p className="text-gray-400 text-[15px] font-light">{config.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg mb-1">Phone</h4>
                    <p className="text-gray-400 text-[15px] font-light">{config.contactPhone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg mb-1">Email</h4>
                    <p className="text-gray-400 text-[15px] font-light">{config.contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl animate-fade-in-up">
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[13px] font-bold text-gray-800 ml-1">이름</label>
                      <input type="text" name="name" required className="w-full bg-gray-50 border border-gray-100 rounded-lg p-4 text-gray-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="홍길동" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-bold text-gray-800 ml-1">연락처</label>
                      <input type="text" name="phone" required className="w-full bg-gray-50 border border-gray-100 rounded-lg p-4 text-gray-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="010-0000-0000" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-gray-800 ml-1">이메일</label>
                    <input type="email" name="email" required className="w-full bg-gray-50 border border-gray-100 rounded-lg p-4 text-gray-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="example@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-gray-800 ml-1">문의내용</label>
                    <textarea rows={5} name="message" required className="w-full bg-gray-50 border border-gray-100 rounded-lg p-4 text-gray-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" placeholder="문의하실 내용을 입력해주세요."></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-[#556B2F] text-white font-black py-5 rounded-lg shadow-xl shadow-black/10 hover:bg-[#384a1f] transition-all text-base tracking-widest">
                    {isSubmitting ? '전송 중...' : '문의하기'}
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
