import React, { useState, useEffect, useRef } from 'react';
import { Post, SiteConfig } from '../types';
import { ArrowRight, Leaf, Truck, Building2, MapPin, Phone, Mail } from 'lucide-react';
import { motion, useScroll, useTransform, useInView, useSpring, animate } from 'framer-motion';

interface HomeProps {
  posts: Post[];
  config: SiteConfig;
}

// Number Counter Component
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
  
  // Parallax effect for hero background
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
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert("문의가 성공적으로 접수되었습니다. 담당자가 곧 연락드리겠습니다.");
        form.reset();
      } else {
        alert("접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch (error) {
      alert("접수 중 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <section id="home" className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: yBackground }}
        >
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop" 
            alt="Farm Landscape" 
            className="w-full h-full object-cover scale-110" // Initial slight scale
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </motion.div>

        <motion.div 
          className="relative z-10 container mx-auto px-4 text-center text-white"
          style={{ opacity: opacityHero }}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span variants={fadeInUp} className="block text-accent-beige font-bold tracking-[0.4em] mb-6 uppercase text-sm md:text-base drop-shadow-lg">
            Premium Agriculture
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tight drop-shadow-xl">
            자연이 주는<br />
            정직한 가치, <span className="text-primary-light relative inline-block">
              팜랜드
              <motion.svg 
                className="absolute -bottom-2 left-0 w-full h-3 md:h-5 text-white/30"
                viewBox="0 0 100 10" 
                preserveAspectRatio="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 1.5 }}
              >
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </motion.svg>
            </span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-12 font-normal leading-relaxed drop-shadow-md">
            우리는 땅의 정직함을 믿습니다.<br /> 
            첨단 기술과 자연의 조화로 최고의 농산물을 제공합니다.
          </motion.p>
          <motion.button 
            variants={fadeInUp}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(85, 107, 47, 0.9)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})} 
            className="inline-flex items-center gap-3 border border-white/40 bg-white/10 backdrop-blur-md px-10 py-5 rounded-full transition-all duration-300 font-bold tracking-wide shadow-lg hover:border-primary"
          >
            <span>더 알아보기</span>
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
        
        {/* Scroll Down Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent mx-auto"></div>
        </motion.div>
      </section>

      <section id="about" className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
               <div className="relative pl-4 pt-4 group">
                 <div className="absolute top-0 left-0 w-32 h-32 border-t-[6px] border-l-[6px] border-primary/20 transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:border-primary/40"></div>
                 <img 
                   src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop" 
                   alt="Healthy Food Ingredients Flat Lay" 
                   className="w-full h-[500px] object-cover shadow-2xl rounded-sm brightness-105 contrast-105 transition-transform duration-700 group-hover:scale-[1.02]"
                 />
                 <div className="absolute bottom-[-1rem] right-[-1rem] w-32 h-32 border-b-[6px] border-r-[6px] border-primary/20 transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:border-primary/40"></div>
               </div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-primary font-bold tracking-widest text-sm mb-3 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary"></span>
                ABOUT US
              </h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-snug tracking-tight">
                건강한 식탁을 위한<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                  끊임없는 연구와 노력
                </span>
              </h3>
              <p className="text-gray-600 mb-10 leading-loose font-normal text-lg">
                {config.companyName}는 단순히 농산물을 전달하는 것을 넘어, 철저한 품질 관리와 최적화된 전처리 공정을 통해 고객사의 비즈니스에 가치를 더합니다.<br /><br />
                전국 산지와의 탄탄한 네트워크를 기반으로 한 안정적인 수급, 고객의 편의를 생각한 맞춤형 전처리 시스템은 {config.companyName}만의 자부심입니다.
              </p>
              
              {/* Stats Counter */}
              <div className="grid grid-cols-2 gap-8 mt-8 border-t border-gray-100 pt-10">
                <div className="text-center md:text-left">
                  <h4 className="font-black text-5xl text-primary mb-2 flex items-center justify-center md:justify-start gap-1">
                    <AnimatedCounter from={0} to={23} />
                    <span className="text-3xl">+</span>
                  </h4>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Years of Experience</p>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="font-black text-5xl text-primary mb-2 flex items-center justify-center md:justify-start gap-1">
                    <AnimatedCounter from={0} to={170} />
                    <span className="text-3xl">+</span>
                  </h4>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Partner Companies</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="business" className="py-24 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-primary font-bold tracking-widest text-sm mb-3">OUR BUSINESS</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">핵심 사업 영역</h3>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              { icon: Truck, title: "농산물 유통", desc: "산지의 신선함을 그대로 유지하는 콜드체인 시스템을 통해 전국 도매시장 및 대형 마트에 고품질 농산물을 신속하게 공급합니다." },
              { icon: Leaf, title: "전처리 공정", desc: "최신 자동화 설비를 갖춘 HACCP 인증 시설에서 세척, 소분, 가공 과정을 거쳐 즉시 조리 가능한 형태의 식자재를 제공합니다." },
              { icon: Building2, title: "B2B 사업영역", desc: "대형 프랜차이즈, 외식 기업 및 식품 가공 공장에 맞춤형 식자재를 안정적으로 공급하며 파트너사의 원가 절감과 성공을 지원합니다." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={cardVariant}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <item.icon size={120} />
                </div>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <item.icon className="text-primary group-hover:text-white transition-colors" size={32} />
                </div>
                <h4 className="text-xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed text-sm font-normal relative z-10">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="news" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
               <h2 className="text-primary font-bold tracking-widest text-sm mb-3">NEWS & GALLERY</h2>
               <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">새로운 소식</h3>
            </motion.div>
            <motion.button 
              className="hidden md:flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ x: 5 }}
            >
              전체보기 <ArrowRight size={16} />
            </motion.button>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {posts.map((post) => (
              <motion.article 
                key={post.id} 
                variants={cardVariant}
                whileHover={{ y: -5 }}
                className="group cursor-pointer flex flex-col h-full"
              >
                <div className="overflow-hidden rounded-2xl mb-5 aspect-[4/3] shadow-md relative">
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <span className={`absolute top-4 left-4 z-20 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm ${
                    post.category === 'NEWS' ? 'bg-white text-blue-700' : 
                    post.category === 'PRESS' ? 'bg-white text-purple-700' : 'bg-white text-green-700'
                  }`}>
                    {post.category === 'NEWS' ? '공지' : post.category === 'PRESS' ? '보도자료' : '사회공헌'}
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                    {post.date}
                  </span>
                </div>
                <h4 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors leading-tight">{post.title}</h4>
                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed font-normal">{post.content}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-[#2a2a2a] text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16">
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
               <h2 className="text-primary-light font-bold tracking-widest text-sm mb-3">CONTACT US</h2>
               <h3 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tight">비즈니스 문의</h3>
               <p className="text-gray-400 mb-10 leading-loose font-normal text-lg">
                 {config.companyName}와 함께 성장할 파트너를 찾습니다.<br/>
                 농산물 대량 공급, 계약 재배, 기타 협력 제안 등 무엇이든 문의해 주세요.
               </p>
               
               <div className="space-y-8 mt-8">
                 {[
                   { icon: MapPin, title: "Address", content: config.address },
                   { icon: Phone, title: "Phone", content: config.contactPhone },
                   { icon: Mail, title: "Email", content: config.contactEmail }
                 ].map((item, idx) => (
                   <motion.div 
                    key={idx}
                    className="flex items-start gap-5 group"
                    whileHover={{ x: 5 }}
                   >
                     <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-primary-light/50 group-hover:bg-primary-light/10 transition-colors">
                       <item.icon size={22} className="text-primary-light" />
                     </div>
                     <div>
                       <h5 className="font-bold mb-1 text-lg">{item.title}</h5>
                       <p className="text-gray-400 font-light group-hover:text-gray-200 transition-colors">{item.content}</p>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </motion.div>

            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl p-10 text-gray-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-primary-light"></div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">이름</label>
                      <input type="text" name="name" required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-primary focus:bg-white transition-colors" placeholder="홍길동" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">연락처</label>
                      <input type="text" name="phone" required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-primary focus:bg-white transition-colors" placeholder="010-0000-0000" />
                    </div>
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">이메일</label>
                     <input type="email" name="email" required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-primary focus:bg-white transition-colors" placeholder="example@email.com" />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">문의내용</label>
                     <textarea rows={4} name="message" required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-primary focus:bg-white transition-colors" placeholder="문의하실 내용을 입력해주세요."></textarea>
                  </div>
                  <motion.button 
                    type="submit" 
                    disabled={isSubmitting} 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-primary text-white font-bold text-lg py-4 rounded-lg transition-colors shadow-lg shadow-primary/30 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-dark'}`}
                  >
                    {isSubmitting ? '전송 중...' : '문의하기'}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};