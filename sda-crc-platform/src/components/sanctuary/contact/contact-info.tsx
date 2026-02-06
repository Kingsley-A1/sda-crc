/**
 * Contact Info Component
 * ======================
 * Contact information display.
 */

export function ContactInfo() {
  const contacts = [
    {
      icon: "📍",
      title: "Address",
      value:
        "SDA Cross River Conference Office\n123 Church Road, Calabar\nCross River State, Nigeria",
    },
    {
      icon: "📞",
      title: "Phone",
      value: "+234 801 234 5678",
      href: "tel:+2348012345678",
    },
    {
      icon: "✉️",
      title: "Email",
      value: "info@sdacrc.org",
      href: "mailto:info@sdacrc.org",
    },
    {
      icon: "🌐",
      title: "Social Media",
      value: "@sdacrc on all platforms",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>

      {contacts.map((contact) => (
        <div
          key={contact.title}
          className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
        >
          <span className="text-2xl">{contact.icon}</span>
          <div>
            <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">
              {contact.title}
            </h4>
            {contact.href ? (
              <a
                href={contact.href}
                className="text-primary hover:underline whitespace-pre-line"
              >
                {contact.value}
              </a>
            ) : (
              <p className="whitespace-pre-line">{contact.value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
