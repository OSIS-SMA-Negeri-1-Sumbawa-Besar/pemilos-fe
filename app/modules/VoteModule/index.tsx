import { motion } from 'framer-motion';
import { useLoaderData } from 'react-router';
import { Card, CardContent } from '~/components/ui/card';
import type { Candidate } from '~/types';

export const VoteModule = () => {
  const { candidates }: { candidates: Candidate[] } = useLoaderData();

  return (
    <section
      id="vote"
      className="w-full min-h-screen overflow-hidden flex flex-col relative font-manrope"
    >
      <div className="w-full p-10 md:p-20 z-20 flex flex-col gap-2">
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="font-extrabold font-manrope text-black-primary text-3xl md:text-6xl text-center leading-tight"
        >
          Pilih sesuai <br />{' '}
          <b className="text-primary">Hati Nuranimu</b>, Yak!
        </motion.h1>
        <motion.h3
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="text-black-secondary text-xl md:text-2xl font-bold text-center"
        >
          Klik kandidat yang ingin dipilih
        </motion.h3>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10'>
          {candidates.map((candidate, index) => {
            return (
              <Card key={index} className='cursor-pointer hover:scale-105 duration-300'>
                <CardContent>
                  <div className='flex flex-col justify-center gap-5'>
                    <h1 className="font-semibold text-lg bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center">
                      {index + 1}
                    </h1>
                    <div className='flex gap-2 w-full justify-center items-end'>
                      <img
                        src={'/osis-1.png'}
                        alt="paslon-1"
                        width={200}
                        height={250}
                        className="max-h-[250px] scale-75 md:scale-100 object-contain"
                      />
                      <img
                        src={'/osis-2.png'}
                        alt="paslon-1"
                        width={200}
                        height={250}
                        className="max-h-[250px] scale-75 md:scale-100 object-contain hidden md:block"
                      />
                    </div>
                    <div className='flex flex-col gap-2 w-full justify-center items-center'>
                      <h2 className="text-2xl font-bold">{candidate.presidentName} & {candidate.vicePresidentName}</h2>
                      <p className='text-sm text-slate-600 text-center'>Pasangan Calon Ketua dan Wakil Ketua Osis Nomor Urut {index + 1}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
}; 