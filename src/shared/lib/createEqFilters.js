export const createEqFilters = (context, frequencies = [ 60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000 ]) => {

  let filters = frequencies.map((frequency) => {
      let filter = context.createBiquadFilter()

      filter.type = 'peaking'
      filter.frequency.value = frequency
      filter.Q.value = 1
      filter.gain.value = 0

      return filter
    })

  filters.reduce(function (prev, curr) {
    prev.connect(curr)
    return curr
  })

  return filters
}