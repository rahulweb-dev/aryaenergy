"use client";

import { Fragment, type ReactNode } from "react";
import { HelpCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const GLOSSARY: Record<string, string> = {
  MoRTH: "Ministry of Road Transport & Highways — the Indian government body that regulates vehicle fitness testing.",
  VAHAN: "The Government of India's national vehicle registration database. Your test results are uploaded here automatically.",
  CMVR: "Central Motor Vehicle Rules — the law that sets vehicle fitness testing requirements in India.",
  PUC: "Pollution Under Control certificate — confirms your vehicle's emissions are within legal limits.",
  NABL: "National Accreditation Board for Testing and Calibration Laboratories — certifies that our testing sensors are accurately calibrated.",
  "BS-VI": "Bharat Stage VI — India's current, strictest vehicle emission standard.",
  ANPR: "Automatic Number Plate Recognition — cameras that read your vehicle's number plate automatically at check-in.",
  RC: "Registration Certificate — your vehicle's official ownership document.",
  RSA: "Roadside Assistance — help if your vehicle breaks down on the road.",
  EUSAMA: "European Shock Absorber Manufacturers Association — the industry-standard suspension testing method our plates use.",
};

const TERM_PATTERN = new RegExp(`\\b(${Object.keys(GLOSSARY).join("|")})\\b`, "g");

export function GlossaryTerm({ term, children }: { term: string; children?: ReactNode }) {
  const definition = GLOSSARY[term];
  if (!definition) return <>{children ?? term}</>;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-0.5 underline decoration-dotted underline-offset-4"
        >
          {children ?? term}
          <HelpCircle className="h-3 w-3 opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 text-sm">
        <div className="font-semibold">{term}</div>
        <p className="mt-1 text-muted-foreground">{definition}</p>
      </PopoverContent>
    </Popover>
  );
}

/** Wraps recognised jargon (MoRTH, VAHAN, CMVR, ...) inside a plain string with a tap-to-explain popover. */
export function Glossed({ text }: { text: string }) {
  const parts = text.split(TERM_PATTERN);
  return (
    <>
      {parts.map((part, i) =>
        GLOSSARY[part] ? (
          <GlossaryTerm key={i} term={part}>{part}</GlossaryTerm>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
