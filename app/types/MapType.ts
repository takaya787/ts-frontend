export type MapCenterType = {
  lat: number, lng: number
}

//SearchWindow Component type
export type SearchWindowValue = {
  keyword: string
}

export type SearchData = {
  lat: number,
  lng: number,
  message: string
}

export type SearchWindowProps = {
  setMapCenter(center: MapCenterType): void
}
