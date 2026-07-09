#!/usr/bin/env node

/* eslint-disable no-console */

import { execSync } from "node:child_process"

function isInsideGitWorktree() {
  try {
    return (
      execSync("git rev-parse --is-inside-work-tree", {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim() === "true"
    )
  } catch {
    return false
  }
}

if (isInsideGitWorktree()) {
  execSync("lefthook install --reset-hooks-path", { stdio: "inherit" })
} else {
  console.log("Skipping lefthook install: not inside a Git worktree.")
}
