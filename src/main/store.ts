import { InfoPanelItem, SensorGroup, TabValue, WindowLocation, WindowType } from '../shared/types'
import ElectronStore, { Schema } from 'electron-store'
import { TabDetails } from './tab-window'
import appSettings from './app-settings'

export type SchemaType = {
  theme: string
  language: string
  format: string
  dateFormat: string
  timeFormat: string
  screenshotsDir: string
  recordingsDir: string
  tabs: TabValue[]
  tabWindows: TabDetails[]
  windowLocation: Record<WindowType, WindowLocation>
  selectedSensor: number | null
  selectedSensorGroup: SensorGroup | null
  selectedTab: number
  selectedInfoPanel: InfoPanelItem | null
  mainWindowZoomLevel: number
}

const schema: Schema<SchemaType> = {
  theme: {
    type: 'string',
    default: appSettings.theme
  },
  language: {
    type: 'string',
    default: appSettings.language
  },
  format: {
    type: 'string',
    default: appSettings.coordinateSystemFormat
  },
  dateFormat: {
    type: 'string',
    default: appSettings.dateFormat
  },
  timeFormat: {
    type: 'string',
    default: appSettings.timeFormat
  },
  mainWindowZoomLevel: {
    type: 'number',
    default: 1
  },
  windowLocation: {
    type: 'object',
    default: {
      settings: appSettings.settingsPopupLocation,
      about: appSettings.aboutPopupLocation
    },
    properties: {
      settings: {
        type: 'object',
        properties: {
          x: { type: 'number', default: appSettings.aboutPopupLocation.x },
          y: { type: 'number', default: appSettings.aboutPopupLocation.y }
        }
      },
      about: {
        type: 'object',
        properties: {
          x: { type: 'number', default: appSettings.aboutPopupLocation.x },
          y: { type: 'number', default: appSettings.aboutPopupLocation.y }
        }
      }
    }
  },

  screenshotsDir: {
    type: 'string',
    default: appSettings.screenshotFolderPath
  },
  recordingsDir: {
    type: 'string',
    default: appSettings.videoCaptureFolderPath
  },
  tabs: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        tab: {
          type: 'object',
          properties: {
            sensors: {
              anyOf: [
                {
                  type: 'object',
                  properties: {
                    sensorId: { type: ['number', 'null'] },
                    map: {
                      type: 'object',
                      properties: {
                        zoom: { type: 'number' },
                        center: { type: 'array', items: { type: 'number' } },
                        rotation: { type: 'number' }
                      }
                    }
                  }
                },
                {
                  type: 'object',
                  properties: {
                    top: {
                      oneOf: [
                        { type: 'number' },
                        {
                          type: 'object',
                          properties: {
                            left: { type: 'number' },
                            right: { type: 'number' }
                          }
                        }
                      ]
                    },
                    bottom: {
                      oneOf: [
                        { type: 'number' },
                        {
                          type: 'object',
                          properties: {
                            left: { type: 'number' },
                            right: { type: 'number' }
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  type: 'object',
                  properties: {
                    left: {
                      oneOf: [
                        { type: 'number' },
                        {
                          type: 'object',
                          properties: {
                            top: { type: 'number' },
                            bottom: { type: 'number' }
                          }
                        }
                      ]
                    },
                    right: {
                      oneOf: [
                        { type: 'number' },
                        {
                          type: 'object',
                          properties: {
                            top: { type: 'number' },
                            bottom: { type: 'number' }
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            },
            label: {
              oneOf: [{ type: 'string' }, { type: 'null' }]
            },
            initialLabel: { type: 'string' },
            initialTabIndex: { type: 'number' },
            overview: { type: 'boolean' }
          }
        }
      }
    },
    default: [
      {
        initialLabel: 'Overview',
        label: null,
        initialTabIndex: 0,
        overview: true,
        sensors: { map: { zoom: 15, center: [47.47491132731897, 19.081462579986113], rotation: 0 } }
      }
    ]
  },
  tabWindows: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        tab: {
          type: 'object',
          properties: {
            sensors: {
              anyOf: [
                {
                  type: 'object',
                  properties: {
                    sensorId: { type: ['number', 'null'] },
                    map: {
                      type: 'object',
                      properties: {
                        zoom: { type: 'number' },
                        center: { type: 'array', items: { type: 'number' } },
                        rotation: { type: 'number' }
                      }
                    }
                  }
                },
                {
                  type: 'object',
                  properties: {
                    top: {
                      oneOf: [
                        { type: 'number' },
                        {
                          type: 'object',
                          properties: {
                            left: { type: 'number' },
                            right: { type: 'number' }
                          }
                        }
                      ]
                    },
                    bottom: {
                      oneOf: [
                        { type: 'number' },
                        {
                          type: 'object',
                          properties: {
                            left: { type: 'number' },
                            right: { type: 'number' }
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  type: 'object',
                  properties: {
                    left: {
                      oneOf: [
                        { type: 'number' },
                        {
                          type: 'object',
                          properties: {
                            top: { type: 'number' },
                            bottom: { type: 'number' }
                          }
                        }
                      ]
                    },
                    right: {
                      oneOf: [
                        { type: 'number' },
                        {
                          type: 'object',
                          properties: {
                            top: { type: 'number' },
                            bottom: { type: 'number' }
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            },
            label: {
              oneOf: [{ type: 'string' }, { type: 'null' }]
            },
            initialLabel: { type: 'string' },
            initialTabIndex: { type: 'number' },
            overview: { type: 'boolean' }
          }
        },

        tabIndex: { type: 'number' },
        zoomLevel: { type: 'number', default: 1 }
      }
    },
    default: []
  },
  selectedSensor: {
    type: ['number', 'null'],
    default: appSettings.selectedSensor
  },
  selectedSensorGroup: {
    type: ['string', 'null'],
    default: appSettings.selectedSensorGroup
  },
  selectedTab: {
    type: 'number',
    default: appSettings.selectedTab
  },
  selectedInfoPanel: {
    type: ['string', 'null']
  }
}
const store = new ElectronStore({ schema })

export default store
