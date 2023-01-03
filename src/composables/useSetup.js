import { ref } from 'vue'

const setup = ref({
  port: 12345,
  delay: 2000,
  mode: 'Simple'
})

const updateSetup = (args) => {
  if (args && args.port) {
    setup.value.port = args.port
  }
  if (args && args.delay) {
    setup.value.delay = args.delay
  }
  if (args && args.mode) {
    setup.value.mode = args.mode
  }
}

export { setup, updateSetup }
