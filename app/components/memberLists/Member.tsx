import { useState } from "react";
import Reveal from "~/components/Reveal";
import ScrambleText from "~/components/ScrambleText";

export interface TypeMember {
  readonly name: string;
  readonly role: string;
  readonly prodi: string;
  readonly batch: string;
}

interface MembersProps {
  members: readonly TypeMember[];
}

export default function Members({ members }: MembersProps) {
  const safeMembers = Array.isArray(members) ? members : [];
  const [selectedCategory, setSelectedCategory] = useState<"software" | "cloud" | null>(null);
  const [selectedMember, setSelectedMember] = useState<TypeMember | null>(null);

  const softwareMembers = safeMembers.filter((member) =>
    member.role.toLowerCase().includes("software"),
  );

  const cloudMembers = safeMembers.filter((member) => member.role.toLowerCase().includes("cloud"));

  const handleCategoryClick = (category: "software" | "cloud") => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSelectedMember(null);
  };

  const handleMemberClick = (member: TypeMember) => {
    setSelectedMember(selectedMember === member ? null : member);
  };

  const getCategoryLightColor = (_category: "software" | "cloud") =>
    "bg-gray-50 border-gray-300 dark:border-gray-300";

  return (
    <section
      aria-labelledby="members-heading"
      className=" h-calc(100vh - 4rem) relative py-12 bg-white dark:bg-neutral-950 border-t border-gray-200 dark:border-neutral-800 overflow-hidden"
    >
      <div className="max-w-480 mx-auto w-full border border-gray-200 dark:border-neutral-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-gray-200 dark:border-neutral-800">
          <div className="lg:col-span-4 p-6 sm:p-12 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-neutral-800 bg-hatching relative">
            <Reveal>
              <ScrambleText
                as="p"
                text="Our Team"
                className="text-lg font-mono uppercase tracking-wider text-gray-500 dark:text-neutral-400"
              />
            </Reveal>
            <span
              className="absolute bottom-2 right-4 text-[4rem] sm:text-[6rem] font-mono font-bold leading-none text-gray-100 dark:text-neutral-800 select-none pointer-events-none"
              aria-hidden="true"
            ></span>
          </div>
          <div className="lg:col-span-8 p-6 sm:p-12">
            <Reveal delay={0.1}>
              <h2
                id="members-heading"
                className="text-3xl sm:text-4xl font-medium text-gray-900 dark:text-neutral-100 leading-tight"
              >
                Meet our talented members.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-gray-600 dark:text-neutral-400 mt-4 max-w-2xl">
                A diverse group of passionate individuals driving innovation in technology.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 sm:p-12 border-b border-gray-200 dark:border-neutral-800">
          {(["software", "cloud"] as const).map((category) => {
            const categoryMembers = category === "software" ? softwareMembers : cloudMembers;
            const label = category === "software" ? "Software Development" : "Cloud Infrastructure";
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryClick(category)}
                className={`
                  group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 cursor-pointer
                  bg-transparent text-inherit p-0 border-none
                  ${
                    isSelected
                      ? "border-gray-500 shadow-2xl scale-[1.02]"
                      : "border-gray-100 dark:border-neutral-800 hover:border-gray-400 dark:hover:border-gray-300"
                  }
                  ${getCategoryLightColor(category)}
                `}
                style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
              >
                <div className="p-8">
                  <div
                    className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-gray-300 to-gray-600 opacity-10 rounded-bl-full transition-transform duration-500 group-hover:scale-150"
                    style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                  />

                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-neutral-100">
                        {label}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-neutral-400 mt-1">
                        {categoryMembers.length} Members
                      </p>
                    </div>
                    <div
                      className="w-12 h-12 rounded-full bg-linear-to-br from-gray-300 to-gray-600 flex items-center justify-center text-white text-2xl transform transition-transform duration-500 group-hover:rotate-180"
                      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                    ></div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {categoryMembers.slice(0, 3).map((member) => (
                      <div
                        key={member.name}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-neutral-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        {member.name}
                      </div>
                    ))}
                    {categoryMembers.length > 3 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        +{categoryMembers.length - 3} more members
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-200">
                    <span>{isSelected ? "Click to collapse" : "Click to expand"}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${isSelected ? "rotate-180" : ""}`}
                      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-label="Toggle members"
                    >
                      <title>Toggle members visibility</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selectedCategory && (
          <div
            key={selectedCategory}
            className="p-6 sm:p-12 border-b border-gray-200 dark:border-neutral-800 animate-in fade-in slide-in-from-top-2 duration-500"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-neutral-100">
              {selectedCategory === "software" ? "Software Development" : "Cloud Infrastructure"}{" "}
              Members
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(selectedCategory === "software" ? softwareMembers : cloudMembers).map((member) => (
                <button
                  type="button"
                  key={member.name}
                  onClick={() => handleMemberClick(member)}
                  className={`
                    group relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer
                    bg-transparent text-inherit border-none
                    ${
                      selectedMember === member
                        ? "border-gray-500 shadow-xl scale-[1.02] bg-gray-50 dark:bg-gray-950/20"
                        : "border-gray-200 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900"
                    }
                  `}
                  style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-full bg-linear-to-br from-gray-300 to-gray-600 flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300"
                      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                    >
                      {member.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-neutral-100">
                        {member.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-neutral-400">{member.role}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400"></span>
                      <span className="text-gray-600 dark:text-neutral-400">{member.prodi}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400"></span>
                      <span className="text-gray-600 dark:text-neutral-400">
                        Batch {member.batch}
                      </span>
                    </div>
                  </div>

                  {selectedMember === member && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-800 animate-in fade-in slide-in-from-top-1 duration-300">
                      <p className="text-sm text-gray-500 dark:text-neutral-400">
                        Member since {member.batch}
                      </p>
                      <div className="mt-2 inline-block px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        Active Member
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 sm:p-12 border-t border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 bg-grid-lines overflow-hidden">
          <p className="text-sm text-gray-500 dark:text-neutral-400 text-center">
            Total {safeMembers.length} active members across all divisions
          </p>
        </div>
      </div>
    </section>
  );
}
