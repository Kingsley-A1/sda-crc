/**
 * Live Chat Component
 * ===================
 * Chat interface for live streams.
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LiveChat() {
  const [message, setMessage] = useState("");
  const [messages] = useState([
    { id: 1, name: "Guest", text: "Praise the Lord!", time: "11:05 AM" },
    { id: 2, name: "Guest", text: "Amen!", time: "11:06 AM" },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      // Would send to chat API
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="font-semibold">Live Chat</h3>
        <p className="text-xs text-gray-500">Join the conversation</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="text-sm">
            <span className="font-medium text-primary">{msg.name}</span>
            <span className="text-gray-400 text-xs ml-2">{msg.time}</span>
            <p className="text-gray-600 dark:text-gray-400">{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} size="sm">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
