import template from 'lodash.template'

/**
 * Templated text generator
 * @param text
 * @param variables
 * @returns
 */
export const templateString = (text: string, variables = {}) => {
  return template(text, {
    interpolate: /{([\s\S]+?)}/g,
  })(variables)
}

/**
 * Normalize image file name
 * @param text
 * @returns
 */
export const normalizeImageFilename = (text: string) => {
  return text?.replace('/', ' ').toLowerCase()
}
