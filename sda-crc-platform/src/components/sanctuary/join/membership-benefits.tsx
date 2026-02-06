/**
 * Membership Benefits Component
 * =============================
 * Benefits of joining the church.
 */

export function MembershipBenefits() {
  const benefits = [
    {
      icon: "🙏",
      title: "Spiritual Growth",
      description:
        "Access to Bible study resources, prayer groups, and discipleship programs.",
    },
    {
      icon: "👥",
      title: "Community",
      description:
        "Connect with fellow believers through small groups and church activities.",
    },
    {
      icon: "📚",
      title: "Resources",
      description:
        "Exclusive access to sermons, publications, and educational materials.",
    },
    {
      icon: "🎯",
      title: "Service Opportunities",
      description:
        "Use your gifts to serve in various ministries and outreach programs.",
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-serif font-bold mb-4">Why Join Us?</h3>
      <div className="space-y-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
          >
            <span className="text-2xl flex-shrink-0">{benefit.icon}</span>
            <div>
              <h4 className="font-semibold">{benefit.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
