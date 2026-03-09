# Main Branch Consolidation and Cleanup Plan

This runbook consolidates migration work into `main` and cleans up stale branches without losing traceability.

## Goals

- Merge all approved updates into `main`.
- Preserve an auditable history of migration branches.
- Remove stale branches from local + remote to simplify ongoing maintenance.

## One-Time Prep

1. Ensure `main` exists locally and tracks remote:
   ```bash
   git fetch origin --prune
   git checkout -B main origin/main
   ```
2. Create a timestamped safety tag before cleanup:
   ```bash
   git tag branch-cleanup-pre-$(date +%Y%m%d)
   git push origin --tags
   ```

## Consolidation Order

Merge branch work in dependency order to reduce conflicts:

1. `migration/faust-foundation`
2. `migration/ui-port`
3. `migration/commerce-integration`
4. `staging/atlas-ready`
5. active fix/feature branches (for example `codex/*`, `replit-import`) that are not yet represented in the chain.

For each branch:

```bash
git checkout main
git pull --ff-only origin main
git merge --no-ff <branch-name>
# resolve conflicts if needed
git push origin main
```

If a branch should be partially included, cherry-pick only the needed commits:

```bash
git cherry-pick <sha1> <sha2> ...
```

## Validation Gate Before Deletion

Run your build/test/lint checks on `main` after final merge:

```bash
npm ci
npm run lint
npm run build
npm test
```

If checks fail, fix on a short-lived branch and merge the fix to `main` before deleting anything.

## Branch Deletion Rules

Delete only after all of the following are true:

- branch content is in `main` (via merge or cherry-pick), and
- any related PR is merged/closed, and
- no active release/hotfix depends on it.

Delete merged locals:

```bash
git branch --merged main \
  | egrep -v '(^\*| main$| master$| develop$| release/| hotfix/)' \
  | xargs -r git branch -d
```

Delete remotes (run per branch after review):

```bash
git push origin --delete <branch-name>
```

Prune stale tracking refs:

```bash
git fetch origin --prune
```

## Suggested Protection Settings for `main`

- Require pull requests before merge.
- Require status checks (lint/build/tests) to pass.
- Require linear history or squash merge strategy.
- Enable automatic deletion of head branches after merge.

## Quick Audit Commands

View branches not yet in `main`:

```bash
git branch -r --no-merged origin/main
```

See ahead/behind summary:

```bash
git for-each-ref refs/remotes/origin \
  --format='%(refname:short) | %(upstream:trackshort) | %(committerdate:relative)'
```

Check whether a branch was fully merged:

```bash
git merge-base --is-ancestor origin/<branch-name> origin/main && echo "merged"
```
