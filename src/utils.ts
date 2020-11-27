// API key for https://www.weatherapi.com/
export const API_KEY = process.env.API_KEY
// Maximum forecast days for API
export const API_MAXIMUM_FORECAST = 3
// Available reminder colors
export const colorSet = [
    '#ef9a9a', '#9fa8da', '#80cbc4', '#fff59d', '#ffcc80', '#b0bec5',
]
// Correspondent color name
const colorClass = [
    'red', 'purple', 'green', 'ÿellow', 'orange', 'grey',
]

export const colorMap = colorSet.reduce((map, color, index) => {
    map[color] = colorClass[index]
    return map
}, {} as {[colorValue: string]: string})
