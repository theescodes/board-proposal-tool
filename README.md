# Board Proposal Tool

A micro-frontend application for managing organizational board proposals — from drafting and submission through review and approval. Built with an **Angular 21** host shell and **Svelte 5** web components.

## Architecture

```
board-proposal-tool/
├── angular-host/        # Main SPA — routing, pages, services (Angular 21)
├── svelte-components/   # Reusable form/UI components compiled as Web Components (Svelte 5)
└── shared/              # TypeScript type definitions shared across both packages
```

The Angular host embeds Svelte-built custom elements (`<bp-proposal-form>`, `<bp-proposal-preview>`, etc.) directly in its templates. Svelte components emit custom DOM events (e.g. `proposal-submit`, `proposal-field-change`) that Angular listens to, enabling two-way communication without framework coupling.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Host App | Angular | 21 |
| Components | Svelte | 5 |
| Language | TypeScript | 5.9 / 6.0 |
| Styling | Tailwind CSS | 4 |
| Build (Svelte) | Vite | 8 |
| State | Angular Signals + RxJS | — |

## Features

- **Proposal CRUD** — create, edit, view, and list proposals
- **Workflow management** — Draft → Submitted → Under Review → Approved / Rejected
- **Live preview** — side-by-side form and rendered preview while editing
- **Rich text editor** — WYSIWYG formatting for detailed descriptions
- **File attachments** — drag-and-drop uploader
- **Dashboard** — stats overview with totals by status and recent proposals
- **Filtering** — filter proposal list by status, search, and category
- **Priority & category selectors** — visual priority picker and categorization

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install Dependencies

```bash
npm install
cd angular-host && npm install
cd ../svelte-components && npm install
```

### Development

```bash
# Build Svelte components, copy to Angular assets, and serve Angular
npm run dev
```

For active Svelte development with watch mode, run two terminals:

```bash
# Terminal 1 — rebuild Svelte on changes
npm run dev:svelte:watch

# Terminal 2 — serve Angular
npm run dev:angular
```

The app will be available at **http://localhost:4200**.

### Production Build

```bash
npm run build
```

This sequentially:
1. Builds Svelte components into a single IIFE bundle
2. Copies the bundle to `angular-host/src/assets/svelte/`
3. Builds the Angular application

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Build Svelte, copy assets, serve Angular |
| `npm run build` | Full production build |
| `npm run build:svelte` | Build Svelte components only |
| `npm run build:angular` | Build Angular host only |
| `npm run copy:svelte` | Copy Svelte bundle to Angular assets |
| `npm run dev:svelte:watch` | Watch and rebuild Svelte on changes |
| `npm run dev:angular` | Serve Angular dev server |

## Project Structure

### Angular Host

- **Pages** — Dashboard, Proposal List, Create, Detail, Edit (lazy-loaded routes)
- **Components** — Header, Sidebar, Status Badge
- **Services** — `ProposalService` with Angular Signals for reactive state management
- **Models** — TypeScript interfaces for proposals and attachments

### Svelte Components

All components compile as custom elements with no shadow DOM for seamless CSS inheritance:

| Component | Element | Purpose |
|-----------|---------|---------|
| `ProposalForm` | `<bp-proposal-form>` | Main form with all proposal fields |
| `ProposalPreview` | `<bp-proposal-preview>` | Styled read-only preview |
| `FormField` | `<bp-form-field>` | Reusable input/select/textarea |
| `PrioritySelector` | `<bp-priority-selector>` | Visual 4-level priority picker |
| `CategorySelector` | `<bp-category-selector>` | Category dropdown |
| `RichTextEditor` | `<bp-rich-text-editor>` | WYSIWYG editor |
| `FileUploader` | `<bp-file-uploader>` | Drag-and-drop file attachments |

### Shared Types

The `shared/` package defines the core data model (`BoardProposal`, `Attachment`, `ProposalFormData`) used by both Angular and Svelte packages.

## Data Model

```
BoardProposal
├── id, title, submitter, department
├── priority: low | medium | high | critical
├── category: budget | hiring | policy | strategy | ...
├── summary, detailedDescription (HTML), financialImpact, riskAssessment
├── attachments: Attachment[]
├── status: draft | submitted | under-review | approved | rejected
└── createdAt, updatedAt, submittedAt
```

### Proposal Workflow

```
DRAFT → SUBMITTED → UNDER REVIEW → APPROVED
                                  → REJECTED
```
