# FlowPresent Development Guide

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Code Style
- Use TypeScript with strict type checking
- Follow React best practices and hooks rules
- Use functional components with hooks
- Import order: React, external libraries, internal components, styles
- Use descriptive variable/function names in camelCase
- Component names should be PascalCase
- Use Tailwind CSS for styling - no custom CSS unless necessary
- Use Lucide React for icons (`import { IconName } from 'lucide-react'`)
- Handle errors with proper try/catch blocks and user feedback

## Project Features
- Media Control Hub: real-time slide editing, transitions, display management
- Worship Enhancement: dynamic lyrics, Bible verses, congregation engagement
- Audio-Visual: mixing, video playback, streaming capabilities
- Smart Content: AI-powered organization, cloud resources, collaboration
- Live Production: overlays, timers, streaming, captioning
- AI Assistant: design suggestions, smart scheduling, engagement analytics

## Design Principles
- Clean, uncluttered interfaces with clear visual hierarchy
- Contextual intelligence with relevant actions
- Fluid, non-modal workflow with minimal interruptions
- Hidden complexity - powerful features without overwhelming UI
# ProFlow UI/UX Redesign Concept

## Overview
Merge ProFlow’s modern, clean visual design with powerful functional features inspired by ProPresenter. The redesign focuses on a clearer navigation structure, an intuitive service timeline, improved content organization, streamlined contextual controls, AI-powered smart suggestions, and enhanced team collaboration—all while maintaining a minimalist aesthetic.

---

## Navigation & Workflow Clarity

- **Global Navigation:**  
  - Persistent sidebar or top menu with clear tabs for:
    - **Service Plan** (for building and running the service)
    - **Library** (for managing songs, scriptures, and reusable content)
    - **Media** (for images, videos, and audio)
    - **Settings** (for global configuration, stage displays, integrations)
  - Ensures users immediately know their current context and available actions.

- **Service vs. Edit Modes:**  
  - **Unified Planning Interface:** Allows in-place minor edits without switching modes.
  - **Dedicated “Live Presentation” view:** Accessible with a single click for running the service.

- **Consistent Layout:**  
  - A top toolbar with universal actions (e.g., search, undo, settings) remains visible across all modules.
  - Consistent UI elements reduce training time and streamline the workflow.

---

## Service Timeline & Drag-and-Drop Interface

- **Timeline Layout:**  
  - **Vertical timeline list** representing the service order (e.g., welcome, songs, announcements).
  - Group related items into logical sections.
  - Display time indicators or a running total for service duration.

- **Drag-and-Drop Reordering:**  
  - Each timeline item is draggable with clear handles and highlighted insertion lines.
  - Smooth animations provide feedback during the reordering process.

- **Inline Editing:**  
  - Directly edit timeline items (title, duration, details) via double-click.
  - Expand items inline for additional details without interruptive modal dialogs.

- **Visual Cues:**  
  - Use icons or color tags to indicate item types (music note for songs, book for scriptures, etc.) for quick recognition.

---

## Content Organization: Library & Media Management

- **Unified Library with Categories:**  
  - A single Library module divided into:
    - **Songs**
    - **Scriptures**
    - **Media**
  - Quick switching between content types for efficient service planning.

- **Robust Search and Filtering:**  
  - Prominent search bar to query by title, lyrics, scripture reference, or tags.
  - Filtering options to quickly locate the desired content.

- **Organize and Tag Content:**  
  - Create playlists or collections for specific events (e.g., Easter, Christmas).
  - Tag content with themes, moods, or categories for streamlined retrieval.

- **Media Management:**  
  - Visual grid view with thumbnails for images and videos.
  - Drag-and-drop support for importing media directly into the timeline.

- **Quick Insert into Timeline:**  
  - Drag items from the library directly into the service plan.
  - “Add to Plan” context actions simplify the process of inserting content.

---

## Contextual Controls & Streamlined Workflows

- **Side Panel for Details:**  
  - Slide-out panels for editing details of service items or library content.
  - Keeps the main view intact while offering comprehensive editing options.

- **Inline Editing:**  
  - Editable fields directly on timeline items or content lists for quick adjustments.
  - Reduces reliance on disruptive modal dialogs.

- **Minimize Modals:**  
  - Use modal dialogs sparingly (e.g., for confirmations) and favor in-context, side-panel editing.

- **Contextual Toolbars and Menus:**  
  - Lightweight toolbars appear when needed (e.g., text formatting for slide editing).
  - Right-click context menus offer quick actions like “Replace video” without leaving the current view.

---

## AI-Powered Smart Suggestions

- **Song Selection Suggestions:**  
  - Analyze the current service flow and theme to recommend songs.
  - Display suggested songs with context-based rationales (e.g., “Matches your sermon theme”).

- **Scripture Reference Suggestions:**  
  - A “Verse Assistant” recommends scriptures based on keywords or service context.
  - One-click addition of suggested verses into the timeline.

- **Media and Visual Suggestions:**  
  - Recommend background images or motion loops that align with the service’s theme.
  - Use semantic analysis to surface relevant media from the library.

- **Learning from Past Services:**  
  - AI learns from previous services to make predictive suggestions for recurring events (e.g., Easter, Christmas).

---

## Enhanced Team Collaboration

- **Real-Time Co-Editing:**  
  - Multiple users can edit the service plan simultaneously with real-time updates and presence indicators.
  
- **Built-in Team Chat:**  
  - Integrated, collapsible chat panel or overlay for team communication.
  - Supports dedicated channels or threads for specific service items or overall planning.

- **Comments and Notifications:**  
  - Leave contextual comments on specific items (e.g., “Adjust the background for the closing prayer”).
  - Receive notifications on edits and comments to keep the team informed.

- **Live Coordination Tools:**  
  - “Live” mode for real-time communication during the service (e.g., countdowns, cue updates).
  - Unobtrusive messaging integrated with the live view for smooth coordination.

---

## Visual Design Principles

- **Consistency:**  
  - Uniform color schemes, typography, and icon styles across the app.
  - Consistent interactive elements (e.g., slide-out panels and hover effects) for familiarity.

- **Clarity and Readability:**  
  - Ample whitespace and padding to separate content sections.
  - High contrast text for easy readability of lyrics, scriptures, and labels.

- **Minimalism:**  
  - Reduce visual clutter by avoiding excessive borders, shadows, or unnecessary elements.
  - Only display contextual tools when needed to keep the focus on content.

- **Wireframe Suggestions:**  
  - **Service Plan View:**  
    - Left sidebar for navigation (Plan/Library/Media/Settings).
    - Main center area for the timeline.
    - Right sidebar for contextual editing or chat when toggled.
  - **Library View:**  
    - Left sub-menu for Songs/Scriptures/Media.
    - Main area with a search bar and list/grid of items.

---

## Conclusion

The redesigned ProFlow aims to blend modern aesthetics with robust functionality:

- **Navigation:** Clear separation for service planning, content management, and media organization.
- **Timeline:** An intuitive, drag-and-drop interface with inline editing and visual cues.
- **Content Organization:** A unified library with robust search, tagging, and quick insertion.
- **Contextual Controls:** In-line and side-panel editing to minimize disruptive pop-ups.
- **AI-Powered Suggestions:** Smart recommendations that evolve with past usage.
- **Team Collaboration:** Real-time co-editing, integrated chat, and live coordination tools.

This comprehensive approach ensures ProFlow remains visually appealing and functionally robust, empowering worship teams to plan and execute services with efficiency, creativity, and confidence.
