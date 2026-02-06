/**
 * About Mission Component
 * =======================
 * Mission and vision section for the about page.
 */

export function AboutMission() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Mission */}
      <div className="rounded-2xl bg-primary text-white p-8">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl mb-6">
          🎯
        </div>
        <h3 className="text-2xl font-serif font-bold mb-4">Our Mission</h3>
        <p className="text-white/90 leading-relaxed">
          To make disciples of Jesus Christ who live as His loving witnesses and
          proclaim to all people the everlasting gospel of the three
          angels&apos; messages in preparation for His soon return.
        </p>
      </div>

      {/* Vision */}
      <div className="rounded-2xl bg-secondary text-gray-900 p-8">
        <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center text-3xl mb-6">
          👁️
        </div>
        <h3 className="text-2xl font-serif font-bold mb-4">Our Vision</h3>
        <p className="text-gray-800 leading-relaxed">
          In harmony with Bible prophecy, we see the Seventh-day Adventist
          Church in Cross River as a growing, vibrant community of faith,
          reaching every person with the hope found in Jesus.
        </p>
      </div>
    </div>
  );
}
