/**
 * Module declarations for Next.js 16 type resolution
 * ==================================================
 * Next.js 16.1.1 has type packaging gaps where certain exports
 * aren't properly resolvable through standard module resolution.
 * These declarations bridge those gaps.
 */

// Re-export core types that Next.js 16 doesn't properly expose
declare module "next" {
  export type {
    Metadata,
    ResolvedMetadata,
    ResolvingMetadata,
    Viewport,
    ResolvingViewport,
    ResolvedViewport,
  } from "next/dist/lib/metadata/types/metadata-interface";

  export type NextConfig = {
    typescript?: { ignoreBuildErrors?: boolean };
    images?: Record<string, unknown>;
    experimental?: Record<string, unknown>;
    turbopack?: { root?: string };
    [key: string]: unknown;
  };
}

// Resolve next/types.js used in auto-generated validator
declare module "next/types.js" {
  export type {
    ResolvingMetadata,
    ResolvingViewport,
    Metadata,
    Viewport,
  } from "next/dist/lib/metadata/types/metadata-interface";
}

// Resolve next/server.js used in auto-generated validator and API routes
declare module "next/server.js" {
  export { NextRequest, NextResponse } from "next/server";
}

// Ensure next/server module is properly typed
declare module "next/server" {
  export class NextRequest extends Request {
    readonly nextUrl: URL & {
      readonly searchParams: URLSearchParams;
    };
    readonly cookies: {
      get(name: string): { name: string; value: string } | undefined;
      getAll(): { name: string; value: string }[];
      set(name: string, value: string): void;
      delete(name: string): void;
      has(name: string): boolean;
    };
    readonly headers: Headers;
    readonly ip?: string;
    readonly geo?: {
      city?: string;
      country?: string;
      region?: string;
    };
  }

  export class NextResponse extends Response {
    static json(body: unknown, init?: ResponseInit): NextResponse;
    static redirect(url: string | URL, status?: number): NextResponse;
    static next(init?: { headers?: HeadersInit }): NextResponse;
    static rewrite(destination: string | URL, init?: { headers?: HeadersInit }): NextResponse;
    readonly cookies: {
      get(name: string): { name: string; value: string } | undefined;
      getAll(): { name: string; value: string }[];
      set(name: string, value: string): void;
      delete(name: string): void;
    };
  }
}
