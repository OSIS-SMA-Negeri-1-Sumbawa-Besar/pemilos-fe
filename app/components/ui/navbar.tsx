'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from './button';
import { scroller } from 'react-scroll';

export const NavbarItem = ({
  name,
  onClick,
  index,
}: {
  name: string;
  onClick: () => void;
  index: number;
}) => {
  const [underlineVisible, setUnderlineVisible] = useState(false);

  const handleTextAnimationComplete = () => {
    setUnderlineVisible(true);
  };
  return (
    <motion.li
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="group transition duration-300 cursor-pointer list-none"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      onAnimationComplete={handleTextAnimationComplete}
      onClick={onClick}
    >
      {name}
      {underlineVisible && (
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.5 }}
          className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-secondary"
        />
      )}
    </motion.li>
  );
};

export const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className='"w-full z-30 px-10 md:px-20 top-5 md:top-10 sticky'>
      <AnimatePresence>
        <div
          className={`absolute p-10w-fit lg:hidden bg-white right-10 md:right-20 top-24 shadow-md rounded-md flex flex-col font-manrope ${open ? 'flex' : 'hidden'}`}
        >
          <div className="gap-2 flex flex-col font-semibold text-black-secondary">
            <NavbarItem
              name="Home"
              index={0}
              onClick={() => {
                navigate('/');
              }}
            />
            <NavbarItem
              name="Vote"
              index={1}
              onClick={() => {
                navigate('/vote');
              }}
            />
            <NavbarItem
              name="Visi Misi"
              index={2}
              onClick={() => {
                scroller.scrollTo('visi-misi', {
                  duration: 500,
                  delay: 0,
                  smooth: 'easeInOut',
                })
              }}
            />
            <NavbarItem
              name="Tata Cara"
              index={3}
              onClick={() => {
                scroller.scrollTo('tata-cara', {
                  duration: 500,
                  delay: 0,
                  smooth: 'easeInOut',
                })
              }}
            />
            <NavbarItem
              name="FAQ"
              index={4}
              onClick={() => {
                scroller.scrollTo('faq', {
                  duration: 500,
                  delay: 0,
                  smooth: 'easeInOut',
                })
              }}
            />
          </div>
          <Button variant={'default'}>
            <LogIn className="w-4" />
            Login
          </Button>
        </div>
      </AnimatePresence>
      <motion.nav
        exit={{ opacity: 0, y: -20 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 40,
          duration: 0.5,
        }}
        className={`bg-white px-10 w-full h-20 border shadow-md rounded-xl flex items-center z-30 justify-between font-manrope`}
      >
        <div className="font-semibold flex gap-10 items-center">
          <img
            src={'/logo-smanika-osis.png'}
            alt="Logo"
            width={20}
            height={200}
            className="w-20 h-14"
          />
          <div className="gap-10 hidden lg:flex">
            <NavbarItem
              name="Home"
              index={0}
              onClick={() => {
                navigate('/');
              }}
            />
            {/* <NavbarItem
              name="Vote"
              index={1}
              onClick={() => {
                navigate('/vote')
              }} /> */}
            <NavbarItem
              name="Visi Misi"
              index={2}
              onClick={() => {
                scroller.scrollTo('visi-misi', {
                  duration: 500,
                  delay: 0,
                  smooth: 'easeInOut',
                })
              }}
            />
            <NavbarItem
              name="Tata Cara"
              index={3}
              onClick={() => {
                scroller.scrollTo('tata-cara', {
                  duration: 500,
                  delay: 0,
                  smooth: 'easeInOut',
                })
              }}
            />
            <NavbarItem
              name="FAQ"
              index={4}
              onClick={() => {
                scroller.scrollTo('faq', {
                  duration: 500,
                  delay: 0,
                  smooth: 'easeInOut',
                })
              }}
            />
          </div>
        </div>
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
      </motion.nav>
    </nav>
  );
};
