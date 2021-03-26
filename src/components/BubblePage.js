import axios from "axios";
import React, { useEffect, useState } from "react";

import axiosWithAuth from '../helpers/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);

  // dunno how to get local storage to work in testing
  // so this will have to do
  function testFetch(){
    axios.get('http://localhost:5000/api/colors', props.auth)
    .then( res => {
      console.log(res)
      setColorList(res.data)
    })
    .catch( err => {
      console.log(err.response)
    })
  }

  useEffect(() => {
    testFetch()

    axiosWithAuth().get('/colors')
      .then( res => {
        console.log(res)
        setColorList(res.data)
      })
      .catch( err => {
        console.log(err.response)
      })
  }, [])

  return (
    <div className="container">
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
