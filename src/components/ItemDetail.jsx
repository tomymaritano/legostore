import ItemCount from "./ItemCount";

const ItemDetail = ({id, name, img, category, description, price, stock}) => {
    return (
        <article id="test">
            <header>
                <h2>{name}</h2>
            </header>
            <picture>
                <img src={img} alt={name} />
            </picture>
            <section>
                <p>Precio: ${price}</p>
                <p>Category: {category}</p>
                <p>Description: {description}</p>
                <p>Stock: {stock}</p>
            </section>
            <footer>
                <ItemCount initial={1} stock={stock} onAdd={(quantity) => console.log('Cantidad Agregada', quantity)} />
            </footer>
        </article>
    )
}

export default ItemDetail;