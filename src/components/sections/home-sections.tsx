"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight, PlayCircle, Star, ShieldCheck, Sparkles, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, Stagger, StaggerItem, staggerItemVariants, Counter } from "@/components/shared/motion";
import {
  brand, stats, heroChips, services, steps, benefits, categories, testimonials, images,
} from "@/constants/site-content";

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,theme(colors.slate.400)_1px,transparent_0)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24 lg:py-32">
        <div className="flex flex-col justify-center">
          <FadeIn>
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> MoRTH Accredited · VAHAN Integrated
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              India's Most Advanced <span className="text-gradient">Automated Vehicle Fitness</span> Testing Station
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              Get your vehicle fitness certificate through a fully automated and transparent
              testing process — sensors decide pass or fail, not people.
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gradient-brand text-brand-foreground shadow-elevated hover:opacity-95">
                <Link href="/book">Book Vehicle Test <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/process"><PlayCircle className="mr-1 h-4 w-4" /> Learn More</Link>
              </Button>
            </div>
          </FadeIn>
          <FadeIn delay={0.35}>
            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                <span className="ml-1 font-medium text-foreground">4.9</span> · 12,000+ reviews
              </div>
              <div className="hidden items-center gap-2 md:flex">
                <ShieldCheck className="h-4 w-4 text-success" /> Certified by MoRTH
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative h-[420px] w-full overflow-hidden rounded-3xl shadow-elevated md:h-[540px]"
          >
            <Image
              src={images.hero}
              alt="Automated vehicle testing lane"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/60 via-transparent to-transparent" />
          </motion.div>

          {heroChips.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.6 }}
              className={`absolute glass shadow-soft rounded-2xl px-4 py-3 flex items-center gap-2 text-sm font-medium
                ${i === 0 ? "top-6 -left-4 md:-left-8" : ""}
                ${i === 1 ? "top-1/2 -right-4 md:-right-8" : ""}
                ${i === 2 ? "bottom-6 left-8" : ""}`}
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                <c.icon className="h-4 w-4" />
              </span>
              {c.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="border-y border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 md:grid-cols-4 md:px-6">
        {stats.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.08}>
            <div>
              <div className="font-display text-4xl font-semibold text-white md:text-5xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm text-white/60">{s.label}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <FadeIn>
        <div className="max-w-2xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Services</div>
          <h2 className="text-3xl font-semibold md:text-5xl">Eight tests. One lane. Zero paperwork.</h2>
          <p className="mt-4 text-muted-foreground">Every parameter mandated by CMVR, measured by calibrated sensors and streamed to VAHAN in real time.</p>
        </div>
      </FadeIn>

      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.slice(0, 6).map((s) => (
          <StaggerItem key={s.slug} variants={staggerItemVariants}>
            <Link
              href="/services"
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl gradient-brand text-brand-foreground shadow-elevated">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="text-lg font-semibold">{s.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Learn more <ChevronRight className="h-4 w-4" />
              </div>
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-primary/5 blur-2xl" />
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-6">
        <FadeIn>
          <div className="max-w-2xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">How ATS works</div>
            <h2 className="text-3xl font-semibold text-white md:text-5xl">Four steps to a fitness certificate.</h2>
          </div>
        </FadeIn>
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <FadeIn key={s.n} delay={i * 0.1}>
              <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="font-display text-5xl font-semibold text-white/10">{s.n}</div>
                <div className="mt-4 text-lg font-semibold text-white">{s.title}</div>
                <p className="mt-2 text-sm text-white/70">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-primary md:block" />
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Benefits() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <FadeIn>
        <div className="max-w-2xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Why ATS India</div>
          <h2 className="text-3xl font-semibold md:text-5xl">A fairer way to certify vehicles.</h2>
        </div>
      </FadeIn>
      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b) => (
          <StaggerItem key={b.title} variants={staggerItemVariants}>
            <div className="glass shadow-soft flex h-full flex-col rounded-2xl p-6">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-success/10 text-success">
                <b.icon className="h-5 w-5" />
              </div>
              <div className="font-semibold">{b.title}</div>
              <p className="mt-1.5 text-sm text-muted-foreground">{b.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <FadeIn>
        <div className="mb-10 flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Vehicle Categories</div>
            <h2 className="text-3xl font-semibold md:text-5xl">Built for every wheel in India.</h2>
          </div>
        </div>
      </FadeIn>
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <StaggerItem key={c.title} variants={staggerItemVariants}>
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-5 text-white">
                  <div className="flex items-center gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/15 backdrop-blur">
                      <c.icon className="h-4 w-4" />
                    </span>
                    <div className="font-semibold">{c.title}</div>
                  </div>
                  <ChevronRight className="h-5 w-5 opacity-70" />
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-6">
        <FadeIn>
          <div className="max-w-2xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Testimonials</div>
            <h2 className="text-3xl font-semibold md:text-5xl">Trusted by fleets and families alike.</h2>
          </div>
        </FadeIn>
        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((t) => (
            <div key={t.name} className="min-w-[320px] max-w-sm shrink-0 snap-start rounded-2xl border border-border bg-card p-6 shadow-soft md:min-w-[360px]">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400" />)}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full gradient-brand text-sm font-semibold text-white">
                  {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <div className="relative overflow-hidden rounded-3xl gradient-brand p-10 shadow-elevated md:p-16">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="relative flex flex-col items-start justify-between gap-8 text-white md:flex-row md:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Slots filling fast
            </div>
            <h2 className="max-w-xl font-display text-3xl font-semibold md:text-5xl">Ready to test your vehicle?</h2>
            <p className="mt-3 max-w-lg text-white/80">Book in 60 seconds. Walk out with a VAHAN-verified fitness certificate in 15 minutes.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Link href="/book">Book Appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">{brand.name} · {brand.tagline}</p>
    </section>
  );
}
