import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { redirect, useFetcher, useLoaderData, useRevalidator } from 'react-router';
import { toast } from 'sonner';
import { AnimatedSection } from '~/components/ui/animated-section';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import Countdown from '~/components/ui/countdown';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import type { Candidate } from '~/types';

export const VoteModule = () => {
  const { candidates }: { candidates: Candidate[] } = useLoaderData();
  const fetcher = useFetcher();
  const revalidator = useRevalidator();

  const voteDate = new Date('2025-08-15T07:00:00.000Z');
  const isVoteDate = new Date() >= voteDate;

  const isUseVoteDate = false;

  const [showTokenModal, setShowTokenModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [voteToken, setVoteToken] = useState('');

  const handleVote = (candidateCode: string, voteToken: string) => {
    fetcher.submit(
      {
        candidateCode,
        voteToken,
      },
      {
        method: 'post',
        action: '/vote',
      }
    );
  }

  const handleConfirmVote = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowTokenModal(true);
  }

  const handleSubmitToken = () => {
    if (!selectedCandidate || !voteToken.trim()) {
      toast.error('Token vote harus diisi');
      return;
    }
    handleVote(selectedCandidate.code || selectedCandidate.number.toString(), voteToken);
  }

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.success) {
        revalidator.revalidate();
        toast.success(fetcher.data.message || 'Vote berhasil dikirim!');
        setShowTokenModal(false);
        setSelectedCandidate(null);
        setVoteToken('');

        redirect('/');
      } else {
        toast.error(fetcher.data.message || 'Gagal mengirim vote');
      }
    }
  }, [fetcher.data, revalidator])

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
          {isVoteDate || !isUseVoteDate ?
            'Klik kandidat yang ingin dipilih'
            : 'Tunggu waktu voting yak!'}
        </motion.h3>
        {isVoteDate || !isUseVoteDate ? (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 relative'>
            {candidates ? (
              candidates.map((candidate, index) => {
                return (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card
                        className='cursor-pointer hover:scale-105 duration-300'>
                        <CardContent>
                          <div className='flex flex-col justify-center gap-5'>
                            <h1 className="font-semibold text-lg bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center">
                              {index + 1}
                            </h1>
                            <div className='flex flex-col items-center justify-center'>
                              <img
                                src={`/paslon${candidate.number}.png`}
                                alt="paslon-1"
                                width={400}
                                height={200}
                                className="max-h-[250px] scale-75 md:scale-100 object-contain"
                              />
                              <div className='flex flex-col gap-2 w-full justify-center items-center'>
                                <h2 className="text-2xl font-bold text-center">{candidate.presidentName} & {candidate.vicePresidentName}</h2>
                                <p className='text-sm text-slate-600 text-center'>Pasangan Calon Ketua dan Wakil Ketua Osis Nomor Urut {candidate.number}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Apakah Kamu Yakin Memilih Paslon Nomor {candidate.number}?
                        </DialogTitle>
                        <DialogDescription className='text-destructive font-bold'>
                          Pilihan kamu tidak dapat di ubah!
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex flex-col-reverse gap-2 mt-10">
                        <DialogClose>
                          <Button variant={'outline'} className="w-full cursor-pointer">
                            Tidak Yakin
                          </Button>
                        </DialogClose>
                        <DialogClose>
                          <Button
                            className="w-full cursor-pointer"
                            onClick={() => {
                              handleConfirmVote(candidate);
                            }}
                          >
                            Yakin!
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )
              })
            ) : (
              <AnimatedSection className="animate-pulse font-manrope font-bold w-full flex justify-center">
                Loading Data...
              </AnimatedSection>
            )}

          </div>
        ) : (
          <Countdown targetDate={voteDate} />
        )}

        {/* Token Input Modal */}
        <Dialog open={showTokenModal} onOpenChange={setShowTokenModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Masukkan Token Vote
              </DialogTitle>
              <DialogDescription>
                Masukkan token vote yang telah diberikan untuk melanjutkan pemilihan {selectedCandidate?.presidentName} & {selectedCandidate?.vicePresidentName} (Nomor {selectedCandidate?.number})
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="voteToken">Token Vote</Label>
                <Input
                  id="voteToken"
                  type="text"
                  placeholder="Masukkan token vote..."
                  value={voteToken}
                  onChange={(e) => setVoteToken(e.target.value)}
                  className="w-full"
                  minLength={6}
                  maxLength={6}
                />
              </div>
            </div>
            <DialogFooter className="flex flex-col-reverse gap-2">
              <DialogClose className=''>
                <Button
                  variant="outline"
                  className="w-full cursor-pointer"
                  onClick={() => {
                    setVoteToken('');
                    setSelectedCandidate(null);
                  }}
                >
                  Batal
                </Button>
              </DialogClose>
              <Button
                className="cursor-pointer"
                onClick={handleSubmitToken}
                disabled={!voteToken.trim() || fetcher.state === 'submitting'}
              >
                {fetcher.state === 'submitting' ? 'Mengirim...' : 'Submit Vote'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section >
  );
}; 