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

const getCurrentSub = async () => {
    const data = await fetchAPI(
        `query GetCurrentSub {
            viewer {
                homes {
                    currentSubscription {
                        priceInfo {
                            current {
                                total energy tax startsAt
                            }
                        }
                    }
                }
            }
        }`
    )
    return data.viewer.homes[0].currentSubscription.priceInfo.current;
}

const getTodaySub = async () => {
    const data = await fetchAPI(
        `query GetTodaySub {
            viewer {
                homes {
                    currentSubscription {
                        priceInfo {
                            today {
                                total energy tax startsAt currency
                            }
                        }
                    }
                }
            }
        }`
    )
    return data.viewer.homes[0].currentSubscription.priceInfo.today;
}

const getTmrSub = async () => {
    const data = await fetchAPI(
        `query GetTmrSub {
            viewer {
                homes {
                    currentSubscription {
                        priceInfo {
                            tomorrow {
                                total energy tax startsAt currency
                            }
                        }
                    }
                }
            }
        }`
    )
    return data.viewer.homes[0].currentSubscription.priceInfo.tomorrow;
}

// TO-do: replace startAt with Date.now()
const calcPrice = async ( {startAt = Date.now(), mins} ) => {
    // 1608068904394 12/15 22:48
    const todayArr = await getTodaySub();
    const tmrArr = await getTmrSub();
    const utc = moment(startAt).format()
    console.log(utc)
    // const todayArr = sampleData.data.viewer.homes[0].currentSubscription.priceInfo.today;
    // const tmrArr = sampleData.data.viewer.homes[0].currentSubscription.priceInfo.tomorrow;
    const arr = todayArr.concat(tmrArr)
    // console.log('startAt', moment(startAt).format());
    // console.log('arr', arr)
    const data = 'sample'
    return data
}

module.exports = {
    getName,
    getCurrentSub,
    getTmrSub,
    calcPrice,
}