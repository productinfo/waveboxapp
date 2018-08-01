module.exports = Object.freeze({
  // Runtime
  CRX_RUNTIME_CONTENTSCRIPT_CONNECT_: 'CRX_RUNTIME_CONTENTSCRIPT_CONNECT_',
  CRX_RUNTIME_SENDMESSAGE: 'CRX_RUNTIME_SENDMESSAGE',
  CRX_RUNTIME_ONMESSAGE_: 'CRX_RUNTIME_ONMESSAGE_',
  CRX_RUNTIME_HAS_RESPONDER: 'CRX_RUNTIME_HAS_RESPONDER',

  // Runtime: port
  CRX_PORT_CONNECT_SYNC: 'CRX_PORT_CONNECT_SYNC',
  CRX_PORT_CONNECTED_: 'CRX_PORT_CONNECTED_',
  CRX_PORT_DISCONNECT_: 'CRX_PORT_DISCONNECT_',
  CRX_PORT_POSTMESSAGE_: 'CRX_PORT_POSTMESSAGE_',

  // Tabs
  CRX_TABS_SENDMESSAGE: 'CRX_TABS_SENDMESSAGE',
  CRX_TABS_CREATE_FROM_BG_: 'CRX_TABS_CREATE_FROM_BG_',
  CRX_TABS_QUERY_: 'CRX_TABS_QUERY_',
  CRX_TABS_GET_: 'CRX_TABS_GET_',
  CRX_TABS_UPDATE_: 'CRX_TABS_UPDATE_',
  CRX_TABS_REMOVE_: 'CRX_TABS_REMOVE_',
  CRX_TABS_CREATED_: 'CRX_TABS_CREATED_',
  CRX_TABS_REMOVED_: 'CRX_TABS_REMOVED_',
  CRX_TAB_ACTIVATED_: 'CRX_TAB_ACTIVATED_',
  CRX_TAB_UPDATED_: 'CRX_TAB_UPDATED_',
  CRX_TAB_EXECUTE_SCRIPT_: 'CRX_TAB_EXECUTE_SCRIPT_',

  // Windows
  CRX_WINDOW_FOCUS_CHANGED_: 'CRX_WINDOW_FOCUS_CHANGED_',
  CRX_WINDOW_GET_ALL_: 'CRX_WINDOW_GET_ALL_',

  // Data
  CRX_GET_MANIFEST_: 'CRX_GET_MANIFEST_',
  CRX_GET_MESSAGES_: 'CRX_GET_MESSAGES_',

  // Browser action
  CRX_BROWSER_ACTION_SET_TITLE_: 'CRX_BROWSER_ACTION_SET_TITLE_',
  CRX_BROWSER_ACTION_FETCH_TITLE_: 'CRX_BROWSER_ACTION_FETCH_TITLE_',
  CRX_BROWSER_ACTION_SET_ICON_: 'CRX_BROWSER_ACTION_SET_ICON_',
  CRX_BROWSER_ACTION_SET_POPUP_: 'CRX_BROWSER_ACTION_SET_POPUP_',
  CRX_BROWSER_ACTION_FETCH_POPUP_: 'CRX_BROWSER_ACTION_FETCH_POPUP_',
  CRX_BROWSER_ACTION_SET_BADGE_TEXT_: 'CRX_BROWSER_ACTION_SET_BADGE_TEXT_',
  CRX_BROWSER_ACTION_FETCH_BADGE_TEXT_: 'CRX_BROWSER_ACTION_FETCH_BADGE_TEXT_',
  CRX_BROWSER_ACTION_SET_BADGE_BACKGROUND_COLOR_: 'CRX_BROWSER_ACTION_SET_BADGE_BACKGROUND_COLOR_',
  CRX_BROWSER_ACTION_FETCH_BADGE_BACKGROUND_COLOR_: 'CRX_BROWSER_ACTION_FETCH_BADGE_BACKGROUND_COLOR_',
  CRX_BROWSER_ACTION_ENABLE_: 'CRX_BROWSER_ACTION_ENABLE_',
  CRX_BROWSER_ACTION_DISABLE_: 'CRX_BROWSER_ACTION_DISABLE_',
  CRX_BROWSER_ACTION_CLICKED_: 'CRX_BROWSER_ACTION_CLICKED_',
  CRX_BROWSER_ACTION_OPEN_POPUP_: 'CRX_BROWSER_ACTION_OPEN_POPUP_',
  CRX_BROWSER_ACTION_CREATE_FROM_BG_: 'CRX_BROWSER_ACTION_CREATE_FROM_BG_',

  // Storage
  CRX_STORAGE_GET_: 'CRX_STORAGE_GET_',
  CRX_STORAGE_SET_: 'CRX_STORAGE_SET_',
  CRX_STORAGE_REMOVE_: 'CRX_STORAGE_REMOVE_',
  CRX_STORAGE_CLEAR_: 'CRX_STORAGE_CLEAR_',
  CRX_STORAGE_CHANGED_: 'CRX_STORAGE_CHANGED_',

  // Context Menu
  CRX_CONTEXT_MENU_CREATE_: 'CRX_CONTEXT_MENU_CREATE_',
  CRX_CONTEXT_MENU_CLICKED_: 'CRX_CONTEXT_MENU_CLICKED_',
  CRX_CONTEXT_MENU_REMOVE_ALL_: 'CRX_CONTEXT_MENU_REMOVE_ALL_',

  // WebRequest
  CRX_WEB_REQUEST_ON_BEFORE_REQUEST_: 'CRX_WEB_REQUEST_ON_BEFORE_REQUEST_',
  CRX_WEB_REQUEST_ON_BEFORE_REQUEST_ADD_: 'CRX_WEB_REQUEST_ON_BEFORE_REQUEST_ADD_',
  CRX_WEB_REQUEST_ON_BEFORE_REQUEST_REMOVE_: 'CRX_WEB_REQUEST_ON_BEFORE_REQUEST_REMOVE_',

  CRX_WEB_REQUEST_ON_BEFORE_SEND_HEADERS_: 'CRX_WEB_REQUEST_ON_BEFORE_SEND_HEADERS_',
  CRX_WEB_REQUEST_ON_BEFORE_SEND_HEADERS_ADD_: 'CRX_WEB_REQUEST_ON_BEFORE_SEND_HEADERS_ADD_',
  CRX_WEB_REQUEST_ON_BEFORE_SEND_HEADERS_REMOVE_: 'CRX_WEB_REQUEST_ON_BEFORE_SEND_HEADERS_REMOVE_',

  CRX_WEB_REQUEST_ON_SEND_HEADERS_: 'CRX_WEB_REQUEST_ON_SEND_HEADERS_',
  CRX_WEB_REQUEST_ON_SEND_HEADERS_ADD_: 'CRX_WEB_REQUEST_ON_SEND_HEADERS_ADD_',
  CRX_WEB_REQUEST_ON_SEND_HEADERS_REMOVE_: 'CRX_WEB_REQUEST_ON_SEND_HEADERS_REMOVE_',

  CRX_WEB_REQUEST_ON_HEADERS_RECEIVED_: 'CRX_WEB_REQUEST_ON_HEADERS_RECEIVED_',
  CRX_WEB_REQUEST_ON_HEADERS_RECEIVED_ADD_: 'CRX_WEB_REQUEST_ON_HEADERS_RECEIVED_ADD_',
  CRX_WEB_REQUEST_ON_HEADERS_RECEIVED_REMOVE_: 'CRX_WEB_REQUEST_ON_HEADERS_RECEIVED_REMOVE_',

  CRX_WEB_REQUEST_ON_RESPONSE_STARTED_: 'CRX_WEB_REQUEST_ON_RESPONSE_STARTED_',
  CRX_WEB_REQUEST_ON_RESPONSE_STARTED_ADD_: 'CRX_WEB_REQUEST_ON_RESPONSE_STARTED_ADD_',
  CRX_WEB_REQUEST_ON_RESPONSE_STARTED_REMOVE_: 'CRX_WEB_REQUEST_ON_RESPONSE_STARTED_REMOVE_',

  CRX_WEB_REQUEST_ON_BEFORE_REDIRECT_: 'CRX_WEB_REQUEST_ON_BEFORE_REDIRECT_',
  CRX_WEB_REQUEST_ON_BEFORE_REDIRECT_ADD_: 'CRX_WEB_REQUEST_ON_BEFORE_REDIRECT_ADD_',
  CRX_WEB_REQUEST_ON_BEFORE_REDIRECT_REMOVE_: 'CRX_WEB_REQUEST_ON_BEFORE_REDIRECT_REMOVE_',

  CRX_WEB_REQUEST_ON_COMPLETED_: 'CRX_WEB_REQUEST_ON_COMPLETED_',
  CRX_WEB_REQUEST_ON_COMPLETED_ADD_: 'CRX_WEB_REQUEST_ON_COMPLETED_ADD_',
  CRX_WEB_REQUEST_ON_COMPLETED_REMOVE_: 'CRX_WEB_REQUEST_ON_COMPLETED_REMOVE_',

  CRX_WEB_REQUEST_ON_ERROR_OCCURRED_: 'CRX_WEB_REQUEST_ON_ERROR_OCCURRED_',
  CRX_WEB_REQUEST_ON_ERROR_OCCURRED_ADD_: 'CRX_WEB_REQUEST_ON_ERROR_OCCURRED_ADD_',
  CRX_WEB_REQUEST_ON_ERROR_OCCURRED_REMOVE_: 'CRX_WEB_REQUEST_ON_ERROR_OCCURRED_REMOVE_',

  // Cookies
  CRX_COOKIES_GET_: 'CRX_COOKIES_GET_',
  CRX_COOKIES_GET_ALL_: 'CRX_COOKIES_GET_ALL_',
  CRX_COOKIES_SET_: 'CRX_COOKIES_SET_',
  CRX_COOKIES_REMOVE_: 'CRX_COOKIES_REMOVE_',
  CRX_COOKIES_CHANGED_: 'CRX_COOKIES_CHANGED_',

  // Extension
  CRX_GET_WEBCONTENT_META_SYNC_: 'CRX_GET_WEBCONTENT_META_SYNC_'
})
