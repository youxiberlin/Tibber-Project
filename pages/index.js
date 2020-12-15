import React from "react"
import { render } from "react-dom"
import { getName, getCurrentSub } from "../lib/api"

function App({ username, currentSub }) {
  return (
    <div>
      <h2>Tibber Project 🚀</h2>
      <h3>username: {username}</h3>
      {currentSub.map(v => {
          return (
              <div>
                  <div>current</div>
                  <div>Energy: {v.currentSubscription.priceInfo.current.energy}</div>
                  <div>StartsAt: {v.currentSubscription.priceInfo.current.startsAt}</div>
                  <div>Tax: {v.currentSubscription.priceInfo.current.tax}</div>
                  <div>Total: {v.currentSubscription.priceInfo.current.total}</div>
              </div>
        )
      })}
    </div>
  )
}

export async function getStaticProps({ preview = false }) {
  const username = (await getName()) || []
  const currentSub = (await getCurrentSub()) || []
  return {
    props: { username, currentSub },
  }
}

export default App
