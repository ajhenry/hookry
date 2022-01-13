sha=$(git log --pretty=format:'%h' -n 1)
echo "export const hotPatchVersion = '"$sha"'" >./generated/constants.ts
git add .
git commit -m "ci: Bumped sha version to '"$sha"'"
git push
