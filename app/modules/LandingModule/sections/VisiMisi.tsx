'use client';
import { Element } from 'react-scroll';
import { Accordion } from '~/components/ui/accordion';
import { AnimatedSection } from '~/components/ui/animated-section';
import { AnimatedTitle } from '~/components/ui/animated-title';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';

interface paslonProps {
  nomorUrut: number;
  nama: string;
  image: string;
  visi: string;
  misi: string[];
  proker: {
    title: string;
    content: string;
  }[];
}

const paslonData: paslonProps[] = [
  {
    nomorUrut: 1,
    nama: 'Zulfikar & Embun',
    image: 'osis-1.png',
    visi: 'Mewujudkan siswa-siswi SMAN 1 Sumbawa Besar yang berkarakter ( 3K + 3R ) Kreatif dalam pemunculan gagasan, Kolaboratif dengan tindakan, Komunikatif melalui penyampaian pesan, Religius pada kenyakinan, Relevan melalui bantuan, dan Revolusioner dalam menciptakan perubahan.',
    misi: [
      'Menciptakan toleransi antar umat beragama dalam menciptakan ketenangan dan perdamaian antar siswa-siswi SMAN 1 Sumbawa Besar.',
      'Memfasilitasi, mengembangkan, dan mengapresiasi minat dan bakat siswa/i SMAN 1 Sumbawa Besar dalam bidang olahraga, seni/budaya, keilmuan, keagamaan, dan peminatan bakat lainnya.',
      'Melibatkan seluruh anggota organisasi dan seluruh warga sekolah untuk menerapkan budaya kolaboratif dalam mencapai tujuan yang positif.',
      'Meningkatkan kinerja OSIS SMAN 1 Sumbawa Besar dengan pemanfaatan sistem teknologi komunikasi dan informasi dalam tujuan kemajuan sekolah.',
      'Memperkuat kehormanisan antar pengurus dan seluruh siswa-siswi sekolah untuk mewujudkan karakter produktif dalam berorganisasi.',
      'Menjadikan program kerja OSIS SMAN 1 Sumbawa Besar yang bermanfaat bagi sekolah dan masyarakat.',
    ],
    proker: [
      {
        title: 'SMANIKA DUTION',
        content:
          'Duty Inspiration : Kompetisi Duta antar kelas X.XI.XII melalui perwakilan satu siswa yang menjadi role model dalam SMAN 1 SUMBAWA BESAR melalui bakat dan keahlian yang dimiliki oleh masing masing siswa-siswi.',
      },
      {
        title: 'SMANIKA ENPRETION',
        content:
          'Entreprise Competition : Kompetisi Memasak antar kelas X.XI.XII dalam membentuk jiwa kewirausahaan dan Kompetisi Berjualan dari hasil karya memasak peserta dalam menciptakan jiwa bisnis di lingkungan sekolah.',
      },
      {
        title: 'SMANIKA ESCORATION',
        content:
          'Extra School Collaboration : Lomba Antar Sekolah Menengah Atas dalam bidang komunikasi, kreativitas, keahlian akademik maupun non-akademik.',
      },
      {
        title: 'SMANIKA FESDATION',
        content:
          'Festival Ramadhan and Action : Kompetisi Bisnis Ramadhan dalam mengembangkan jiwa wirausaha pada saat bulan suci Ramadhan. Berbagi Takjil Bareng kelas X,XI dalam meraih keberkahan bulan suci Ramadhan dengan Bersedekah antar sesama. Buka Bersama Bareng kepengurusan OSIS-MPK REVION SMANIKA dalam menunjukkan kebersamaan dan kekompakan organisasi. Lomba Ramadhan Bareng seluruh siswa-siswi melalui lomba Kisah 25 Nabi, dan Ceramah Keagamaan.',
      },
      {
        title: 'SMANIKA DAICLATION',
        content:
          'Daily Class Selection : Seleksi Antar Kelas dalam membentuk kelas yang memiliki standar kebersihan dan ketertiban melalui seleksi serempak dengan penilaian yang berisikan poin poin dengan hitungan yang berstandar tinggi.',
      },
      {
        title: 'SMANIKA FONPRETION',
        content:
          'Food Enterpeneur and Action Bisnis : Organisasi dalam mengupayakan kedekatan antar pengurus dan seluruh siswa-siswi SMAN 1 Sumbawa Besar melalui kegiatan yang bersifat kekeluargaan dan kebersamaan dalam bentuk kegiatan santai dan kebersamaan antar pengurus dan seluruh siswa-siswi SMAN 1 Sumbawa Besar.',
      },
      {
        title: 'SMANIKA INVETION',
        content:
          'Integrity Value Innovation : Kegiatan rutin sekolah akhir semester melalui permainan dan lomba-lomba seperti Futsal, E-Sport, Kreasi budaya sumbawa, kreasi Olahraga, bidang komunikasi, dan lomba antar bapak/ibu guru SMAN 1 Sumbawa Besar',
      },
    ],
  },
  {
    nomorUrut: 2,
    nama: 'Arvel & Icha',
    image: 'osis-2.png',
    visi: 'menjadikan OSIS sebagai wadah aspirasi dan garda terdepan dalam mewujudkan generasi emas yang unggul, berdaya saing tinggi, baik dalam segi akademik maupun non akademik dengan pemerbdayaan sumber daya pelajar yang berkompetensi global menuju transformasi pendidikan dan selaras untuk mewujudkan smanika yang berprestasi, partisipasi, kreasi inovasi, serta untuk mencapai generasi emas 2045.',
    misi: [
      'Menciptakan lingkungan SMANIKA menjadi lingkungan yang bersih, aman dan sehat, untuk membantu sekolah mewujudkan sekolah adiwiyata.',
      'Mengadakan kegiatan yang membangun karakter siswa melalui program volunteerisme, kegiatan sosial, dan budaya.',
      'Mengembangkan program yang mengintegrasikan ilmu pengetahuan, teknologi, dan seni untuk mengasah kreativitas siswa.',
      'menciptakan kolaborasi ekstrakurikuler dalam pelaksanaan kegiatan sekolah.',
      'Mengoptimalkan dan mengembangkan program kerja osis  sudah terlaksana atau belum terlaksana di kepungurusan osis sebelumnya.',
      'Memberikan kebebasan berekspresi, berpendapat dan berkreasi yang bertanggung jawab terhadapa siswa siswi sma negeri 1 sumbawa besar.',
    ],
    proker: [
      {
        title: 'SmanikaEntrepreneurship',
        content:
          'Pameran kewirausahaan yang memamerkan produk dalam rangka menyukseskan pertumbuhan sektor ekonomi kreatif di mana tiap kelas akan menampilkan pertunjukan dan membuka stand sesuai dengan sektor-sektor ekonomi kreatif yang dipilih.',
      },
      {
        title: 'SmanikaTalentShow',
        content:
          'Pertunjukan bakat yang memberikan platform bagi siswa untuk menunjukkan keahlian mereka seperti Tari, Vocal, Catwalk, Monolog, Puisi.',
      },
      {
        title: 'SmanikaChampionship',
        content:
          'kompetisi antar sekolah menengah atas yang diwakili oleh tim terbaik pada sekolah berdasarkan hasil seleksi internal sekolah yang diadakan terlebih dahulu dengan tujuan meningkatkan solidaritas dan sportivitas antar sekolah seperti turnamen mobile legends, free fire, pubg dan kompetisi olahraga seperti futsal, volly, basket, badminton.',
      },
      {
        title: 'SmanikaLangFest',
        content:
          'Mengadakan lomba-lomba yang berkaitan dengan bahasa, seperti lomba pidato dalam berbagai bahasa, lomba spelling bee, dan lomba debat bilingual.',
      },
      {
        title: 'SmanikaSSC (Super Smart Competition)',
        content:
          'Mengasah keterampilan akademik, logika, dan kreativitas siswa melalui kompetisi yang menantang.',
      },
    ],
  },
];

