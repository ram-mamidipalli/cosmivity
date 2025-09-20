
import Image from 'next/image';

const companies = [
  { name: 'Google', hint: 'google logo', src: 'https://images.unsplash.com/photo-1573495627361-ab2b3c419c30?w=120&h=60' },
  { name: 'Microsoft', hint: 'microsoft logo', src: 'https://images.unsplash.com/photo-1573495627361-ab2b3c419c31?w=120&h=60' },
  { name: 'Wipro', hint: 'wipro logo', src: 'https://images.unsplash.com/photo-1573495627361-ab2b3c419c32?w=120&h=60' },
  { name: 'Infosys', hint: 'infosys logo', src: 'https://images.unsplash.com/photo-1573495627361-ab2b3c419c33?w=120&h=60' },
  { name: 'TCS', hint: 'tcs logo', src: 'https://images.unsplash.com/photo-1573495627361-ab2b3c419c34?w=120&h=60' },
  { name: 'Accenture', hint: 'accenture logo', src: 'https://images.unsplash.com/photo-1573495627361-ab2b3c419c35?w=120&h=60' },
  { name: 'Amazon', hint: 'amazon logo', src: 'https://images.unsplash.com/photo-1573495627361-ab2b3c419c36?w=120&h=60' },
  { name: 'Deloitte', hint: 'deloitte logo', src: 'https://images.unsplash.com/photo-1573495627361-ab2b3c419c37?w=120&h=60' },
];

export default function TrustedBy() {
  return (
    <section id="trusted-by" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-headline font-bold text-primary text-center mb-12">
          Trusted by Students at Top Companies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
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
