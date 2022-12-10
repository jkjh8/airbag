import { ref } from 'vue'

const player = ref([
  {
    id: 0,
    files: [
      'C:/Users/jkjh8/Desktop/SynologyDrive/테스트 음악/Pandas Dream.wav',
      '',
      ''
    ],
    deviceId: '',
    playlink: false
  },
  {
    id: 1,
    files: ['', '', ''],
    deviceId: '',
    playlink: false
  },
  {
    id: 2,
    files: ['', '', ''],
    deviceId: '',
    playlink: false
  },
  {
    id: 3,
    files: ['', '', ''],
    deviceId: '',
    playlink: false
  },
  {
    id: 4,
    files: ['', '', ''],
    deviceId: '',
    playlink: false
  },
  {
    id: 5,
    files: ['', '', ''],
    deviceId: '',
    playlink: false
  },
  {
    id: 6,
    files: ['', '', ''],
    deviceId: '',
    playlink: false
  }
])

const updatePlayer = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    player.value[arr[i].id] = { ...player.value[arr[i].id], ...arr[i] }
  }
  console.log(player.value)
}

export { player, updatePlayer }
