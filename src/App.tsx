import React from 'react';
import './App.css';

// const uri = 'http://127.0.0.1:5000/tags';
// const uri1 = 'http://127.0.0.1:5000/fetchMessages';
const uri2 = 'http://127.0.0.1:5000/createMessage';
// const initDetails = {
//   method: 'get',
//   headers: {
//     "Content-Type": "application/json; charset=utf-8",
//   }
// }
interface MyEditorProps {
  
}

const users = ["Akshata", "Snehal", "Pradnya", "Shraddha", "Mandar", "Nisha", "Aniket", "Shreya"];

export default class App extends React.Component<MyEditorProps, any> {
  constructor(props: MyEditorProps) {
    super(props);

    this.state = {
      currentSender: users[Math.floor(Math.random() * users.length)],
      messages: [],
      tags: [],
      currentMsg: '',
      currentTag: '',
      currentDateTime: Date().toLocaleString(),
      currentMsgId: ''
      
    };

  
    this.GetTags = this.GetTags.bind(this);
    this.GetMessages = this.GetMessages.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    
    this.handleTag = this.handleTag.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  componentDidMount() {
    this.GetTags();
    this.GetMessages();
  }
  

  GetTags = () => {
    const apiUrl = 'http://127.0.0.1:5000/tags';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          tags: data
        });
      });
  }

  GetMessages = () => {
    if (this.state.currentTag != null) {
      const apiUrl = `http://127.0.0.1:5000/fetchMessages?tag=${this.state.currentTag}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.setState({
            messages: data
          });
        });
    }
  }
  handleTag = (event: any) => {
    this.setState({
      currentTag: event.target.name
    });
    this.GetMessages();
  }
  sendMessage = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        senderId: this.state.currentSender,
        tag: "hello",
        messageId: this.state.currentMsg + 1,
        text: this.state.currentMsg,
        timestamp: this.state.currentDateTime
      })
    };
    console.log(requestOptions.body)
    // const apiUrl = 'http://127.0.0.1:5000/createMessage';
    fetch(uri2, requestOptions)
      // .then(response => response.json());
      .then(data => console.log(data.json()));
  }
  handleSubmit = (event: any) => {
    event.preventDefault();
    this.setState({
      currentMsg: ''
    });
  }
  handleChange = (event: any) => {
    this.setState({ currentMsg: event.target.value });
  }


  // GetData = () => {

  //   fetch(uri, initDetails)
  //     .then(response => {
  //       if (response.status !== 200) {
  //         console.log('Looks like there was a problem. Status Code: ' +
  //           response.status);
  //         return;
  //       }

  //       // console.log(response.headers.get("Content-Type"));
  //       return response.json();
  //     }
  //     )
  //     .then(data => {
  //       // appendData(data);
  //       console.log("All Tags:")
  //       console.log(JSON.stringify(data));
  //     })
  //     .catch(err => {
  //       console.log('Fetch Error :-S', err);
  //     });
  //   // function appendData(data: any) {
  //   //   var mainContainer = document.getElementById("myData");
  //   //   for (var i = 0; i < data.length; i++) {
  //   //     var div = document.createElement("div");
  //   //     div.innerHTML = 'Tags: ' + data[i];
  //   //     mainContainer.appendChild(div);
  //   //   }
  //   // }
  // }
//  GetMessages() {

//   fetch(uri1, initDetails)
//     .then(response => {
//       if (response.status !== 200) {
//         console.log('Looks like there was a problem. Status Code: ' +
//           response.status);
//         return;
//       }
//       return response.json();
//     }
//     )
//     .then(data => {
//       // appendData(data);
//       console.log("All Messages:")
//       console.log((data));
//     })

//     .catch(err => {
//       console.log('Fetch Error :-S', err);
//     });
//   // function appendData(data) {
//   //   var mainContainer = document.getElementById("myData");
//   //   for (var i = 0; i < data.length; i++) {
//   //     var div = document.createElement("div");
//   //     div.innerHTML = 'Messages: ' + data[i];
//   //     mainContainer.appendChild(div);
//   //   }
//   // }
// }

  render(){
  return (
    <div className="App">
      <div className="main">
        <header>
          <h2>My Chat Application</h2>
        </header>

        <section>
          <nav>
            {
              this.state.tags.map((tag: { tagId: string | number; tagName: string },i:any) => (
                <div key={i}>
                  <button name={tag.tagName} onClick={this.handleTag}>{tag.tagName}</button>
                </div>
              ))
            }
            {/* <button id='getData' onClick={this.GetData}>Get Tag</button>
            <ul>
              <li>Tag1</li>
              <li>Tag2</li>
              <li>Tag3</li>
            </ul> */}
          </nav>

          <article className="main1">
            <h1>Main window</h1>
            <div>
              {
                this.state.messages.map((msg:any, index:any) => (
                  <div key={index}>
                    <p>Sender: {msg.senderId} -- Tag: {msg.tag}</p>
                    <p>Msg: {msg.text}</p>
                  </div>
                ))
              }
            </div>
            {/* <button id='getMessages' onClick={this.GetMessages}>Get Messages</button>  */}
          </article>

          <article className="main2">
            <div>
              <form action="" className="form-inline" onSubmit={this.handleSubmit}>
                {/* <div className="form-group" style={{ padding: "20px 10px" }}>
                  <input type="text" className="form-control" id="tag" placeholder="Enter tag" name="tag"/>
               </div> */}
                <div className="form-group" style={{ padding: "20px 10px" }}>
                  <input type="text" className="form-control" id="messageId" placeholder="Enter message" name="messageId" value={this.state.currentMsg} onChange={this.handleChange}/>
                   </div>
                <button type="submit" onClick={this.sendMessage} className="btn btn-default">Submit</button>
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
