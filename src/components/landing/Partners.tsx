import Image from 'next/image';

const partners = [
  { name: 'IIT Bombay', hint: 'iit bombay', src: 'https://images.unsplash.com/photo-1705355908723-040b1e606d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxpaXQlMjBib21iYXl8ZW58MHx8fHwxNzUzODAzOTcxfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'IIT Delhi', hint: 'iit delhi', src: 'https://images.unsplash.com/photo-1729395736788-37509a61fd49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxpaXQlMjBkZWxoaXxlbnwwfHx8fDE3NTM4MDM5NzF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'NIT Kurukshetra', hint: 'nit kurukshetra', src: 'https://images.unsplash.com/photo-1582023164678-6e60bd522482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxuaXQlMjBrdXJ1a3NoZXRyYXxlbnwwfHx8fDE3NTM4MDM5NzF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'VIT Vellore', hint: 'vit vellore', src: 'https://images.unsplash.com/photo-1516913084449-6c06d498c217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8dml0JTIwdmVsbG9yZXxlbnwwfHx8fDE3NTM4MDM5NzF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Coursera', hint: 'coursera logo', src: 'https://images.unsplash.com/photo-1628760584600-6c31148991e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxjb3Vyc2VyYSUyMGxvZ298ZW58MHx8fHwxNzUzODAzOTcxfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Udemy', hint: 'udemy logo', src: 'https://images.unsplash.com/photo-1637489981573-e45e9297cb21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx1ZGVteSUyMGxvZ298ZW58MHx8fHwxNzUzODAzOTcxfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'EdX', hint: 'edx logo', src: 'https://images.unsplash.com/photo-1673507375425-36ccbe7baa54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8ZWR4JTIwbG9nb3xlbnwwfHx8fDE3NTM4MDM5NzF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'UpGrad', hint: 'upgrad logo', src: 'https://images.unsplash.com/photo-1630644964646-6cc8ac5b47ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx1cGdyYWQlMjBsb2dvfGVufDB8fHx8MTc1MzgwMzk3MXww&ixlib=rb-4.1.0&q=80&w=1080' },
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
                  src={partner.src}
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
