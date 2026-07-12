import { motion } from "motion/react";
import { WhatsappLogo as WhatsappLogoIcon } from "@phosphor-icons/react";
import { ContactForm } from "./Sections";

export const ContactPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-white py-20 overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold leading-[1.2] lg:leading-[69px] text-primary-500">
                Neem contact op
              </h1>
              <p className="text-lg text-neutral-700 max-w-[512px] leading-[30px]">
                Wil je samenwerken of meer weten over wat Betty voor jouw organisatie kan betekenen? Neem gerust contact op en plan een kennismakingsgesprek.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-primary-500 text-secondary-300 px-8 py-4 rounded-full font-medium text-lg flex items-center gap-2 hover:scale-105 transition-transform shadow-md">
                  Plan een kennismaking
                  <WhatsappLogoIcon size={28} weight="light" />
                </button>
              </div>
              
              {/* Spacer to match homepage hero height and keep image position identical */}
              <div className="hidden lg:block h-[145px]" />
            </div>
            
            <div className="flex-1 w-full lg:pt-2">
              <div className="relative max-w-[540px] lg:ml-auto bg-primary-50/95 rounded-[32px] p-8 shadow-[0px_2px_4px_rgba(27,28,29,0.04)]">
                <img 
                  src="/images/contact-illustration.png"
                  alt="Illustratie Contact"
                  className="w-full h-auto rounded-[24px] object-cover aspect-[4/3]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://picsum.photos/seed/contact-hero/800/600";
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm showQuickContact={true} />
      
      {/* 3. Bedrijfsgegevens Section */}
      <section id="bedrijfsgegevens" className="py-24 bg-neutral-50 border-t border-neutral-100">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Align with the left column (contact form) above */}
            <div className="flex-1 space-y-12">
              <h2 className="text-[38px] font-bold text-primary-500 leading-tight">Bedrijfsgegevens</h2>
              
              <div className="space-y-5">
                <div className="grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr] gap-4 items-baseline">
                  <span className="text-neutral-600 text-sm font-medium">Bedrijfsnaam</span>
                  <span className="text-neutral-1000 text-lg font-semibold">Betty Teklemariam</span>
                </div>
                
                <div className="grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr] gap-4 items-baseline">
                  <span className="text-neutral-600 text-sm font-medium">KvK-nummer</span>
                  <span className="text-neutral-1000 text-lg">XXXXXXXX</span>
                </div>
                
                <div className="grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr] gap-4 items-baseline">
                  <span className="text-neutral-600 text-sm font-medium">BTW-nummer</span>
                  <span className="text-neutral-1000 text-lg">NLXXXXXXXXBXX</span>
                </div>
                
                <div className="grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr] gap-4 items-baseline">
                  <span className="text-neutral-600 text-sm font-medium">Vestigingsplaats</span>
                  <span className="text-neutral-1000 text-lg">Rotterdam</span>
                </div>
                
                <div className="grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr] gap-4 items-baseline pt-4">
                  <span className="text-neutral-600 text-sm font-medium">Werkgebied</span>
                  <span className="text-neutral-1000 text-lg leading-relaxed">Gevestigd in Rotterdam, werkzaam door heel Nederland</span>
                </div>
              </div>
            </div>
            {/* Empty right column to maintain perfect alignment with the two-column layout above */}
            <div className="flex-1 hidden lg:block" />
          </div>
        </div>
      </section>
    </div>
  );
};
