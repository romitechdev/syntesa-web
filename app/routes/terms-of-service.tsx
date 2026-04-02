import type { LinksFunction, MetaFunction } from "react-router";
import Reveal, { StaggerList, StaggerListItem } from "~/components/Reveal";
import { SEO } from "~/components/SEO";
import { generateLinks, generateMeta } from "~/utils/seo";

export const meta: MetaFunction = () =>
  generateMeta({
    title: "Terms of Service - Syntesa, Software Engineering Lab UNESA",
    description: "Terms of Service for the Syntesa Internal Web and its research infrastructure.",
    path: "/terms-of-service",
    keywords: ["terms of service", "policy", "syntesa", "internal web"],
  });

export const links: LinksFunction = () => generateLinks("/terms-of-service");

const sections = [
  {
    number: "01",
    title: "Acceptance of Terms",
    content: (
      <p className="leading-relaxed text-gray-600 dark:text-neutral-400">
        By accessing the Syntesa Internal Web, you agree to be bound by these Terms of Service, all
        applicable laws and regulations, and you are responsible for compliance with any applicable
        local laws within the environment of Universitas Negeri Surabaya and the Republic of
        Indonesia.
      </p>
    ),
  },
  {
    number: "02",
    title: "License for Use & Intellectual Property Rights",
    content: (
      <>
        <p className="mb-6 leading-relaxed text-gray-600 dark:text-neutral-400">
          All materials within this platform, including but not limited to source code, research
          documentation, and infrastructure data, are the intellectual property of Syntesa - SE Lab
          UNESA, unless otherwise stated.
        </p>
        <ul className="space-y-3">
          {[
            "Permission is granted to access member-specific materials for internal research and development purposes.",
            "It is strictly prohibited to copy, modify, or distribute lab assets without written permission from the Lab Coordinator.",
            "Usage of lab infrastructure (GPU, CPU Cores, Cloud Storage) must comply with applicable research ethics.",
          ].map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm leading-relaxed text-gray-600 dark:text-neutral-400"
            >
              <span
                className="mt-0.5 shrink-0 font-mono text-gray-300 dark:text-neutral-700"
                aria-hidden="true"
              >
                —
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    number: "03",
    title: "Limitation of Liability (Disclaimer)",
    content: (
      <p className="leading-relaxed text-gray-600 dark:text-neutral-400">
        The web services and research infrastructure are provided "as is". Syntesa makes no
        warranties, expressed or implied, regarding the 24/7 availability of services without
        interruption, given the ongoing system maintenance processes on our server infrastructure.
      </p>
    ),
  },
  {
    number: "04",
    title: "Privacy & Member Data",
    content: (
      <p className="leading-relaxed text-gray-600 dark:text-neutral-400">
        Member data registered through the recruitment process or internal activities will be used
        responsibly for the purposes of member management, internship track records, and community
        development under the auspices of SE Lab UNESA.
      </p>
    ),
  },
  {
    number: "05",
    title: "Changes to Terms",
    content: (
      <p className="leading-relaxed text-gray-600 dark:text-neutral-400">
        Syntesa reserves the right to review and change these Terms of Service at any time without
        prior notice. By continuing to use this website, you are deemed to agree to the latest
        version of these Terms of Service.
      </p>
    ),
  },
] as const;

export default function TermsOfService() {
  const breadcrumbs = [
    { name: "Home", path: "" },
    { name: "Terms of Service", path: "/terms-of-service" },
  ];

  return (
    <div className="space-y-2">
      <SEO breadcrumbs={breadcrumbs} />

      <section
        aria-labelledby="terms-of-service-heading"
        className="relative border-y border-gray-200 bg-white pt-24 dark:border-neutral-800 dark:bg-neutral-950 sm:pt-32"
      >
        <div className="mx-auto w-full max-w-480 sm:border-x sm:border-gray-200 sm:dark:border-neutral-800">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="border-b border-gray-200 p-6 dark:border-neutral-800 sm:p-12 lg:col-span-7 lg:border-r lg:border-b-0 lg:p-16">
              <Reveal>
                <h1
                  id="terms-of-service-heading"
                  className="text-5xl font-medium leading-[1.15] tracking-tight text-gray-900 dark:text-neutral-100 sm:text-6xl md:text-7xl"
                >
                  Terms of <span className="text-gray-400 dark:text-neutral-600">Service</span>
                </h1>
              </Reveal>
            </div>

            <div className="flex flex-col bg-dot-grid lg:col-span-5">
              <div className="flex flex-1 items-end p-6 sm:p-12 lg:p-16">
                <Reveal delay={0.12}>
                  <p className="text-sm font-mono uppercase tracking-wider text-gray-500 dark:text-neutral-400">
                    Version 1.0 — Last updated: <time dateTime="2026-03-16">March 16, 2026</time>
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StaggerList stagger={0.07}>
        {sections.map((section) => (
          <StaggerListItem key={section.number}>
            <section
              aria-labelledby={`terms-section-${section.number}`}
              className="border-b first:border-t border-gray-200 bg-white dark:border-neutral-800 dark:bg-neutral-950"
            >
              <div className="mx-auto w-full max-w-480 sm:border-x sm:border-gray-200 sm:dark:border-neutral-800">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="relative border-b border-gray-200 bg-hatching p-6 dark:border-neutral-800 sm:p-10 lg:col-span-4 lg:border-r lg:border-b-0">
                    <span className="mb-2 block text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-neutral-400">
                      {section.number}
                    </span>
                    <h2
                      id={`terms-section-${section.number}`}
                      className="text-base font-medium text-gray-900 dark:text-neutral-100 sm:text-lg"
                    >
                      {section.title}
                    </h2>
                    <span
                      className="pointer-events-none absolute right-4 bottom-2 select-none font-mono text-[4rem] font-bold leading-none text-gray-100 dark:text-neutral-800 sm:text-[5rem]"
                      aria-hidden="true"
                    >
                      {section.number}
                    </span>
                  </div>

                  <div className="p-6 sm:p-10 lg:col-span-8">{section.content}</div>
                </div>
              </div>
            </section>
          </StaggerListItem>
        ))}
      </StaggerList>
    </div>
  );
}
