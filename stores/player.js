import {
	defineStore
} from 'pinia'

export const usePlayerStore = defineStore('player', {
	state: () => ({
		audio: null,
		isPlaying: false,
		playlist: [],
		currentIndex: null,
		progress: 0,
		position: {
			top: 60
		} // 👈 全局共享位置
	}),
	actions: {
		async init() {
			if (!this.audio) {
				this.audio = uni.createInnerAudioContext()
				this.audio.autoplay = false
				this.audio.obeyMuteSwitch = false

				this.audio.onPlay(() => {
					this.isPlaying = true
				})
				this.audio.onPause(() => {
					this.isPlaying = false
				})
				this.audio.onStop(() => {
					this.isPlaying = false
				})
				this.audio.onEnded(() => {
					this.playRandom()
				})
				this.audio.onTimeUpdate(() => {
					this.progress = this.audio.duration ?
						this.audio.currentTime / this.audio.duration :
						0
				})
			}

			// 云对象获取歌曲列表
			if (this.playlist.length === 0) {
				const weddingService = uniCloud.importObject('weddingService');

				const res = await weddingService.getBgmList();
				this.playlist = res.data;
				this.playRandom();
			}
		},
		togglePlay() {
			if (!this.audio) this.init()
			if (this.isPlaying) {
				this.audio.pause()
			} else {
				if (!this.audio.src) {
					this.playRandom()
				} else {
					this.audio.play()
				}
			}
		},
		playRandom() {
			if (!this.audio || this.playlist.length === 0) return
			const nextIndex = Math.floor(Math.random() * this.playlist.length)
			this.currentIndex = nextIndex
			this.audio.src = this.playlist[nextIndex]
			this.audio.play()
		},
		setPosition(top) {
			this.position.top = top
		}
	}
})
