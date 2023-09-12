import React from 'react';
import "../styles.css"
import EquipmentTable from "./equipmentTable";

// this iteration has the api call on this page.  However, trying to change the state of the equipmentTable component it doesn't allow re-renders.  I think it is because it is tyring to render a component from the outside.  Next iteration, the api call will be in the equipment table component.

export default function Homepage(insertData) {

  const data = 
  [
  {
  "item_id":1,
  "name":"Green Screen",
  "description":"Awesome projector",
  "code":1,
  "replacement_cost":100.00,
  "purchase year":10101999,
  "status":0,
  "location":"Manakau Campus, Art Department",
  "last_updated":10-10-99,
  "rental_status": "pending"
  },
  {
    "item_id":2,
    "name":"Blue Screen",
    "description":"Alright projector",
    "code":2,
    "replacement_cost":50.00,
    "purchase year":10102023,
    "status":0,
    "location":"Christchurch Campus, Media Department",
    "last_updated":10101999,
    "rental_status": "pending"
  },
  {
    "item_id":3,
    "name":"Yellow Camera",
    "description":"Camera",
    "code":3,
    "replacement_cost":250.00,
    "purchase year":11102023,
    "status":0,
    "location":"Christchurch Campus, Media Department",
    "last_updated":10101999,
    "rental_status": "booked"
  },
  {
    "item_id":4,
    "name":"Red Camera",
    "description":"Camera",
    "code":4,
    "replacement_cost":350.00,
    "purchase year":11102023,
    "status":0,
    "location":"Manakau Campus, Media Department",
    "last_updated":10101999,
    "rental_status": "avaliable"
  },
  {
    "item_id":5,
    "name":"Purple Camera",
    "description":"Camera",
    "code":4,
    "replacement_cost":350.00,
    "purchase year":11102023,
    "status":0,
    "location":"Manakau Campus, Media Department",
    "last_updated":10101999,
    "rental_status": "overdue"
  },
  {
    "item_id":6,
    "name":"Multi-color Camera",
    "description":"Camera",
    "code":4,
    "replacement_cost":350.00,
    "purchase year":12102023,
    "status":0,
    "location":"Manakau Campus, Art Department",
    "last_updated":11101999,
    "rental_status": "avaliable"
  },
  {
    "item_id":7,
    "name":"Black Camera",
    "description":"Camera",
    "code":4,
    "replacement_cost":350.00,
    "purchase year":12102023,
    "status":0,
    "location":"Manakau Campus, Art Department",
    "last_updated":11101999,
    "rental_status": "avaliable"
  },
  {
    "item_id":8,
    "name":"Grey Camera",
    "description":"Camera",
    "code":4,
    "replacement_cost":350.00,
    "purchase year":12102023,
    "status":0,
    "location":"Manakau Campus, Art Department",
    "last_updated":11101999,
    "rental_status": "pending"
  } 
  ]
  
    return (
    <div className="HomePage"  style={{
      backgroundColor: 'black'
    }}>
      <br></br>
      <br></br>
      <EquipmentTable apiData ={data}/> 
      <br></br>
      <br></br>
      <br></br>
    </div>
    );
}
