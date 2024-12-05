# Tapsi Food Task

### This project is built with the following technologies:

- [Next.js](https://nextjs.org)14 bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)
- TypeScript
- Tailwind CSS
- shadcn for UI components
- Node.js 22.11.0

## Docker Strategy

An optimized Dockerfile strategy is included, following [Next.js Docker recommendations](https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile) .
However, since the app is deployed on Vercel, Docker was not needed for this setup.
If you want to build the project using Docker:

1. Open `next.config.mjs`.
2. Uncomment the line related to Docker builds (instructions are provided in comments there).
3. Build with docker.

## Features

### Core Features

1. **Responsive Design**:
   - The app works seamlessly across mobile and larger screens.
2. **Item Management**:[^1]
   - Add new items using the input field and button at the bottom.
   - Check/uncheck items.
   - Delete all checked items using the Trash button (conditionally rendered at the top).
3. **Image Handling**:
   - Product images are lazy-loaded.
   - A custom skeleton is displayed as a placeholder during loading.
   - Newly added items default to fallback.png for the image.

### Bonus Features (Beyond Requirements)

1. **Debounced Search**:
   - Added a search field with debounced and memoized functionality for efficient item search.
2. **Automatic Scrolling**:
   - When a new item is added, the list scrolls to the bottom for better user experience.
3. **Theme Toggle**:
   - Implemented a theme switcher for light/dark modes.(Theme persistence was not implemented as it was not part of the requirements.)
4. **Total Price Calculation**:
   - Displays the total sum of prices for all items in the list.
5. **Description Toggling**:
   - Long descriptions are truncated by default. A Show More / Show Less button allows toggling for better readability.

## Online Demo

Access the **live demo** here: [Tapsi Food Task](https://tpsfd-task.vercel.app/)

## Getting Started

1. For installing dependencies

```
npm install
```

2. To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Font Optimization

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

[^1]: While using state management solutions like Redux or Zustand would have been a more scalable and efficient approach to handle the shopping list items, it wasn't within the scope of the project requirements. Additionally, implementing persistence to retain the state of checked items across sessions would have enhanced the user experience, but this feature was not part of the requirements either.
