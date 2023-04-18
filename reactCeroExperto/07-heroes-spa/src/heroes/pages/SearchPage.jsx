import { useForm } from "../../hooks/useForm"
import queryString from 'query-string'
import { HeroCard } from "../components"
import { useNavigate,useLocation } from "react-router-dom"
import { getHeroesByName } from "../helpers"

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const {q=''} = queryString.parse(location.search)

  const heroes = getHeroesByName(q);

  const showSearch = (q.length === 0)
  const showError = (q.length > 0 && heroes.length === 0)

  const {searchText,onInputChange} = useForm(
  {
    searchText:q
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    // if(searchText.trim().length <= 1) return;
    navigate(`?q=${searchText.toLowerCase().trim()}`)
  }

  return (
    <>
      <h1>Search</h1>
      <hr/>
      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr/>
          <form onSubmit={onSearchSubmit} aria-label="form">
            <input 
              type="text"
              placeholder="Search a hero"
              className = "form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primarty mt-1">

            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr/>
          <div className="animate__animated animate__fadeIn alert alert-primary" style={{display:showSearch ? '' : 'none'}}> Search a hero </div>

          <div aria-label="alert-danger" className="animate__animated animate__fadeIn alert alert-danger" style={{display: showError ? '' : 'none'}}> Not hero with <b>{q}</b> </div>

          {
            heroes.map(hero => (
              <HeroCard key={hero.id} {...hero}/>
             )
            )
          }
        </div>
      </div>
      
    </>
  )
}
