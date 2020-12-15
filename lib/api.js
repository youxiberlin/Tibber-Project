const API_URL = "https://api.tibber.com/v1-beta/gql"
const API_TOKEN = process.env.API_TOKEN

async function fetchAPI(query, { variables, preview } = {}) {
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
  return json.data
}

export async function getName() {
  const data = await fetchAPI(
    `query GetName {
        viewer {
            name
        }
      }`
  )
  return data.viewer.name
}
