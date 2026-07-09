#!/usr/bin/env node

/* eslint-disable no-console */

import { copyFileSync, existsSync, readdirSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const skipDirs = new Set([
  ".git",
  ".next",
  ".turbo",
  "build",
  "dist",
  "node_modules",
  "out",
])

function findExampleFiles(dir, results = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (skipDirs.has(entry.name)) {
      continue
    }

    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      findExampleFiles(fullPath, results)
      continue
    }

    if (entry.name.endsWith(".example")) {
      results.push(fullPath)
    }
  }

  return results
}

for (const examplePath of findExampleFiles(rootDir)) {
  const targetPath = examplePath.slice(0, -".example".length)

  if (existsSync(targetPath)) {
    continue
  }

  copyFileSync(examplePath, targetPath)
  console.log(`Created ${path.relative(rootDir, targetPath)}`)
}
