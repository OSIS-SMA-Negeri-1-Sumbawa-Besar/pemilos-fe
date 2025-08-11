import { FAQSection } from './sections/FAQ';
import { Hero } from './sections/Hero';
import { TataCaraModule } from './sections/TataCara';
import { VisiMisi } from './sections/VisiMisi';

export const LandingModule = () => {
  return (
    <main className="px-10 md:px-20 flex flex-col gap-10 overflow-hidden">
      <Hero />
      <VisiMisi />
      <TataCaraModule />
      <FAQSection />
    </main>
  );
};
