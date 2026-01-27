import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { AdminDashboard } from './pages/AdminDashboard';
import { SiteConfig, Post } from './types';
import { INITIAL_CONFIG, INITIAL_POSTS } from './constants';

const App: React.FC = () => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('farmland_config');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });
  
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('farmland_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });
  
  const [currentView, setCurrentView] = useState<string>('home');

  useEffect(() => {
    localStorage.setItem('farmland_config', JSON.stringify(siteConfig));
  }, [siteConfig]);

  useEffect(() => {
    localStorage.setItem('farmland_posts', JSON.stringify(posts));
  }, [posts]);

  const handleNavigate = (page: string) => {
    setCurrentView(page);
    window.scrollTo(0, 0);
  };

  const handleUpdateConfig = (newConfig: SiteConfig) => {
    setSiteConfig(newConfig);
  };

  const handleAddPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <>
      {currentView === 'admin' ? (
        <AdminDashboard 
          config={siteConfig}
          posts={posts}
          onUpdateConfig={handleUpdateConfig}
          onAddPost={handleAddPost}
          onDeletePost={handleDeletePost}
          onNavigate={handleNavigate}
        />
      ) : (
        <Layout 
          config={siteConfig} 
          onNavigate={handleNavigate}
          currentPage={currentView}
        >
          <Home posts={posts} config={siteConfig} />
        </Layout>
      )}
    </>
  );
};

export default App;