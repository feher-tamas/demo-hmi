import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { useWindowContext } from '@renderer/context/WindowContext'
import { useTabName } from '@renderer/components/tabPanel/useTabName'
import BorderedIconButton from '@renderer/ui/BorderedIconButton'

const recordingSliceTime = 5e3
const recordingFileTime = 1e3 * 60 * 60

const VideoIcon = (): ReactElement => {
  const isActiveRef = useRef(false)
  const [isFlashy, setIsFlashy] = useState(false)
  const flashingIntervalRef = useRef<NodeJS.Timer>()
  const streamRef = useRef<MediaStream | null>()
  const recorderRef = useRef<MediaRecorder | null>()
  const isMountedRef = useRef(false)
  const { tab } = useWindowContext()
  const { getTabName } = useTabName()

  const theme = useTheme()
  const borderColor =
    theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.text.secondary

  const { mediaSourceId } = useWindowContext()

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop()
      })
      streamRef.current = null
    }
  }, [])

  const startRecorder = useCallback(() => {
    if (isActiveRef.current && streamRef.current) {
      recorderRef.current = new MediaRecorder(streamRef.current, { mimeType: 'video/webm' })

      const startTimestamp = Date.now()
      let isRecorderStopped = false

      recorderRef.current.ondataavailable = async (e): Promise<void> => {
        if (isMountedRef.current) {
          if (Date.now() - startTimestamp >= recordingFileTime && !isRecorderStopped) {
            isRecorderStopped = true
            recorderRef.current?.stop()
            startRecorder()
          }

          window.main.saveRecording(
            tab ? getTabName(tab) : 'mainwindow',
            new Uint8Array(await e.data.arrayBuffer()),
            startTimestamp
          )
        }
      }

      recorderRef.current.start(recordingSliceTime)
    }
  }, [tab, getTabName])

  const onToggleRecording = useCallback(async () => {
    if (!isActiveRef.current) {
      isActiveRef.current = true

      flashingIntervalRef.current = setInterval(() => {
        setIsFlashy((isFlashy) => !isFlashy)
      }, 500)

      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          // @ts-ignore: Electron specific options
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: mediaSourceId
          }
        }
      })

      if (isActiveRef.current) {
        startRecorder()
      } else {
        stopStream()
      }
    } else {
      if (recorderRef.current) {
        stopStream()
        recorderRef.current = null
      }
      isActiveRef.current = false
      clearInterval(flashingIntervalRef.current)
      setIsFlashy(false)
    }
  }, [mediaSourceId, startRecorder, stopStream])

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
      stopStream()
      clearInterval(flashingIntervalRef.current)
    }
  }, [])

  return (
    <BorderedIconButton
      onClick={onToggleRecording}
      sx={{
        '&.MuiButtonBase-root:hover': {
          bgcolor: 'transparent'
        }
      }}
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 20 20"
        fill={isFlashy ? (theme.palette.mode === 'light' ? '#62FF2B' : 'green') : 'none'}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.1666 5.83331L13.3333 9.99998L19.1666 14.1666V5.83331Z"
          stroke={borderColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.6666 4.16669H2.49998C1.57951 4.16669 0.833313 4.91288 0.833313 5.83335V14.1667C0.833313 15.0872 1.57951 15.8334 2.49998 15.8334H11.6666C12.5871 15.8334 13.3333 15.0872 13.3333 14.1667V5.83335C13.3333 4.91288 12.5871 4.16669 11.6666 4.16669Z"
          stroke={borderColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </BorderedIconButton>
  )
}

export default VideoIcon
