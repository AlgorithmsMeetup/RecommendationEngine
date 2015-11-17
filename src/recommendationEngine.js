function intersection (list1, list2) {
  return list1.concat(list2).reduce(function (results, item) {
    return list1.includes(item) && list2.includes(item) && !results.includes(item) ? results.concat(item) : results
  }, [])
}

function symmetricDifference (list1, list2) {
  return list1.concat(list2).reduce(function (results, item) {
    return (!list1.includes(item) || !list2.includes(item)) && !results.includes(item) ? results.concat(item) : results
  }, [])
}

function jaccardIndex (list1, list2) {  // intersection over total
  if (list1.length === 0 && list2.length === 0) { return 0 }
  var intersect = intersection(list1, list2)
  var diff = symmetricDifference(list1, list2)
  return intersect.length / (intersect.length + diff.length)
}

function calculateAgreement (user1, user2) { // agreements over total
  var agreements = intersection(user1.likes, user2.likes).length + intersection(user1.dislikes, user2.dislikes).length
  var total = agreements + symmetricDifference(user1.likes, user2.likes).length + symmetricDifference(user1.dislikes, user2.dislikes).length
  return agreements / total
}

function calculateDisagreement (user1, user2) { // disagreement over total
  var disagreements = intersection(user1.likes, user2.dislikes).length + intersection(user1.dislikes, user2.likes).length
  var total = disagreements + symmetricDifference(user1.likes, user2.dislikes).length + symmetricDifference(user1.dislikes, user2.likes).length
  return disagreements / total
}

function calculateSimilarity (user1, user2) { // agreements - disagreements over total
  return calculateAgreement(user1, user2) - calculateDisagreement(user1, user2)
}

function predictLike (itemId, user, users) {
  var usersExceptUser = symmetricDifference(users, [user])
  var usersWhoLikesItem = usersExceptUser.filter(whoLikes(itemId))
  var sumSimilarityWithLikers = usersWhoLikesItem.reduce(sumWith(calculateSimilarity), 0.0)

  function whoLikes (itemId) {
    return function (user) {
      return user.likes.includes(itemId)
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
      return user.dislikes.includes(itemId)
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
    return array.includes(element) ? array : array.concat(element)
  }

  var unratedItemIds = allItemIds.filter(userHasNotRated)
  function userHasNotRated (itemId) {
    return !user.likes.concat(user.dislikes).includes(itemId)
  }

  var predictions = unratedItemIds.map(function (itemId) {
    return {id: itemId, predictedRating: predictLike(itemId, user, users)}
  })

  var sortedPredictions = predictions.sort(function (a, b) {
    return a.predictedRating < b.predictedRating
  })

  var recommendations = sortedPredictions.map(function (prediction) {
    return prediction.id
  })

  // return array of itemIds ordered by greatest probabilityOfLike first
  return recommendations
}

// You're welcome to use this but you don't have to: [1,2,3].includes(2) -> true
Object.defineProperty(Array.prototype, 'includes', {
  value: function (primitive) {
    return this.indexOf(primitive) !== -1 // <- Nobody wants to read that!
  },
  enumerable: false // Looking at object's keys will NOT include this property.
});
