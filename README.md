# Water Tracking App

A Next.js water tracking application that helps users set daily water intake goals and track their progress. The app uses [Convex](https://convex.dev) for real-time data storage and synchronization.

## Features

- Set personalized water intake goals based on weight
- Real-time progress tracking with visual water level indicator
- Timer-based reminders for drinking water
- Persistent data storage with Convex
- Responsive design with dark mode support

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Database**: Convex (real-time backend)
- **State Management**: Convex queries and mutations

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Convex Setup

The app uses Convex for data persistence. The Convex backend is automatically set up when you run the development server.

To deploy Convex functions:

```bash
pnpm convex:deploy
```

## Data Storage

All water goal data is stored in Convex instead of localStorage, providing:
- Real-time synchronization across devices
- Persistent data storage
- Better scalability and reliability

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
