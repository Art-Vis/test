import { useEffect, useState } from 'react'
import './Table.css'
import axios from 'axios';

const Table = () => {

  const [apiData, setApiData] = useState([]);
  const [sortTable, setSortTable] = useState<'asc' | 'desc'>('asc');
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  

  const itemsPerPage = 20;

  interface ItemType {
    id: number;
    name: string;
    location: {name:string};
    status: string;
    species: string;
    gender: string;
    image: string
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
        setApiData(response.data.results);
      } catch (error) {
        console.log('error: ', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleSort = (column: string) => {
    const isAsc = sortedColumn === column && sortTable === 'asc';
    const newSortTable = isAsc ? 'desc' : 'asc';

    setSortedColumn(column);
    setSortTable(newSortTable);

    const sortedData = [...apiData].sort((a, b) => {
      const valueA = String(a[column]);
      const valueB = String(b[column]);

      const numA = typeof valueA === 'number' ? valueA : parseFloat(valueA);
      const numB = typeof valueB === 'number' ? valueB : parseFloat(valueB);

      if (typeof valueA === 'string' && typeof valueB === 'string') {

        if (isAsc) {
          return valueA.localeCompare(valueB)
        } else {
          return valueB.localeCompare(valueA)
        }

      } else {
        if (isAsc) {
          return numA - numB;
        } else {
          return numB - numA;
        }
      }
    });

    setApiData(sortedData);
  }

  const totalPages = Math.ceil(826 / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };


  return (
    <div>
      <table className="table">
        <thead className='table__thead'>
          <tr className='table__tr-head'>
            <th className='table__thead-checkbox' ><input type="checkbox" name="checkbox" className="table__checkbox" /></th>
            <th className='table__thead-num' onClick={() => handleSort('id')}># <button className='table__button button'>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.40962 13.4148C8.21057 13.6992 7.78943 13.6992 7.59038 13.4148L5.05071 9.78673C4.81874 9.45534 5.05582 9 5.46033 9H10.5397C10.9442 9 11.1813 9.45534 10.9493 9.78673L8.40962 13.4148Z" fill="#BCC2CE" />
                <path d="M8.40962 2.58517C8.21057 2.30081 7.78943 2.30081 7.59038 2.58517L5.05071 6.21327C4.81874 6.54466 5.05582 7 5.46033 7H10.5397C10.9442 7 11.1813 6.54466 10.9493 6.21327L8.40962 2.58517Z" fill="#171C26" />
              </svg>
            </button>
            </th>
            <th className='table__thead-name' onClick={() => handleSort('name')}>Name
              <button className='table__button button'>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.40962 13.4148C8.21057 13.6992 7.78943 13.6992 7.59038 13.4148L5.05071 9.78673C4.81874 9.45534 5.05582 9 5.46033 9H10.5397C10.9442 9 11.1813 9.45534 10.9493 9.78673L8.40962 13.4148Z" fill="#BCC2CE" />
                  <path d="M8.40962 2.58517C8.21057 2.30081 7.78943 2.30081 7.59038 2.58517L5.05071 6.21327C4.81874 6.54466 5.05582 7 5.46033 7H10.5397C10.9442 7 11.1813 6.54466 10.9493 6.21327L8.40962 2.58517Z" fill="#BCC2CE" />
                </svg>
              </button>
            </th>
            <th className='table__thead-location'>Location</th>
            <th className='table__thead-status'>Status</th>
            <th className='table__thead-species'>Species</th>
            <th className='table__thead-gender'>Gender</th>
            <th className='table__thead-preview'>Preview</th>
          </tr>
        </thead>

        <tbody className='table__tbody'>
          {apiData.length > 0 ? (
            <>
              {apiData.map((item: ItemType) => (  
                <tr className='table__tr' key={item.id}>
                  <td className='table__tr-checkbox' ><input type="checkbox" name="checkbox" className="table__checkbox" /></td>
                  <td className='table__tr-num'>{item.id}</td>
                  <td className='table__tr-name'>{item.name}</td>
                  <td className='table__tr-location'>{item.location.name}</td>
                  <td className='table__tr-status'><span className={`status ${item.status === 'Alive' ? 'green' : 'red'}`}>{item.status}</span></td>
                  <td className='table__tr-species'>{item.species}</td>
                  <td className='table__tr-gender'>{item.gender}</td>
                  <td className='table__tr-preview'><img className='table__image' src={item.image} alt="" /></td>
                </tr>
              ))}
            </>
          ) : (
            <tr className='table__tr-loader'>
              <td><div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className='pagination'>
          <button className='pagination__button' disabled={currentPage === 1} onClick={handlePrevPage}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 11L6.5 8L9.5 5" stroke="#868FA0" />
            </svg>
          </button>
          <span>{`${currentPage}/${totalPages}`}</span>
          <button className='pagination__button' disabled={currentPage === totalPages} onClick={handleNextPage}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.5 11L9.5 8L6.5 5" stroke="#464F60" />
            </svg>
          </button>
        </div>
      )}

    </div>
  )
}

export default Table
