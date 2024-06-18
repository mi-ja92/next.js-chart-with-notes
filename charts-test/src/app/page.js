import Image from "next/image";
import LineChart from "./linechart";
import BarChart from "./barchart";
import MyChart from "./chart";
import {getNotes} from '../../api'
import Main from "./main";

export default async function Home(props) {
const notes = await getNotes()

  return (
<div className='w-full h-screen'>
  <div className='w-full h-screen flex items-center justify-center pt-10'>
  {/* <LineChart />
  <BarChart/> */}
  <Main/>
  <MyChart notes={notes}/></div>
</div>
  );
}
