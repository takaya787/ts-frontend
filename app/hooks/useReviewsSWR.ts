import useSWR from 'swr';
//others
import { Auth } from '../modules/Auth'
import { ReviewType } from '../types/ReviewType'

export const ReviewsUrl = process.env.NEXT_PUBLIC_BASE_URL + 'reviews';

type useReviewsType = {
  reviews_data: ReviewType[] | null,
  reviews_error: string | null
}
//SWR用のfetcher
async function Eventsfetcher(): Promise<ReviewType[] | null> {
  const response = await fetch(ReviewsUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${Auth.getToken()}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json()
}

export function useReviewsSWR(): useReviewsType {
  const { data: reviews_data, error: reviews_error } = useSWR(ReviewsUrl, Eventsfetcher)
  return { reviews_data, reviews_error }
}
