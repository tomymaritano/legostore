const Item = ({id, name, img, price, stock}) => {
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
                <p>Stock: {stock}</p>
            </section>
            <footer>
                <button>+INFo</button>
            </footer>
        </article>
    )
}

export default Item;