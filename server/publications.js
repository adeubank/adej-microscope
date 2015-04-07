Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('comments', function (postId) {
  console.log(postId);
  check(postId, String);
  return Comments.find({ postId: postId });
});
