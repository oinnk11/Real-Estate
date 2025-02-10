const listings = [
  {
    id: 1,
    title: "Spacious 3-BHK Apartment in Kathmandu",
    description:
      "This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description.",
    price: 12000000,
    location: "Baneshwor, Kathmandu",
    area: 1500,
    bedrooms: 3,
    bathrooms: 2,
    type: "Apartment",
    thumbnail:
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
    images: [
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
    ],
    seller: {
      name: "Peter Parker",
      phone: "9864188492",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    },
  },
  {
    id: 2,
    title: "Modern House for Sale in Pokhara",
    price: 25000000,
    location: "Lakeside, Pokhara",
    area: 2000,
    bedrooms: 4,
    description:
      "This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description.",
    bathrooms: 3,
    type: "House",
    thumbnail:
      "https://i.pinimg.com/736x/d4/27/92/d427921f347d3aac0f31f1cc8a746c11.jpg",
    images: [
      "https://i.pinimg.com/736x/d4/27/92/d427921f347d3aac0f31f1cc8a746c11.jpg",
      "https://i.pinimg.com/736x/2a/9d/8a/2a9d8a98717becac0ee3c330cf655c11.jpg",
      "https://i.pinimg.com/736x/b7/9a/91/b79a91448bd6221ab4700d4652078b90.jpg",
      "https://i.pinimg.com/736x/31/59/76/315976c93bfabb16d65f65449dc9e0b9.jpg",
      "https://i.pinimg.com/736x/4e/80/5b/4e805b88becf1746623423dbb7fbe2f9.jpg",
      "https://i.pinimg.com/736x/7d/d4/e6/7dd4e65f1d0b449c895d59a5993d2466.jpg",
      "https://i.pinimg.com/736x/5b/61/de/5b61de9d8d3d6e1ed56a368571c2bd5a.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
    ],
    seller: {
      name: "Peter Parker",
      phone: "9864188492",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    },
  },
  {
    id: 3,
    title: "Affordable 2-BHK Flat in Lalitpur",
    description:
      "This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description.",
    price: 8000000,
    location: "Patan, Lalitpur",
    area: 1200,
    bedrooms: 2,
    bathrooms: 1,
    type: "Flat",
    thumbnail:
      "https://i.pinimg.com/736x/2a/9d/8a/2a9d8a98717becac0ee3c330cf655c11.jpg",
    images: [
      "https://i.pinimg.com/736x/2a/9d/8a/2a9d8a98717becac0ee3c330cf655c11.jpg",
      "https://i.pinimg.com/736x/2a/9d/8a/2a9d8a98717becac0ee3c330cf655c11.jpg",
      "https://i.pinimg.com/736x/2a/9d/8a/2a9d8a98717becac0ee3c330cf655c11.jpg",
      "https://i.pinimg.com/736x/2a/9d/8a/2a9d8a98717becac0ee3c330cf655c11.jpg",
    ],
    seller: {
      name: "Peter Parker",
      phone: "9864188492",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    },
  },
  {
    id: 4,
    title: "Land for Sale in Bhaktapur",
    description:
      "This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description.",
    price: 11000000,
    location: "Suryabinayak, Bhaktapur",
    area: 5,
    bedrooms: null,
    bathrooms: null,
    type: "Land",
    thumbnail:
      "https://i.pinimg.com/736x/b7/9a/91/b79a91448bd6221ab4700d4652078b90.jpg",
    images: [
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
    ],
    seller: {
      name: "Peter Parker",
      phone: "9864188492",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    },
  },
  {
    id: 5,
    title: "Luxury Villa with Pool in Kathmandu",
    description:
      "This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description.",
    price: 55000000,
    location: "Budhanilkantha, Kathmandu",
    area: 3500,
    bedrooms: 5,
    bathrooms: 4,
    type: "Villa",
    thumbnail:
      "https://i.pinimg.com/736x/31/59/76/315976c93bfabb16d65f65449dc9e0b9.jpg",
    images: [
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
    ],
    seller: {
      name: "Peter Parker",
      phone: "9864188492",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    },
  },
  {
    id: 6,
    title: "Cozy Studio Apartment in Patan",
    description:
      "This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description.",
    price: 4000000,
    location: "Kumaripati, Lalitpur",
    area: 600,
    bedrooms: 1,
    bathrooms: 1,
    type: "Apartment",
    thumbnail:
      "https://i.pinimg.com/736x/4e/80/5b/4e805b88becf1746623423dbb7fbe2f9.jpg",
    images: [
      "https://i.pinimg.com/736x/5b/61/de/5b61de9d8d3d6e1ed56a368571c2bd5a.jpg",
      "https://i.pinimg.com/736x/5b/61/de/5b61de9d8d3d6e1ed56a368571c2bd5a.jpg",
      "https://i.pinimg.com/736x/5b/61/de/5b61de9d8d3d6e1ed56a368571c2bd5a.jpg",
      "https://i.pinimg.com/736x/5b/61/de/5b61de9d8d3d6e1ed56a368571c2bd5a.jpg",
    ],
    seller: {
      name: "Peter Parker",
      phone: "9864188492",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    },
  },
  {
    id: 7,
    title: "Commercial Space for Rent in Kathmandu",
    description:
      "This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description.",
    price: 150000,
    location: "Thamel, Kathmandu",
    area: 2500,
    bedrooms: null,
    bathrooms: 2,
    type: "Commercial Space",
    thumbnail:
      "https://i.pinimg.com/736x/7d/d4/e6/7dd4e65f1d0b449c895d59a5993d2466.jpg",
    images: [
      "https://i.pinimg.com/736x/7d/d4/e6/7dd4e65f1d0b449c895d59a5993d2466.jpg",
      "https://i.pinimg.com/736x/7d/d4/e6/7dd4e65f1d0b449c895d59a5993d2466.jpg",
      "https://i.pinimg.com/736x/7d/d4/e6/7dd4e65f1d0b449c895d59a5993d2466.jpg",
      "https://i.pinimg.com/736x/7d/d4/e6/7dd4e65f1d0b449c895d59a5993d2466.jpg",
    ],
    seller: {
      name: "Peter Parker",
      phone: "9864188492",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    },
  },
  {
    id: 8,
    title: "Peaceful Cottage in Dhulikhel",
    description:
      "This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description.",
    price: 10000000,
    location: "Dhulikhel, Kavre",
    area: 1800,
    bedrooms: 3,
    bathrooms: 2,
    type: "Cottage",
    thumbnail:
      "https://i.pinimg.com/736x/5b/61/de/5b61de9d8d3d6e1ed56a368571c2bd5a.jpg",
    images: [
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
    ],
    seller: {
      name: "Peter Parker",
      phone: "9864188492",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    },
  },
  {
    id: 9,
    title: "Spacious 3-BHK Apartment in Kathmandu",
    description:
      "This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description.",
    price: 12000000,
    location: "Baneshwor, Kathmandu",
    area: 1500,
    bedrooms: 3,
    bathrooms: 2,
    type: "Apartment",
    thumbnail:
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
    images: [
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
    ],
    seller: {
      name: "Peter Parker",
      phone: "9864188492",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    },
  },
  {
    id: 10,
    title: "Modern House for Sale in Pokhara",
    price: 25000000,
    location: "Lakeside, Pokhara",
    area: 2000,
    bedrooms: 4,
    description:
      "This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description.",
    bathrooms: 3,
    type: "House",
    thumbnail:
      "https://i.pinimg.com/736x/d4/27/92/d427921f347d3aac0f31f1cc8a746c11.jpg",
    images: [
      "https://i.pinimg.com/736x/d4/27/92/d427921f347d3aac0f31f1cc8a746c11.jpg",
      "https://i.pinimg.com/736x/2a/9d/8a/2a9d8a98717becac0ee3c330cf655c11.jpg",
      "https://i.pinimg.com/736x/b7/9a/91/b79a91448bd6221ab4700d4652078b90.jpg",
      "https://i.pinimg.com/736x/31/59/76/315976c93bfabb16d65f65449dc9e0b9.jpg",
      "https://i.pinimg.com/736x/4e/80/5b/4e805b88becf1746623423dbb7fbe2f9.jpg",
      "https://i.pinimg.com/736x/7d/d4/e6/7dd4e65f1d0b449c895d59a5993d2466.jpg",
      "https://i.pinimg.com/736x/5b/61/de/5b61de9d8d3d6e1ed56a368571c2bd5a.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
    ],
    seller: {
      name: "Peter Parker",
      phone: "9864188492",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    },
  },
  {
    id: 11,
    title: "Affordable 2-BHK Flat in Lalitpur",
    description:
      "This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description.",
    price: 8000000,
    location: "Patan, Lalitpur",
    area: 1200,
    bedrooms: 2,
    bathrooms: 1,
    type: "Flat",
    thumbnail:
      "https://i.pinimg.com/736x/2a/9d/8a/2a9d8a98717becac0ee3c330cf655c11.jpg",
    images: [
      "https://i.pinimg.com/736x/2a/9d/8a/2a9d8a98717becac0ee3c330cf655c11.jpg",
      "https://i.pinimg.com/736x/2a/9d/8a/2a9d8a98717becac0ee3c330cf655c11.jpg",
      "https://i.pinimg.com/736x/2a/9d/8a/2a9d8a98717becac0ee3c330cf655c11.jpg",
      "https://i.pinimg.com/736x/2a/9d/8a/2a9d8a98717becac0ee3c330cf655c11.jpg",
    ],
    seller: {
      name: "Peter Parker",
      phone: "9864188492",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    },
  },
  {
    id: 12,
    title: "Land for Sale in Bhaktapur",
    description:
      "This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description.",
    price: 11000000,
    location: "Suryabinayak, Bhaktapur",
    area: 5,
    bedrooms: null,
    bathrooms: null,
    type: "Land",
    thumbnail:
      "https://i.pinimg.com/736x/b7/9a/91/b79a91448bd6221ab4700d4652078b90.jpg",
    images: [
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
    ],
    seller: {
      name: "Peter Parker",
      phone: "9864188492",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    },
  },
  {
    id: 13,
    title: "Luxury Villa with Pool in Kathmandu",
    description:
      "This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description.",
    price: 55000000,
    location: "Budhanilkantha, Kathmandu",
    area: 3500,
    bedrooms: 5,
    bathrooms: 4,
    type: "Villa",
    thumbnail:
      "https://i.pinimg.com/736x/31/59/76/315976c93bfabb16d65f65449dc9e0b9.jpg",
    images: [
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
    ],
    seller: {
      name: "Peter Parker",
      phone: "9864188492",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    },
  },
  {
    id: 14,
    title: "Cozy Studio Apartment in Patan",
    description:
      "This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description.",
    price: 4000000,
    location: "Kumaripati, Lalitpur",
    area: 600,
    bedrooms: 1,
    bathrooms: 1,
    type: "Apartment",
    thumbnail:
      "https://i.pinimg.com/736x/4e/80/5b/4e805b88becf1746623423dbb7fbe2f9.jpg",
    images: [
      "https://i.pinimg.com/736x/5b/61/de/5b61de9d8d3d6e1ed56a368571c2bd5a.jpg",
      "https://i.pinimg.com/736x/5b/61/de/5b61de9d8d3d6e1ed56a368571c2bd5a.jpg",
      "https://i.pinimg.com/736x/5b/61/de/5b61de9d8d3d6e1ed56a368571c2bd5a.jpg",
      "https://i.pinimg.com/736x/5b/61/de/5b61de9d8d3d6e1ed56a368571c2bd5a.jpg",
    ],
    seller: {
      name: "Peter Parker",
      phone: "9864188492",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    },
  },
  {
    id: 15,
    title: "Commercial Space for Rent in Kathmandu",
    description:
      "This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description.",
    price: 150000,
    location: "Thamel, Kathmandu",
    area: 2500,
    bedrooms: null,
    bathrooms: 2,
    type: "Commercial Space",
    thumbnail:
      "https://i.pinimg.com/736x/7d/d4/e6/7dd4e65f1d0b449c895d59a5993d2466.jpg",
    images: [
      "https://i.pinimg.com/736x/7d/d4/e6/7dd4e65f1d0b449c895d59a5993d2466.jpg",
      "https://i.pinimg.com/736x/7d/d4/e6/7dd4e65f1d0b449c895d59a5993d2466.jpg",
      "https://i.pinimg.com/736x/7d/d4/e6/7dd4e65f1d0b449c895d59a5993d2466.jpg",
      "https://i.pinimg.com/736x/7d/d4/e6/7dd4e65f1d0b449c895d59a5993d2466.jpg",
    ],
    seller: {
      name: "Peter Parker",
      phone: "9864188492",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    },
  },
  {
    id: 16,
    title: "Peaceful Cottage in Dhulikhel",
    description:
      "This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description. This a very long description.",
    price: 10000000,
    location: "Dhulikhel, Kavre",
    area: 1800,
    bedrooms: 3,
    bathrooms: 2,
    type: "Cottage",
    thumbnail:
      "https://i.pinimg.com/736x/5b/61/de/5b61de9d8d3d6e1ed56a368571c2bd5a.jpg",
    images: [
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
      "https://i.pinimg.com/736x/aa/cc/aa/aaccaa5d2646f9c648811716ab16f747.jpg",
    ],
    seller: {
      name: "Peter Parker",
      phone: "9864188492",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    },
  },
];

export default listings;
