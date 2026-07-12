import { WhatsappLogo as WhatsappLogoIcon } from "@phosphor-icons/react";
import { CTA } from "./Sections";

export const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-white py-20 overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold leading-[1.2] lg:leading-[69px] text-primary-500">
                Over Betty Teklemariam
              </h1>
              <p className="text-lg text-neutral-700 max-w-[512px] leading-[30px]">
                Betty Teklemariam is cultureel mediator en bruggenbouwer tussen Eritrese gemeenschappen en Nederlandse organisaties, met jarenlange ervaring in begeleiding, training en onderzoek.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-primary-500 text-secondary-300 px-8 py-4 rounded-full font-medium text-lg flex items-center gap-2 hover:scale-105 transition-transform shadow-md">
                  Start een gesprek
                  <WhatsappLogoIcon size={28} weight="light" />
                </button>
              </div>
              
              {/* Spacer to match homepage hero height and keep image position identical */}
              <div className="hidden lg:block h-[145px]" />
            </div>
            
            <div className="flex-1 w-full lg:pt-2">
              <div className="relative max-w-[540px] lg:ml-auto bg-primary-50/95 rounded-[32px] p-8 shadow-[0px_2px_4px_rgba(27,28,29,0.04)]">
                <img 
                  src="/images/illustration-about.png"
                  alt="Illustratie Over Betty"
                  className="w-full h-auto rounded-[24px] object-cover aspect-[4/3]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://picsum.photos/seed/about-hero/800/600";
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};
