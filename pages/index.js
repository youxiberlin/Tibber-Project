import React, { useState } from 'react';
import moment from 'moment';
moment.locale("en");
import { render } from "react-dom";
import { useTheme, ThemeProvider, withTheme } from '@emotion/react';
import theme from '@rebass/preset';
import {
    Box,
    Button,
    Card,
    Image,
    Heading,
    Text
} from 'rebass'
import { getName, getSub } from "../lib/api"

const calcPrice = async ( {
    startAt = Date.now(),
    sub,
    mins,
    temp,
  } ) => {

  const currHour = moment(startAt).hour()
  const curr = sub.today[currHour - 1]
  const currPrice = curr.total * ( mins / 60 )
  console.log('curr', curr)
  console.log('price', currPrice)

  console.log(sub)

  return currPrice;
}

const App = ({ username, sub }) => {
  const [currPrice, setCurrPrice] = useState(null);
  console.log('price in app', currPrice)
  return (
    <ThemeProvider theme={theme}>
        <h2>Tibber Project 🚀</h2>
        <h3>username: {username}</h3>
        <Button color="blue" onClick={async () => {
          const price = await calcPrice({
              sub,
              mins: 90,
              temp: 60,
          });
          setCurrPrice(price);
        }}>Wash now</Button>
        <h3>Current Price: {currPrice} NOK</h3>
    </ThemeProvider>
  )
}

export async function getStaticProps({ preview = false }) {
  const username = (await getName()) || []
  const sub = (await getSub()) || []
  return {
    props: { username, sub },
  }
}

export default App
