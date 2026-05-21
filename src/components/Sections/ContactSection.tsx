import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const ContactSection = () => {

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `${message}\n\n-------------------\nContact Details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}`
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=modipriyanshi013@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  return (
    <section id="contact" className="w-full min-h-screen relative flex items-center justify-center bg-[#050505] overflow-hidden pt-20 pb-10">
      
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#06b6d4]/10 blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[#06b6d4]/5 blur-[100px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 min-h-[70vh]">
          
          {/* Left Column */}
          <div className="flex flex-col justify-between h-full py-8">
            <div>
              <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/30 tracking-tighter">
                Get in Touch
              </h2>
            </div>

            <div className="mt-20 lg:mt-auto">
              <div className="flex flex-wrap gap-4">
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=modipriyanshi013@gmail.com" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md">
                  Gmail
                </a>
                <a href="https://www.linkedin.com/in/modi-priyanshi-14373b228" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md">
                  LinkedIn
                </a>
                <a href="https://github.com/pryanshinewebai-pixel" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md">
                  GitHub
                </a>
                <a href="https://x.com/ModiPriyanshi13" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md">
                  Twitter
                </a>
              </div>
              <p className="mt-8 text-white/30 text-xs">© 2024 Portfolio. All rights reserved.</p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex flex-col justify-center w-full max-w-2xl lg:ml-auto">
            <form onSubmit={handleFormSubmit} className="space-y-8">
              
              <div className="space-y-6">
                <p className="text-xs font-semibold tracking-widest text-[#06b6d4] uppercase">
                  Fill the form to request a quote:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Your Name *" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#06b6d4]/50 focus:bg-[#06b6d4]/5 transition-all backdrop-blur-sm"
                  />
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email *" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#06b6d4]/50 focus:bg-[#06b6d4]/5 transition-all backdrop-blur-sm"
                  />
                </div>
                
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone (Optional)" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#06b6d4]/50 focus:bg-[#06b6d4]/5 transition-all backdrop-blur-sm"
                />
                
                <textarea 
                  name="message"
                  placeholder="Message *" 
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#06b6d4]/50 focus:bg-[#06b6d4]/5 transition-all backdrop-blur-sm resize-none"
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-[#06b6d4] hover:text-white transition-all duration-300"
                >
                  Send Message
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
