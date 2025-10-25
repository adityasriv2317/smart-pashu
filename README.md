This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## API Documentation

This project exposes a small auth API (used by the client pages) under `/api/auth`. Below are the available endpoints and examples.

### Environment

- `JWT_SECRET` (recommended): secret used to sign JWTs. If not set, a default is used in development but you should set `JWT_SECRET` for production.

### 1) POST /api/auth/signup

Create a new user and receive a JWT token.

Request

Content-Type: application/json

Body:

{
	"name": "Alice",
	"email": "alice@example.com",
	"password": "s3cret123"
}

Success response (201)

{
	"token": "<jwt-token-here>"
}

Common errors

- 400 Bad Request — missing fields or password too short
- 409 Conflict — user already exists

Notes

- Passwords are hashed with bcrypt before saving.
- Token expiration: 1 hour (signed with `JWT_SECRET`).

### 2) POST /api/auth/login

Authenticate a user and receive a JWT token.

Request

Content-Type: application/json

Body:

{
	"email": "alice@example.com",
	"password": "s3cret123"
}

Success response (200)

{
	"token": "<jwt-token-here>"
}

Common errors

- 400 Bad Request — missing fields
- 401 Unauthorized — invalid email or password

Notes

- The client uses the returned token and saves it in either `localStorage` (when "Remember me" is checked) or `sessionStorage`.

### 3) GET /api/auth/profile

Get the current authenticated user's basic profile. The request must include an Authorization header with a Bearer token.

Request headers:

Authorization: Bearer <jwt-token-here>

Success response (200)

{
	"user": {
		"_id": "<user-id>",
		"name": "Alice",
		"email": "alice@example.com",
		// other user fields (password is excluded)
	}
}

Common errors

- 401 Unauthorized — missing token, invalid token, or token payload doesn't contain expected id
- 404 Not Found — user id from token does not exist

Notes

- The API currently decodes the JWT payload to obtain the `id` field. In some routes the code uses `jwt.verify` for a full signature/expiry check — make sure the token is signed with the same `JWT_SECRET` used by login/signup.
- Example of how the client sends the header:

	Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

---

If you want me to add Postman/Insomnia collection snippets or to document any other API in the project, tell me which endpoints you'd like added.
