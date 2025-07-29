import Image from 'next/image';

const partners = [
  { name: 'IIT Bombay', hint: 'iit bombay' },
  { name: 'IIT Delhi', hint: 'iit delhi' },
  { name: 'NIT Kurukshetra', hint: 'nit kurukshetra' },
  { name: 'VIT Vellore', hint: 'vit vellore' },
  { name: 'Coursera', hint: 'coursera logo' },
  { name: 'Udemy', hint: 'udemy logo' },
  { name: 'EdX', hint: 'edx logo' },
  { name: 'UpGrad', hint: 'upgrad logo' },
];

export default function Partners() {
  return (
    <section id="partners" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-headline font-bold text-primary text-center mb-12">
          Partnered with Colleges and EdTech Platforms
        </h2>
         <div className="relative overflow-hidden">
          <div className="flex animate-marquee-reverse">
            {[...partners, ...partners].map((partner, index) => (
              <div key={index} className="mx-8 flex-shrink-0 flex items-center justify-center">
                <Image 
                  src={`https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3`}
                  alt={`${partner.name} logo`}
                  width={120}
                  height={60}
                  className="object-contain"
                  data-ai-hint={partner.hint}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}