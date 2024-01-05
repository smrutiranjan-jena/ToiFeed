import axios from 'axios'
const App = () => {
  const feedList = [
    {
      heading: "Top Stories",
      endpoint: "topstories"
    },
    {
      heading: "Most Recent Stories",
      endpoint: "mostrecent"
    },
    {
      heading: "India",
      endpoint: "india"
    },
    {
      heading: "World",
      endpoint: "world"
    },
    {
      heading: "NRI",
      endpoint: "nri"
    },
    {
      heading: "Business",
      endpoint: "business"
    }
  ]
  const getData = async (endpoint) => {
    try {
      const response = await axios.get(`http://localhost:3006/api/feeds/${endpoint}`)
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }

  }
  return (
    <div>
      <h1>The Times Of India Feeds</h1>
      <ul>
        {feedList.map((ele, ind) => {
          return <div key={ind}>
            <li style={{ color: "blue" }} >{ele.heading}&nbsp;&nbsp;&nbsp;
              <button style={{ backgroundColor: "orange", cursor: "pointer" }} onClick={() => { getData(ele.endpoint) }}>RSS</button>
            </li>
            <br />
          </div>
        })}
      </ul>
    </div>
  )
}
export default App