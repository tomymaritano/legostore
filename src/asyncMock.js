const products = [
    {
        id: '1',
        name: 'Captain Rex Helmet',
        price: 899,
        category: 'Helmet',
        img: 'https://www.lego.com/cdn/cs/set/assets/bltde62e4576a817dd4/75349.png?fit=bounds&format=webply&quality=80&width=320&height=320&dpr=1',
        stock: 10,
        description: 'Starwars helmet.',
    },
    {
        id: '2',
        name: 'Princess leia Helmet',
        price: 649,
        category: 'Helmet',
        img: 'https://www.lego.com/cdn/cs/set/assets/blt32953937b372413f/75351.png?fit=bounds&format=webply&quality=80&width=320&height=320&dpr=1',
        stock: 10,
        description: 'This isnt the first book on Java application architecture. No doubt it wont be the last. But rest assured, this title is different. The way we develop Java applications is about to change, and this title explores the new way of Java application architecture.',
    },
    {
        id: '3',
        name: 'Clone Commander Cody Helmet',
        price: 649,
        category: 'Helmet',
        img: 'https://www.lego.com/cdn/cs/set/assets/blt047686711ed3cb43/75350.png?fit=bounds&format=webply&quality=80&width=320&height=320&dpr=1',
        stock: 20,
        description: 'This isnt the first book on Java application architecture. No doubt it wont be the last. But rest assured, this title is different. The way we develop Java applications is about to change, and this title explores the new way of Java application architecture.',
    },
    {
        id: '4',
        name: 'The mandalorian',
        price: 649,
        category: 'Helmet',
        img: 'https://www.lego.com/cdn/cs/set/assets/blta6da339d766e9905/75328.png?fit=bounds&format=webply&quality=80&width=320&height=320&dpr=1',
        stock: 20,
        description: 'This isnt the first book on Java application architecture. No doubt it wont be the last. But rest assured, this title is different. The way we develop Java applications is about to change, and this title explores the new way of Java application architecture.',
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