export const VisiMisi = () => {
  return (
    <Element name="visi-misi">
      <AnimatedSection className="font-manrope flex flex-col gap-10 my-10 relative">
        <AnimatedTitle>
          Yuk, Cek <span className="text-primary">Visi Misi</span>
          <br />
          Masing-masing <span className="text-primary">Calon</span>
        </AnimatedTitle>
        <div>
          <Accordion type="single" collapsible defaultValue="item-1">
            {paslonData.map((item, index) => (
              <AccordionItem key={index} value={`item-${[item.nomorUrut]}`} className='bg-primary rounded-md my-3'>
                <AccordionTrigger className='px-5 [&>svg]:hidden hover:no-underline'>
                  <div className='bg-white p-5 text-lg font-semibold rounded-full w-10 h-10 flex items-center justify-center'>
                    {item.nomorUrut}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-primary-foreground p-5 flex flex-col lg:flex-row gap-4">
                  <div className="flex justify-center  overflow-hidden">
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
                      className="max-h-[250px] scale-75 md:scale-100 object-contain"
                    />
                  </div>
                  <div className='flex flex-col gap-3'>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold">{item.nama}</h3>
                      <p className="mt-2 text-gray-600">
                        Calon Ketua dan Wakil Ketua Osis Nomor Urut{' '}
                        {item.nomorUrut}
                      </p>
                    </div>
                    <div className="max-w-3xl">
                      <h4 className="text-xl font-bold">VISI</h4>
                      <p className="mt-2">{item.visi}</p>
                    </div>
                    <Accordion type="single" className="max-w-3xl" collapsible>
                      <AccordionItem value={`item-1`}>
                        <AccordionTrigger className="hover:no-underline">
                          <h4 className="text-lg font-bold">MISI</h4>
                        </AccordionTrigger>
                        <AccordionContent className="bg-primary-foreground flex gap-5">
                          <ul>
                            {item.misi.map((misi, index) => (
                              <li
                                key={index}
                                className="bg-primary mt-2 p-5 text-primary-foreground rounded-md"
                              >
                                {misi}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value={`item-2`}>
                        <AccordionTrigger className="hover:no-underline">
                          <h4 className="text-lg font-bold">PROKER</h4>
                        </AccordionTrigger>
                        <AccordionContent className="bg-primary-foreground flex gap-5">
                          <ul>
                            {item.proker.map((proker, index) => (
                              <li
                                key={index}
                                className="bg-primary mt-2 p-5 text-primary-foreground rounded-md"
                              >
                                <h5 className="font-semibold">
                                  {proker.title}
                                </h5>
                                <p>{proker.content}</p>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </AnimatedSection>
    </Element>
  );
};
