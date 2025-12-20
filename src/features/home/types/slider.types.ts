export interface SliderBanner {
  photo: string
}

export interface SliderData {
  data: SliderBanner[]
}

export interface SliderState {
  data: SliderData | null
  loading: boolean
  error: string | null,
}

export interface SliderItem {
  image: {
    uri: string
  } | any
  
}

export interface SlidersRootState {
  sliders: SliderState
}