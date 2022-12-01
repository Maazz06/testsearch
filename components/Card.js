import React from "react";
export function Card(props) {
 const { hit } = props;
 console.log(hit,"HIT")
 return (
     <div>
         <span>{hit.title}</span>
     </div>
 );
}