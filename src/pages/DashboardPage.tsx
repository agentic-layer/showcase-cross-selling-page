
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import { ClaimsProvider } from '@/components/ClaimsProvider';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ChatInterface from '@/components/ChatInterface';
import CustomerDataTable from '@/components/CustomerDataTable';
import ProductDataTable from '@/components/ProductDataTable';
import ProcessVisualization from '@/components/ProcessVisualization';
import Footer from '@/components/Footer';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [showCustomerData, setShowCustomerData] = useState(false);
  const [showProductData, setShowProductData] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <ClaimsProvider>
      <div className="min-h-screen bg-background">
        {/* Add logout button to header */}
        <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/0255c12a-3d19-4910-9df5-d730b57d704f.png" 
                alt="QAware Logo" 
                className="h-8 w-8"
              />
              <span className="ml-2 font-semibold text-lg">Cross Selling Agent</span>
            </div>
            
            {/* Navigation and logout */}
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-8">
                <a href="#showcase" className="text-foreground hover:text-accent transition-colors">
                  Showcase
                </a>
                <a href="#technologie" className="text-foreground hover:text-accent transition-colors">
                  Technologie
                </a>
              </nav>
              <span className="text-sm text-muted-foreground">
                {user?.email}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                Abmelden
              </Button>
            </div>
          </div>
        </header>
        
        <main>
          <HeroSection />
          <ChatInterface />
          
          {/* Toggle Buttons for Data Tables */}
          <div className="container mx-auto px-6 py-6">
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setShowCustomerData(!showCustomerData)}
                className="px-6 py-2"
              >
                {showCustomerData ? 'Kundendaten ausblenden' : 'Kundendaten anzeigen'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowProductData(!showProductData)}
                className="px-6 py-2"
              >
                {showProductData ? 'Produktdaten ausblenden' : 'Produktdaten anzeigen'}
              </Button>
            </div>
          </div>
          
          {/* Customer Data Table */}
          {showCustomerData && (
            <div className="container mx-auto px-6 pb-12">
              <CustomerDataTable />
            </div>
          )}
          
          {/* Product Data Table */}
          {showProductData && (
            <div className="container mx-auto px-6 pb-12">
              <ProductDataTable />
            </div>
          )}
          
          <ProcessVisualization />
        </main>
        <Footer />
      </div>
    </ClaimsProvider>
  );
};

export default DashboardPage;
