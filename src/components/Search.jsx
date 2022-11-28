import { useState } from 'react';

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchDone, setSearchDone] = useState(false);

  //padaryti kad veiktu isSearchValueEmpty

  let isSearchValueEmpty = !searchValue.length;
  console.log('isSearchValueEmpty ===', isSearchValueEmpty);

  function inputHandler(event) {
    //one way binding
    const enteredValue = event.target.value.trim();
    // if (enteredValue === '') return;
    setSearchValue(enteredValue);

    setSearchDone(false);
  }

  //   let completeSearch = '';
  const [completeSearch, setcompleteSearch] = useState('');

  function searchHandler() {
    // when user pressed search
    // siusti paieskos objekta, {term: <paieskos reiksme>}
    let searchObj = { term: searchValue };
    console.log('searchObj ===', searchObj);
    // isvalyti paieskos lauka
    setSearchValue('');
    // atvaizduoti ko ieskojome
    setSearchDone(true);
    setcompleteSearch(searchObj.term);
  }

  //   console.log('searchValue ===', searchValue);
  return (
    <fieldset>
      <legend>Search</legend>
      {/** //two way binding */}
      <input onChange={inputHandler} type='search' value={searchValue} />
      <button onClick={searchHandler}>Search</button>
      {/** rodyti priklausomai nuo isSearchValueEmpty ir ideji i ko ieskojau */}
      {!isSearchValueEmpty && <h3>You have entered: {searchValue}</h3>}
      {searchDone && isSearchValueEmpty && (
        <h3>Your search is done {completeSearch}</h3>
      )}
    </fieldset>
  );
}
export default Search;
