[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=12560345)


# Term Project - UNO-Card Game

| Group Members |
|---------------|
| Malavya Raval |
|  Brandon Peralta   |
| Nicholas Pagcanlungan   |
| Siarhei Pushkin |

### Instructions

1. install node js
2. install postgresql
3. `git clone https://github.com/sfsu-csc-667-fall-2023/team-term-project-group-o/`
4. `cd team-term-project-group-o/`
5.  `psql -U postgres`
6.  `CREATE USER <username> WITH PASSWORD '<password>';
ALTER USER <username> CREATEDB;
\q`
7. `vim .env`
8. contents of .env file :- `DATABASE_URL=postgres://<username>:<password>@localhost:5432/<database-name>
SECRET=mySecretKey`
9. `createdb <database-name>`
10. brew services start postgresql
11. npm init
12. npm install
13. npm run start:dev

