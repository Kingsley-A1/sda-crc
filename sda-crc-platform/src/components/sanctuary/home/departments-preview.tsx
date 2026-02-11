"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, UsersThree } from "@phosphor-icons/react";

interface Department {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  iconName?: string | null;
}

export function DepartmentsPreview({
  departments,
}: {
  departments: Department[];
}) {
  if (departments.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-primary-500" />
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
                Our Departments
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Find Your Place in Ministry
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Discover where God is calling you to serve and connect with fellow
              believers in ministry.
            </p>
          </div>
          <Link href="/departments">
            <Button
              variant="outline-muted"
              size="md"
              rightIcon={<ArrowRight size={16} />}
            >
              View All Departments
            </Button>
          </Link>
        </div>

        {/* Departments Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          {departments.slice(0, 8).map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Link href="/departments" className="group block h-full">
                <Card
                  className="h-full text-center p-5 lg:p-6 bg-card hover:shadow-card-hover transition-all duration-300"
                  hover="lift"
                >
                  {/* Icon/Image Container */}
                  <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 group-hover:from-primary group-hover:to-primary-600 transition-all duration-300 mb-4">
                    {dept.imageUrl ? (
                      <Image
                        src={dept.imageUrl}
                        alt={dept.name}
                        width={32}
                        height={32}
                        className="rounded-lg"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-primary group-hover:text-white transition-colors duration-300">
                        {dept.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="font-heading text-sm lg:text-base font-bold text-foreground line-clamp-1 mb-2 group-hover:text-primary transition-colors">
                    {dept.name}
                  </h3>

                  {/* Description */}
                  {dept.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {dept.description}
                    </p>
                  )}
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Card for Mobile */}
        <motion.div
          className="mt-6 lg:hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Link href="/departments" className="group block">
            <Card className="bg-primary-50 border-primary-200 border-dashed hover:bg-primary-100 transition-colors">
              <div className="flex items-center justify-center gap-3 p-5 text-primary-700">
                <UsersThree size={20} weight="duotone" />
                <span className="font-semibold text-sm">
                  Explore All Departments
                </span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Card>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
