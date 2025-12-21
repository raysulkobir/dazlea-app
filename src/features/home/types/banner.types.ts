export interface HomeBanner {
  photo: string,
  position: number,
  url: string
}

export interface HomeBannerData {
  data: HomeBanner[]
}

export interface HomeBannerState {
  data: HomeBannerData | null
  loading: boolean
  error: string | null,
}

export interface HomeBannerItem {
  image: {
    uri: string
  } | any,
  uri: string
}

export interface HomeBannerRootState {
  banners: HomeBannerState
}