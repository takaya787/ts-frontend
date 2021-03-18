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

export type ReviewValueType = {
  review: ReviewType
}

export type ReviewFormValue = {
  reason: string,
  duration: number,
  food: string,
  convenient: string,
  favorite: string,
  advice: string,
  score: string
}
