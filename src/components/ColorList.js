import React, { useState } from "react";
import axios from "axios";

import axiosWithAuth from '../helpers/axiosWithAuth';

import Color from './Color';
import EditMenu from './EditMenu';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [originalColor, setOriginalColor] = useState(initialColor);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    setOriginalColor(color);
  };

  const saveEdit = e => {
    e.preventDefault()
    // only do put request if colorToEdit is different
    if(colorToEdit.color === originalColor.color && colorToEdit.code.hex === originalColor.code.hex)
      return
    
    console.log(colorToEdit)
    axiosWithAuth().put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then( res => {
        console.log(res.data)
        updateColors(colors.map( color => color.id === res.data.id ? res.data : color))
        setEditing(false)
        setOriginalColor(initialColor)
        setColorToEdit(initialColor)
      })
      .catch( err => {
        console.log(err.response)
      })
  };

  const deleteColor = oldColor => {
    if(!window.confirm(`Are you sure you wish to delete ${oldColor.color}?`))
      return

    axiosWithAuth().delete(`/colors/${oldColor.id}`)
      .then( res => {
        console.log(res)
        updateColors(colors.filter( color => color.id !== oldColor.id))
      })
      .catch( err => {
        console.log(err.response)
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => <Color key={color.id} editing={editing} color={color} editColor={editColor} deleteColor={deleteColor}/>)}
      </ul>
      
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.