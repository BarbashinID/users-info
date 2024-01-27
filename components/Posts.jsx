import React, {useEffect, useState,} from 'react';
import Table from './MyTable/Table';
import MySelect from './MySelect/MySelect';
import classes from './MyTable.module.css';

const Posts = () => {
    
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const [selectedSort, setSelectedSort] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('')

  const options = [
    {name: "No sort", value: "no sort"},
    {name: "Ascending", value: "ascending"},
    {name: "Descending", value: "descending"}
  ]

  const fetchData = (query) => {
    fetch(query)
      .then(response => {
        return response.json()})
      .then(data => {
        setUsers(data.users)})
      .catch((err) => 
        console.error("Could not fetch: "  + err))  
  }
  // добавили зависимость для того чтобы useMemo реагировал только на изменение поиска
    useEffect(() => {
      fetchData("https://dummyjson.com/users/search?q=" + query)
    }, [query])

  function compareNumbers(a, b) {
    return a - b;
  }

  const sortUsers = ([sort, filter, dv]) => { 

    if (dv === undefined){
      if(!isNaN(users[0][filter])) {
        if (sort === "ascending"){
          setUsers([...users].sort((a, b) => compareNumbers(a[filter], b[filter])))
          } else if (sort === "descending") {
            setUsers([...users].sort((a, b) => compareNumbers(b[filter], a[filter])))
          } else if (sort === "no sort")  {
            setUsers([...users].sort((a, b) => compareNumbers(a['id'], b['id'])))
          }
      } else {
          if (sort === "ascending"){
            setUsers([...users].sort((a, b) => a[filter].localeCompare(b[filter])))
            } else if (sort === "descending") {
              setUsers([...users].sort((a, b) => b[filter].localeCompare(a[filter])))
            } else if (sort === "no sort")  {
              setUsers([...users].sort((a, b) => compareNumbers(a['id'], b['id'])))
            }
      }  setSelectedFilter("filter")
   } else {
      if(!isNaN(users[0][filter][dv])) {
        if (sort === "ascending"){
          setUsers([...users].sort((a, b) => compareNumbers(a[filter][dv], b[filter][dv])))
          } else if (sort === "descending") {
            setUsers([...users].sort((a, b) => compareNumbers(b[filter][dv], a[filter][dv])))
          } else if (sort === "stay")  {
            setUsers([...users].sort((a, b) => compareNumbers(a['id'], b['id'])))
          }
      } else {
          if (sort === "ascending"){
            
            setUsers([...users].sort((a, b) => a[filter][dv].localeCompare(b[filter][dv])))
            } else if (sort === "descending") {
              setUsers([...users].sort((a, b) => b[filter][dv].localeCompare(a[filter][dv])))
            } else if (sort === "no sort")  {
              setUsers([...users].sort((a, b) => compareNumbers(a['id'], b['id'])))
            }
      }
      setSelectedFilter("filter")
   }
  }
  return (
    <div>
        <input 
          onChange={e => setQuery(e.target.value)}
          placeholder='search..'
          >
        </input>
        <div className={classes.sel}>
        <MySelect
          value={selectedSort}
          filter={selectedFilter}
          onChange={sortUsers}
          defaultValue = {"firstName"}
          options = {options}
        />
        <MySelect
          value={selectedSort}
          filter={selectedFilter}
          onChange={sortUsers}
          defaultValue = {"age"}
          options = {options}
        />
        <MySelect
          value={selectedSort}
          filter={selectedFilter}
          onChange={sortUsers}
          defaultValue = {"gender"}
          options = {options}
        />
        <MySelect
          value={selectedSort}
          filter={selectedFilter}
          onChange={sortUsers}
          defaultValue = {"address"}
          dv = {"address"}
          options = {options}
        />
        </div>
        <Table
          users={users}
        />
    </div>
  )
}

export default Posts;