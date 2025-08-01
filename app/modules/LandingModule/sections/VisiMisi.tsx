'use client';
import { useLoaderData } from 'react-router';
import { Element } from 'react-scroll';
import {
  Accordion, AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '~/components/ui/accordion';
import { AnimatedSection } from '~/components/ui/animated-section';
import { AnimatedTitle } from '~/components/ui/animated-title';
import type { Candidate } from '~/types';

export const VisiMisi = () => {
  const { candidates } = useLoaderData<{ candidates: Candidate[] }>();
  console.log(candidates);
  
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
            {candidates.map((item, index) => (
              <AccordionItem key={index} value={`item-${[item.number]}`} className='bg-primary rounded-md my-3'>
                <AccordionTrigger className='px-5 [&>svg]:hidden hover:no-underline'>
                  <div className='bg-white p-5 text-lg font-semibold rounded-full w-10 h-10 flex items-center justify-center'>
                    {item.number}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-primary-foreground p-5 flex flex-col lg:flex-row gap-4">
                  <div className="flex justify-center items-end overflow-hidden w-full max-h-[250px]">
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
                  <div className='flex flex-col gap-3 w-full'>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold">{item.presidentName} & {item.vicePresidentName}</h3>
                      <p className="mt-2 text-gray-600">
                        Calon Ketua dan Wakil Ketua Osis Nomor Urut{' '}
                        {item.number}
                      </p>
                    </div>
                    <div className="max-w-3xl">
                      <h4 className="text-xl font-bold">VISI</h4>
                      <p className="mt-2">{item.vision}</p>
                    </div>
                    <Accordion type="single" className="max-w-3xl" collapsible>
                      <AccordionItem value={`item-1`}>
                        <AccordionTrigger className="hover:no-underline">
                          <h4 className="text-lg font-bold">MISI</h4>
                        </AccordionTrigger>
                        <AccordionContent className="bg-primary-foreground flex gap-5">
                          <ul className='w-full'>
                            {item.mission.map((misi, index) => (
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
                          <ul className='w-full'>
                            {item.mission.map((proker, index) => (
                              <li
                                key={index}
                                className="bg-primary mt-2 p-5 text-primary-foreground rounded-md"
                              >
                                <h5 className="font-semibold">
                                  {proker}
                                </h5>
                                <p>{proker}</p>
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
