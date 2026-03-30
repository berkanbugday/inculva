# @inculva/ui — Shared UI Utilities

Shared React component utilities for the inculva monorepo. Provides the `cn()` class merging utility, Tailwind CSS globals, and re-exports for CVA and Lucide icons.

## Usage

### `cn()` — Class name merging

Combines `clsx` (conditional classes) with `tailwind-merge` (conflict resolution):

```typescript
import { cn } from "@inculva/ui";

// Merge classes, resolving Tailwind conflicts
const className = cn(
  "px-4 py-2 rounded",
  isActive && "bg-blue-500 text-white",
  isDisabled && "opacity-50 cursor-not-allowed",
  props.className,
);
```

### Tailwind globals

Import in your root layout:

```typescript
import "@inculva/ui/globals.css";
```

### CVA — Class Variance Authority

```typescript
import { cva, type VariantProps } from "class-variance-authority";

const button = cva("px-4 py-2 rounded font-medium", {
  variants: {
    variant: {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      ghost: "bg-transparent hover:bg-gray-100",
    },
    size: {
      sm: "text-sm px-3 py-1",
      md: "text-base px-4 py-2",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
```

### Lucide icons

```typescript
import { Settings, Bell, ChevronDown } from "lucide-react";
```

## Dependencies

| Package                    | Version  | Purpose                            |
| -------------------------- | -------- | ---------------------------------- |
| `clsx`                     | ^2.1.1   | Conditional class names            |
| `tailwind-merge`           | ^2.6.0   | Tailwind class conflict resolution |
| `class-variance-authority` | ^0.7.1   | Component variant patterns         |
| `lucide-react`             | ^0.474.0 | Icon library                       |
