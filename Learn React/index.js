
const page = (
  <div>
    <nav>
      <img width="100px"src="./react-logo.png" alt=""/>
    </nav>
    <div>
      <h1>Fun facts about React</h1>
      <ul>
        <li>Was first released in 2013</li>
        <li>Was originally created by Jordan Walke</li>
        <li>Has well over 100K stars on Github</li>
        <li>Is maintained by Facebook</li>
        <li>Power thousands of enterprise apps, including mobile app</li>
      </ul>
    </div>
    
  </div>
)

ReactDOM.render(
  page,
  document.getElementById("root"))
