export default async function fetchMetalPrices() {
  try {
    const response = await fetch(
      `https://api.metalpriceapi.com/v1/latest?api_key=5ecc76ffdb8bfebc1265515a51661b1f&base=XAU&currencies=EUR,USD,XAG`
    )
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Failed to fetch metal prices')
    }
  } catch (error) {
    console.error('Error fetching metal prices:', error)
    throw error
  }
}
