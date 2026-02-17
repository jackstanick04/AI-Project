// import react libraries, and specifically the use state
// use state basicallly allows react to remmeber the values of variables in bewteen runs and page refreshes
import React, { useState } from 'react';

// create function that will be ran every time the page is rendered and updated
function App() {

  // declaring a variable to store the file, declaring a function that is called to update the variable, and then setting the variable originally to null
  const [file, setFile] = useState(null);

  // this is the function that we run when a file is uploaded
  // lot of syntax, but the "evt" is the object pointing to what we uploaded, where it was in the html, etc. (everything related to the change)
  const fileUpload = (evt) => {

    // evt.target is the upload process, and 0 is the first file (we only uploaded one anyway)
    const image = evt.target.files[0];
    // set the file variable to this image
    setFile(image);
    // confirmation it worked
    console.log("Yay");

  }

  // return portion is the html (really jsx) code that will be reran to rerender the website
  return (

    // remember slight html background, divs are just sections
    <div>

      {/* just a title */}
      <h1>Image Describer</h1>
    
      {/* this is the upload, we are taking in a file (only image types like png) and then when this happens we are calling the fileupload function above */}
      <input 
        type="file" 
        onChange={fileUpload} 
        accept="image/*" 
      />

    </div>

  );
}

// need to export the file and function so that the html can see it (js files are private by default)
export default App;