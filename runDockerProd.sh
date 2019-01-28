#!/binbin/bash

rm -rf p2srw
mkdir p2srw
rsync -av --progress p2s-backend/ p2srw --include=".env.enc" --include=".dockerignore" \
--exclude="node_modules/" --exclude="test/" --exclude=".*"  \
--exclude="package-lock.json" --exclude="jest.*" --exclude="*.md"

mkdir p2srw/public/frontend
rsync -av --progress p2s-frontend/ p2srw/public/frontend --include=".browserlistrc" \
--exclude="node_modules/" --exclude="tests/" --exclude=".*"  \
--exclude="yarn.lock" --exclude="*.md"
cd p2srw/public/frontend
npm install -g yarn
yarn install --ignore-optional --silent
yarn build
rsync -av dist/ ../
rm -rf ../frontend
