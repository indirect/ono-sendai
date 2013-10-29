angular.module('deckBuilder')
  .controller('CardsCtrl', ($rootScope, $scope, $window, $log, $q, cardService, urlStateService) ->
    $scope.selectedCard = null


    # Assign cards to the scope once, but order them according to the default filter so the first images
    # to load are the ones visible to the user.
    $q.all([cardService.getCards(), cardService.query($scope.filter)])
      .then(([ cards, queryResult ]) ->
        $log.debug 'Assigning cards with default ordering'
        $scope.cards = queryResult.applyOrdering(cards, (card) -> card.id))

    $rootScope.broadcastZoomStart = ->
      $scope.$broadcast 'zoomStart'

    $rootScope.broadcastZoomEnd = ->
      $scope.$broadcast 'zoomEnd'

    $scope.selectCard = (card) ->
      $log.info "Selected card changing to #{ card.title }"
      $scope.selectedCard = card

    $scope.deselectCard = ->
      $log.info 'Card deselected'
      $scope.selectedCard = null

    $scope.isCardShown = (card, cardFilter) ->
      cardFilter[card.id]?

    $scope.$watch('filter', ((filter)->
      $log.debug 'Filter changed'
      urlStateService.updateUrl(filter)
      cardService.query(filter).then (queryResult) ->
        $log.debug 'Assigning new query result', queryResult
        $scope.queryResult = queryResult
    ), true)) # True to make sure field changes trigger this watch
