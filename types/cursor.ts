export interface CursorHandlers {
  enter: () => void;
  leave: () => void;
}

export interface CursorDefinition {
  id: string;
  name: string;
  desc: string;
  tags: string[];
  accent: string;
  preview: string;
  css: string;
  html: string;
  js: string;
  react: string;
  vue?: string;  // Optional for now
  init: (wrap: HTMLElement) => CursorHandlers;
}

export type CursorId = string;
