const products = [
    {
        id: '1',
        name: 'Java Application Architecture',
        price: 45,
        category: 'books',
        img: 'https://m.media-amazon.com/images/I/41-SVegmf9L._SX198_BO1,204,203,200_QL40_ML2_.jpg',
        stock: 20,
        description: 'This isnt the first book on Java application architecture. No doubt it wont be the last. But rest assured, this title is different. The way we develop Java applications is about to change, and this title explores the new way of Java application architecture.',
    },
    {
        id: '2',
        name: 'Clean Code',
        price: 42,
        category: 'books',
        img: 'https://m.media-amazon.com/images/I/41xShlnTZTL._SX198_BO1,204,203,200_QL40_ML2_.jpg',
        stock: 10,
        description: 'This isnt the first book on Java application architecture. No doubt it wont be the last. But rest assured, this title is different. The way we develop Java applications is about to change, and this title explores the new way of Java application architecture.',
    },
    {
        id: '3',
        name: 'The ultimate Kali Linux Book',
        price: 25,
        category: 'books',
        img: 'https://m.media-amazon.com/images/I/51wsppur6tL._SX198_BO1,204,203,200_QL40_ML2_.jpg',
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
