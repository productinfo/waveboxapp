import MicrosoftService from './MicrosoftService'

class MicrosoftTasksService extends MicrosoftService {
  /* **************************************************************************/
  // Properties: Support
  /* **************************************************************************/

  get supportsUnreadActivity () { return false }
  get supportsUnreadCount () { return false }
  get supportsTrayMessages () { return false }
  get supportsSyncedDiffNotifications () { return false }
  get supportsNativeNotifications () { return false }
  get supportsGuestNotifications () { return false }
  get supportsSyncWhenSleeping () { return false }
  get supportsWBGAPI () { return false }
  get supportedAuthNamespace () { return undefined }

  /* **************************************************************************/
  // Properties: Humanized
  /* **************************************************************************/

  get humanizedType () { return 'Tasks' }
  get humanizedLogos () {
    return [
      'microsoft/logo_tasks_32px.png',
      'microsoft/logo_tasks_48px.png',
      'microsoft/logo_tasks_64px.png',
      'microsoft/logo_tasks_96px.png',
      'microsoft/logo_tasks_128px.png'
    ]
  }

  /* **************************************************************************/
  // Properties: Behaviour
  /* **************************************************************************/

  get outlookUrl () { return 'https://outlook.com/owa/?path=/tasks' }
  get o365Url () { return 'https://outlook.office365.com/owa/?path=/tasks' }
}

export default MicrosoftTasksService