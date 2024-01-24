# changelog

## 3.2.0

- add alignment classes
- use native aspect-ratio

## 3.1.0

- switch from `gulp-minify-css` to `gulp-clean-css`
- switch from `hover-border-primary` to `border-primary-hover`
- switch from `hover-color-primary` to `color-primary-hover`
- fix aspect ratio styles
  - iframe requires container
  - iframe can't leverage ::before pseudo element technique
  - iframe works without container only if browser supports aspect-ratio

## 3.0.0

- refactor components
- add box-shadow
- add outline
- add position.css (top right bottom left)
- rename z-index
- remove anchorjs from docs
- fix hide-xs
- use rem for margin and padding
- don't preserve polyfilled css at gulpfile
- use font size numeric values instead of prefixes

## 2.0.0

- add `--marker` and `--gap` to `.list-inline`
- add `.margin-trim`
- fix font-family inheritance for headings
- remove unused fallbacks
- improve `.clearfix`
- improve `.overflow-hint`
- add `.position-sticky`
- add `--line-height` helper
- add `.font-size-{xxs-xxxl}`, remove `.h1 - .h6`
- `.small` cascades to form fields
- add `.color-inverted`

## 1.3.0

- add vertical center

## 1.2.1

- update to gulp 4
- make aspect ratio affect only first child

## 1.2.0

- add version number to dist files
- add object-fit properties
- add aspect-ratio properties
- add `.color-white`
- add `.text-truncate`
- add `.text-shadow`
- add `.bg-shade`
- remove buttons properties, let hyper-reset handle buttons

## 1.11.4

- move min-width to overflow-x

## 1.11.3

- add min-width to overflow-x

## 1.11.2

- add definition for all font weights

## 1.11.1

- fix lists - make list items inline-block

## 1.11.0

- sitch to postcss

## 1.10.1

- add custom bullets for lists
- migrate files to CSS

## 1.10.0

- remove margins > 5
- switch files to css (processed with less)
