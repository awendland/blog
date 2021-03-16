import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.baseLineHeight = 1.4
Wordpress2016.baseFontSize = '17px'

Wordpress2016.overrideThemeStyles = (
  { adjustFontSizeTo, rhythm },
  options,
  styles
) => ({
  'a:visited': {
    color: '#004c80',
  },
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
  a: {
    // Cancel out noticeable <a> styling
    boxShadow: `none`,
    textDecoration: `none`,
  },
  blockquote: {
    ...adjustFontSizeTo(Wordpress2016.baseFontSize),
  },
})

Wordpress2016.bodyFontFamily = ['Georgia', 'serif']

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
// if (process.env.NODE_ENV !== 'production') {
//   typography.injectStyles()
// }

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
