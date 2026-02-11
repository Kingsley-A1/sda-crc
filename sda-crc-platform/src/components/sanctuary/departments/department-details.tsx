"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface DepartmentDetailsProps {
  department: {
    id: string;
    name: string;
    description: string | null;
    mission: string | null;
    imageUrl: string | null;
  };
}

export function DepartmentDetails({ department }: DepartmentDetailsProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {department.imageUrl && (
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
          <Image
            src={department.imageUrl}
            alt={department.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 65vw"
          />
        </div>
      )}

      {department.mission && (
        <div className="bg-primary-50 border border-primary/20 rounded-xl p-5 mb-6">
          <h2 className="text-sm font-semibold text-primary mb-1">
            Our Mission
          </h2>
          <p className="text-muted-foreground">{department.mission}</p>
        </div>
      )}

      {department.description && (
        <div className="prose prose-green max-w-none">
          <h2 className="text-xl font-bold text-foreground mb-3">About</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {department.description}
          </p>
        </div>
      )}
    </motion.div>
  );
}
