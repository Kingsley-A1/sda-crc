/**
 * Contact Map Component
 * =====================
 * Map showing conference office location.
 */

"use client";

export function ContactMap() {
  // Using iframe for simplicity - in production, would use Leaflet or similar
  return (
    <div className="rounded-xl overflow-hidden border">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127253.49!2d8.2!3d4.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1067816a2ed1b8db%3A0x8d2e0d1e2c1e0e0e!2sCalabar%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1234567890"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="SDA Cross River Conference Location"
      />
    </div>
  );
}
