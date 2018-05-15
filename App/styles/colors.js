export default colors = {
  background: '#0F3270',
  highlight1: '#04518C',
  highlight2: '#00A1D9',
  highlight3: '#47D9BF',
  highlight4: '#F2D03B',
}

export const background = colors.background
export const highlight1 = colors.highlight1
export const highlight2 = colors.highlight2
export const highlight3 = colors.highlight3
export const highlight4 = colors.highlight4
export const silver = (opacity = 0.5) => `rgba(255,255,255,${opacity})`
export const shadow = {
  elevation: 5,
  shadowOffset: {
    width: 0,
    height: 5
  },
  shadowOpacity: .2,
}
