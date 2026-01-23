import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { AdminDashboard } from './pages/AdminDashboard';
import { SiteConfig, Post } from './types';
import { INITIAL_CONFIG, INITIAL_POSTS } from './constants';

const App: React.FC = () => {
  // Global State acting as a pseudo-backend/database
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  
  // Simple view management instead of complex routing for this demo structure
  // 'home' (and anchors #about, #business etc) vs 'admin'
  const [currentView, setCurrentView] = useState<string>('home');

  const handleNavigate = (page: string) => {
    setCurrentView(page);
    if (page === 'home') {
       window.scrollTo(0,0);
    }
  };

  const handleUpdateConfig = (newConfig: SiteConfig) => {
    setSiteConfig(newConfig);
    // In a real app, this would make an API call
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