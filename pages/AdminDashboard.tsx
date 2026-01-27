import React, { useState } from 'react';
import { Post, SiteConfig, PostCategory } from '../types';
import { Settings, PenTool, Layout as LayoutIcon, Trash2, Plus, Save, ArrowLeft, Lock, Image } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'content' | 'settings'>('content');
  const [newPost, setNewPost] = useState<Partial<Post>>({
    title: '', category: PostCategory.NEWS, content: '', imageUrl: 'https://picsum.photos/800/600'
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin1234') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onUpdateConfig({ ...config, [name]: value });
  };

  const handleAddPost = () => {
    if (!newPost.title || !newPost.content) return alert('내용을 채워주세요.');
    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title!,
      content: newPost.content!,
      category: newPost.category || PostCategory.NEWS,
      date: new Date().toISOString().split('T')[0],
      imageUrl: newPost.imageUrl || 'https://picsum.photos/800/600'
    };
    onAddPost(post);
    setNewPost({ title: '', category: PostCategory.NEWS, content: '', imageUrl: 'https://picsum.photos/800/600' });
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
            placeholder="비밀번호 입력 (admin1234)"
          />
          <button type="submit" className="w-full bg-primary text-white py-3 rounded font-bold">접속하기</button>
          <button type="button" onClick={() => onNavigate('home')} className="mt-4 text-gray-400 text-sm">홈으로 돌아가기</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-zinc-900 text-white p-6 space-y-4 flex flex-col">
        <h2 className="text-xl font-black mb-6">CMS ADMIN</h2>
        <button onClick={() => setActiveTab('content')} className={`flex items-center gap-3 p-3 rounded w-full text-left transition-colors ${activeTab === 'content' ? 'bg-primary' : 'hover:bg-zinc-800'}`}>
          <PenTool size={18}/> 게시물 관리
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 p-3 rounded w-full text-left transition-colors ${activeTab === 'settings' ? 'bg-primary' : 'hover:bg-zinc-800'}`}>
          <Settings size={18}/> 사이트 설정
        </button>
        <div className="mt-auto">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft size={16}/> 홈으로 이동
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'content' ? (
          <div className="max-w-4xl space-y-8 animate-fade-in-up">
            <h1 className="text-2xl font-bold">게시물 관리</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
               <h3 className="font-bold mb-4">새 소식 추가</h3>
               <div className="grid grid-cols-2 gap-4 mb-4">
                 <input value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} placeholder="제목" className="border p-2 rounded w-full" />
                 <select value={newPost.category} onChange={e => setNewPost({...newPost, category: e.target.value as PostCategory})} className="border p-2 rounded">
                   <option value={PostCategory.NEWS}>공지사항</option>
                   <option value={PostCategory.PRESS}>보도자료</option>
                 </select>
               </div>
               <textarea value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} placeholder="내용" className="border p-2 rounded w-full h-24 mb-4"></textarea>
               <button onClick={handleAddPost} className="bg-primary text-white px-6 py-2 rounded font-bold">등록</button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
               <table className="w-full text-left">
                 <thead className="bg-gray-50">
                    <tr><th className="p-4">제목</th><th className="p-4">날짜</th><th className="p-4 text-right">관리</th></tr>
                 </thead>
                 <tbody>
                    {posts.map(post => (
                      <tr key={post.id} className="border-t">
                        <td className="p-4">{post.title}</td>
                        <td className="p-4 text-gray-500 text-sm">{post.date}</td>
                        <td className="p-4 text-right"><button onClick={() => onDeletePost(post.id)} className="text-red-400"><Trash2 size={16}/></button></td>
                      </tr>
                    ))}
                 </tbody>
               </table>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl space-y-8 animate-fade-in-up">
            <h1 className="text-2xl font-bold">사이트 설정</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
              <div className="flex items-center gap-2 border-b pb-2"><Image size={18}/> <h3 className="font-bold">메인 화면 (Hero) 설정</h3></div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold block mb-1">메인 타이틀</label>
                  <textarea name="heroTitle" value={config.heroTitle} onChange={handleConfigChange} className="w-full border p-2 rounded h-20 font-mono text-sm" />
                </div>
                <div>
                  <label className="text-sm font-bold block mb-1">설명 문구</label>
                  <textarea name="heroDescription" value={config.heroDescription} onChange={handleConfigChange} className="w-full border p-2 rounded h-24" />
                </div>
                <div>
                  <label className="text-sm font-bold block mb-1">배경 이미지 URL</label>
                  <input name="heroImage" value={config.heroImage} onChange={handleConfigChange} className="w-full border p-2 rounded" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
              <div className="flex items-center gap-2 border-b pb-2"><LayoutIcon size={18}/> <h3 className="font-bold">기본 회사 정보</h3></div>
              <div className="grid grid-cols-2 gap-4">
                <input name="companyName" value={config.companyName} onChange={handleConfigChange} placeholder="회사명" className="border p-2 rounded" />
                <input name="contactPhone" value={config.contactPhone} onChange={handleConfigChange} placeholder="연락처" className="border p-2 rounded" />
                <input name="contactEmail" value={config.contactEmail} onChange={handleConfigChange} placeholder="이메일" className="border p-2 rounded" />
                <input name="address" value={config.address} onChange={handleConfigChange} placeholder="주소" className="border p-2 rounded col-span-2" />
              </div>
            </div>
            <div className="text-right text-gray-400 text-sm italic">수정 시 즉시 자동 저장됩니다.</div>
          </div>
        )}
      </main>
    </div>
  );
};