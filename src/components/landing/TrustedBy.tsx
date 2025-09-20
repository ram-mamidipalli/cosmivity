
import Image from 'next/image';

const companies = [
  { name: 'Google', hint: 'google logo', src: 'https://images.unsplash.com/photo-1678483790053-71367bc7a02c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxnb29nbGUlMjBsb2dvfGVufDB8fHx8MTc1MzgwMzkzOXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Microsoft', hint: 'microsoft logo', src: 'https://images.unsplash.com/photo-1678483790053-71367bc7a02c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxnb29nbGUlMjBsb2dvfGVufDB8fHx8MTc1MzgwMzkzOXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Wipro', hint: 'wipro logo', src: 'https://images.unsplash.com/photo-1678483790053-71367bc7a02c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxnb29nbGUlMjBsb2dvfGVufDB8fHx8MTc1MzgwMzkzOXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Infosys', hint: 'infosys logo', src: 'https://images.unsplash.com/photo-1678483790053-71367bc7a02c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxnb29nbGUlMjBsb2dvfGVufDB8fHx8MTc1MzgwMzkzOXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'TCS', hint: 'tcs logo', src: 'https://images.unsplash.com/photo-1678483790053-71367bc7a02c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxnb29nbGUlMjBsb2dvfGVufDB8fHx8MTc1MzgwMzkzOXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Accenture', hint: 'accenture logo', src: 'https://images.unsplash.com/photo-1678483790053-71367bc7a02c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxnb29nbGUlMjBsb2dvfGVufDB8fHx8MTc1MzgwMzkzOXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Amazon', hint: 'amazon logo', src: 'https://images.unsplash.com/photo-1678483790053-71367bc7a02c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxnb29nbGUlMjBsb2dvfGVufDB8fHx8MTc1MzgwMzkzOXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Deloitte', hint: 'slack logo', src: 'https://images.unsplash.com/photo-1705988142466-e468bc654eeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxzbGFja3xlbnwwfHx8fDE3NTgyOTQ4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
];

export default function TrustedBy() {
  return (
    <section id="trusted-by" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-headline font-bold text-primary text-center mb-12">
          Trusted by Students at Top Companies
        </h2>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee">
            {[...companies, ...companies].map((company, index) => (
              <div key={index} className="mx-8 flex-shrink-0 flex items-center justify-center">
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
      </div>
    </section>
  );
}
