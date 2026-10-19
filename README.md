# git-seek

search github users and browse their profile, repositories, followers and following.

## features

- search users by username
- profile details: bio, avatar and stats
- repositories with description, stars and language
- followers and following lists

## stack

react 18 · vite · typescript · recoil · tailwind css · framer motion · github rest api

## run locally

```bash
npm install
cp .env.example .env
npm run dev
```

## env

copy `.env.example` to `.env`. `VITE_GITHUB_ACCESS_TOKEN` is optional and only raises the github api rate limit. it ends up in the browser bundle, so use a token with no scopes.
