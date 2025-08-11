import React from 'react'

export default function Home () {
  return (
    <div>
      {/* the search box */}
      <form>
        <input type='text' name='city' placeholder='Ahmedabad' />
      </form>
      <div>
        <h2>Find Players and Venue Nearby</h2>
        <p>
          Seamlessly explore special venue to play with
          <br />
          sports enthuasts just like you!
        </p>
      </div>
    </div>
  )
}
