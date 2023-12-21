import AddNew from './AddNew/AddNew'
import Filter from './Filter/Filter'
import './Header.css'
import Search from './Search/Search'

function Header() {

  return (
    <header className='header'>
      <div className="header-l">
      <Filter></Filter>
      <Search></Search>
      </div>
      <AddNew></AddNew>
    </header>
  )
}

export default Header