/**
 * UI Components Index
 * ===================
 * Central export for all UI components.
 *
 * "For the body is not one member, but many." — 1 Corinthians 12:14
 */

// Button
export { Button, buttonVariants } from "./button";
export type { ButtonProps } from "./button";

// Spinner
export { Spinner, spinnerVariants } from "./spinner";
export type { SpinnerProps } from "./spinner";

// Card
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  cardVariants,
} from "./card";
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
  CardImageProps,
} from "./card";

// Input
export { Input, inputVariants } from "./input";
export type { InputProps } from "./input";

// Textarea
export { Textarea, textareaVariants } from "./textarea";
export type { TextareaProps } from "./textarea";

// Select
export { Select, selectTriggerVariants } from "./select";
export type { SelectProps, SelectOption } from "./select";

// Combobox
export { Combobox } from "./combobox";
export type { ComboboxProps, ComboboxOption } from "./combobox";

// Badge
export { Badge, badgeVariants } from "./badge";
export type { BadgeProps } from "./badge";

// Gold Badge
export { GoldBadge, WorkerRoleBadge, goldBadgeVariants } from "./gold-badge";
export type { GoldBadgeProps, WorkerRoleBadgeProps } from "./gold-badge";

// Skeleton
export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonSermonCard,
  SkeletonEventCard,
  SkeletonWorkerCard,
  SkeletonTable,
  skeletonVariants,
} from "./skeleton";
export type { SkeletonProps } from "./skeleton";

// Modal
export { Modal, ModalHeader, ModalBody, ModalFooter } from "./modal";
export type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
} from "./modal";

// Tabs
export { Tabs, TabList, TabTrigger, TabContent, PillTabs } from "./tabs";
export type {
  TabsProps,
  TabListProps,
  TabTriggerProps,
  TabContentProps,
  PillTabsProps,
} from "./tabs";

// Avatar
export { Avatar, AvatarGroup, avatarVariants } from "./avatar";
export type { AvatarProps, AvatarGroupProps } from "./avatar";

// Progress
export {
  Progress,
  CircularProgress,
  progressVariants,
  progressBarVariants,
} from "./progress";
export type { ProgressProps, CircularProgressProps } from "./progress";

// Tooltip
export { Tooltip } from "./tooltip";
export type { TooltipProps, TooltipPosition } from "./tooltip";
