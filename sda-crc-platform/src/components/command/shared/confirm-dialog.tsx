"use client";

import * as React from "react";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/ui";

export interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({
  isOpen,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} description={description} size="sm">
      <ModalHeader>
        <p className="text-base font-bold text-[var(--text-primary)]">{title}</p>
      </ModalHeader>
      <ModalBody>
        <p className="text-sm text-[var(--text-secondary)]">{description}</p>
      </ModalBody>
      <ModalFooter>
        <div className="flex w-full gap-2">
          <Button type="button" variant="outline" className="min-h-11 flex-1" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button type="button" variant="danger" className="min-h-11 flex-1" onClick={onConfirm} isLoading={isLoading}>
            {confirmText}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
