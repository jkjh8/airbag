import { ref } from 'vue'

const setup = ref({
  port: 12300,
  delay: 2000
})

const updateSetup = (args) => {
  if (args.port) {
    setup.value.port = args.port
  }
  if (args.delay) {
    setup.value.delay = args.delay
  }
}

export { setup, updateSetup }
