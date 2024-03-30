## Add an Event

### Steps

1. Fork the repo and add to the object in the events object within the [directory](https://github.com/BibliothecaDAO/RealmsWorld/blob/main/apps/nextjs/src/constants/events.ts)

```js
export const events: Event[] = [
  {
    name: "Paved: Lord of the Board",
    description: "A Paved Tourney for 2500 Lords in prizes.",
    startDate: "2024-03-28",
    endDate: "2024-04-04",
    location: "Realms",
    image: "/events/paved2.png",
    website: "https://paved.gg",
    slug: "paved",
    type: "play"
  },
];
```

2. For the image include it in the events image [directory](https://github.com/BibliothecaDAO/RealmsWorld/tree/main/apps/nextjs/public/events) and make sure it is reference correctly in the json

3. Submit a PR with your changes!
