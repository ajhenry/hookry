sha=$(git log --pretty=format:'%h' -n 1)
echo "export const hotPatchVersion = '"$sha"'" >./generated/constants.ts
git add *generated/constants.ts
git commit -m "ci(prod): Bumped sha version to '"$sha"'"
git tag "prod-$sha"
git push
git push --tags
