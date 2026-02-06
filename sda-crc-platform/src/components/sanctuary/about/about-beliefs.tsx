/**
 * About Beliefs Component
 * =======================
 * Core beliefs section for the about page.
 */

import Link from "next/link";

export function AboutBeliefs() {
  const beliefs = [
    {
      title: "The Word of God",
      description:
        "The Holy Scriptures are the infallible revelation of God's will and the standard of character.",
    },
    {
      title: "The Trinity",
      description:
        "There is one God: Father, Son, and Holy Spirit, a unity of three co-eternal Persons.",
    },
    {
      title: "The Sabbath",
      description:
        "The seventh day of the week is God's holy Sabbath, a day of rest, worship, and ministry.",
    },
    {
      title: "Second Coming",
      description:
        "Jesus Christ will return visibly, personally, and in glory to bring salvation to His people.",
    },
    {
      title: "Healthful Living",
      description:
        "We honor God by caring for our bodies through proper diet, exercise, and rest.",
    },
    {
      title: "Spirit of Prophecy",
      description:
        "The writings of Ellen G. White are a continuing source of truth, guidance, and instruction.",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-4">
        What We Believe
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
        Seventh-day Adventists accept the Bible as our only creed and hold
        certain fundamental beliefs to be the teaching of the Holy Scriptures.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {beliefs.map((belief) => (
          <div
            key={belief.title}
            className="rounded-xl border p-6 hover:border-primary/50 transition-colors"
          >
            <h3 className="font-semibold text-lg mb-2">{belief.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {belief.description}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          href="https://www.adventist.org/beliefs/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
        >
          Explore all 28 Fundamental Beliefs
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
