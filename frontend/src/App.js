// import react libraries, and specifically the use state
// use state basicallly allows react to remmeber the values of variables in bewteen runs and page refreshes
import React, { useState } from 'react';

// create function that will be ran every time the page is rendered and updated
function App() {

  // declaring a variable to store the file, declaring a function that is called to update the variable, and then setting the variable originally to null
  const [file, setFile] = useState(null);
  // variables to check if we are loading (waiting for the gemini response) and store the actual gemini response
  const [textDescription, setText] = useState("");
  const [loading, setLoad] = useState(false);

  // this is the function that we run when a file is uploaded
  // lot of syntax, but the "evt" is the object pointing to what we uploaded, where it was in the html, etc. (everything related to the change)
  const fileUpload = (evt) => {

    // evt.target is the upload process, and 0 is the first file (we only uploaded one anyway)
    const image = evt.target.files[0];
    // set the file variable to this image
    setFile(image);

  }

  // function to send the image to python; async makes the entire function wait until the await to refresh the page (because it takes some time to get the gemini response)
  const send = async() => {

    // after submitting image, set to loading state and clear old text
    setLoad(true);
    setText("");

    // the image is a bunch of binary, but needs to be packaged as a form to be sent to flask
    const formData = new FormData();
    // just adds an image to be sent in the form data (form data can hold many files)
    formData.append('image', file);

    // now we send the forms to flask and store the response (argument is the local server where my flask is running, and then the upload)
    // await means dont run more code until we get the response from flask
    const fromFlask = await fetch('http://localhost:5001/upload', 
      {
        method: 'POST',
        body: formData
      })

    // json the data
    const jsonData = await fromFlask.json();

    // update for output; changes both at once for the same refresh
    setText(jsonData.description);
    setLoad(false);

  };

  // return portion is the html (really jsx) code that will be reran to rerender the website
  return (

    // remember slight html background, divs are just sections
    <div>

      {/* upload section */}
      <div>
        {/* just a title */}
        <h1>Image Describer</h1>
      
        {/* this is the upload, we are taking in a file (only image types like png) and then when this happens we are calling the fileupload function above */}
        <input 
          type="file" 
          onChange={fileUpload} 
          accept="image/*" 
        />

        {/* button to send the image to the python code using the send function */}
        <button onClick = {send}>Submit</button>
      
      </div>

      {/* output section */}
      <div>

        {/* short circuit ifs for the loading text or text output depending on the right state; empty text counts as false */}

        {loading && <p>loading Gemini</p>}

        {textDescription && <p>{textDescription}</p>}


      </div>

    </div>

  );
}

// need to export the file and function so that the html can see it (js files are private by default)
export default App;