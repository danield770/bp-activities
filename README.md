# bp-activities
To run the app:

1) Clone the repo with: git clone https://github.com/danield770/bp-activities.git
2) cd bp-activities/server
3) npm i (installs the server packages)
4) npm run start
5) open an additional terminal
6) cd ../client
7) npm i (installs the client packages)
8) npm run dev
9) open a browser at: http://localhost:8080/

## Some Comments
1) I've been meaning to learn vue for some time now...this project has made me learn some the basics of Vue!
2) I used Vite to bootstrap the project
3) I'm using Vue version 3 and Single File Components (SFCs)
4) In addition to the given UI - I added a few things for better UX such as the ability to reset the search and some empty states (when there are no results as a result of the filters)
5) For the data fetching, caching and updating server state I have made use of [TanStack Query](https://tanstack.com/query/latest/docs/vue/overview)
6) I made use of localStorage to persist the hidden activities.

7) Thanks!
