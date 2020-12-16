import React from "react"
import moment from 'moment';
moment.locale("en")
import { render } from "react-dom"
import { useTheme, ThemeProvider, withTheme } from '@emotion/react'
import theme from '@rebass/preset'
import {
    Box,
    Button,
    Card,
    Image,
    Heading,
    Text
} from 'rebass'
import { getName, getCurrentSub, getTmrSub, calcPrice } from "../lib/api"

function App({ username, currentSub, tmrSub }) {
  return (
    <ThemeProvider theme={theme}>
        <h2>Tibber Project 🚀</h2>
        <h3>username: {username}</h3>
        <Button color="blue" onClick={() => calcPrice({
            // startAt:Date.now(),
            mins: 60
        })}>Wash now</Button>
    </ThemeProvider>
  )
}

export async function getStaticProps({ preview = false }) {
  const username = (await getName()) || []
  const currentSub = (await getCurrentSub()) || []
  const tmrSub = (await getTmrSub()) || []
  return {
    props: { username, currentSub, tmrSub },
  }
}

export default App
