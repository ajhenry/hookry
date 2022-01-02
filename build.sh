sha=$(git log --pretty=format:'%h' -n 1)
echo "export const hotPatchVersion = '"$sha"'" >./utils/constants.ts
