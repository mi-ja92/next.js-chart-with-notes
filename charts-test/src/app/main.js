


import { getServerSideProps } from "next";

import prisma from '../../../lib/prisma';
import {Note} from '@prisma/client'


const Main = () => {

    console.log(Note)
    return (
        <div>
            {/* <h1>Main</h1> */}
        </div>
    );
};
export default Main