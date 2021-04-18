import React, { useState } from "react";

import List from "./components/List";
import listMovies from './movies.json';
import './App.css';

function App(){
    const [favItems, setFavItems] = useState(() =>[]);
    const [searchTerm, setSearchTerm] = useState(() => "");
    const [searchResults, setSearchResults] = useState(() => []);

    function handleItemClick(item){
        const newItems = [... favItems];
        const newItem = {... item};
        const targetInd = newItems.findIndex(it => it.id ===newItem.id);

        if(targetInd<0) newItems.push(newItem);
        else newItems.splice(targetInd,1);

        setFavItems(newItems);
    }

    const handleSearchResult = event => {
      setSearchTerm(event.target.value);
    };

    React.useEffect(() => {
      const results = listMovies.filter(movie =>
        movie.judul.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(searchTerm);
      console.log(results);
      setSearchResults(results);
    }, [searchTerm]);

    return(
        <div className="container-fluid">
        <h2 className="text-center mt-3 mb-0">Favorites Movie App</h2>
        <p className="text-center text-secondary text-sm font-italic">
          (Meldi's <strong>OVO Assignment</strong> application)
        </p>
        <div className="container pt-3">
        <input
              type="text"
              placeholder="Search movies"
              value={searchTerm}
              onChange={handleSearchResult}
          />
          <div className="row">
            <div className="col-sm">
              <List
                title="List Movies"
                items={searchResults}
                onItemClick={handleItemClick}
              />
            </div>
            <div className="col-sm">
              <List
                title="My Favorites"
                items={favItems}
                onItemClick={handleItemClick}
              />
            </div>
          </div>
        </div>
      </div>

    );
}

export default App;