import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

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
  },
  'h1,h2,h3,h4,h5,h6': {
    marginTop: rhythm(1.3333333),
  },
  ':root': {
    '--rhythm': rhythm(1),
  },
  '@media only screen and (max-width:768px)': {
    html: {
      fontSize: '15px',
    },
  },
})

delete Wordpress2016.googleFonts

Wordpress2016.baseLineHeight = 1.5

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
