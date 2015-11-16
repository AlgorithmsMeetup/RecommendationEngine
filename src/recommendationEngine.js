function u (list1, list2) {
  // return list of items present in both lists
}

function n (list1, list2) {
  // return list of items present in only of of the two lists
}

function jaccardIndex (list1, list2) {
  // return decimal (0.0 to 1.0) which is the union over the total items
}

function calculateAgreement (user1, user2) {
  // return decimal (0.0 to 1.0) which is the agreement (likes AND dislikes) over the total
}

function calculateDisagreement (user1, user2) {
  // return decimal (0.0 to 1.0) which is the disagreement over the total
}

function calculateSimilarity (user1, user2) {
  // return decimal (-1.0 to 1.0) which is the agrement minus the disagreement over the total
}

function predictLike (itemId, user, users) {
  // return decimal (-1.0 to 1.0) which is the probability the user will like the item
}

function recommendationsFor(user, users) {
  // return list of item ids ordered by probability the user will like the item (greatest first)
}

// You're welcome to use this but you don't have to: [1,2,3].contains(2) -> true
Object.defineProperty(Array.prototype, 'includes', {
  value: function (primitive) {
    return this.indexOf(primitive) !== -1 // <- Nobody wants to read that!
  },
  enumerable: false // Looking at object's keys will NOT include this property.
});
