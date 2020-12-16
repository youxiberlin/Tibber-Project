import React, { useState } from 'react';
import numeral from 'numeral';
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

const makeMinsArr = (totalMins, startTime) => {
	const startMin = moment(startTime).minute();
	const arr = [];
	const firstMins = 60 - startMin;
	const arrNum = Math.ceil((totalMins - firstMins) / 60);
	let restMins = totalMins - firstMins;
	arr.push(firstMins)
	for (let i = 0; i < arrNum; i++) {
		if (restMins > 60) {
			arr.push(60)
			restMins = restMins - 60;
		} else {
			arr.push(restMins)
		}
	}
	return arr;
}

const calcTotal = (priceArr, totalMins) => {
	const minsArr = makeMinsArr(totalMins, Date.now())
	const pricePerMin = priceArr.map(v => v / 60)
	const total = minsArr.reduce((acc, curr, i) => {
		const hourPrice = curr * pricePerMin[i]
		acc += hourPrice;
		return acc;
  }, 0)
  return numeral(total).format('0.000')
}

const calcPrice = async ( {
  startAt = Date.now(),
  sub,
  mins,
  temp,
} ) => {
  const currHour = moment(startAt).hour()
  const subArr = !sub.tomorrow.length ? sub.today.slice(currHour - 1) : sub.today.slice(currHour - 1).concat(sub.tomorrow)
  const priceArr = subArr.map(v => v.total)
  const totalPrice = calcTotal(priceArr, mins)
  return totalPrice;
}


const App = ({ username, sub }) => {
  const [currPrice, setCurrPrice] = useState(null);
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
        <h3>Laundry for 90 mins</h3>
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
