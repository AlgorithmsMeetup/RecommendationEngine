var expect = chai.expect;

describe('Recommendation Engine', function () {
  describe('union', function () {
    it('returns the union of two lists', function () {
      var list1 = [1,3,4]
      var list2 = [3,4,5]
      expect(u(list1, list2)).to.deep.equal([3,4])
    })

    it('handles lists of unequal length', function () {
      var list1 = [1,3,4]
      var list2 = [3,5]
      expect(u(list1, list2)).to.deep.equal([3])
    })

    it('returns empty for empty lists', function () {
      var list1 = []
      var list2 = []
      expect(u(list1, list2)).to.deep.equal([])
    })
  })

  describe('intersection', function () {
    it('returns the intersection of two lists', function () {
      var list1 = [1,3,4]
      var list2 = [3,4,5]
      expect(n(list1, list2)).to.deep.equal([1,5])
    })

    it('handles lists of unequal length', function () {
      var list1 = [1,3,4]
      var list2 = [3,5]
      expect(n(list1, list2)).to.deep.equal([1,4,5])
    })

    it('returns empty list for empty lists', function () {
      var list1 = []
      var list2 = []
      expect(n(list1, list2)).to.deep.equal([])
    })
  })

  describe('jaccardIndex', function () {
    it('returns a decimal number from two lists of numbers', function () {
      var list1 = [1,3,4]
      var list2 = [3,4,5]
      expect(typeof jaccardIndex(list1, list2)).to.equal('number')
    })

    it('handles lists of unequal length', function () {
      var list1 = [1,3,4]
      var list2 = [3,5]
      expect(typeof jaccardIndex(list1, list2)).to.equal('number')
    })

    it('handles empty lists', function () {
      var list1 = []
      var list2 = []
      expect(isNaN(jaccardIndex(list1, list2))).to.equal(false)
    })

    it('returns 0.0 for two lists with no common elements', function () {
      var list1 = [1,2,3]
      var list2 = [4,5,6]
      expect(jaccardIndex(list1, list2)).to.equal(0.0)
    })

    it('returns 1.0 for two identical lists', function () {
      var list1 = [1,2,3]
      var list2 = [1,2,3]
      expect(jaccardIndex(list1, list2)).to.equal(1.0)
    })
  })

  describe('jaccardIndex', function () {
    it('returns a decimal number from two lists of numbers', function () {
      var list1 = [1,3,4]
      var list2 = [3,4,5]
      expect(typeof jaccardIndex(list1, list2)).to.equal('number')
    })

    it('handles lists of unequal length', function () {
      var list1 = [1,3,4]
      var list2 = [3,5]
      expect(typeof jaccardIndex(list1, list2)).to.equal('number')
    })

    it('handles empty lists', function () {
      var list1 = []
      var list2 = []
      expect(isNaN(jaccardIndex(list1, list2))).to.equal(false)
    })

    it('returns 0.0 for two lists with no common elements', function () {
      var list1 = [1,2,3]
      var list2 = [4,5,6]
      expect(jaccardIndex(list1, list2)).to.equal(0.0)
    })

    it('returns 1.0 for two identical lists', function () {
      var list1 = [1,2,3]
      var list2 = [1,2,3]
      expect(jaccardIndex(list1, list2)).to.equal(1.0)
    })
  })

  describe('calculateAgreement', function () {
    it('returns a decimal number for two users with lists of liked and disliked ids', function () {
      var user1 = {id: 1, likes: [], dislikes: []}
      var user2 = {id: 2, likes: [], dislikes: []}
      expect(typeof calculateAgreement(user1, user2)).to.equal('number')
    })

    it('returns 1.0 for users who like the same items', function () {
      var user1 = {id: 1, likes: [1,2,3,4], dislikes: []}
      var user2 = {id: 2, likes: [3,2,1,4], dislikes: []}
      expect(calculateAgreement(user1, user2)).to.equal(1.0)
    })

    it('returns 1.0 for users who dislike the same items', function () {
      var user1 = {id: 1, likes: [], dislikes: [1,2,3,4]}
      var user2 = {id: 2, likes: [], dislikes: [4,2,1,3]}
      expect(calculateAgreement(user1, user2)).to.equal(1.0)
    })

    it('returns 1.0 for users who like and dislike the same items', function () {
      var user1 = {id: 1, likes: [1,2,3,4], dislikes: [8,7,6]}
      var user2 = {id: 2, likes: [4,2,3,1], dislikes: [8,6,7]}
      expect(calculateAgreement(user1, user2)).to.equal(1.0)
    })

    it('returns 0.0 for users who do not like any of the same items', function () {
      var user1 = {id: 1, likes: [8,5,6],   dislikes: []}
      var user2 = {id: 2, likes: [1,2,3,4], dislikes: []}
      expect(calculateAgreement(user1, user2)).to.equal(0.0)
    })

    it('returns 0.0 for users who do not dislike any of the same items', function () {
      var user1 = {id: 1, likes: [], dislikes: [1,3]}
      var user2 = {id: 2, likes: [], dislikes: [8,7,6]}
      expect(calculateAgreement(user1, user2)).to.equal(0.0)
    })

    it('returns 0.0 for users who do not like or dislike any of the same items', function () {
      var user1 = {id: 1, likes: [8,5,6],   dislikes: [1,3]}
      var user2 = {id: 2, likes: [1,2,3,4], dislikes: [8,7,6]}
      expect(calculateAgreement(user1, user2)).to.equal(0.0)
    })
  })

  describe('calculateDisagreement', function () {
    it('returns a decimal number for two users with lists of liked and disliked ids', function () {
      var user1 = {id: 1, likes: [], dislikes: []}
      var user2 = {id: 2, likes: [], dislikes: []}
      expect(typeof calculateDisagreement(user1, user2)).to.equal('number')
    })

    it('returns 1.0 when one user dislikes each item the other likes', function () {
      var user1 = {id: 1, likes: [1,2,3,4], dislikes: [8,7,6,5]}
      var user2 = {id: 2, likes: [5,6,7,8], dislikes: [4,1,2,3]}
      expect(calculateDisagreement(user1, user2)).to.equal(1.0)
    })

    it('returns 0.0 for neither user dislikes any items the other likes', function () {
      var user1 = {id: 1, likes: [1,2,3,4], dislikes: [8,7,6]}
      var user2 = {id: 2, likes: [4,2,3,1], dislikes: [8,6,7]}
      expect(calculateDisagreement(user1, user2)).to.equal(0.0)
    })
  })

  describe('calculateSimilarity', function () {
    it('returns a decimal number for two users with lists of liked and disliked ids', function () {
      var user1 = {id: 1, likes: [], dislikes: []}
      var user2 = {id: 2, likes: [], dislikes: []}
      expect(typeof calculateSimilarity(user1, user2)).to.equal('number')
    })

    it('returns 1.0 for users who like the same items', function () {
      var user1 = {id: 1, likes: [1,2,3,4], dislikes: []}
      var user2 = {id: 2, likes: [3,2,1,4], dislikes: []}
      expect(calculateSimilarity(user1, user2)).to.equal(1.0)
    })

    it('returns 1.0 for users who dislike the same items', function () {
      var user1 = {id: 1, likes: [], dislikes: [1,2,3,4]}
      var user2 = {id: 2, likes: [], dislikes: [4,2,1,3]}
      expect(calculateSimilarity(user1, user2)).to.equal(1.0)
    })

    it('returns 1.0 for users who like and dislike the same items', function () {
      var user1 = {id: 1, likes: [1,2,3,4], dislikes: [8,7,6]}
      var user2 = {id: 2, likes: [4,2,3,1], dislikes: [8,6,7]}
      expect(calculateSimilarity(user1, user2)).to.equal(1.0)
    })

    it('returns 0.0 for users who do not like any of the same items', function () {
      var user1 = {id: 1, likes: [8,5,6],   dislikes: []}
      var user2 = {id: 2, likes: [1,2,3,4], dislikes: []}
      expect(calculateSimilarity(user1, user2)).to.equal(0.0)
    })

    it('returns 0.0 for users who do not dislike any of the same items', function () {
      var user1 = {id: 1, likes: [], dislikes: [1,3]}
      var user2 = {id: 2, likes: [], dislikes: [8,7,6]}
      expect(calculateSimilarity(user1, user2)).to.equal(0.0)
    })

    it('returns 0.0 for users who do not like or dislike any of the same items', function () {
      var user1 = {id: 1, likes: [1,2,3], dislikes: [4,5,6]}
      var user2 = {id: 2, likes: [7,8,9], dislikes: [10,11]}
      expect(calculateSimilarity(user1, user2)).to.equal(0.0)
    })

    it('returns -1.0 for users who do not agree on any items', function () {
      var user1 = {id: 1, likes: [1,2,3], dislikes: [4,5,6]}
      var user2 = {id: 2, likes: [5,4,6], dislikes: [3,1,2]}
      expect(calculateSimilarity(user1, user2)).to.equal(-1.0)
    })
  })

  describe('predictLike', function () {
    it('returns a decimal number from a list of users, a user id, and an item id', function () {
      var users = [
        {id: 1, likes: [1,2,3,4], dislikes: []},
        {id: 2, likes: [1,2,5,6], dislikes: []},
        {id: 3, likes: [3,4,5,6], dislikes: []}
      ]
      var itemId = 5
      expect(typeof predictLike(itemId, users[0], users)).to.equal('number')
    })

    it('close to 1.0 when similar users all like that item', function () {
      var users = [
        {id: 1, likes: [1,2,3,4], dislikes: []},
        {id: 2, likes: [1,2,3,4,5], dislikes: []},
        {id: 3, likes: [3,4,1,2,5], dislikes: []}
      ]
      var itemId = 5
      expect(predictLike(itemId, users[0], users)).to.equal(0.8)
    })

    it('close to -1.0 when similar users all dislike that item', function () {
      var users = [
        {id: 1, likes: [1,2,3,4], dislikes: []},
        {id: 2, likes: [1,2,3,4], dislikes: [5]},
        {id: 3, likes: [3,4,2,1], dislikes: [5]}
      ]
      var itemId = 5
      expect(predictLike(itemId, users[0], users)).to.equal(-0.8)
    })

    it('close to 0.0 when some similar users like that item and other similar users dislike it', function () {
      var users = [
        {id: 1, likes: [1,2,3,4], dislikes: [6]},
        {id: 2, likes: [1,2,3,4], dislikes: [5]},
        {id: 3, likes: [3,4,2,1], dislikes: [7]}
      ]
      var itemId = 5
      expect(predictLike(itemId, users[0], users)).to.equal(0.0)
    })
  })

  describe('recommendationsFor', function () {
    it('returns a list of item ids', function () {
      var users = [
        {id: 1, likes: [1,2,3,4], dislikes: [6]},
        {id: 2, likes: [1,2,3,4], dislikes: [5]},
        {id: 3, likes: [3,4,2,1], dislikes: [7]}
      ]
      var recommendations = recommendationsFor(users[0], users)
      expect(Array.isArray(recommendations)).to.equal(true)
    })

    it('returns numbers', function () {
      var users = [
        {id: 1, likes: [1,2,3,4], dislikes: [6]},
        {id: 2, likes: [1,2,3,4], dislikes: [5]},
        {id: 3, likes: [3,4,2,1], dislikes: [7]}
      ]
      var recommendations = recommendationsFor(users[0], users)
      expect(typeof recommendations[0]).to.equal('number')
    })

    it('does not return NaN items', function () {
      var users = [
        {id: 1, likes: [1,2,3,4], dislikes: [6]},
        {id: 2, likes: [1,2,3,4], dislikes: [5]},
        {id: 3, likes: [3,4,2,1], dislikes: [7]}
      ]
      var recommendations = recommendationsFor(users[0], users)
      expect(isNaN(recommendations[0])).to.equal(false)
    })

    it('does not return items the user has already rated', function () {
      var users = [
        {id: 1, likes: [1,2,3,4], dislikes: [6]},
        {id: 2, likes: [1,2,3,4], dislikes: [5]},
        {id: 3, likes: [3,4,2,1], dislikes: [7]}
      ]
      var recommendations = recommendationsFor(users[0], users)
      expect(recommendations).to.not.contain(1)
      expect(recommendations).to.not.contain(2)
      expect(recommendations).to.not.contain(3)
      expect(recommendations).to.not.contain(4)
      expect(recommendations).to.not.contain(6)
    })

    it('returns item ids ordered by greatest like probability first', function () {
      var users = [
        {id: 1, likes: [1,2,3,4], dislikes: []},
        {id: 2, likes: [1,2,3,4,5,6], dislikes: []},
        {id: 3, likes: [3,4,2,1,5,7], dislikes: [6]}
      ]
      expect(recommendationsFor(users[0], users)).to.deep.equal([5,7,6])
    })
  })

  xdescribe('nightmare mode', function() {
    it('works for 1-5 stars rather than likes or dislikes')
    it('is optimized to run faster than the given solution (try to avoid duplicate list iterations)')
    it('applies deltas rather than recalculating all recommendations when a rating changes')
  })
})

