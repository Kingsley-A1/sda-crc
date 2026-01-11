/**
 * Settings Page
 * =============
 * Global settings for the SDA CRC platform.
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { GeneralSettings } from "@/components/command/shared/general-settings";
import { AppearanceSettings } from "@/components/command/shared/appearance-settings";
import { NotificationSettings } from "@/components/command/shared/notification-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Settings | Command Center",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure platform settings
        </p>
      </div>

      <Tabs defaultValue="general" className="max-w-4xl">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Suspense fallback={<Skeleton className="h-[400px] rounded-xl" />}>
            <GeneralSettings />
          </Suspense>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6">
          <Suspense fallback={<Skeleton className="h-[400px] rounded-xl" />}>
            <AppearanceSettings />
          </Suspense>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Suspense fallback={<Skeleton className="h-[400px] rounded-xl" />}>
            <NotificationSettings />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
