
import Image from 'next/image';

const companies = [
  { name: 'Google', hint: 'google logo', src: 'https://images.unsplash.com/photo-1573495627361-ab2b3c419c30?w=120&h=60' },
  { name: 'Microsoft', hint: 'microsoft logo', src: 'https://images.unsplash.com/photo-1573495627361-ab2b3c419c31?w=120&h=60' },
  { name: 'Slack', hint: 'slack logo', src: 'https://images.unsplash.com/photo-1705988142466-e468bc654eeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxzbGFja3xlbnwwfHx8fDE3NTgyOTQ4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Tata', hint: 'tata logo', src: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxhcHBsZXxlbnwwfHx8fDE3NTgyOTAwNTR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
];

export default function TrustedBy() {
  return (
    <section id="trusted-by" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-headline font-bold text-primary text-center mb-12">
          Trusted by Students at Top Companies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center max-w-4xl mx-auto">
            {companies.map((company, index) => (
              <div key={index} className="flex justify-center">
                <Image 
                  src={company.src}
                  alt={`${company.name} logo`}
                  width={120}
                  height={60}
                  className="object-contain"
                  data-ai-hint={company.hint}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
