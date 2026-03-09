#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const lockfilePath = path.join(process.cwd(), 'package-lock.json');
if (!fs.existsSync(lockfilePath)) {
  console.error('\nERROR: package-lock.json is required for deploys. Commit the lockfile and retry.\n');
  process.exit(1);
}

const isDeploy =
  process.env.NODE_ENV === 'production' ||
  Boolean(process.env.REPL_DEPLOYMENT) ||
  Boolean(process.env.DEPLOYMENT_ID) ||
  Boolean(process.env.HEROKU) ||
  process.env.CI === 'true';

if (!isDeploy) {
  process.exit(0);
}

const npmCommand = process.env.npm_command || '';
if (npmCommand !== 'ci') {
  console.error(
    `\nERROR: Deploy installs must use lockfile-driven installs (npm ci). Received \"${npmCommand || 'unknown'}\".\n`
  );
  process.exit(1);
}
