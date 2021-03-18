export type ReviewType = {
  id: number,
  reason: string,
  duration: number,
  food: string,
  convenient: string,
  favorite: string,
  score: number,
  advice: string,
  user_id: number,
  lat: number,
  lng: number
}

export type ReviewContextType = {
  ReviewsUrl: string,
  reviews_data: ReviewType[] | null,
  reviews_error: string | null
}
