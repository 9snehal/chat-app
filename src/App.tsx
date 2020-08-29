import React from 'react';
import './App.css';

const uri = 'http://127.0.0.1:5000/tags';
const uri1 = 'http://127.0.0.1:5000/fetchMessages';
// const uri2 = 'http://127.0.0.1:5000/createMessage';
const initDetails = {
  method: 'get',
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  }
}


export default class App extends React.Component {

  GetData = () => {

    fetch(uri, initDetails)
      .then(response => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // console.log(response.headers.get("Content-Type"));
        return response.json();
      }
      )
      .then(data => {
        // appendData(data);
        console.log("All Tags:")
        console.log(JSON.stringify(data));
      })
      .catch(err => {
        console.log('Fetch Error :-S', err);
      });
    // function appendData(data: any) {
    //   var mainContainer = document.getElementById("myData");
    //   for (var i = 0; i < data.length; i++) {
    //     var div = document.createElement("div");
    //     div.innerHTML = 'Tags: ' + data[i];
    //     mainContainer.appendChild(div);
    //   }
    // }
  }
 GetMessages() {

  fetch(uri1, initDetails)
    .then(response => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      return response.json();
    }
    )
    .then(data => {
      // appendData(data);
      console.log("All Messages:")
      console.log((data));
    })

    .catch(err => {
      console.log('Fetch Error :-S', err);
    });
  // function appendData(data) {
  //   var mainContainer = document.getElementById("myData");
  //   for (var i = 0; i < data.length; i++) {
  //     var div = document.createElement("div");
  //     div.innerHTML = 'Messages: ' + data[i];
  //     mainContainer.appendChild(div);
  //   }
  // }
}

  render(){
  return (
    <div className="App">
      <div className="main">
        <header>
          <h2>My Chat Application</h2>
        </header>

        <section>
          <nav>
            <button id='getData' onClick={this.GetData}>Get Tag</button>
            <ul>
              <li>Tag1</li>
              <li>Tag2</li>
              <li>Tag3</li>
            </ul>
          </nav>

          <article className="main1">
            <h1>Main window</h1>
            <button id='getMessages' onClick={this.GetMessages}>Get Messages</button> 
          </article>

          <article className="main2">
            <div>
              <form action="/action_page.php" className="form-inline">
                <div className="form-group" style={{ padding: "20px 10px" }}>
                  <input type="text" className="form-control" id="tag" placeholder="Enter tag" name="tag"/>
               </div>
                <div className="form-group" style={{ padding: "20px 10px" }}>
                    {/* <label for="pwd">Password:</label> */}
                    <input type="text" className="form-control" id="messageId" placeholder="Enter message" name="messageId"/>
                   </div>
                      <button type="submit" className="btn btn-default">Submit</button>
                   </form>
                  </div>
          
            {/* <div> */}
              {/* <form method="POST" action="" id="formElem" style={{padding: "20px"}}>
                <div style={{padding: "20px"}}>
                  <input type="text" name="senderId" id="senderId"></input>
                  <input type="text" name="tag" id="tag"></input>
                  <input type="text" name="messageId" id="messageId"></input>
                  <input type="text" name="text" id="text"></input>
                  <input type="submit" />
                </div>
              </form> */}
              
            {/* </div> */}
          </article>
          
        </section>

      </div>
      <div id="myData"></div>
    </div>
  );
    }
}

// export default App;
