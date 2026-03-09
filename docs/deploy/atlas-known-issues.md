# Atlas Deploy Known Issues

Date: 2026-03-09

## Scope

This document records Atlas/buildpack deploy-log behavior observed while validating the restored canonical `package-lock.json`.

## Captured log segments

### 1) "Successful" deploy segment (install step succeeded)

Source: `docs/deploy/logs/local-deploy-success.log`

```text
npm warn Unknown env config "http-proxy". This will stop working in the next major version of npm.
npm warn EBADENGINE Unsupported engine {
  package: 'od-storefront@1.0.0',
  required: { node: '20.x', npm: '10.x' },
  current: { node: 'v22.21.1', npm: '11.4.2' }
}

added 469 packages in 16s
```

### 2) Failed deploy segment (build step failed)

Source: `docs/deploy/logs/local-deploy-failed.log`

```text
> od-storefront@1.0.0 build
> next build

Failed to compile.

./pages/[[...wordpressNode]].tsx:20:5
Type error: Type '(props: any) => Element' has no properties in common with type '{ query?: DocumentNode | undefined; variables?: ((context: GetStaticPropsContext | GetServerSidePropsContext, extra?: { ...; } | undefined) => { ...; }) | undefined; }'.
```

## Repeated `purl scheme is not "pkg"` lines

- Searched both captured logs and found **no** `purl scheme is not "pkg"` lines.
- Because this workspace does not have Atlas dashboard/API access, we could not pull hosted Atlas buildpack logs directly from the platform in this run.

## Canonical lockfile redeploy test

- Test executed with canonical `package-lock.json` restored and present.
- Command sequence used as deploy proxy:
  1. `npm ci` (install)
  2. `npm run build` (build)
- Result:
  - install succeeded;
  - build failed on a TypeScript error unrelated to purl parsing;
  - no `purl scheme is not "pkg"` lines were observed locally.

## Support ticket status

Conditional rule requested: open platform/buildpack support ticket **if purl errors persist while build succeeds**.

- Condition was **not met** in this run:
  - build did not succeed;
  - purl error lines were not reproduced locally.
- Therefore no ticket was filed yet.

### Ticket draft payload (ready if Atlas logs still show purl noise)

- Builder version: _pending Atlas dashboard value_
- Node/npm versions tested locally: Node `v22.21.1`, npm `11.4.2`
- Sample logs: see `docs/deploy/logs/local-deploy-success.log` and `docs/deploy/logs/local-deploy-failed.log`
- Lockfile sync confirmation: canonical `package-lock.json` restored and used by `npm ci`

If Atlas hosted logs continue to emit `purl scheme is not "pkg"` while builds otherwise pass, submit this payload to Atlas/buildpack support and update this doc with the ticket ID and response.
