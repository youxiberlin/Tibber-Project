import moment from 'moment';
import sampleData from '../data/sample';
moment.locale("en")

const API_URL = "https://api.tibber.com/v1-beta/gql"
const API_TOKEN = process.env.API_TOKEN

const fetchAPI = async (query, { variables, preview } = {}) => {
  const res = await fetch(API_URL + (preview ? "/preview" : ""), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch API")
  }
  return json.data;
}

const getName = async () => {
    const data = await fetchAPI(
        `query GetName {
            viewer {
                name
            }
        }`
    )
    return data.viewer.name;
}

const getSub = async () => {
    const data = await fetchAPI(
        `query GetSub {
            viewer {
              homes {
                currentSubscription{
                  priceInfo{
                    current{
                      total
                      energy
                      tax
                      startsAt
                    }
                    today {
                      total
                      energy
                      tax
                      startsAt
                    }
                    tomorrow {
                      total
                      energy
                      tax
                      startsAt
                    }
                  }
                }
              }
            }
          }`
    )
    return data.viewer.homes[0].currentSubscription.priceInfo;
}

module.exports = {
    getName,
    getSub,
}
