import React, { useState } from 'react';
import { Post, SiteConfig, PostCategory } from '../types';
import { Settings, PenTool, Layout as LayoutIcon, Trash2, Plus, Save, ArrowLeft } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'content' | 'settings'>('content');
  const [newPost, setNewPost] = useState<Partial<Post>>({
    title: '', category: PostCategory.NEWS, content: '', imageUrl: 'https://picsum.photos/800/600'
  });

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdateConfig({ ...config, [name]: value });
  };

  const handleAddPost = () => {
    if (!newPost.title || !newPost.content) return alert('제목과 내용을 입력해주세요.');
    
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

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-accent text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-black">ADMIN</h2>
          <p className="text-gray-400 text-xs mt-1">Farmland CMS v1.0</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-bold transition-colors ${activeTab === 'content' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            <PenTool size={18} /> 게시물 관리
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-bold transition-colors ${activeTab === 'settings' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            <Settings size={18} /> 사이트 설정
          </button>
          <button 
             onClick={() => onNavigate('home')}
             className="w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 mt-8"
          >
            <ArrowLeft size={18} /> 사이트로 돌아가기
          </button>
        </nav>
      </aside>

      {/* Mobile Header (simplified) */}
      <div className="md:hidden fixed top-0 w-full bg-accent text-white p-4 z-50 flex justify-between items-center">
         <span className="font-bold">Admin</span>
         <button onClick={() => onNavigate('home')}>Exit</button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto mt-12 md:mt-0">
        
        {/* Content Management Tab */}
        {activeTab === 'content' && (
          <div className="max-w-5xl mx-auto animate-fade-in-up">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">게시물 관리</h1>
            </div>

            {/* Create Post Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Plus size={18}/> 새 글 작성</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" 
                  placeholder="제목을 입력하세요"
                  className="border p-3 rounded w-full focus:outline-none focus:border-primary"
                  value={newPost.title}
                  onChange={e => setNewPost({...newPost, title: e.target.value})}
                />
                <select 
                  className="border p-3 rounded w-full focus:outline-none focus:border-primary"
                  value={newPost.category}
                  onChange={e => setNewPost({...newPost, category: e.target.value as PostCategory})}
                >
                  <option value={PostCategory.NEWS}>공지사항</option>
                  <option value={PostCategory.PRESS}>보도자료</option>
                  <option value={PostCategory.SOCIAL_CONTRIBUTION}>사회공헌</option>
                </select>
              </div>
              <textarea 
                placeholder="내용을 입력하세요"
                className="border p-3 rounded w-full h-32 mb-4 focus:outline-none focus:border-primary resize-none"
                value={newPost.content}
                onChange={e => setNewPost({...newPost, content: e.target.value})}
              ></textarea>
              <div className="flex justify-end">
                <button 
                  onClick={handleAddPost}
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded font-bold transition-colors"
                >
                  등록하기
                </button>
              </div>
            </div>

            {/* Post List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-600 text-sm">
                  <tr>
                    <th className="p-4 font-bold border-b">구분</th>
                    <th className="p-4 font-bold border-b w-1/2">제목</th>
                    <th className="p-4 font-bold border-b">날짜</th>
                    <th className="p-4 font-bold border-b text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {posts.map(post => (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 border-b">
                         <span className={`px-2 py-1 rounded text-xs font-bold ${
                           post.category === PostCategory.NEWS ? 'bg-blue-100 text-blue-800' :
                           post.category === PostCategory.PRESS ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                         }`}>
                           {post.category === PostCategory.NEWS ? '공지사항' : post.category === PostCategory.PRESS ? '보도자료' : '사회공헌'}
                         </span>
                      </td>
                      <td className="p-4 border-b font-medium text-gray-800">{post.title}</td>
                      <td className="p-4 border-b text-gray-500">{post.date}</td>
                      <td className="p-4 border-b text-right">
                        <button 
                          onClick={() => onDeletePost(post.id)}
                          className="text-red-400 hover:text-red-600 p-2 rounded hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {posts.length === 0 && (
                     <tr><td colSpan={4} className="p-8 text-center text-gray-400">게시물이 없습니다.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
           <div className="max-w-2xl mx-auto animate-fade-in-up">
              <h1 className="text-3xl font-extrabold text-gray-800 mb-8 tracking-tight">사이트 설정</h1>
              
              <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                  <LayoutIcon className="text-primary" />
                  <h3 className="font-bold text-lg">기본 정보 설정</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">회사명 (사이트 제목)</label>
                    <input 
                      type="text" 
                      name="companyName"
                      value={config.companyName}
                      onChange={handleConfigChange}
                      className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-primary" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">대표 이메일</label>
                    <input 
                      type="text" 
                      name="contactEmail"
                      value={config.contactEmail}
                      onChange={handleConfigChange}
                      className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-primary" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">대표 전화번호</label>
                    <input 
                      type="text" 
                      name="contactPhone"
                      value={config.contactPhone}
                      onChange={handleConfigChange}
                      className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-primary" 
                    />
                  </div>

                   <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">주소</label>
                    <input 
                      type="text" 
                      name="address"
                      value={config.address}
                      onChange={handleConfigChange}
                      className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-primary" 
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button className="flex items-center gap-2 bg-accent text-white px-6 py-2 rounded hover:bg-black transition-colors font-bold">
                      <Save size={18} /> 저장하기
                    </button>
                  </div>
                </div>
              </div>
           </div>
        )}
      </main>
    </div>
  );
};