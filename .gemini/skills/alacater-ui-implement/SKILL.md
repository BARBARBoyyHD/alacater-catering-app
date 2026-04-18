---
name: alacater-ui-implement
description: Mandatory UI implementation workflow for Alacater. Use for all UI tasks to enforce design compliance, color guidelines, and pre-flight checks.
---


# Alacater UI Implementation Skill

This skill enforces strict adherence to Alacater's design system and color guidelines for all UI implementation tasks.

## Mandatory Workflow

Every time this skill is used, you MUST follow these steps strictly:

### 1. Pre-Flight Verification (Design Compliance)
Before generating any code, you MUST:
- **Read:** Open and parse `docs/projects/02.Color-Guidelines.md`.
- **Verify:** Identify the specific color tokens needed (e.g., `Colors.primary`, `Colors.background`).
- **Output:** Output the mandatory Pre-Flight Check block:

```markdown
### Pre-Flight UI Check
- [ ] Color Guidelines read
- [ ] Tokens identified: [list tokens here]
```

### 2. Implementation
- **Tokens Only:** You are FORBIDDEN from using hardcoded hex values (e.g., `#FF7B00`). You MUST use the `Colors` constant tokens.
- **Component Reuse:** Check `src/components/common/` before building new components.
- **Structure:** Follow the directory structure defined in `GEMINI.md`.

### 3. Validation
- After implementation, summarize:
  - Tokens used.
  - Verification that no hardcoded hex values exist.

## When to use this skill
- Any request to create, modify, or style UI screens or components.
- Tasks involving layout, design, or visual adjustments.