/*
xdescribe('bubbleSort', function() {
  var array1 = [0,-1,1,5,-5,2,3,7];
  var copyOfArray1 = [0,-1,1,5,-5,2,3,7];
  var sortedArray1 = [-5,-1,0,1,2,3,5,7];

  it('should sort an array of integers', function() {
    bubbleSort(array1).forEach(function(element, index){
      expect(element).to.be(sortedArray1[index]);
    });
  });
  it('should not mutate the original array', function() {
    bubbleSort(array1);
    array1.forEach(function(element, index){
      expect(element).to.be(copyOfArray1[index]);
    });
  });
});

xdescribe('mergeSort', function() {
  var array1 = [0,-1,1,5,-5,2,3,7];
  var copyOfArray1 = [0,-1,1,5,-5,2,3,7];
  var sortedArray1 = [-5,-1,0,1,2,3,5,7];

  it('should sort an array of integers', function() {
    mergeSort(array1).forEach(function(element, index){
      expect(element).to.be(sortedArray1[index]);
    });
  });
  it('should not mutate the original array', function() {
    mergeSort(array1);
    array1.forEach(function(element, index){
      expect(element).to.be(copyOfArray1[index]);
    });
  });
  it('should sort a large array faster than bubbleSort', function(){
    var array = [];
    for(var i=0; i<1e3; i++) {
      array.push(Math.floor(Math.random() * 100));
    }
    var bubbleSortResults = timer(bubbleSort, array);
    var mergeSortResults = timer(mergeSort, array);
    mergeSortResults.result.forEach(function(element, index){
      expect(element).to.be(bubbleSortResults.result[index]);
    });
    expect(mergeSortResults.timeElapsed).to.be.below(bubbleSortResults.timeElapsed);
  });
});
*/
// describe('quickSort', function() {
//   var array, sortedArray;
//   beforeEach(function(){
//     array = [1234, 4521, 2252, 5103, 10001, 21, 235];
//     sortedArray = [21, 235, 1234, 2252, 4521, 5103, 10001];
//   });
//
//   it('should sort an array of integers', function() {
//     expect(quickSort(array)).to.deep.equal(sortedArray);
//   });
//
//   it('works for negative numbers', function(){
//     array.push(-3);
//     sortedArray.unshift(-3);
//     expect(quickSort(array)).to.deep.equal(sortedArray);
//   })
//
//   it('works for decimals', function(){
//     array.push(7.8);
//     sortedArray.unshift(7.8);
//     expect(quickSort(array)).to.deep.equal(sortedArray);
//   })
// });
//
// describe('radixSort', function() {
//   var array, sortedArray;
//   beforeEach(function(){
//     array = [1234, 4521, 2252, 5103, 10001, 21, 235];
//     sortedArray = [21, 235, 1234, 2252, 4521, 5103, 10001];
//   });
//
//   it('should sort an array of integers', function() {
//     expect(radixSort(array)).to.deep.equal(sortedArray);
//   });
//
//   xit('works for characters', function(){
//     var array = ['bob', 'alice', 'carl', 'thx1138'] ;
//     var sortedArray = ['alice', 'bob', 'carl', 'thx1138'] ;
//     expect(radixSort(array)).to.deep.equal(sortedArray);
//   })
//
//   xit('works for decimals', function(){
//     array.push(7.8);
//     sortedArray.unshift(7.8);
//     expect(radixSort(array)).to.deep.equal(sortedArray);
//   })
//
//   xit('works for negative numbers', function(){
//     array.push(-3);
//     sortedArray.unshift(-3);
//     expect(radixSort(array)).to.deep.equal(sortedArray);
//   })
// });

/*
xdescribe('Extra Credit', function() {
  it('sort non-integer arrays');
  it('write tests to compare sorting speeds for large arrays');
  it('write tests for sorting stability');
  it('implement selectionSort');
  it('implement insertionSort');
});
*/

// function timer(sortingAlgorithm, array){
//   // copy array;
//   var tempArray = array.slice();
//   // time the algorithm
//   var start = new Date().getTime();
//   var result = sortingAlgorithm(tempArray);
//   var end = new Date().getTime();
//   return {
//     timeElapsed : end - start,
//     result      : result
//   };
// };
