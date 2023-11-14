import React, { useEffect, useState } from 'react'

function Contributor({ marginLeft, zIndex, width, height }) {

  const [randomNumber, setRandomNumber] = useState(null);


  useEffect(() => {
    const random = Math.floor(Math.random() * 1000) + 1; // 1 ile 100 arasında rastgele bir sayı oluşturur
    setRandomNumber(random);
  }, [])

  return (
    <img
      className={`ring-2 bg-gray-500 ring-white rounded-full ${marginLeft} ${zIndex} ${width ? width : "w-8"} ${height ? height : "h-8"}`}
      src={`https://i.pravatar.cc/${randomNumber}`}
      alt='300'
    />
  )
}

export default Contributor