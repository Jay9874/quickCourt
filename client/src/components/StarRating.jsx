import React from 'react'

const StarRating = ({ rating, size = "md" }) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  
  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl"
  }
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={i} className={`text-warning-500 ${sizeClasses[size]}`}>
        ★
      </span>
    )
  }
  
  // Add half star if needed
  if (hasHalfStar) {
    stars.push(
      <span key="half" className={`text-warning-500 opacity-70 ${sizeClasses[size]}`}>
        ★
      </span>
    )
  }
  
  // Add empty stars
  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <span key={`empty-${i}`} className={`text-secondary-300 ${sizeClasses[size]}`}>
        ☆
      </span>
    )
  }
  
  return (
    <div className="flex gap-0.5">
      {stars}
    </div>
  )
}

export default StarRating
