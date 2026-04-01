#!/usr/bin/env bash
# 一键：推送到 GitHub + 发布到 npm（需环境变量，勿把 Token 写进仓库）
# 用法：
#   export GITHUB_TOKEN=ghp_xxx          # GitHub PAT，需 repo 权限
#   export NPM_TOKEN=npm_xxx           # npm Access Token（Automation 或 Publish）
#   bash scripts/push-and-publish.sh
#
# 仅推送：只设置 GITHUB_TOKEN
# 仅发 npm：只设置 NPM_TOKEN（并确保 package.json 版本未在 registry 上占用）

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

GITHUB_REPO_PATH="yjhlyj123/mobile-ui-generator"

die() { echo "push-and-publish: $*" >&2; exit 1; }

if [[ -n "${GITHUB_TOKEN:-}" ]]; then
  echo "==> git push origin main (HTTPS + token)"
  git push "https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO_PATH}.git" main
else
  echo "跳过 GitHub：未设置 GITHUB_TOKEN（设置后重新运行即可推送）"
fi

if [[ -n "${NPM_TOKEN:-}" ]]; then
  echo "==> npm publish"
  TMP_NPMRC="$(mktemp)"
  trap 'rm -f "$TMP_NPMRC"' EXIT
  printf '%s\n' "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >"$TMP_NPMRC"
  NPM_CONFIG_USERCONFIG="$TMP_NPMRC" npm publish --access public
else
  echo "跳过 npm：未设置 NPM_TOKEN（在 npm 网站创建 Access Token 后 export 再运行）"
fi

echo "==> 完成"
