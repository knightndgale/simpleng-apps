### v 1.0.0

# Simpleng App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Generating - NEXTAUTH_SECRET

### On your terminal RUN

- `export GITHUB_CLIENT_SECRET="[ SECRET ]"`
- `export GITHUB_CLIENT_ID="[ ID ]"`
- `openssl rand -base64 32`
- Copy and paste it to your NEXTAUTH_SECRET

## IMPORTANT

Running `export GIHUB_CLIENT_SECRET ...` and `export GITHUB_CLIENT_ID ...` will make your server
focus on the `ID` and `TOKEN` and may cause confusion as to why its pointing on a different environments

### Changing Database Schema

To change the `migrate` command to create tables in a specific schema in your PostgreSQL database, you can use the `schema` property in your `datasource` block in your `schema.prisma` file.

For example, if you want to create tables in a schema named `newDB`, you can modify your `datasource` block to look like this:

```
datasource db {
provider = "postgresql"
url = "postgresql://username:password@localhost:5432/database_name?schema=newDB"
}
```

In this example, we have added `?schema=newDB` to the end of the `url` string to specify the target schema.

After modifying your `datasource` block, you can run the `migrate` command as before:

`npx prisma migrate dev --name initial --preview-feature`

This command will create tables in the `newDB` schema of your local PostgreSQL database.

Note that you can also use the `--create-only` flag with the `migrate` command to generate the SQL script to create the tables without actually running the migration. You can then manually execute the SQL script to create the tables in a specific schema in your PostgreSQL database. To do this, add the `--create-only` flag to the `migrate` command:

`npx prisma migrate dev --name initial --create-only --preview-feature`

This command will generate a SQL script to create the tables. You can then run the SQL script in your PostgreSQL client to create the tables in the desired schema. To run the SQL script, use the following command:

`psql -h <hostname> -d <database_name> -U <username> -f <path_to_sql_script>`

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## Important

- Everytime you push a prisma schema you need to restart the typescript server otherwise it wont look for the new generated type in your node modules. This should solve the problem if it's the latter.

- Restarting the TS server in vscode is done by opening the command palette (CMD+SHIFT+P) and search for "restart" and select the restart typescript option.
