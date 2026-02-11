"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight, Images } from "@phosphor-icons/react";
import { Container } from "@/components/layout";
import { fadeInUp, staggerContainer } from "@/animations";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [filterCategory, setFilterCategory] = React.useState("all");

  // Get unique categories
  const categories = React.useMemo(() => {
    const set = new Set(images.map((img) => img.category));
    return Array.from(set);
  }, [images]);

  const filtered = React.useMemo(() => {
    if (filterCategory === "all") return images;
    return images.filter((img) => img.category === filterCategory);
  }, [images, filterCategory]);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filtered.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filtered.length) % filtered.length);
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  if (images.length === 0) {
    return (
      <section className="section-padding">
        <Container>
          <div className="text-center py-16">
            <Images
              className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-40"
              weight="duotone"
            />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Photos Yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Gallery photos will appear here soon. Stay tuned!
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <Container>
        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex gap-2 flex-wrap mb-8">
            <button
              onClick={() => setFilterCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterCategory === "all"
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              All ({images.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filterCategory === cat
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Photo Grid - Masonry-like */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          {filtered.map((image, index) => (
            <motion.div
              key={image.id}
              variants={fadeInUp}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                  <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-medium">
                      {image.alt}
                    </p>
                    <p className="text-white/70 text-xs">{image.category}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Previous photo"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Next photo"
            >
              <ArrowRight className="h-6 w-6" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[80vh] w-full mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[selectedIndex].src}
                alt={filtered[selectedIndex].alt}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg">
                <p className="text-white font-medium">
                  {filtered[selectedIndex].alt}
                </p>
                <p className="text-white/60 text-sm">
                  {filtered[selectedIndex].category}
                </p>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {selectedIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
