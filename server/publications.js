Meteor.publish('posts', function(sort, limit) {
  return Posts.find({}, {
    sort: sort,
    limit: Math.min(limit, 25) // enforce a max limit of 25
  });
});

Meteor.publish('singlePost', function (id) {
  check(id, String);
  return Posts.find(id);
});

Meteor.publish('comments', function (postId) {
  check(postId, String);
  return Comments.find({ postId: postId });
});

Meteor.publish('notifications', function () {
  return Notifications.find({ userId: this.userId });
});
