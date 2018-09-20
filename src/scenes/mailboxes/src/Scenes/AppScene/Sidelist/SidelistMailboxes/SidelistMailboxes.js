import React from 'react'
import { accountStore, accountActions } from 'stores/account'
import { settingsStore } from 'stores/settings'
import SidelistItemMailbox from './SidelistItemMailbox'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import shallowCompare from 'react-addons-shallow-compare'
import uuid from 'uuid'

const SortableItem = SortableElement(({ mailboxId, sortableGetScrollContainer }) => {
  // Only return native dom component here, otherwise adding and removing
  // becomes super-buggy!
  return (
    <div>
      <SidelistItemMailbox
        mailboxId={mailboxId}
        sortableGetScrollContainer={sortableGetScrollContainer} />
    </div>
  )
})

const SortableList = SortableContainer(({ mailboxIds, disabled, sortableGetScrollContainer }) => {
  return (
    <div>
      {mailboxIds.map((mailboxId, index) => (
        <SortableItem
          key={mailboxId}
          index={index}
          mailboxId={mailboxId}
          disabled={disabled}
          sortableGetScrollContainer={sortableGetScrollContainer}
          collection='Singleton_SidelistMailboxes' />
      ))}
    </div>
  )
})

const styles = {
  rootNoScrollbar: {
    // Linux overflow fix for https://github.com/wavebox/waveboxapp/issues/712.
    // Seems to only reproduce on certain pages (e.g. gmail)
    ...(process.platform === 'linux' ? {
      overflowY: 'hidden',
      '&:hover': { overflowY: 'auto' }
    } : {
      overflowY: 'auto'
    }),
    '&::-webkit-scrollbar': { display: 'none' }
  },
  rootWithScrollbar: {
    WebkitAppRegion: 'no-drag', // Drag region interfers with scrollbar drag

    // Linux overflow fix for https://github.com/wavebox/waveboxapp/issues/712.
    // Seems to only reproduce on certain pages (e.g. gmail)
    ...(process.platform === 'linux' ? {
      overflowY: 'hidden',
      '&:hover': { overflowY: 'overlay' }
    } : {
      overflowY: 'overlay'
    }),

    '&::-webkit-scrollbar': {
      WebkitAppearance: 'none',
      width: 7,
      height: 7
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: 4
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 4,
      backgroundColor: 'rgba(0,0,0,.5)',
      boxShadow: '0 0 2px rgba(255,255,255,.5)'
    }
  }
}

@withStyles(styles)
class SidelistMailboxes extends React.Component {
  /* **************************************************************************/
  // Lifecycle
  /* **************************************************************************/

  constructor (props) {
    super(props)

    this.instanceId = uuid.v4()
  }

  /* **************************************************************************/
  // Component Lifecycle
  /* **************************************************************************/

  componentDidMount () {
    accountStore.listen(this.accountChanged)
    settingsStore.listen(this.settingsChanged)
  }

  componentWillUnmount () {
    accountStore.unlisten(this.accountChanged)
    settingsStore.unlisten(this.settingsChanged)
  }

  /* **************************************************************************/
  // Data lifecycle
  /* **************************************************************************/

  state = (() => {
    const settingsState = settingsStore.getState()
    return {
      mailboxIds: accountStore.getState().mailboxIds(),
      disabled: settingsState.ui.lockSidebarsAndToolbars,
      showScrollbar: settingsState.ui.showSidebarScrollbars
    }
  })()

  accountChanged = (accountState) => {
    this.setState({ mailboxIds: accountState.mailboxIds() })
  }

  settingsChanged = (settingsState) => {
    this.setState({
      disabled: settingsState.ui.lockSidebarsAndToolbars,
      showScrollbar: settingsState.ui.showSidebarScrollbars
    })
  }

  /* **************************************************************************/
  // Rendering
  /* **************************************************************************/

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render () {
    const { className, classes, ...passProps } = this.props
    const { mailboxIds, disabled, showScrollbar } = this.state

    return (
      <div
        {...passProps}
        data-instance-id={this.instanceId}
        className={classNames(showScrollbar ? classes.rootWithScrollbar : classes.rootNoScrollbar, 'WB-Sidelist-Mailboxes', className)}>
        <SortableList
          axis='y'
          distance={5}
          mailboxIds={mailboxIds}
          disabled={disabled}
          getContainer={() => {
            // Fix for https://github.com/wavebox/waveboxapp/issues/713
            return document.querySelector(`[data-instance-id="${this.instanceId}"]`)
          }}
          sortableGetScrollContainer={() => {
            // Fix for https://github.com/wavebox/waveboxapp/issues/713
            return document.querySelector(`[data-instance-id="${this.instanceId}"]`)
          }}
          shouldCancelStart={(evt) => {
            // Fix for https://github.com/wavebox/waveboxapp/issues/762
            if (evt.ctrlKey === true) { return true }
          }}
          onSortEnd={({ oldIndex, newIndex }) => {
            accountActions.changeMailboxIndex(mailboxIds[oldIndex], newIndex)
          }} />
      </div>
    )
  }
}

export default SidelistMailboxes
