"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  CalendarBlank,
  Clock,
  Phone,
  MagnifyingGlass,
  UsersThree,
} from "@phosphor-icons/react";
import { Card, CardContent, Badge, Button, Input } from "@/components/ui";
import { Container } from "@/components/layout";
import { fadeInUp, staggerContainer } from "@/animations";

interface GroupLeader {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  photoUrl: string | null;
}

interface SmallGroup {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  meetingDay: string;
  meetingTime: string | null;
  type: string;
  maxMembers: number;
  currentMembers: number;
  leader: GroupLeader | null;
}

interface SmallGroupsListProps {
  groups: SmallGroup[];
}

const groupTypeLabels: Record<string, string> = {
  "bible-study": "Bible Study",
  prayer: "Prayer Group",
  fellowship: "Fellowship",
  youth: "Youth Group",
  couples: "Couples",
  singles: "Singles",
};

function GroupCard({ group }: { group: SmallGroup }) {
  const spotsLeft = group.maxMembers - group.currentMembers;
  const isFull = spotsLeft <= 0;

  return (
    <motion.div variants={fadeInUp}>
      <Card hover="lift" className="h-full">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <h3 className="font-semibold text-foreground">{group.name}</h3>
              <Badge size="sm" variant="success" className="mt-1">
                {groupTypeLabels[group.type] || group.type}
              </Badge>
            </div>
            {isFull ? (
              <Badge variant="error" size="sm">
                Full
              </Badge>
            ) : (
              <Badge variant="info" size="sm">
                {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left
              </Badge>
            )}
          </div>

          {group.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {group.description}
            </p>
          )}

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarBlank className="h-4 w-4 text-primary shrink-0" />
              <span>
                {group.meetingDay}
                {group.meetingTime ? ` at ${group.meetingTime}` : ""}
              </span>
            </div>

            {group.city && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>
                  {group.address ? `${group.address}, ` : ""}
                  {group.city}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary shrink-0" />
              <span>
                {group.currentMembers} / {group.maxMembers} members
              </span>
            </div>
          </div>

          {/* Leader */}
          {group.leader && (
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary-50 flex items-center justify-center text-xs font-medium text-primary">
                  {group.leader.firstName[0]}
                  {group.leader.lastName[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {group.leader.firstName} {group.leader.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">Group Leader</p>
                </div>
              </div>
              {group.leader.phone && (
                <a
                  href={`tel:${group.leader.phone}`}
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call
                </a>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function SmallGroupsList({ groups }: SmallGroupsListProps) {
  const [search, setSearch] = React.useState("");
  const [filterType, setFilterType] = React.useState("all");

  // Get unique group types for filter
  const types = React.useMemo(() => {
    const set = new Set(groups.map((g) => g.type));
    return Array.from(set);
  }, [groups]);

  const filtered = React.useMemo(() => {
    return groups.filter((g) => {
      const matchesSearch =
        !search ||
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.city?.toLowerCase().includes(search.toLowerCase()) ||
        g.description?.toLowerCase().includes(search.toLowerCase());

      const matchesType = filterType === "all" || g.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [groups, search, filterType]);

  return (
    <section className="section-padding">
      <Container>
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search by name, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<MagnifyingGlass className="h-4 w-4" />}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterType === "all"
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              All
            </button>
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filterType === type
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                {groupTypeLabels[type] || type}
              </button>
            ))}
          </div>
        </div>

        {/* Groups Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <UsersThree
              className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-40"
              weight="duotone"
            />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {groups.length === 0 ? "No Small Groups Yet" : "No Groups Found"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {groups.length === 0
                ? "Small groups are being organized. Check back soon!"
                : "Try adjusting your search or filter."}
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {filtered.length} group{filtered.length !== 1 ? "s" : ""} found
            </p>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </motion.div>
          </>
        )}
      </Container>
    </section>
  );
}
