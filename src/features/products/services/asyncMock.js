const products = [
  {
    id: '1',
    name: 'Captain Rex Helmet',
    price: 899,
    originalPrice: 999,
    isNew: true,
    isOnSale: true,
    rating: 4.8,
    category: 'helmet',
    type: 'Sets',
    age: '18+',
    theme: 'Star Wars',
    interests: ['Arte', 'Robots'],
    pieces: '501-1000',
    highlight: 'Edición Limitada',
    img: 'https://www.lego.com/cdn/cs/set/assets/bltde62e4576a817dd4/75349.png',
    imageSecondary: 'https://www.lego.com/cdn/cs/set/assets/bltd9dfc1fa25e3b4e8/75349-alt.png',
    images: [
      'https://www.lego.com/cdn/cs/set/assets/bltde62e4576a817dd4/75349.png',
      'https://www.lego.com/cdn/cs/set/assets/bltd9dfc1fa25e3b4e8/75349-alt.png',
    ],
    stock: 10,
    shortDescription: 'Edición limitada para coleccionistas.',
    description: 'Star Wars Captain Rex helmet para fanáticos de la saga. Detalles premium con base para exhibir.',
  },
  {
    id: '2',
    name: 'Princess Leia Helmet',
    price: 649,
    isNew: false,
    isOnSale: false,
    rating: 4.5,
    category: 'helmet',
    type: 'Sets',
    age: '18+',
    theme: 'Star Wars',
    interests: ['Arte'],
    pieces: '501-1000',
    highlight: 'Destacados',
    img: 'https://www.lego.com/cdn/cs/set/assets/blt32953937b372413f/75351.png',
    images: [
      'https://www.lego.com/cdn/cs/set/assets/blt32953937b372413f/75351.png',
    ],
    stock: 10,
    shortDescription: 'Helmet de la icónica Princesa Leia.',
    description: 'Replica en LEGO del casco de la Princesa Leia. Ideal para fans de la trilogía original.',
  },
  {
    id: '3',
    name: 'Clone Commander Cody Helmet',
    price: 649,
    isNew: true,
    isOnSale: false,
    rating: 4.9,
    category: 'helmet',
    type: 'Sets',
    age: '18+',
    theme: 'Star Wars',
    interests: ['Robots'],
    pieces: '501-1000',
    highlight: 'Edición Limitada',
    img: 'https://www.lego.com/cdn/cs/set/assets/blt047686711ed3cb43/75350.png',
    images: [
      'https://www.lego.com/cdn/cs/set/assets/blt047686711ed3cb43/75350.png',
      'https://www.lego.com/cdn/cs/set/assets/blt5ea22f9c23e3b1ef/75350-alt.png',
    ],
    stock: 20,
    shortDescription: 'Helmet del Comandante Cody.',
    description: 'Construcción detallada del casco del comandante Cody. Perfecto para los amantes de Clone Wars.',
  },
  {
    id: '4',
    name: 'The Mandalorian',
    price: 649,
    isNew: false,
    isOnSale: true,
    originalPrice: 749,
    rating: 4.7,
    category: 'helmet',
    type: 'Sets',
    age: '18+',
    theme: 'Star Wars',
    interests: ['Arte'],
    pieces: '501-1000',
    highlight: 'Destacados',
    img: 'https://www.lego.com/cdn/cs/set/assets/blta6da339d766e9905/75328.png',
    images: [
      'https://www.lego.com/cdn/cs/set/assets/blta6da339d766e9905/75328.png',
      'https://www.lego.com/cdn/cs/set/assets/bltcdaa26a08e012537/75328-alt.png',
    ],
    stock: 20,
    shortDescription: 'Helmet de The Mandalorian.',
    description: 'Replica en LEGO del casco del Mandaloriano. Diseño elegante y robusto para exposición.',
  },
  {
    id: '5',
    name: 'Tusken Raider',
    price: 189,
    isNew: false,
    isOnSale: false,
    rating: 4.2,
    category: 'helmet',
    type: 'Sets',
    age: '12+',
    theme: 'Star Wars',
    interests: ['Arte'],
    pieces: '0-500',
    highlight: 'Exclusivos',
    img: 'https://www.lego.com/cdn/cs/set/assets/blt680e77b1a610f01f/40615.png',
    images: [
      'https://www.lego.com/cdn/cs/set/assets/blt680e77b1a610f01f/40615.png',
    ],
    stock: 8,
    shortDescription: 'Helmet de los Raiders de Tatooine.',
    description: 'Set LEGO del mítico Tusken Raider. Ideal para completar la colección Star Wars.',
  },
  {
    id: '6',
    name: 'Battle of Endor Heroes',
    price: 349,
    isNew: true,
    isOnSale: false,
    rating: 4.6,
    category: 'brickheadz',
    type: 'Decoración del hogar',
    age: '12+',
    theme: 'Star Wars',
    interests: ['Edificios', 'Arte'],
    pieces: '0-500',
    highlight: 'Destacados',
    img: 'https://www.lego.com/cdn/cs/set/assets/bltc971a95594361e17/40624.png',
    images: [
      'https://www.lego.com/cdn/cs/set/assets/bltc971a95594361e17/40624.png',
      'https://www.lego.com/cdn/cs/set/assets/bltb8b53c6b6f4c364f/40624-alt.png',
    ],
    stock: 20,
    shortDescription: 'Pack Brickheadz Battle of Endor.',
    description: 'Incluye personajes clave de la batalla de Endor en formato Brickheadz. Para fans de la saga.',
  },
  {
    id: '7',
    name: 'Batmobile',
    price: 2490,
    isNew: false,
    isOnSale: true,
    originalPrice: 2790,
    rating: 5.0,
    category: 'cars',
    type: 'Sets',
    age: '18+',
    theme: 'Marvel',
    interests: ['Vehículos'],
    pieces: '1001-2000',
    highlight: 'Exclusivos',
    img: 'https://www.lego.com/cdn/cs/set/assets/blt38e8915698af2d5f/75308.jpg',
    images: [
      'https://www.lego.com/cdn/cs/set/assets/blt38e8915698af2d5f/75308.jpg',
      'https://www.lego.com/cdn/cs/set/assets/bltf5a58e645e0f7ca4/75308-alt.png',
    ],
    stock: 40,
    shortDescription: 'Iconico Batmobile en LEGO.',
    description: 'Recreación del Batmobile con piezas LEGO. Detalle premium y tamaño impresionante.',
  },
  {
    id: '8',
    name: 'Zombie Brickheadz',
    price: 100,
    isNew: false,
    isOnSale: false,
    rating: 3.8,
    category: 'brickheadz',
    type: 'Decoración del hogar',
    age: '12+',
    theme: 'Harry Potter',
    interests: ['Arte'],
    pieces: '0-500',
    highlight: 'Destacados',
    img: 'https://www.lego.com/cdn/cs/set/assets/blt6ca0aa8d223ed976/40623.png',
    images: [
      'https://www.lego.com/cdn/cs/set/assets/blt6ca0aa8d223ed976/40623.png',
    ],
    stock: 10,
    shortDescription: 'Zombie para los amantes de lo retro.',
    description: 'Brickheadz con temática de Zombie. Perfecto para Halloween o colecciones originales.',
  },
  {
    id: '9',
    name: 'Donald Duck Brickheadz',
    price: 100,
    isNew: false,
    isOnSale: false,
    rating: 4.4,
    category: 'brickheadz',
    type: 'Decoración del hogar',
    age: '12+',
    theme: 'Disney',
    interests: ['Arte'],
    pieces: '0-500',
    highlight: 'Destacados',
    img: 'https://www.lego.com/cdn/cs/set/assets/blt959c93653cb028e3/75335.png',
    images: [
      'https://www.lego.com/cdn/cs/set/assets/blt959c93653cb028e3/75335.png',
      'https://www.lego.com/cdn/cs/set/assets/blt1e0f326504db812a/75335-alt.png',
    ],
    stock: 20,
    shortDescription: 'Donald Duck en formato Brickheadz.',
    description: 'Figura de Donald Duck construible en Brickheadz. Ideal para fans de Disney y LEGO.',
  },
  {
    id: '10',
    name: 'Batcueva: Caja Sombria',
    price: 100,
    isNew: false,
    isOnSale: false,
    rating: 4.4,
    category: 'brickheadz',
    type: 'Decoración del hogar',
    age: '16+',
    theme: 'Marvel',
    interests: ['Edificios'],
    pieces: '501-1000',
    highlight: 'Exclusivos',
    img: 'https://www.lego.com/cdn/cs/set/assets/blt9f21e832451161ac/76252.png?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1',
    images: [
      'https://www.lego.com/cdn/cs/set/assets/blt9dfc4654ef57c4b6/76252_alt1.png?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1',
      'https://www.lego.com/cdn/cs/set/assets/bltd8ecdf328cc17732/76252_alt3.png?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1',
    ],
    stock: 20,
    shortDescription: 'Batcueva en caja sombreada.',
    description: 'Replica premium de la Batcueva para exposición.',
  },
];

