'use client';
// import { ExpirationLogout } from '@/custom-hook/expiration-logout'
import { motion } from 'framer-motion';
import { useLocation } from 'react-router';
/* eslint-disable react/react-in-jsx-scope */
export const Background = () => {
  const pathName = useLocation().pathname;

  const handleVisible = () => {
    if (pathName === '/vote') {
      return 'hidden';
    } else {
      return 'block';
    }
  }

  return (
    <div className={`w-full h-screen absolute z-0 ${handleVisible()}`}>
      <motion.div
        initial={{ x: -200, y: 200 }}
        animate={{ x: 0, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 40,
        }}
        className="absolute -bottom-12 "
      >
        <img
          src={'/corner-blob-1.png'}
          alt="Corner Blob 1"
          width={500}
          height={300}
          className="w-[15rem] sm:w-[20rem] md:w-[25rem] lg:w-[30rem]"
        />
      </motion.div>

      <motion.div
        initial={{ x: 500, y: -500 }}
        animate={{ x: 0, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 40,
        }}
        className="absolute -top-12 right-0"
      >
        <img
          src={'/corner-blob-2.png'}
          alt="Corner Blob 2"
          width={400}
          height={300}
          className="w-[15rem] sm:w-[20rem] md:w-[25rem] lg:w-[30rem]"
        />
      </motion.div>
    </div>
  );
};
