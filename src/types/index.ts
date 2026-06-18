// Shared domain types for the portfolio

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  link?: string;
  github?: string;
}

export interface Ripple {
  id: number;
  x: number;
  y: number;
}

export interface Trail {
  id: number;
  x: number;
  y: number;
}
