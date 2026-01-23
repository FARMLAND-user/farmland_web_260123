import React, { useState } from 'react';
import { Post, SiteConfig } from '../types';
import { ArrowRight, Leaf, Truck, Building2, MapPin, Phone, Mail } from 'lucide-react';

interface HomeProps {
  posts: Post[];
  config: SiteConfig;
}

export const Home: React.FC<HomeProps> = ({ posts, config }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <>
      <section id="home" className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop" 
            alt="Farm Landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white animate-fade-in-up">
          <span className="block text-accent-beige font-bold tracking-[0.3em] mb-6 uppercase text-sm md:text-base">Premium Agriculture</span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
            자연이 주는<br />
            정직한 가치, <span className="text-primary-light">팜랜드</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-12 font-normal leading-relaxed">
            우리는 땅의 정직함을 믿습니다.<br /> 
            첨단 기술과 자연의 조화로 최고의 농산물을 제공합니다.
          </p>
          <button onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})} className="inline-flex items-center gap-2 border-2 border-white/30 bg-white/10 backdrop-blur-md px-10 py-4 rounded-full hover:bg-primary hover:border-primary transition-all duration-300 font-bold tracking-wide">
            <span>더 알아보기</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
               <div className="relative pl-4 pt-4">
                 <div className="absolute top-0 left-0 w-32 h-32 border-t-[6px] border-l-[6px] border-primary/20"></div>
                 <img 
                   src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop" 
                   alt="Healthy Food Ingredients Flat Lay" 
                   className="w-full h-[500px] object-cover shadow-2xl rounded-sm brightness-110 contrast-105"
                 />
                 <div className="absolute bottom-[-1rem] right-[-1rem] w-32 h-32 border-b-[6px] border-r-[6px] border-primary/20"></div>
               </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-primary font-bold tracking-widest text-sm mb-3">ABOUT US</h2>
              <h3 className="text-4xl font-extrabold text-gray-900 mb-8 leading-snug tracking-tight">
                건강한 식탁을 위한<br />끊임없는 연구와 노력
              </h3>
              <p className="text-gray-600 mb-8 leading-loose font-normal text-lg">
                {config.companyName}는 단순히 농산물을 전달하는 것을 넘어, 철저한 품질 관리와 최적화된 전처리 공정을 통해 고객사의 비즈니스에 가치를 더합니다.<br /><br />
                전국 산지와의 탄탄한 네트워크를 기반으로 한 안정적인 수급, 고객의 편의를 생각한 맞춤형 전처리 시스템은 {config.companyName}만의 자부심입니다. 우리는 농가와 상생하고 고객사와 동반 성장하며 대한민국 식자재 유통의 새로운 기준을 만들어가고 있습니다.
              </p>
              <div className="grid grid-cols-2 gap-8 mt-8 border-t border-gray-100 pt-8">
                <div>
                  <h4 className="font-black text-4xl text-primary mb-1">23+</h4>
                  <p className="text-sm text-gray-500 font-medium">Years of Experience</p>
                </div>
                <div>
                  <h4 className="font-black text-4xl text-primary mb-1">170+</h4>
                  <p className="text-sm text-gray-500 font-medium">Partner Companies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="business" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold tracking-widest text-sm mb-3">OUR BUSINESS</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">핵심 사업 영역</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-300">
                <Truck className="text-primary group-hover:text-white transition-colors" size={32} />
              </div>
              <h4 className="text-xl font-bold mb-4 tracking-tight">농산물 유통</h4>
              <p className="text-gray-600 leading-relaxed text-sm font-normal">
                산지의 신선함을 그대로 유지하는 콜드체인 시스템을 통해
                전국 도매시장 및 대형 마트에 고품질 농산물을 신속하게 공급합니다.
              </p>
            </div>
            <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-300">
                <Leaf className="text-primary group-hover:text-white transition-colors" size={32} />
              </div>
              <h4 className="text-xl font-bold mb-4 tracking-tight">전처리 공정</h4>
              <p className="text-gray-600 leading-relaxed text-sm font-normal">
                최신 자동화 설비를 갖춘 HACCP 인증 시설에서 세척, 소분, 
                가공 과정을 거쳐 즉시 조리 가능한 형태의 식자재를 제공합니다.
              </p>
            </div>
            <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-300">
                <Building2 className="text-primary group-hover:text-white transition-colors" size={32} />
              </div>
              <h4 className="text-xl font-bold mb-4 tracking-tight">B2B 사업영역</h4>
              <p className="text-gray-600 leading-relaxed text-sm font-normal">
                대형 프랜차이즈, 외식 기업 및 식품 가공 공장에 맞춤형 식자재를
                안정적으로 공급하며 파트너사의 원가 절감과 성공을 지원합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="news" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
               <h2 className="text-primary font-bold tracking-widest text-sm mb-3">NEWS & GALLERY</h2>
               <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">새로운 소식</h3>
            </div>
            <button className="hidden md:flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium">
              전체보기 <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="group cursor-pointer flex flex-col h-full">
                <div className="overflow-hidden rounded-xl mb-5 aspect-[4/3] shadow-md">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[11px] font-bold px-2 py-1 rounded-sm ${
                    post.category === 'NEWS' ? 'bg-blue-50 text-blue-700' : 
                    post.category === 'PRESS' ? 'bg-purple-50 text-purple-700' : 'bg-green-50 text-green-700'
                  }`}>
                    {post.category === 'NEWS' ? '공지' : post.category === 'PRESS' ? '보도자료' : '사회공헌'}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">{post.date}</span>
                </div>
                <h4 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors leading-tight">{post.title}</h4>
                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed font-normal">{post.content}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-[#2a2a2a] text-white relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/2">
               <h2 className="text-primary-light font-bold tracking-widest text-sm mb-3">CONTACT US</h2>
               <h3 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tight">비즈니스 문의</h3>
               <p className="text-gray-400 mb-10 leading-loose font-normal text-lg">
                 {config.companyName}와 함께 성장할 파트너를 찾습니다.<br/>
                 농산물 대량 공급, 계약 재배, 기타 협력 제안 등 무엇이든 문의해 주세요.
               </p>
               <div className="space-y-8 mt-8">
                 <div className="flex items-start gap-5">
                   <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                     <MapPin size={22} className="text-primary-light" />
                   </div>
                   <div>
                     <h5 className="font-bold mb-1 text-lg">Address</h5>
                     <p className="text-gray-400 font-light">{config.address}</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-5">
                   <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                     <Phone size={22} className="text-primary-light" />
                   </div>
                   <div>
                     <h5 className="font-bold mb-1 text-lg">Phone</h5>
                     <p className="text-gray-400 font-light">{config.contactPhone}</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-5">
                   <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                     <Mail size={22} className="text-primary-light" />
                   </div>
                   <div>
                     <h5 className="font-bold mb-1 text-lg">Email</h5>
                     <p className="text-gray-400 font-light">{config.contactEmail}</p>
                   </div>
                 </div>
               </div>
            </div>
            <div className="w-full lg:w-1/2 bg-white rounded-2xl p-10 text-gray-800 shadow-2xl">
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
                <button type="submit" disabled={isSubmitting} className={`w-full bg-primary text-white font-bold text-lg py-4 rounded-lg transition-colors shadow-lg shadow-primary/30 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-dark'}`}>
                  {isSubmitting ? '전송 중...' : '문의하기'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};