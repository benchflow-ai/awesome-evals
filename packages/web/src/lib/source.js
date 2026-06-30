// Single source of truth for where the dataset is pulled from — used by both the
// build-time generator (scripts/build-data.mjs) and the runtime live-update fetch.
export const GH_OWNER = 'benchflow-ai'
export const GH_REPO = 'awesome-evals'
export const GH_BRANCH = 'main'
export const README_RAW_URL = `https://raw.githubusercontent.com/${GH_OWNER}/${GH_REPO}/${GH_BRANCH}/README.md`
