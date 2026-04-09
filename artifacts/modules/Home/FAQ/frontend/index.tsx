// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HelpCircle, ChevronDown, MessageCircleQuestion } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * FAQ SECTION (Frontend Module)
 * 
 * Interactive elegant accordion FAQ with GSAP and modular data fetching.
 */
export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Modular Data Fetching
  useEffect(() => {
    fetch("/api/home/sections/faq")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setFaqs(json.data);
        }
      })
      .catch((err) => console.error("Failed to load FAQs:", err))
      .finally(() => setLoading(false));
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (loading || faqs.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-header",
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-header",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, scale: 0.98, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-list",
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [loading, faqs]);

  // Handle Accordion Toggle
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={containerRef} className="py-24 bg-zinc-950 relative border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-zinc-950 to-zinc-950 pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl relative z-10">
        <div className="faq-header text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 text-indigo-400">
             <MessageCircleQuestion className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Questions</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Everything you need to know about the ISHU platform and its resources.
          </p>
        </div>

        <div className="faq-list flex flex-col gap-4">
          {loading ? (
             Array(5).fill(0).map((_, idx) => (
                <div key={idx} className="animate-pulse h-20 bg-white/5 rounded-2xl w-full" />
             ))
          ) : faqs.length > 0 ? (
            faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.id}
                  ref={(el) => (itemsRef.current[index] = el)}
                  className={`bg-zinc-900/50 backdrop-blur-md border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.1)]' : 'border-white/5 hover:border-white/10'}`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-semibold text-white pr-8">
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-indigo-500 text-white rotate-180' : 'bg-white/5 text-zinc-400 hover:bg-white/10'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-6 pt-0 text-zinc-400 leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-zinc-500 bg-white/5 rounded-2xl">
              No FAQs available at the moment.
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
            <p className="text-zinc-500 text-sm">
                Still have questions? <a href="/contact" className="text-indigo-400 hover:text-indigo-300 transition-colors underline decoration-indigo-400/30 underline-offset-4">Contact our support team</a>
            </p>
        </div>
      </div>
    </section>
  );
}
