import Image from 'next/image';

const companies = [
  { name: 'Google', hint: 'google logo' },
  { name: 'Microsoft', hint: 'microsoft logo' },
  { name: 'Wipro', hint: 'wipro logo' },
  { name: 'Infosys', hint: 'infosys logo' },
  { name: 'TCS', hint: 'tcs logo' },
  { name: 'Accenture', hint: 'accenture logo' },
  { name: 'Amazon', hint: 'amazon logo' },
  { name: 'Deloitte', hint: 'deloitte logo' },
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
                  src={`https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3`}
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

// Simple animation for the marquee effect in globals.css or a style tag
// I'll add it to globals.css for wider use