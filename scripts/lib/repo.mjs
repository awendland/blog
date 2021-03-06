import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)

export const __scripts_dir = path.resolve(path.dirname(__filename), '..')

export const __repo = path.resolve(__scripts_dir, '..')
