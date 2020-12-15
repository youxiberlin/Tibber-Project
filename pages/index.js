import React from "react"
import { render } from "react-dom"
import { getName } from "../lib/api"

function App({ allPosts }) {
  const data = allPosts
  console.log("data", data)
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
    </div>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getName()) || []
  return {
    props: { allPosts },
  }
}

export default App
