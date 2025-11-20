import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Waves, Sun, Shield, MapPin } from 'lucide-react';
import { Beach, Package, User } from './types';
import { mockUser, mockAdmin } from './data/mockData';

// Pages
import { Onboarding } from './components/pages/Onboarding';
import { Home } from './components/pages/Home';
import { BeachDetail } from './components/pages/BeachDetail';
import { Checkout } from './components/pages/Checkout';
import { Bookings } from './components/pages/Bookings';
import { Profile } from './components/pages/Profile';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { QRScanner } from './components/pages/QRScanner';
import { BeachManagement } from './components/pages/BeachManagement';

// Components
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Modal } from './components/Modal';
import { Button } from './components/Button';

type View = 
  | 'onboarding'
  | 'home'
  | 'beach-detail'
  | 'checkout'
  | 'bookings'
  | 'profile'
  | 'admin-dashboard'
  | 'qr-scanner'
  | 'beach-management'
  | 'login';

type UserRole = 'tourist' | 'admin' | null;

function App() {
  const [currentView, setCurrentView] = useState<View>('onboarding');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null);
  const [checkoutData, setCheckoutData] = useState<{
    beach: Beach;
    package: Package;
    date: string;
  } | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const handleOnboardingComplete = () => {
    setShowRoleModal(true);
  };

  const handleRoleSelection = (role: 'tourist' | 'admin') => {
    setUserRole(role);
    setCurrentUser(role === 'tourist' ? mockUser : mockAdmin);
    setShowRoleModal(false);
    setCurrentView(role === 'tourist' ? 'home' : 'admin-dashboard');
  };

  const handleBeachClick = (beach: Beach) => {
    setSelectedBeach(beach);
    setCurrentView('beach-detail');
  };

  const handleReserve = (beach: Beach, pkg: Package, date: string) => {
    setCheckoutData({ beach, package: pkg, date });
    setCurrentView('checkout');
  };

  const handleCheckoutComplete = (reservationId: string) => {
    // Redirect to bookings after successful reservation
    setTimeout(() => {
      setCurrentView('bookings');
      setCheckoutData(null);
    }, 100);
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentUser(null);
    setCurrentView('login');
  };

  const handleBottomNavChange = (tab: 'home' | 'search' | 'bookings' | 'profile') => {
    switch (tab) {
      case 'home':
        setCurrentView('home');
        break;
      case 'search':
        setCurrentView('home');
        break;
      case 'bookings':
        setCurrentView('bookings');
        break;
      case 'profile':
        setCurrentView('profile');
        break;
    }
  };

  // Render login/role selection modal
  if (showRoleModal) {
    return (
      <Modal
        isOpen={showRoleModal}
        onClose={() => {}}
        title="Selecciona tu Rol"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600 mb-6">
            ¿Cómo deseas usar Aventurapp?
          </p>

          <button
            onClick={() => handleRoleSelection('tourist')}
            className="w-full p-6 border-2 border-gray-200 rounded-[12px] hover:border-[#00A8CC] hover:bg-[#00A8CC]/5 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#00A8CC]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">🏖️</span>
              </div>
              <div>
                <h4 className="mb-1">Soy Turista</h4>
                <p className="text-sm text-gray-600">
                  Quiero explorar y reservar playas
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleRoleSelection('admin')}
            className="w-full p-6 border-2 border-gray-200 rounded-[12px] hover:border-[#00A8CC] hover:bg-[#00A8CC]/5 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#FFD166]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">👨‍💼</span>
              </div>
              <div>
                <h4 className="mb-1">Soy Administrador</h4>
                <p className="text-sm text-gray-600">
                  Quiero gestionar playas y validar reservas
                </p>
              </div>
            </div>
          </button>
        </div>
      </Modal>
    );
  }

  // Onboarding view
  if (currentView === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Tourist views
  if (userRole === 'tourist') {
    return (
      <div className="min-h-screen bg-[#F8F9FA]">
        {currentView !== 'beach-detail' && currentView !== 'checkout' && (
          <Header
            user={currentUser || undefined}
            onProfileClick={() => setCurrentView('profile')}
          />
        )}

        {currentView === 'home' && (
          <Home onBeachClick={handleBeachClick} />
        )}

        {currentView === 'beach-detail' && selectedBeach && (
          <BeachDetail
            beach={selectedBeach}
            onBack={() => setCurrentView('home')}
            onReserve={handleReserve}
          />
        )}

        {currentView === 'checkout' && checkoutData && (
          <Checkout
            beach={checkoutData.beach}
            package={checkoutData.package}
            date={checkoutData.date}
            onBack={() => setCurrentView('beach-detail')}
            onComplete={handleCheckoutComplete}
          />
        )}

        {currentView === 'bookings' && <Bookings />}

        {currentView === 'profile' && currentUser && (
          <Profile user={currentUser} onLogout={handleLogout} />
        )}

        {currentView !== 'beach-detail' && currentView !== 'checkout' && (
          <BottomNav
            active={
              currentView === 'home' ? 'home' :
              currentView === 'bookings' ? 'bookings' :
              currentView === 'profile' ? 'profile' : 'home'
            }
            onChange={handleBottomNavChange}
          />
        )}
      </div>
    );
  }

  // Admin views
  if (userRole === 'admin') {
    return (
      <div className="min-h-screen bg-[#F8F9FA]">
        {currentView === 'admin-dashboard' && (
          <>
            <Header
              user={currentUser || undefined}
              onProfileClick={handleLogout}
            />
            <AdminDashboard
              onManageBeaches={() => setCurrentView('beach-management')}
              onScanQR={() => setCurrentView('qr-scanner')}
            />
          </>
        )}

        {currentView === 'qr-scanner' && (
          <QRScanner onBack={() => setCurrentView('admin-dashboard')} />
        )}

        {currentView === 'beach-management' && (
          <BeachManagement onBack={() => setCurrentView('admin-dashboard')} />
        )}
      </div>
    );
  }

  // Login view (fallback)
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1672841828482-45faa4c70e50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwc3Vuc2V0fGVufDF8fHx8MTc2MzU5NDY0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#00A8CC]/90 via-[#0077B6]/85 to-[#00B4A7]/90" />
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 text-[#FFD166] opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sun size={80} />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 text-[#FFD166] opacity-20"
        animate={{
          x: [0, 20, 0],
          rotate: [0, -10, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Waves size={100} />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full"
        >
          {/* Logo and Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center justify-center mb-4">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Waves className="text-[#FFD166]" size={56} strokeWidth={2.5} />
              </motion.div>
            </div>
            <h1 className="text-white mb-3 text-5xl tracking-tight drop-shadow-lg">
              Aventurapp
            </h1>
            <p className="text-white/90 text-lg max-w-md mx-auto">
              Descubre las mejores playas de Buenaventura
            </p>
            
            {/* Features Pills */}
            <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin size={16} className="text-[#FFD166]" />
                <span className="text-white text-sm">Reservas Fáciles</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Shield size={16} className="text-[#FFD166]" />
                <span className="text-white text-sm">100% Seguro</span>
              </div>
            </div>
          </motion.div>

          {/* Role Selection Cards */}
          <div className="space-y-4">
            <motion.button
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelection('tourist')}
              className="w-full bg-white/95 backdrop-blur-md rounded-[12px] p-8 shadow-strong hover:shadow-[0_12px_32px_rgba(0,0,0,0.24)] transition-all duration-300 text-left group relative overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00A8CC]/10 to-[#00B4A7]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#00A8CC] to-[#00B4A7] rounded-[12px] flex items-center justify-center flex-shrink-0 shadow-medium group-hover:shadow-strong transition-all duration-300">
                  <Waves className="text-white" size={36} strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#00A8CC] mb-2 group-hover:text-[#0077B6] transition-colors">
                    Soy Turista
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Explora playas paradisíacas y reserva experiencias únicas en Buenaventura
                  </p>
                </div>
                <div className="text-[#00A8CC] group-hover:translate-x-2 transition-transform duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelection('admin')}
              className="w-full bg-white/95 backdrop-blur-md rounded-[12px] p-8 shadow-strong hover:shadow-[0_12px_32px_rgba(0,0,0,0.24)] transition-all duration-300 text-left group relative overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFD166]/10 to-[#FFD166]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FFD166] to-[#FFD166]/80 rounded-[12px] flex items-center justify-center flex-shrink-0 shadow-medium group-hover:shadow-strong transition-all duration-300">
                  <Shield className="text-[#0077B6]" size={36} strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#0077B6] mb-2 group-hover:text-[#00A8CC] transition-colors">
                    Soy Administrador
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Gestiona playas, valida reservas y controla el acceso con códigos QR
                  </p>
                </div>
                <div className="text-[#0077B6] group-hover:translate-x-2 transition-transform duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </motion.button>
          </div>

          {/* Footer Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center text-white/80 mt-8 text-sm"
          >
            Tu próxima aventura comienza aquí 🌴
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default App;