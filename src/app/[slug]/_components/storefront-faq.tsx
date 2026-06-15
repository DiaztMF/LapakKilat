'use client';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import type { TemplateTokens } from '@/lib/template-presets';
import { cn } from '@/lib/utils';
import { HelpCircle } from 'lucide-react';

interface StorefrontFAQProps {
  shop: {
    name: string;
    whatsapp: string | null;
    operationalHours: string | null;
    address: string | null;
    faq?: { question: string; answer: string }[] | null;
  };
  tokens: TemplateTokens;
}

export function StorefrontFAQ({ shop, tokens }: StorefrontFAQProps) {
  if (!shop.faq || shop.faq.length === 0) {
    return null;
  }

  const faqs = shop.faq.map((f, i) => ({
    id: `custom-faq-${i}`,
    question: f.question,
    answer: f.answer
  }));

  return (
    <section className="mt-12 pt-8 border-t border-gray-150/40">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className={cn("h-5 w-5", tokens.text)} />
        <h2 className={cn("text-lg font-bold", tokens.text)}>Pertanyaan Umum (FAQ)</h2>
      </div>

      <Accordion className="w-full space-y-2">
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className={cn(
              "px-4 py-1.5 transition-all",
              tokens.cardBorder,
              tokens.radius,
              tokens.canvas === "bg-zinc-950" 
                ? "bg-zinc-900/40 border-zinc-800" 
                : tokens.canvas === "bg-rose-50"
                ? "bg-white/70 border-rose-100"
                : "bg-white border-gray-100"
            )}
          >
            <AccordionTrigger className={cn(
              "text-sm font-medium hover:no-underline transition-colors py-2.5 cursor-pointer",
              tokens.text
            )}>
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className={cn("text-xs leading-relaxed mt-1 pb-3", tokens.muted)}>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
