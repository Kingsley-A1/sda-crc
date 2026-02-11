import { PageHeader } from "@/components/layout";
import { GalleryGrid } from "@/components/sanctuary/gallery/gallery-grid";

export const metadata = {
  title: "Gallery | SDA Cross River Conference",
  description: "View photos from events, programs, and special moments at SDA Cross River Conference.",
};

// Static gallery images from the public folder
// These can be expanded through the admin panel
const GALLERY_IMAGES = [
  {
    id: "1",
    src: "/gallery/camp meeting.jpg",
    alt: "Camp Meeting",
    category: "Events",
  },
  {
    id: "2",
    src: "/hero/divine service 2.jpg",
    alt: "Divine Service",
    category: "Worship",
  },
  {
    id: "3",
    src: "/hero/pastor.jpg",
    alt: "Pastoral Ministry",
    category: "Ministry",
  },
  {
    id: "4",
    src: "/hero/youth_Leaders.jpg",
    alt: "Youth Leaders",
    category: "Youth",
  },
  {
    id: "5",
    src: "/workers/president.jpg",
    alt: "Conference President",
    category: "Leadership",
  },
  {
    id: "6",
    src: "/workers/executive secetary.jpg",
    alt: "Executive Secretary",
    category: "Leadership",
  },
  {
    id: "7",
    src: "/workers/treasurer.jpg",
    alt: "Conference Treasurer",
    category: "Leadership",
  },
];

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        subtitle="Memories & Moments"
        title="Photo Gallery"
        description="A glimpse into the life and ministry of SDA Cross River Conference."
      />
      <GalleryGrid images={GALLERY_IMAGES} />
    </>
  );
}
