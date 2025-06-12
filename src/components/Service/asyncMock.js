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
        img: 'https://www.lego.com/cdn/cs/set/assets/bltde62e4576a817dd4/75349.png?fit=bounds&format=webp&quality=80&width=320&height=320&dpr=1',
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
        img: 'https://www.lego.com/cdn/cs/set/assets/blt32953937b372413f/75351.png?fit=bounds&format=webp&quality=80&width=320&height=320&dpr=1',
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
        img: 'https://www.lego.com/cdn/cs/set/assets/blt047686711ed3cb43/75350.png?fit=bounds&format=webp&quality=80&width=320&height=320&dpr=1',
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
        img: 'https://www.lego.com/cdn/cs/set/assets/blta6da339d766e9905/75328.png?fit=bounds&format=webp&quality=80&width=320&height=320&dpr=1',
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
        img: 'https://www.lego.com/cdn/cs/set/assets/blt680e77b1a610f01f/40615.png?fit=bounds&format=webp&quality=80&width=320&height=320&dpr=1',
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
        img: 'https://www.lego.com/cdn/cs/set/assets/bltc971a95594361e17/40624.png?format=webp&fit=bounds&quality=100&width=320&height=320&dpr=1',
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
        img: 'https://www.lego.com/cdn/cs/set/assets/blt38e8915698af2d5f/75308.jpg?fit=bounds&format=webp&quality=80&width=320&height=320&dpr=1',
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
        img: 'https://www.lego.com/cdn/cs/set/assets/blt6ca0aa8d223ed976/40623.png?fit=bounds&format=webp&quality=80&width=320&height=320&dpr=1',
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
        img: 'https://www.lego.com/cdn/cs/set/assets/blt959c93653cb028e3/75335.png?fit=bounds&format=webp&quality=80&width=320&height=320&dpr=1',
        stock: 20,
        shortDescription: 'Donald Duck en formato Brickheadz.',
        description: 'Figura de Donald Duck construible en Brickheadz. Ideal para fans de Disney y LEGO.',
    },
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
            resolve(products.find(prod => prod.id === productId));
        }, 500);
    });
};

export const getProductsByCategory = (category) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.category === category));
        }, 500);
    });
};