function u (list1, list2) {
  return list1.concat(list2).reduce(function(union, item){
    return list1.contains(item) && list2.contains(item) && !union.contains(item) ? union.concat(item) : union
  }, [])
}

function n (list1, list2) {
  return list1.concat(list2).reduce(function(intersection, item){
    return (!list1.contains(item) || !list2.contains(item)) && !intersection.contains(item) ? intersection.concat(item) : intersection
  }, [])
}

function jaccardIndex (list1, list2) {  // union over total
  if (list1.length === 0 && list2.length === 0) { return 0 }
  var union = u(list1, list2)
  var intersection = n(list1, list2)
  return union.length / (union.length + intersection.length)
}

function calculateAgreement (user1, user2) { // agreements over total
  var agreements = u(user1.likes, user2.likes).length + u(user1.dislikes, user2.dislikes).length
  var total = agreements + n(user1.likes, user2.likes).length + n(user1.dislikes, user2.dislikes).length
  return agreements / total
}

function calculateDisagreement (user1, user2) { // disagreement over total
  var disagreements = u(user1.likes, user2.dislikes).length + u(user1.dislikes, user2.likes).length
  var total = disagreements + n(user1.likes, user2.dislikes).length + n(user1.dislikes, user2.likes).length
  return disagreements / total
}

function calculateSimilarity (user1, user2) { // agreements - disagreements over total
  return calculateAgreement(user1, user2) - calculateDisagreement(user1, user2)
}

function predictLike (itemId, user, users) {
  var usersExceptUser = n(users, [user])
  var usersWhoLikesItem = usersExceptUser.filter(whoLikes(itemId))
  var sumSimilarityWithLikers = usersWhoLikesItem.reduce(sumWith(calculateSimilarity), 0.0)

  function whoLikes (itemId) {
    return function (user) {
      return user.likes.contains(itemId)
    }
  }

  function sumWith (func) {
    return function (sum, otherUser) {
      return sum += calculateSimilarity(user, otherUser)
    }
  }

  var usersWhoDislikesItem = usersExceptUser.filter(whoDislikes(itemId))

  function whoDislikes (itemId) {
    return function (user) {
      return user.dislikes.contains(itemId)
    }
  }

  var sumSimilarityWithDislikers = usersWhoDislikesItem.reduce(sumWith(calculateSimilarity), 0.0)
  var usersWhoRatedItem = usersWhoLikesItem.length + usersWhoDislikesItem.length
  var probabilityOfLike = (sumSimilarityWithLikers - sumSimilarityWithDislikers) / usersWhoRatedItem
  return probabilityOfLike
}

function recommendationsFor(user, users) {
  var allItemIds = users.reduce(getItemIds, [])
  function getItemIds (itemIds, user) {
    return user.likes.concat(user.dislikes).reduce(aggregateUnique, itemIds)
  }
  function aggregateUnique (array, element) {
    return array.contains(element) ? array : array.concat(element)
  }

  var unratedItemIds = allItemIds.filter(userHasNotRated)
  function userHasNotRated (itemId) {
    return !user.likes.concat(user.dislikes).contains(itemId)
  }

  var predictions = unratedItemIds.map(function(itemId){
    return {id: itemId, predictedRating: predictLike(itemId, user, users)}
  })

  var sortedPredictions = predictions.sort(function(a, b){
    return a.predictedRating < b.predictedRating
  })

  var recommendations = sortedPredictions.map(function (prediction) {
    return prediction.id
  })

  // return array of itemIds ordered by greatest probabilityOfLike first
  return recommendations
}

// You're welcome to use this but you don't have to: [1,2,3].contains(2) -> true
Object.defineProperty(Array.prototype, 'contains', {
  value: function (primitive) {
    return this.indexOf(primitive) !== -1 // <- Nobody wants to read that!
  },
  enumerable: false // Looking at object's keys will NOT include this property.
});
