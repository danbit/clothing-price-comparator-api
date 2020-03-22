const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

const serverTest = async () => {
  await sleep(1000)
  console.log('server running')
}

console.log(serverTest())
