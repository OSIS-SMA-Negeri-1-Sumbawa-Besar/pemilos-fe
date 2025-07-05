'use client';
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from '~/components/ui/accordion';
import { AnimatedSection } from '~/components/ui/animated-section';
import { AnimatedTitle } from '~/components/ui/animated-title';

interface FAQProps {
  question: string;
  answer: string;
}

const FAQItems: FAQProps[] = [
  {
    question:
      'Data apa saja yang dibutuhkan saat mengisi suara pada PEMILOS SMANIKA tahun ini?',
    answer:
      'Data yang perlu di isi untuk login PEMILOS SMANIKA tahun ini adalah username menggunakan NISN dan Password menggunakan NIS.',
  },
  {
    question:
      'Bagaimana jika terjadi kendala atapun kesalahan saat mengisi data untuk website PEMILOS SMANIKA 2024?',
    answer:
      'Jika terjadi kendala atau kesalahan pada sistem pada saat pelaksanaan pemilos dimulai, anda dimohon untuk menghubungi admin untuk informasi lebih lanjut.',
  },
  {
    question:
      'Apa yang harus dilakukan jika saya tidak bisa menghadiri sesi pemilihan secara langsung?',
    answer:
      'Jika anda tidak dapat menghadiri sesi pemilihan secara langsung, maka anda akan dianggap golput atau tidak memilih.',
  },
];

/* eslint-disable react/react-in-jsx-scope */
export const FAQSection = () => {
  return (
    <section
      id="faq"
      className="w-full font-manrope flex flex-col gap-10 my-10 relative"
    >
      <AnimatedTitle>
        Masih Bingung? <br /> Yuk Baca
        <b className="text-primary"> FAQ </b> Berikut
      </AnimatedTitle>
      <AnimatedSection>
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-4"
        >
          {FAQItems.map((item, index) => {
            return (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="bg-[#8774E5] hover:bg-[#6149D4] text-white [&>svg]:text-white rounded-2xl px-5 font-bold cursor-pointer hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </AnimatedSection>
    </section>
  );
};
