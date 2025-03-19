# WORDLE CLONE

Deployed site: tbd

A game where users have 5 attempts to guess a 5 letter word.

## Built with

- ReactJs https://react.dev/
- Vite https://vitejs.dev/
- TailwindCSS https://tailwindcss.com/
- Vitest https://vitest.dev/
- React Testing Library https://testing-library.com/

## Features

- Users has 5 guesses
- A random 5 letter word is chosen from a list of words
- The user gets feedback on wether the letters they entered are in the correct position
  - Letters in correct positions get a green background
  - Incorrect letters get a gray background
  - Correct letters that are in incorrect positions get a yellow background
    - The yellow background will not be added if there are more of that letter in the guess than in the target word

## Getting started

### Installing and running

First clone the repo then install dependencies

```bash
npm i
```

### Running

```bash
npm run dev
```

### Testing

In the terminal:

```bash
npm run test

```
