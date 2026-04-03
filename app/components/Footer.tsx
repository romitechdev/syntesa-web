import { useRef } from "react";
import { HiMail } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router";
import { logoDark, logoLight } from "~/assets/logo";
import { useInView } from "~/hooks/useInView";
import type { SocialLink } from "~/types";

interface FooterProps {
  socialLinks: SocialLink[];
}

export default function Footer({ socialLinks }: FooterProps) {
  const leftRef = useRef<HTMLDivElement>(null);
  const isLeftInView = useInView(leftRef, { once: true, amount: 0.15 });
  const rightRef = useRef<HTMLDivElement>(null);
  const isRightInView = useInView(rightRef, { once: true, amount: 0.15 });

  return (
    <footer className="bg-white dark:bg-neutral-950 border-y border-gray-200 dark:border-neutral-800">
      <div className="max-w-480 mx-auto w-full sm:border-x border-gray-200 dark:border-neutral-800">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div
            ref={leftRef}
            className="p-6 sm:p-8 md:p-12 lg:border-r border-gray-200 dark:border-neutral-800 flex flex-col justify-between min-h-0 sm:min-h-75 bg-dot-grid"
          >
            <div>
              <div
                className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isLeftInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              >
                <Link to="/" className="inline-block">
                  <img src={logoLight} alt="Syntesa" className="h-10 w-auto mb-3 dark:hidden" />
                  <img
                    src={logoDark}
                    alt="Syntesa"
                    className="h-10 w-auto mb-3 hidden dark:block"
                  />
                  <span className="block text-2xl font-bold tracking-tight text-gray-900 dark:text-neutral-100 uppercase">
                    Syntesa
                  </span>
                </Link>
              </div>
              <div
                className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isLeftInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ transitionDelay: isLeftInView ? "100ms" : "0ms" }}
              >
                <p className="mt-4 text-sm text-gray-500 dark:text-neutral-400 max-w-sm">
                  Fostering innovation and excellence in software engineering education and
                  research.
                </p>
              </div>
            </div>

            <div
              className={`mt-12 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isLeftInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              style={{ transitionDelay: isLeftInView ? "200ms" : "0ms" }}
            >
              <small className="text-xs font-mono text-gray-400 dark:text-neutral-600 uppercase tracking-wider">
                &copy; {new Date().getFullYear()} <abbr title="Software Engineering">SE</abbr> Lab{" "}
                <abbr title="Universitas Negeri Surabaya">UNESA</abbr>.
              </small>
            </div>
          </div>

          <div ref={rightRef} className="grid grid-cols-1 sm:grid-cols-2">
            <div className="p-8 sm:p-12 border-t lg:border-t-0 border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-neutral-800">
              <div
                className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isRightInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              >
                <h2 className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-8">
                  Location
                </h2>
              </div>
              <div
                className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isRightInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ transitionDelay: isRightInView ? "100ms" : "0ms" }}
              >
                <div className="space-y-6">
                  <address className="flex items-start gap-3 not-italic">
                    <IoLocationSharp
                      className="w-5 h-5 text-gray-900 dark:text-neutral-100 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="text-sm text-gray-600 dark:text-neutral-300">
                      <p className="font-medium text-gray-900 dark:text-neutral-100">
                        Software Engineering Lab
                      </p>
                      <p className="mt-1">Universitas Negeri Surabaya</p>
                      <p>A10 Building, 3rd Floor, Room 3 &amp; 4</p>
                      <p>Surabaya, Indonesia</p>

                      <a
                        href="https://maps.app.goo.gl/SPnszsaV74MFWKKA9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-gray-900 dark:text-apple-blue-400 border-b border-gray-200 dark:border-neutral-800 hover:border-gray-900 dark:hover:border-apple-blue-400 transition-colors"
                      >
                        Get Directions &rarr;
                      </a>
                    </div>
                  </address>
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-12 border-t lg:border-t-0 border-gray-200 dark:border-neutral-800">
              <div
                className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isRightInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ transitionDelay: isRightInView ? "60ms" : "0ms" }}
              >
                <h2 className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-8">
                  Connect
                </h2>
              </div>
              <div
                className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isRightInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ transitionDelay: isRightInView ? "160ms" : "0ms" }}
              >
                <div className="space-y-6">
                  <address className="not-italic">
                    <a
                      href="mailto:contact@syntesa.net"
                      className="flex items-center gap-3 text-sm text-gray-600 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-apple-blue-400 transition-colors"
                    >
                      <HiMail className="w-5 h-5" aria-hidden="true" />
                      <span>contact@syntesa.net</span>
                    </a>
                  </address>

                  <nav
                    aria-label="Social links"
                    className="pt-6 border-t border-gray-200 dark:border-neutral-800"
                  >
                    <ul className="flex flex-wrap gap-4">
                      {socialLinks.map((item, i) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block text-gray-500 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-apple-blue-400 transition-[opacity,transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isRightInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                            style={{ transitionDelay: isRightInView ? `${200 + i * 50}ms` : "0ms" }}
                            title={item.name}
                          >
                            <item.icon className="w-5 h-5" aria-hidden="true" />
                            <span className="sr-only">{item.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <nav
                    aria-label="Legal links"
                    className="pt-6 border-t border-gray-200 dark:border-neutral-800"
                  >
                    <ul className="space-y-3">
                      <li className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-baseline gap-3">
                        <span className="font-mono text-xs uppercase tracking-wider text-gray-400 dark:text-neutral-600">
                          Legal
                        </span>
                        <Link
                          to="/terms-of-service"
                          className="text-sm text-gray-600 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-apple-blue-400 transition-colors"
                        >
                          Terms of Service
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
