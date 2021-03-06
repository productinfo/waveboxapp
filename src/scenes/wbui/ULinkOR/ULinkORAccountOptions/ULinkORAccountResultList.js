import React from 'react'
import PropTypes from 'prop-types'
import shallowCompare from 'react-addons-shallow-compare'
import { List } from '@material-ui/core'
import Fuse from 'fuse.js'
import ULinkORAccountResultListItem from './ULinkORAccountResultListItem'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import StyleMixins from '../../Styles/StyleMixins'
import { URL } from 'url'

const privAccountStore = Symbol('privAccountStore')
const privFuse = Symbol('privFuse')

const styles = {
  root: {
    height: 200,
    ...StyleMixins.scrolling.alwaysShowVerticalScrollbars
  }
}

@withStyles(styles)
class ULinkORAccountResultList extends React.Component {
  /* **************************************************************************/
  // Class
  /* **************************************************************************/

  static propTypes = {
    targetUrl: PropTypes.string.isRequired,
    searchTerm: PropTypes.string,
    accountStore: PropTypes.object.isRequired,
    avatarResolver: PropTypes.func.isRequired,
    onOpenInService: PropTypes.func.isRequired
  }

  /* **************************************************************************/
  // Lifecycle
  /* **************************************************************************/

  constructor (props) {
    super(props)

    this[privAccountStore] = this.props.accountStore
    this[privFuse] = new Fuse([], {
      threshold: 0.3,
      location: 0,
      distance: 100,
      includeScore: false,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      tokenize: true,
      keys: [
        'displayName',
        'mailboxHelperName',
        'url',
        'title'
      ]
    })

    // Generate state
    const accountState = this[privAccountStore].getState()
    this.state = {
      searchResults: this.generateNewSearchResults(accountState, this.props.searchTerm),
      suggestedResults: this.generateSuggestedSearchResults(accountState, this.props.targetUrl)
    }
  }

  /* **************************************************************************/
  // Component Lifecycle
  /* **************************************************************************/

  componentDidMount () {
    this[privAccountStore].listen(this.accountChanged)
  }

  componentWillUnmount () {
    this[privAccountStore].unlisten(this.accountChanged)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.accountStore !== nextProps.accountStore) {
      console.warn('Changing props.accountStore is not supported in ULinkORAccountResultList and will be ignored')
    }

    if (this.props.searchTerm !== nextProps.searchTerm) {
      const accountState = this[privAccountStore].getState()
      this.setState({
        searchResults: this.generateNewSearchResults(accountState, nextProps.searchTerm)
      })
    }
    if (this.props.targetUrl !== nextProps.targetUrl) {
      const accountState = this[privAccountStore].getState()
      this.setState({
        suggestedResults: this.generateSuggestedSearchResults(accountState, this.props.targetUrl)
      })
    }
  }

  /* **************************************************************************/
  // Data lifecycle
  /* **************************************************************************/

  accountChanged = (accountState) => {
    this.setState({
      searchResults: this.generateNewSearchResults(accountState, this.props.searchTerm),
      suggestedResults: this.generateSuggestedSearchResults(accountState, this.props.targetUrl)
    })
  }

  /**
  * Generates a new search results
  * @param accountState: the current account state
  * @param term: the term to search over
  * @return and array of search results
  */
  generateNewSearchResults (accountState, term) {
    if (!term) { return [] }

    const collection = accountState.allServicesUnordered().map((service) => {
      const serviceData = accountState.getServiceData(service.id)
      const serviceDisplayName = accountState.resolvedServiceDisplayName(service.id, undefined)
      const mailboxHelperName = accountState.resolvedMailboxExplicitServiceDisplayName(service.parentId)

      return {
        id: service.id,
        parentId: service.parentId,
        displayName: serviceDisplayName,
        mailboxHelperName: mailboxHelperName,
        url: service.getUrlWithData(serviceData),
        title: serviceData ? serviceData.documentTitle : undefined
      }
    })

    this[privFuse].setCollection(collection)
    const results = this[privFuse].search(term)
    return results.map((res) => res.id)
  }

  /**
  * Generates a set of suggested search results
  * @param accountState: the current account state
  * @param targetUrl: the url we're trying to open
  * @return and array of account ids
  */
  generateSuggestedSearchResults (accountState, targetUrl) {
    // Look in the URL for hostnames. Also look through the
    // querystring params for valid urls with hostnames
    const targetHostnames = new Set()
    let pTargetUrl
    try {
      pTargetUrl = new URL(targetUrl)
    } catch (ex) { }

    if (pTargetUrl) {
      if (pTargetUrl.hostname) {
        targetHostnames.add(pTargetUrl.hostname)
      }
      Array.from(pTargetUrl.searchParams.values()).forEach((val) => {
        try {
          const qsHostname = new URL(val).hostname
          if (qsHostname) {
            targetHostnames.add(qsHostname)
          }
        } catch (ex) { }
      })
    }

    // Generate some partial hostnames
    const targetRootHostnames = new Set()
    targetHostnames.forEach((hostname) => {
      const root = hostname.split('.').slice(-2, -1)[0]
      if (root) { targetRootHostnames.add(root) }
    })

    // Sort the services by matched an unmatched
    const { full, root, none } = accountState.allServicesOrdered().reduce((acc, service) => {
      const serviceUrl = service.getUrlWithData(
        accountState.getServiceData(service.id),
        accountState.getMailboxAuthForServiceId(service.id)
      )
      let serviceUrlHostname
      let serviceUrlRootHostname
      try {
        serviceUrlHostname = new URL(serviceUrl).hostname
        serviceUrlRootHostname = serviceUrlHostname.split('.').slice(-2, -1)[0]
      } catch (ex) { }

      if (serviceUrlHostname && targetHostnames.has(serviceUrlHostname)) {
        acc.full.push(service.id)
      } else if (serviceUrlRootHostname && targetRootHostnames.has(serviceUrlRootHostname)) {
        acc.root.push(service.id)
      } else {
        acc.none.push(service.id)
      }

      return acc
    }, { full: [], root: [], none: [] })

    return [].concat(full, root, none)
  }

  /* **************************************************************************/
  // UI Events
  /* **************************************************************************/

  /**
  * Handles the account being clicked
  * @param evt: the event that fired
  * @param serviceId: the id of the service
  */
  handleServiceClick = (evt, serviceId) => {
    this.props.onOpenInService(evt, serviceId)
  }

  /* **************************************************************************/
  // Rendering
  /* **************************************************************************/

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render () {
    const {
      targetUrl,
      searchTerm,
      accountStore,
      avatarResolver,
      className,
      classes,
      onOpenInService,
      ...passProps
    } = this.props
    const {
      searchResults,
      suggestedResults
    } = this.state

    const renderResults = searchTerm ? searchResults : suggestedResults
    return (
      <List dense className={classNames(classes.root, className)} {...passProps}>
        {renderResults.map((serviceId) => {
          return (
            <ULinkORAccountResultListItem
              key={serviceId}
              serviceId={serviceId}
              accountStore={this[privAccountStore]}
              avatarResolver={avatarResolver}
              onClick={this.handleServiceClick} />
          )
        })}
      </List>
    )
  }
}

export default ULinkORAccountResultList
