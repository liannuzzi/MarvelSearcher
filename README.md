## Project intro

This project was created by Lucas Iannuzzi using Next.Js and Bootstrap.

This tool serves as a marvel heroes search engine, while typing some text in the search bar you will receive all the coincidence for that text regarding Marvel heroes names. You can also click on the heroes card to see a list of comics related with that hero. The comics can be added to a favorites list and also a detail of them is available by clicking in the comic image.

## Run project

To run this project locally you have to follow this steps:

```bash
1. Create a .env.local file in the project folder
2. Create the following variables in the .env.local file:
    NEXT_PUBLIC_API_KEY
    NEXT_PUBLIC_TOKEN_HASH
3. Create a user account in the marvel portal to get a public and a private key for consuming the API (https://developer.marvel.com/)
4. Assign the values to each variable:
    NEXT_PUBLIC_API_KEY= *marvel public key*
    NEXT_PUBLIC_TOKEN_HASH= *hash a concatenate of the following values: ts+private key + public key * (an option is to use https://www.md5hashgenerator.com/)
5. Once this variables are complete you can follow the getting started section.
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy in production

To use the tool that is deployed in production follow this link --> https://marvel-searcher-zeta.vercel.app/
