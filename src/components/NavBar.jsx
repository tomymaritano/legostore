import CartWidget from "./CartWidget";
import ItemListContainer from "./ItemListContainer";

const NavBar = () => {
    return (
        <nav>
            <h3>Ecommerce</h3>
                <div>
                    <button>Home</button>
                    <button>Shop</button>
                    <button>Contact</button>
                </div>
                <CartWidget />
                <ItemListContainer greeting="Welcome"/>
        </nav>
   )
}

export default NavBar;