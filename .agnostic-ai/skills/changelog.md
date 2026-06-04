---
name: changelog
description: Generate or update CHANGELOG entries. Fires on "changelog", "release notes".
---

# changelog

Summarize merged changes into a CHANGELOG entry.

Steps:
1. Read git log since the last tag.
2. Group commits by Conventional Commit type (feat, fix, ...).
3. Write a dated section in Keep a Changelog format.
