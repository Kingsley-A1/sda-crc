/**
 * About History Component
 * =======================
 * History section for the about page.
 */

export function AboutHistory() {
  const milestones = [
    {
      year: "1914",
      title: "First Adventists in Cross River",
      description:
        "The first Seventh-day Adventist missionaries arrived in the region.",
    },
    {
      year: "1950",
      title: "Mission Established",
      description: "The Cross River Mission was officially established.",
    },
    {
      year: "1980",
      title: "Conference Status",
      description: "Elevated to Conference status with multiple districts.",
    },
    {
      year: "2000",
      title: "Digital Expansion",
      description:
        "Began embracing technology for evangelism and communication.",
    },
    {
      year: "Present",
      title: "Growing Strong",
      description:
        "Continuing to grow with multiple churches across the state.",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-8">
        Our History
      </h2>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20" />

        {/* Milestones */}
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className={`relative flex items-start gap-6 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-gray-900" />

              {/* Content */}
              <div
                className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8"
                }`}
              >
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-2">
                  {milestone.year}
                </span>
                <h3 className="font-semibold text-lg">{milestone.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
