# Lockfile + Redeploy Checklist

Date: 2026-03-09

## 1) Verify `package-lock.json` exists and is tracked

- `package-lock.json` restored at repo root and committed to git.
- `.gitignore` does not ignore `package-lock.json`.

## 2) Confirm deploy target branch/SHA

Use these values when validating your hosting dashboard deploy target:

- Branch: `work`
- Commit SHA: `<commit that includes package-lock.json>`

## 3) Clear cache + redeploy

In your hosting provider dashboard, trigger a deploy with:

- cached source cleared (if available)
- build cache cleared (if available)

## 4) Verify install logs are lockfile-aware

In build logs, confirm one of the following:

- `npm ci` is used, or
- install runs without any lockfile-missing warning

## 5) Use deterministic install command

If your host supports custom install command, set:

```bash
npm ci
```

This ensures dependency resolution uses `package-lock.json` exactly.
