# Lockfile + Redeploy Checklist

Date: 2026-03-09

Use this checklist when validating a redeploy under the current lockfile policy.

## 1) Confirm lockfile policy for this repo

Current policy is **required lockfile**:

- `package-lock.json` is expected at repo root.
- Deploy/install validation should be performed against the committed lockfile.

## 2) Verify committed `package-lock.json` state

Before redeploy, validate locally against git:

```bash
git ls-files --error-unmatch package-lock.json
```

```bash
git rev-parse HEAD:package-lock.json
```

```bash
git status --short package-lock.json
```

Expected results:

- `package-lock.json` is tracked.
- `HEAD` includes `package-lock.json`.
- Working tree is clean for `package-lock.json` (no uncommitted lockfile edits).

## 3) Confirm deploy target branch/SHA

Use these values when validating your hosting dashboard deploy target:

- Branch: `<branch being deployed>`
- Commit SHA: `<commit being deployed (must include package-lock.json)>`

## 4) Clear cache + redeploy

In your hosting provider dashboard, trigger a deploy with:

- cached source cleared (if available)
- build cache cleared (if available)

## 5) Verify install logs use the committed lockfile

In build logs, confirm lockfile-aware install behavior (for example):

- install command is `npm ci`, **or**
- npm reports it is using `package-lock.json` with no lockfile-missing warnings/errors.

## 6) Prefer deterministic install command

If your host supports custom install command, set:

```bash
npm ci
```

This ensures dependency resolution follows committed `package-lock.json` exactly.
