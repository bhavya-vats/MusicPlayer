import React from 'react'
import { motion } from 'framer-motion';

const Songcard = ({data, index}) => {
  return (
    <motion.div className="relative w-40 min-w-210 px-2 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center">
      <div>
        <motion.img src={data.imageURL}/>
      </div>
    </motion.div>
  )
}

export default Songcard