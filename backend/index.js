const express = require('express')
const cors = require('cors')
const axios = require('axios')
const xml2js = require('xml2js')
const configureDB = require('./config/configureDB')
const feedCltr = require('./controllers/feedController')
const Feed = require('./models/feedModel')
configureDB()
const port = 3006
const app = express()
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    Promise.all([
        axios.get('https://timesofindia.indiatimes.com/rssfeedstopstories.cms'),
        axios.get('https://timesofindia.indiatimes.com/rssfeedmostrecent.cms'),
        axios.get('https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms'),
        axios.get('https://timesofindia.indiatimes.com/rssfeeds/296589292.cms'),
        axios.get('https://timesofindia.indiatimes.com/rssfeeds/7098551.cms'),
        axios.get('https://timesofindia.indiatimes.com/rssfeeds/1898055.cms')
    ])
        .then((response) => {
            const [topstoriesResponse, mostrecentResponse, indiaResponse, worldResponse, nriResponse, businessResponse] = response
            const allXmlData = [topstoriesResponse.data, mostrecentResponse.data, indiaResponse.data, worldResponse.data, nriResponse.data, businessResponse.data]
            let allJsonData = []
            allXmlData.forEach((xmlData) => {
                xml2js.parseString(xmlData, (err, result) => {
                    if (err) {
                        console.error("xml parse error ", err)
                    } else {
                        allJsonData.push(result)
                    }
                })
            })
            const [topstoriesData, mostrecentData, indiaData, worldData, nriData, businessData] = allJsonData
            const feed = new Feed({ topstoriesFeed: topstoriesData, mostrecentFeed: mostrecentData, indiaFeed: indiaData, worldFeed: worldData, NRIFeed: nriData, businessFeed: businessData })
            feed.save()
                .then((response) => {
                    res.json({ message: "data inserted successfully", data: response })
                })
                .catch((err) => {
                    res.json({ message: "error while inserting data", err: err })
                })
        })
        .catch((err) => {
            res.json(err)
        })
})
app.get('/api/feeds/topstories', feedCltr.getTopStoriesFeed)
app.get('/api/feeds/mostrecent', feedCltr.getMostRecentFeeds)
app.get('/api/feeds/india', feedCltr.getIndiaFeeds)
app.get('/api/feeds/world', feedCltr.getWorldFeeds)
app.get('/api/feeds/nri', feedCltr.getNriFeeds)
app.get('/api/feeds/business', feedCltr.getBusinessFeeds)

app.listen(port, () => {
    console.log('server is running at port ', port)
})