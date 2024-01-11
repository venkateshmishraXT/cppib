import {
    MEDIA_TRACK_WATCH_INTERVAL,
    DEFAULT_MEDIA_CONSTRAINTS
  } from "@/constants"
  
  export default class UserMedia {
    __permissionCallbacks = {}
    __mediaStateCallbacks = {}
  
    constructor() {
      if(typeof window === "undefined") return
      if (UserMedia.__instance) {
        return UserMedia.__instance
      }
      UserMedia.__instance = this
      this.__streams = {
        camera: undefined,
        audio: undefined
      }
      this.__state = {
        camera: {
          video: false
        },
        audio: {
          audio: false
        }
      }
      this.__permissions = {
        camera: false,
        audio: false
      }
      this.__defaultMediaConstraints = DEFAULT_MEDIA_CONSTRAINTS
      this.__watchStreamTracks()
    }
    async __getUserMedia(constraints) {
      return await window.navigator.mediaDevices.getUserMedia(constraints)
    }
  
    async __getDisplayMedia(constraints) {
      return await window.navigator.mediaDevices.getDisplayMedia(constraints)
    }
  
    async __capture(media, constraints) {
      const generateStreamObj = (
        media,
        success,
        mediaStream = undefined,
        exception
      ) => {
        const result = {
          type: media,
          success: success,
          stream: mediaStream
        }
        if (exception) {
          result.exception = exception
        }
        return result
      }
  
      if (media === "camera" || media === "audio") {
        try {
          const mediaStream = await this.__getUserMedia(constraints)
          if (mediaStream) {
            this.__updatePermissions(media, true)
            return generateStreamObj(media, true, mediaStream)
          } else {
            this.__updatePermissions(media, false)
            return generateStreamObj(media, false, undefined, "AbortError")
          }
        } catch (e) {
          this.__updatePermissions(media, false)
          return generateStreamObj(media, false, undefined, e.name)
        }
      }
    }
  
    __updatePermissions(media, value = false) {
      this.__permissions[media] = value
      if (this.__permissionCallbacks[media]) {
        this.__permissionCallbacks[media].forEach(mediaCallback => {
          if (typeof mediaCallback == "function") {
            mediaCallback(media, this.__permissions)
          }
        })
      }
    }
    __watchStreamTracks() {
      window.clearTimeout(this.__watchTimer)
      this.__watchTimer = window.setTimeout(() => {
        const mediaKeys = Object.keys(this.__streams)
        mediaKeys.forEach(media => {
          const stream = this.__streams[media]
          if (stream) {
            const tracks = stream.getTracks()
            tracks.forEach(track => {
              const { kind, enabled } = track
              const oldState = this.__state[media][kind]
              if (oldState !== enabled) {
                this.__onMediaStateChange(media, kind, enabled)
              }
            })
          }
        })
        this.__watchStreamTracks()
      }, MEDIA_TRACK_WATCH_INTERVAL)
    }
  
    __bindTrackEvents(streams) {
      streams.forEach(streamObj => {
        const { stream, type } = streamObj
        if (stream) {
          const tracks = stream.getTracks()
          tracks.forEach(track => {
            track.onended = () => {
              this.__onMediaStateChange(type, track.kind, false)
            }
          })
        } else {
          Object.keys(this.__state[type]).forEach(track => {
            this.__onMediaStateChange(type, track, false)
          })
        }
      })
    }
  
    __onMediaStateChange(media, track, state) {
      if (media === "screen" && !state) {
        this.__updatePermissions(media, state)
      }
      this.__state[media][track] = state
      const tracks = this.get(media, track)
      if (tracks) {
        const readyMediaTracks = tracks.filter(
          track => track.readyState !== "ended"
        )
        if (readyMediaTracks.length === 0) {
          this.__streams[media] = undefined
        }
      }
      if (this.__mediaStateCallbacks[media]) {
        this.__mediaStateCallbacks[media].forEach(callback => {
          typeof callback === "function" && callback(media, track, state)
        })
      }
      if (this.__mediaStateCallbacks["all"]) {
        this.__mediaStateCallbacks["all"].forEach(callback => {
          const state = JSON.parse(JSON.stringify(this.__state))
          typeof callback === "function" && callback(state)
        })
      }
    }
  
    registerPermissionStatusChange(media, callback) {
      media.forEach(key => {
        if (this.__permissionCallbacks[key]) {
          this.__permissionCallbacks[key].push(callback)
        } else {
          this.__permissionCallbacks[key] = [callback]
        }
      })
    }
    registerMediaStateChange(media, callback) {
      const register = key => {
        if (this.__mediaStateCallbacks[key]) {
          this.__mediaStateCallbacks[key].push(callback)
        } else {
          this.__mediaStateCallbacks[key] = [callback]
        }
      }
  
      if (Array.isArray(media)) {
        media.forEach(key => {
          register(key)
          this.__fireInstantCallbacks(key)
        })
      } else if (typeof media === "string") {
        register(media)
        this.__fireInstantCallbacks(media)
      }
    }
  
    __fireInstantCallbacks(media) {
      const stream = this.__streams[media]
      if (stream) {
        const tracks = stream.getTracks()
        tracks.forEach(track => {
          const { kind, enabled } = track
          if (enabled) {
            this.__onMediaStateChange(media, kind, enabled)
          }
        })
      }
    }
  
    async capture(userMediaConstraints) {
      const mediaKeys = Object.keys(userMediaConstraints)
      const availableStreams = mediaKeys.reduce((acc, media) => {
        const stream = this.get(media)
        if (stream) {
          acc.push({
            type: media,
            success: true,
            stream: stream
          })
          this.enable(media)
        }
        return acc
      }, [])
  
      const notAvailableMedia = mediaKeys.filter(media => {
        const stream = this.get(media)
        return !stream
      })
  
      const promiseArray = notAvailableMedia.map(media => {
        const userConstraints = userMediaConstraints[media]
        const defaultConstraints = this.__defaultMediaConstraints[media]
        const constraints =
          typeof userConstraints === "boolean"
            ? defaultConstraints
            : userConstraints
        return this.__capture(media, constraints)
      })
  
      const results = await Promise.all(promiseArray)
      results.forEach(result => {
        this.__streams[result.type] = result.stream
      })
      this.__bindTrackEvents(results)
      return results.reduce((acc, stream) => {
        acc.push(stream)
        return acc
      }, availableStreams)
    }
  
    free(mediaArray = ["camera","audio"]) {
      if (typeof mediaArray === "string") {
        mediaArray = mediaArray.split(",")
      }
      mediaArray.forEach(media => {
        const stream = this.__streams[media]
        if (stream) {
          stream.getTracks().forEach(track => {
            this.__onMediaStateChange(media, track.kind, false)
            track.stop()
          })
          this.__streams[media] = undefined
        }
      })
    }
  
    disable(media, track) {
      const stream = this.__streams[media]
      if (stream) {
        if (track) {
          const methodName = `get${track
            .substr(0, 1)
            .toUpperCase()}${track.substr(1)}Tracks`
          if (stream[methodName]) {
            const tracks = stream[methodName]()
            tracks.forEach(track => (track.enabled = false))
          }
        } else {
          const tracks = stream.getTracks()
          tracks.forEach(function(track) {
            track.enabled = false
          })
        }
      }
    }
  
    enable(media, track) {
      const stream = this.__streams[media]
      if (stream) {
        if (track) {
          const methodName = `get${track
            .substr(0, 1)
            .toUpperCase()}${track.substr(1)}Tracks`
          if (stream[methodName]) {
            const tracks = stream[methodName]()
            tracks.forEach(track => (track.enabled = true))
          }
        } else {
          stream.getTracks().forEach(track => (track.enabled = true))
        }
      }
    }
  
    get(media, track) {
      if (media && track) {
        const stream = this.__streams[media]
        const methodName = `get${track.substr(0, 1).toUpperCase()}${track.substr(
          1
        )}Tracks`
        if (stream && stream[methodName]) {
          const tracks = stream[methodName]()
          return tracks
        } else {
          return stream
        }
      } else {
        return this.__streams[media]
      }
    }
  
    static async getAvailableMediaDevices() {
      let mediaDevices
      try {
        let allDevices = await navigator.mediaDevices.enumerateDevices()
        mediaDevices = {}
        allDevices.forEach(device => {
          const kind = device.kind
          mediaDevices[kind] = mediaDevices[kind] ? mediaDevices[kind] : []
          mediaDevices[kind].push(device)
        })
      } catch (e) {
        console.log("Error in getting devices ", e)
      } finally {
        return mediaDevices ? mediaDevices : null
      }
    }
  
    setDevicesAndConstraints(audioInput, videoInput) {
      this.__defaultMediaConstraints.camera.video = Object.assign(
        this.__defaultMediaConstraints.camera.video,
        {
          device: { exact: videoInput.deviceId }
        }
      )
      this.__defaultMediaConstraints.audio = Object.assign(
        this.__defaultMediaConstraints.audio,
        {
          device: { exact: audioInput.deviceId }
        }
      )
    }
  }
  