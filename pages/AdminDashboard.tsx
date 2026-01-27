import React, { useState, useRef } from 'react';
import { Post, SiteConfig, PostCategory } from '../types';
import { Settings, PenTool, Layout as LayoutIcon, Trash2, Plus, Save, ArrowLeft, Lock, Image as ImageIcon, User, Upload } from 'lucide-react';

interface AdminDashboardProps {
  posts: Post[];
  config: SiteConfig;
  onUpdateConfig: (newConfig: SiteConfig) => void;
  onAddPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
  onNavigate: (page: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  posts, config, onUpdateConfig, onAddPost, onDeletePost, onNavigate 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'settings' | 'account'>('content');
  
  // Post state
  const [newPost, setNewPost] = useState<Partial<Post>>({
    title: '', category: PostCategory.NEWS, content: '', imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password Change State
  const [pwdForm, setPwdForm] = useState({ current: '', next: '', confirm: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === (config.adminPassword || 'admin1234')) {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onUpdateConfig({ ...config, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost({ ...newPost, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPost = () => {
    if (!newPost.title || !newPost.content) return alert('내용을 채워주세요.');
    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title!,
      content: newPost.content!,
      category: newPost.category || PostCategory.NEWS,
      date: new Date().toISOString().split('T')[0],
      imageUrl: newPost.imageUrl || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop'
    };
    onAddPost(post);
    setNewPost({ title: '', category: PostCategory.NEWS, content: '', imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwdForm.current !== (config.adminPassword || 'admin1234')) {
      return alert('현재 비밀번호가 일치하지 않습니다.');
    }
    if (pwdForm.next !== pwdForm.confirm) {
      return alert('새 비밀번호 확인이 일치하지 않습니다.');
    }
    if (pwdForm.next.length < 4) {
      return alert('비밀번호는 4자 이상이어야 합니다.');
    }

    onUpdateConfig({ ...config, adminPassword: pwdForm.next });
    alert('비밀번호가 성공적으로 변경되었습니다.');
    setPwdForm({ current: '', next: '', confirm: '' });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm text-center">
          <Lock className="mx-auto mb-4 text-primary" size={40} />
          <h2 className="text-xl font-bold mb-6">관리자 전용 로그인</h2>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            className="w-full border p-3 rounded mb-4 focus:border-primary focus:outline-none"
            placeholder="비밀번호 입력"
            autoFocus
          />
          <button type="submit" className="w-full bg-primary text-white py-3 rounded font-bold">접속하기</button>
          <button type="button" onClick={() => onNavigate('home')} className="mt-4 text-gray-400 text-sm">홈으로 돌아가기</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-zinc-900 text-white p-6 space-y-4 flex flex-col shrink-0">
        <h2 className="text-xl font-black mb-6 flex items-center gap-2">
          <Settings className="text-primary-light" /> CMS ADMIN
        </h2>
        <nav className="space-y-2">
          <button onClick={() => setActiveTab('content')} className={`flex items-center gap-3 p-3 rounded w-full text-left transition-colors ${activeTab === 'content' ? 'bg-primary' : 'hover:bg-zinc-800'}`}>
            <PenTool size={18}/> 게시물 관리
          </button>
          <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 p-3 rounded w-full text-left transition-colors ${activeTab === 'settings' ? 'bg-primary' : 'hover:bg-zinc-800'}`}>
            <LayoutIcon size={18}/> 사이트 설정
          </button>
          <button onClick={() => setActiveTab('account')} className={`flex items-center gap-3 p-3 rounded w-full text-left transition-colors ${activeTab === 'account' ? 'bg-primary' : 'hover:bg-zinc-800'}`}>
            <User size={18}/> 계정 설정
          </button>
        </nav>
        <div className="mt-auto pt-6 border-t border-zinc-800">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm">
            <ArrowLeft size={16}/> 사이트로 돌아가기
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'content' ? (
          <div className="max-w-4xl space-y-8 animate-fade-in-up">
            <h1 className="text-2xl font-bold">게시물 관리</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
               <h3 className="font-bold mb-6 text-lg flex items-center gap-2"><Plus size={20} className="text-primary"/> 새 소식 추가</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div>
                   <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">제목</label>
                   <input value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} placeholder="게시물 제목을 입력하세요" className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-primary/20 outline-none" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">카테고리</label>
                   <select value={newPost.category} onChange={e => setNewPost({...newPost, category: e.target.value as PostCategory})} className="border p-3 rounded-lg w-full">
                     <option value={PostCategory.NEWS}>공지사항</option>
                     <option value={PostCategory.PRESS}>보도자료</option>
                     <option value={PostCategory.SOCIAL_CONTRIBUTION}>사회공헌</option>
                   </select>
                 </div>
               </div>
               
               <div className="mb-6">
                 <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">이미지 첨부</label>
                 <div className="flex items-center gap-4">
                   <div className="w-24 h-24 rounded-lg bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                     {newPost.imageUrl ? (
                       <img src={newPost.imageUrl} className="w-full h-full object-cover" />
                     ) : (
                       <ImageIcon size={24} className="text-gray-300" />
                     )}
                   </div>
                   <div className="flex-1">
                     <input 
                       type="file" 
                       accept="image/*" 
                       ref={fileInputRef}
                       onChange={handleImageUpload}
                       className="hidden" 
                       id="post-image-upload"
                     />
                     <label 
                       htmlFor="post-image-upload" 
                       className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition-colors text-sm font-medium"
                     >
                       <Upload size={16} /> 파일 선택
                     </label>
                     <p className="text-xs text-gray-400 mt-2">추천 사이즈: 800x600px (JPG, PNG)</p>
                   </div>
                 </div>
               </div>

               <div className="mb-6">
                 <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">내용</label>
                 <textarea value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} placeholder="상세 내용을 입력하세요" className="border p-3 rounded-lg w-full h-32 focus:ring-2 focus:ring-primary/20 outline-none"></textarea>
               </div>
               
               <button onClick={handleAddPost} className="bg-primary text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">게시물 등록</button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
               <table className="w-full text-left">
                 <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase">미리보기</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase">제목</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase">날짜</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase text-right">관리</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y">
                    {posts.length === 0 ? (
                      <tr><td colSpan={4} className="p-10 text-center text-gray-400">등록된 게시물이 없습니다.</td></tr>
                    ) : (
                      posts.map(post => (
                        <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 w-20">
                            <img src={post.imageUrl} className="w-12 h-12 rounded object-cover border" />
                          </td>
                          <td className="p-4 font-medium">{post.title}</td>
                          <td className="p-4 text-gray-500 text-sm">{post.date}</td>
                          <td className="p-4 text-right">
                            <button onClick={() => onDeletePost(post.id)} className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-all">
                              <Trash2 size={18}/>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                 </tbody>
               </table>
            </div>
          </div>
        ) : activeTab === 'settings' ? (
          <div className="max-w-3xl space-y-8 animate-fade-in-up">
            <h1 className="text-2xl font-bold">사이트 설정</h1>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-8">
              <div className="flex items-center gap-2 border-b pb-3"><ImageIcon size={20} className="text-primary"/> <h3 className="font-bold text-lg">메인 화면 (Hero) 설정</h3></div>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1 uppercase tracking-wider">메인 타이틀 (줄바꿈은 \n 입력)</label>
                  <textarea name="heroTitle" value={config.heroTitle} onChange={handleConfigChange} className="w-full border p-3 rounded-lg h-24 font-medium focus:ring-2 focus:ring-primary/20 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1 uppercase tracking-wider">설명 문구</label>
                  <textarea name="heroDescription" value={config.heroDescription} onChange={handleConfigChange} className="w-full border p-3 rounded-lg h-24 focus:ring-2 focus:ring-primary/20 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1 uppercase tracking-wider">배경 이미지 URL</label>
                  <input name="heroImage" value={config.heroImage} onChange={handleConfigChange} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-8">
              <div className="flex items-center gap-2 border-b pb-3"><LayoutIcon size={20} className="text-primary"/> <h3 className="font-bold text-lg">기본 회사 정보</h3></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1 uppercase tracking-wider">회사명</label>
                  <input name="companyName" value={config.companyName} onChange={handleConfigChange} className="border p-3 rounded-lg w-full" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1 uppercase tracking-wider">연락처</label>
                  <input name="contactPhone" value={config.contactPhone} onChange={handleConfigChange} className="border p-3 rounded-lg w-full" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 block mb-1 uppercase tracking-wider">이메일</label>
                  <input name="contactEmail" value={config.contactEmail} onChange={handleConfigChange} className="border p-3 rounded-lg w-full" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 block mb-1 uppercase tracking-wider">주소</label>
                  <input name="address" value={config.address} onChange={handleConfigChange} className="border p-3 rounded-lg w-full" />
                </div>
              </div>
            </div>
            <div className="text-center text-gray-400 text-sm italic py-4">모든 설정은 수정 즉시 기기에 자동 저장됩니다.</div>
          </div>
        ) : (
          <div className="max-w-xl space-y-8 animate-fade-in-up">
            <h1 className="text-2xl font-bold">계정 설정</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-bold mb-6 text-lg flex items-center gap-2"><Lock size={20} className="text-primary"/> 비밀번호 변경</h3>
              <form onSubmit={handleChangePassword} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">현재 비밀번호</label>
                  <input 
                    type="password" 
                    value={pwdForm.current}
                    onChange={e => setPwdForm({...pwdForm, current: e.target.value})}
                    className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="현재 비밀번호를 입력하세요"
                    required
                  />
                </div>
                <div className="border-t pt-6">
                  <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">새 비밀번호</label>
                  <input 
                    type="password" 
                    value={pwdForm.next}
                    onChange={e => setPwdForm({...pwdForm, next: e.target.value})}
                    className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 mb-4"
                    placeholder="새로운 비밀번호 (4자 이상)"
                    required
                  />
                  <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">새 비밀번호 확인</label>
                  <input 
                    type="password" 
                    value={pwdForm.confirm}
                    onChange={e => setPwdForm({...pwdForm, confirm: e.target.value})}
                    className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="비밀번호를 한번 더 입력하세요"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
                  비밀번호 저장
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};