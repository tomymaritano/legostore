const products = [
    {
        id: '1',
        name: 'Captain Rex Helmet',
        price: 899,
        category: 'helmet',
        img: 'https://www.lego.com/cdn/cs/set/assets/bltde62e4576a817dd4/75349.png?fit=bounds&format=webp&quality=80&width=320&height=320&dpr=1',
        stock: 10,
        description: 'Starwars helmet.',
    },
    {
        id: '2',
        name: 'Princess leia Helmet',
        price: 649,
        category: 'helmet',
        img: 'https://www.lego.com/cdn/cs/set/assets/blt32953937b372413f/75351.png?fit=bounds&format=webp&quality=80&width=320&height=320&dpr=1',
        stock: 10,
        description: 'Write description.',
    },
    {
        id: '3',
        name: 'Clone Commander Cody Helmet',
        price: 649,
        category: 'helmet',
        img: 'https://www.lego.com/cdn/cs/set/assets/blt047686711ed3cb43/75350.png?fit=bounds&format=webp&quality=80&width=320&height=320&dpr=1',
        stock: 20,
        description: 'Write description.',
    },
    {
        id: '4',
        name: 'The mandalorian',
        price: 649,
        category: 'helmet',
        img: 'https://www.lego.com/cdn/cs/set/assets/blta6da339d766e9905/75328.png?fit=bounds&format=webp&quality=80&width=320&height=320&dpr=1',
        stock: 20,
        description: 'Write description.',
    },
    {
        id: '5',
        name: 'Captain Rex Helmet',
        price: 899,
        category: 'helmet',
        img: 'https://www.lego.com/cdn/cs/set/assets/bltde62e4576a817dd4/75349.png?fit=bounds&format=webp&quality=80&width=320&height=320&dpr=1',
        stock: 10,
        description: 'Starwars helmet.',
    },
    {
        id: '6',
        name: 'Tuskan Rider',
        price: 189,
        category: 'helmet',
        img: 'https://www.lego.com/cdn/cs/set/assets/blt680e77b1a610f01f/40615.png?fit=bounds&format=webp&quality=80&width=320&height=320&dpr=1',
        stock: 8,
        description: 'Write description',
    },
    {
        id: '7',
        name: 'Battle of Endor Heroes',
        price: 349,
        category: 'brickheadz',
        img: 'https://www.lego.com/cdn/cs/set/assets/bltc971a95594361e17/40624.png?format=webp&fit=bounds&quality=100&width=320&height=320&dpr=1',
        stock: 20,
        description: 'Write description',
    },
    {
        id: '8',
        name: 'BatMobile',
        price: 2490,
        category: 'cars',
        img: 'https://www.lego.com/cdn/cs/set/assets/blt38e8915698af2d5f/75308.jpg?fit=bounds&format=webp&quality=80&width=320&height=320&dpr=1',
        stock: 40,
        description: 'Write description',
    },
    {
        id: '9',
        name: 'Zombie',
        price: 100,
        category: 'brickheadz',
        img: 'https://www.lego.com/cdn/cs/set/assets/blt6ca0aa8d223ed976/40623.png?fit=bounds&format=webp&quality=80&width=320&height=320&dpr=1',
        stock: 10,
        description: 'Write description',
    },
    {
        id: '10',
        name: 'Donald Duck',
        price: 100,
        category: 'brickheadz',
        img: 'https://www.lego.com/cdn/cs/set/assets/blt959c93653cb028e3/75335.png?fit=bounds&format=webp&quality=80&width=320&height=320&dpr=1',
        stock: 20,
        description: 'Write description',
    },
];

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(products)
        }, 500)
    })
}

export const getProductById = (productId) => {
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(products.find(prod => prod.id === productId))
        }, 500)
    })
}

export const getProductsByCategory = (category) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve( products.filter(prod => prod.category === category));
        }, 500);
    });
};
