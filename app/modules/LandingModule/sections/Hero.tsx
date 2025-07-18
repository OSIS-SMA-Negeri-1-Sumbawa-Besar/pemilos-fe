import { motion } from 'framer-motion';
import { ArrowDown, LogIn, Vote } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router';
import { Link } from 'react-scroll';
import { Button } from '~/components/ui/button';
import type { Session } from '~/lib/auth.server';
import { childVariants, containerVariants } from '../components/stagger';

export function Hero() {
    const navigate = useNavigate();
    const user = useOutletContext<Session>();

    const landingText =
        'Website Resmi Pemilihan Calon Ketua dan Wakil Ketua OSIS SMA Negeri 1 Sumbawa Besar Periode 2025/2026'.split(
            ' '
        );

    return (
        <section
            id="home"
            className="w-full h-screen relative flex justify-center items-center font-manrope overflow-hidden"
        >
            <div className="gap-4 z-20 flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                    }}
                >
                    <img
                        src={'/logo-smanika-osis.png'}
                        alt="SMANIKA OSIS Logo"
                        width={100}
                        height={200}
                    />
                </motion.div>
                <motion.div
                    className="w-full flex justify-center items-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                    }}
                >
                    <img
                        src={'/smanika-memilih.png'}
                        alt="SMANIKA Memilih"
                        width={400}
                        height={200}
                        className="w-[70%] sm:w-[60%] md:w-[50%] lg:w-[40%]"
                    />
                </motion.div>
                <div className="font-manrope font-semibold w-[70%] md:w-[50%] text-center">
                    {landingText.map((el, i) => (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.25,
                                delay: i / 10,
                            }}
                            key={i}
                        >
                            {el}{' '}
                        </motion.span>
                    ))}
                </div>
                <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Link
                        activeClass="active"
                        to={'visi-misi'}
                        spy={true}
                        smooth={true}
                        offset={-30}
                        duration={1000}
                    >
                        <motion.div variants={childVariants}>
                            <Button variant={'outline'}>
                                <ArrowDown className="w-5" />
                                <span>Lihat Calon</span>
                            </Button>
                        </motion.div>
                    </Link>
                    <motion.div variants={childVariants}>
                        {
                            user ?
                                <Button
                                    className="w-full"
                                    onClick={() => {
                                        navigate('/vote');
                                    }}
                                >
                                    <Vote size={32} />
                                    <span>Vote!</span>
                                </Button>
                                :
                                <Button
                                    className="w-full"
                                    onClick={() => {
                                        navigate('/login');
                                    }}
                                >
                                    <LogIn size={32} />
                                    <span>Login</span>
                                </Button>
                        }
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}