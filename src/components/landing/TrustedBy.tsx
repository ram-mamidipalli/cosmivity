
import Image from 'next/image';

const companies = [
  { name: 'Meta', hint: 'meta logo', src: 'https://images.unsplash.com/photo-1706879349328-4a05bb3e16ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxtZXRhfGVufDB8fHx8MTc1ODM1OTAxMHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Microsoft', hint: 'microsoft logo', src: 'https://images.unsplash.com/photo-1612810806563-4cb8265db55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxsb2dvfGVufDB8fHx8MTc1ODM1MzIwNXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Slack', hint: 'slack logo', src: 'https://images.unsplash.com/photo-1705988142466-e468bc654eeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxzbGFja3xlbnwwfHx8fDE3NTgyOTQ4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Tata', hint: 'tata logo', src: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxhcHBsZXxlbnwwfHx8fDE3NTgyOTAwNTR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Google', hint: 'google logo', src: 'https://images.unsplash.com/photo-1678483790053-71367bc7a02c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNnx8Z29vZ2xlfGVufDB8fHx8MTc1ODI5MjUwMHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Infosys', hint: 'infosys logo', src: 'https://images.unsplash.com/photo-1573495627361-ab2b3c419c33?w=120&h=60' },
];

export default function TrustedBy() {
  return (
    <section id="trusted-by" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-headline font-bold text-primary text-center mb-12">
          Trusted by Students at Top Companies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center max-w-6xl mx-auto">
            {companies.map((company, index) => (
              <div key={index} className="flex justify-center h-12 w-32 relative">
                <Image 
                  src={company.src}
                  alt={`${company.name} logo`}
                  layout="fill"
                  objectFit="contain"
                  className="grayscale hover:grayscale-0 transition-all"
                  data-ai-hint={company.hint}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