export const FILTER_CONFIG = [
  { label: "Tipo de Producto", key: "type", options: ["Sets", "Decoración del hogar"] },
  { label: "Edad", key: "age", options: ["12+", "16+", "18+"] },
  {
    label: "Tema",
    key: "theme",
    options: [
      "Architecture",
      "Star Wars",
      "Technic",
      "Friends",
      "Harry Potter",
      "Marvel",
      "Super Mario",
      "Disney",
    ],
  },
  {
    label: "Intereses",
    key: "interests",
    options: ["Edificios", "Vehículos", "Arte", "Robots", "Deportes"],
  },
  { label: "Número de Piezas", key: "pieces", options: ["0-500", "501-1000", "1001-2000", "2001+"] },
  { label: "Destacados", key: "highlight", options: ["Exclusivos", "Destacados", "Edición Limitada"] },
];

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
};

export const getProductById = (productId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find((prod) => prod.id === productId));
    }, 500);
  });
};

export const getProductsByCategory = (category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.filter((prod) => prod.category === category));
    }, 500);
  });
};

export const getProductsByFilters = (filters) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = products.filter((product) => {
        const matchesType =
          !filters.type?.length || filters.type.includes(product.type);

        const matchesAge =
          !filters.age?.length || filters.age.includes(product.age);

        const matchesTheme =
          !filters.theme?.length || filters.theme.includes(product.theme);

        const matchesInterests =
          !filters.interests?.length ||
          filters.interests.some((interest) =>
            product.interests.includes(interest)
          );

        const matchesPieces =
          !filters.pieces?.length || filters.pieces.includes(product.pieces);

        const matchesHighlight =
          !filters.highlight?.length ||
          filters.highlight.includes(product.highlight);

        return (
          matchesType &&
          matchesAge &&
          matchesTheme &&
          matchesInterests &&
          matchesPieces &&
          matchesHighlight
        );
      });

      resolve(filteredProducts);
    }, 500);
  });
};

export const getTotalProductsByFilterKey = (key, productsArray) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const counts = {};

      productsArray.forEach((product) => {
        const value = product[key];

        if (Array.isArray(value)) {
          value.forEach((item) => {
            counts[item] = (counts[item] || 0) + 1;
          });
        } else {
          counts[value] = (counts[value] || 0) + 1;
        }
      });

      resolve(counts);
    }, 300);
  });
};

export const getProductsByFiltersExceptKey = (filters, exceptKey, allProducts) => {
    return allProducts.filter((prod) => {
        return Object.entries(filters).every(([key, values]) => {
            if (key === exceptKey || values.length === 0) return true;

            switch (key) {
                case "type":
                    return values.includes(prod.type);
                case "age":
                    return values.includes(prod.age);
                case "theme":
                    return values.includes(prod.theme);
                case "interests":
                    return values.some((interest) => prod.interests.includes(interest));
                case "pieces":
                    return values.includes(prod.pieces);
                case "highlight":
                    return values.includes(prod.highlight);
                default:
                    return true;
            }
        });
    });
};