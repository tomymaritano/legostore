import './App.css';
import NavBar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';


function App() {
  return (
    <div>
      <NavBar />
      <ItemListContainer greeting={'WElcome'} />
      <ItemDetailContainer />
    </div>

  );
}

export default App;
