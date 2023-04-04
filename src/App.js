import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [ingredient,setIngredient] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    geting(event.target.value);
  }
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then(response => response.json())
      .then(json => {
        setData(json.meals);
        console.log(json);
      })
      .catch(error => console.error(error))
  }, []);

  function geting(selectedOption) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${selectedOption}`)
        .then(response => response.json())
        .then(json => {
          setIngredient(json.meals);
          console.log(json);
        })
        .catch(error => console.error(error))
  }
  

  return (
    <div>
      <h1>List of Meals</h1>
      <select name="ingredient" id="ig" onChange={handleChange}>
        {data.map(meal => (
          <option value={meal.strIngredient}>{meal.strIngredient}</option>
        ))}
      </select>
      <ul>
      {ingredient.map(meal => (
          <li key={meal.idMeal} className='list'>
            <div className='listmeal'>
            {meal.strMeal}
            </div>
            <img src = {meal.strMealThumb} height={'150px'} alt={meal.strMeal}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
