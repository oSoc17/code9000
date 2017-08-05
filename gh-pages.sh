cd web-app

yarn install
yarn build-css

NODE_ENV="production" PUBLIC_URL="https://osoc17.github.io/code9000/" REACT_APP_ROUTER="HASH" REACT_APP_API_URL="https://birds.today/api" yarn build

cd ..

git branch -D gh-pages
git push origin --delete gh-pages

git add web-app/build && git commit -m "Initial dist subtree commit"

git subtree split --prefix web-app/build -b gh-pages
git push -f origin gh-pages:gh-pages
