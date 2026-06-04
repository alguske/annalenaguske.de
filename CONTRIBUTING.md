# Contributing

## AI assistant config (agnostic-ai)

This project uses [agnostic-ai](https://github.com/Chemaclass/agnostic-ai) as the
**single source of truth** for AI assistant configuration. You write specs once
under `.agnostic-ai/`, and `sync` generates the native config for each enabled
target (currently **Claude Code** and **Codex**).

### Source of truth vs. generated files

| Path | Status | Notes |
|------|--------|-------|
| `.agnostic-ai/` | **edit this** | Specs: `agents/`, `skills/`, `rules/`, `hooks/`, `mcps/`, `commands/` + `overlays/` |
| `.agnostic-ai/AGNOSTIC_AI.md` | **edit this** | Shared entry-point body — mirrored into every target's entry-point |
| `agnostic-ai.yaml` | **edit this** | Targets, sources, gitignore config |
| `CLAUDE.md` | generated | git-ignored — do **not** edit |
| `AGENTS.md` | generated | git-ignored (Codex entry-point) — do **not** edit |
| `.claude/` | generated | git-ignored — do **not** edit |
| `.codex/` | generated | git-ignored — do **not** edit |

Generated files are listed in the managed block of `.gitignore`. Never edit them
by hand; edit the spec and re-run `sync`.

### What lands where (Claude vs. Codex)

Verified emission for the two enabled targets:

| Spec kind | Claude | Codex |
|-----------|--------|-------|
| `rules/` | `.claude/rules/<name>.md` (native) | **not emitted** — put cross-target conventions in `AGNOSTIC_AI.md` instead |
| `agents/` | `.claude/agents/<name>.md` | `.codex/agents/<name>.toml` |
| `skills/` | `.claude/skills/<name>/SKILL.md` | `.codex/skills/<name>/SKILL.md` |
| settings (overlay) | `.claude/settings.json` | — |
| entry-point body | `CLAUDE.md` | `AGENTS.md` |

> **Codex has no rule adapter** (as of agnostic-ai 0.30.0). A spec under
> `rules/` only reaches Claude. To deliver a project-wide convention to **both**
> targets, write it in `.agnostic-ai/AGNOSTIC_AI.md` — its body is mirrored into
> `CLAUDE.md` and `AGENTS.md` on every sync. Use `agnostic-ai explain <spec>` to
> confirm where any spec emits.

### Install

```bash
brew install --cask Chemaclass/tap/agnostic-ai
# or
go install github.com/chemaclass/agnostic-ai/cmd/agnostic-ai@latest
```

### Workflow

```bash
agnostic-ai sync          # regenerate Claude + Codex configs from specs
agnostic-ai sync --check  # CI gate: fail if generated files drift from specs
agnostic-ai status        # show targets, specs, drift
agnostic-ai validate      # validate specs
```

**After cloning or pulling**, run `agnostic-ai sync` to materialize your local
`CLAUDE.md` / `AGENTS.md` / `.claude/` (they are not committed).

### Adding a rule / agent / skill

Create a spec under the matching folder, then sync:

```bash
agnostic-ai new rule commit-conventions   # scaffold a spec
# edit .agnostic-ai/rules/commit-conventions.md
agnostic-ai sync
```

Each spec is Markdown with YAML frontmatter:

```markdown
---
name: commit-conventions
description: Standardize commit messages across tools
alwaysApply: true
---

Use Conventional Commits. Subject under 72 chars.
```

### Adding a target

Add it under `targets:` in `agnostic-ai.yaml`, then `agnostic-ai sync`.
Supported: claude, codex, cursor, github-copilot, gemini, cline, continue, and more.

### Non-spec settings

Tool settings that aren't specs (e.g. `.claude/settings.json`) live in
`.agnostic-ai/overlays/` and are re-applied on every sync.
