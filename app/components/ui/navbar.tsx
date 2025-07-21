import { motion } from 'framer-motion';
import { LogIn, LogOut, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useRevalidator } from 'react-router';
import { scroller } from 'react-scroll';
import { toast } from 'sonner';
import { getAuthClient } from '~/lib/auth';
import type { Session } from '~/lib/auth.server';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export const NavbarItem = ({
  name,
  onClick,
  index,
  isActive = false,
  isNavbarVisible = true,
}: {
  name: string;
  onClick: () => void;
  index: number;
  isActive?: boolean;
  isNavbarVisible?: boolean;
}) => {
  const [underlineVisible, setUnderlineVisible] = useState(false);

  const handleTextAnimationComplete = () => {
    setUnderlineVisible(true);
  };

  // Reset underline animation when navbar becomes visible
  useEffect(() => {
    if (isNavbarVisible) {
      setUnderlineVisible(false);
    }
  }, [isNavbarVisible]);

  return (
    <motion.li
      key={`${name}-${isNavbarVisible}`} // Force re-animation when navbar visibility changes
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.6, 
        delay: isNavbarVisible ? index * 0.15 : 0,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className={`group transition duration-300 cursor-pointer list-none text-sm ${isActive ? 'font-bold text-primary' : ''}`}
      whileHover={{ 
        scale: 1.08, 
        transition: { duration: 0.2, type: "spring", stiffness: 400 } 
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      onAnimationComplete={handleTextAnimationComplete}
      onClick={onClick}
    >
      {name}
      {underlineVisible && (
        <motion.span
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ scaleX: 0, opacity: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          className={`block transition-all duration-500 h-0.5 bg-secondary ${
            isActive 
              ? 'max-w-full' 
              : 'max-w-0 group-hover:max-w-full'
          }`}
        />
      )}
    </motion.li>
  );
};

export const Navbar = ({ user }: { user: Session }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const revalidator = useRevalidator();
  const authClient = getAuthClient();
  
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);

      // Show navbar when user stops scrolling
      const newTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 150); // Show after 150ms of no scrolling

      setScrollTimeout(newTimeout);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollY, scrollTimeout]);

  const handleLogout = () => {
    authClient.signOut();

    toast.success('Berhasil logout')
    revalidator.revalidate();
  }

  return (
    <motion.nav 
      className="w-full z-30 px-10 md:px-20 top-5 md:top-10 sticky"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 120,
        damping: 20
      }}
    >
      <motion.nav
        key={`navbar-${isVisible}`} // Force re-animation when visibility changes
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
        transition={{
          duration: 0.5,
          type: 'spring',
          stiffness: 150,
          damping: 25,
        }}
        className={`bg-white px-10 w-full h-20 border shadow-md rounded-xl flex items-center font-manrope justify-between`}
      >
        <motion.img
          key={`logo-${isVisible}`}
          initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          src={'/logo-smanika-osis.png'}
          alt="Logo"
          width={20}
          height={200}
          className="w-20 h-14 mr-10"
        />
        <div className='hidden lg:flex items-center justify-between w-full'>
          <motion.div 
            key={`nav-items-${isVisible}`}
            className="gap-10 hidden lg:flex font-semibold"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.3,
              type: "spring",
              stiffness: 120,
              damping: 20
            }}
          >
            <NavbarItem
              name="Home"
              index={0}
              isActive={location.pathname === '/'}
              isNavbarVisible={isVisible}
              onClick={() => {
                navigate('/');
              }}
            />
            {/* Vote Item */}
            {
              user &&
              <NavbarItem
                name="Vote"
                index={1}
                isActive={location.pathname.startsWith('/vote')}
                isNavbarVisible={isVisible}
                onClick={() => {
                  navigate('/vote');
                }}
              />
            }
            <NavbarItem
              name="Visi Misi"
              index={2}
              isActive={false} // This is for scrolling, not navigation
              isNavbarVisible={isVisible}
              onClick={() => {
                scroller.scrollTo('visi-misi', {
                  duration: 500,
                  delay: 0,
                  smooth: 'easeInOut',
                });
              }}
            />
            <NavbarItem
              name="Tata Cara"
              index={3}
              isActive={false} // This is for scrolling, not navigation
              isNavbarVisible={isVisible}
              onClick={() => {
                scroller.scrollTo('tata-cara', {
                  duration: 500,
                  delay: 0,
                  smooth: 'easeInOut',
                });
              }}
            />
            <NavbarItem
              name="FAQ"
              index={4}
              isActive={false} // This is for scrolling, not navigation
              isNavbarVisible={isVisible}
              onClick={() => {
                scroller.scrollTo('faq', {
                  duration: 500,
                  delay: 0,
                  smooth: 'easeInOut',
                });
              }}
            />
          </motion.div>
          {
            (location.pathname !== '/login' && !user) &&
            <motion.div
              key={`login-btn-${isVisible}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.4,
                type: "spring",
                stiffness: 120,
                damping: 20
              }}
            >
              <Button
                className="hover:scale-[1.05] transition duration-200 ease-in-out text-sm font-semibold"
                variant={'default'}
                onClick={() => {
                  navigate('/login');
                }}
              >
                <LogIn className="w-4" />
                Login
              </Button>
            </motion.div>
          }

          {
            user &&
            <motion.div 
              key={`user-info-${isVisible}`}
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.4,
                type: "spring",
                stiffness: 120,
                damping: 20
              }}
            >
              <div className='flex  flex-col text-right'>
                <p className="text-sm font-semibold mr-2">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500">
                  {user.email.replaceAll("@gmail.com", "")}
                </p>
              </div>
              <Button
                className="hover:scale-[1.05] transition duration-200 ease-in-out text-sm font-semibold"
                variant={'default'}
                onClick={handleLogout}
              >
                <LogOut />
                Logout
              </Button>
            </motion.div>
          }
        </div>

        <Popover>
          <PopoverTrigger className='lg:hidden'>
            <motion.div
              key={`menu-icon-${isVisible}`}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <Menu className="w-8 h-8" />
            </motion.div>
          </PopoverTrigger>
          <PopoverContent className='max-w-52 p-10 mr-10 mt-7 md:mr-20 md:p-14 md:max-w-none'>
            <motion.div 
              key={`mobile-nav-${isVisible}`}
              className="gap-3 flex flex-col font-semibold text-black-secondary font-manrope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <NavbarItem
                name="Home"
                index={0}
                isActive={location.pathname === '/'}
                isNavbarVisible={isVisible}
                onClick={() => {
                  navigate('/');
                }}
              />
              {/* Vote Item */}
              {
                user &&
                <NavbarItem
                  name="Vote"
                  index={1}
                  isActive={location.pathname.startsWith('/vote')}
                  isNavbarVisible={isVisible}
                  onClick={() => {
                    navigate('/vote');
                  }}
                />
              }
              <NavbarItem
                name="Visi Misi"
                index={2}
                isActive={false} // This is for scrolling, not navigation
                isNavbarVisible={isVisible}
                onClick={() => {
                  scroller.scrollTo('visi-misi', {
                    duration: 500,
                    delay: 0,
                    smooth: 'easeInOut',
                  });
                }}
              />
              <NavbarItem
                name="Tata Cara"
                index={3}
                isActive={false} // This is for scrolling, not navigation
                isNavbarVisible={isVisible}
                onClick={() => {
                  scroller.scrollTo('tata-cara', {
                    duration: 500,
                    delay: 0,
                    smooth: 'easeInOut',
                  });
                }}
              />
              <NavbarItem
                name="FAQ"
                index={4}
                isActive={false} // This is for scrolling, not navigation
                isNavbarVisible={isVisible}
                onClick={() => {
                  scroller.scrollTo('faq', {
                    duration: 500,
                    delay: 0,
                    smooth: 'easeInOut',
                  });
                }}
              />
            </motion.div>
            <Button
              variant={'default'}
              className='mt-3'
            >
              <LogIn className="w-4" />
              Login
            </Button>
          </PopoverContent>
        </Popover>
      </motion.nav>
    </motion.nav>
  );
};
