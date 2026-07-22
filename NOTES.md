# shadcn/ui Comparison Notes

## Overview

After building the Modal Dialog and Tabs components manually, I installed shadcn/ui and reviewed the generated source code.

## What shadcn handled better

### 1. Accessibility

The generated Dialog component automatically handled focus trapping, focus restoration, keyboard navigation, and ARIA attributes. My manual implementation supported keyboard interaction but was simpler.

### 2. Component Structure

shadcn separates components into reusable files and uses a cleaner architecture. My version placed most logic inside a single component.

### 3. Keyboard Support

The generated components provide more complete keyboard handling for edge cases, while my implementation focused on the required assignment behaviors.

### 4. Reusability

The shadcn components are designed for reuse across multiple projects with customizable props and styling.

## What I learned

Building the components manually helped me understand how accessibility works. Reading the shadcn source showed how production-ready components handle many additional edge cases automatically.
