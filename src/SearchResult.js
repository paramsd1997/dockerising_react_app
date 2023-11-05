// SearchResults.js
import React, { useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import './App.css'; // Make sure to import your CSS file


const SearchResults = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        'https://cogsearchforins.search.windows.net/indexes/find/docs/search?api-version=2023-07-01-Preview',
        {
          search: query,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': '',
          },
        }
      );

      setResults(response.data.value);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };
  const top5results = results.slice(0, 5);
  return (
          <div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
<button className="search-button" onClick={handleSearch}>Search</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Score</th>
            <th>CSR_ID </th>
            <th>Description </th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
        {top5results.map((result)=> (
          //{results.map((result) => (
            <tr key={result.Score}>
             <td>SearchScore: {result['@search.score']}</td>
              <td>CSR_ID: {result.content.match(/CSR_ID: ([^\n]+)/)[1]}</td>
              <td> Description:{result.content.match(/Description: ([^\n]+)/)[1]}</td>

            </tr>
          ))}
          
        </tbody>
      </Table>
    </div>
  );
};


export default SearchResults;
