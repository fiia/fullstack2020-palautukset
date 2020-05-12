import React from 'react';

const Course = ({course}) => {

  const header = () => {
    return (
	<div>
	    <h1>{course.name}</h1>	    
	</div>
    )
  }

  const content = () =>
	  course.parts.map(p =>
		<li key={p.id}>
			   <p>{p.name} {p.exercises}</p>
       	    </li>)

  const total = () => {
      let num = course.parts.reduce(function(sum, part) {
	  return sum + part.exercises
      }, 0)
      
      return (
	      <p><b>total of {num} exercises</b></p>
      )
  }
	  

  return (
	    <div>
	      {header()}
	    <ul>
	      {content()}
	      {total()}
	    </ul>
	    </div>
  )


}

export default Course
