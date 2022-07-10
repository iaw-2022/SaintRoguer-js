import { Footer, Header, Catalogue, Imdb } from './containers';
import { Navbar } from './components';
import './App.css';

function App() {
  return (
    <div className='App'>
      <div className='gradient__bg'>
        <Navbar />
        <Header />
      </div>
      <Catalogue />
      <Imdb />
      <Footer />
    </div>
  );
}

export default App;
