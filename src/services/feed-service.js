import { httpService } from './http.service';

// const feedEndpoint = 'feed';
// const authEndpoint = 'auth';

async function getPosts() {
  return httpService.get('feed/posts');
}

async function loveStatus(postLoveStatus) {
  return httpService.post(`feed/post/${postLoveStatus._id}`, postLoveStatus);
}

async function addPost(post) {
  return httpService.post('feed/post', post);
}

async function editPost(post) {
  return httpService.put(`feed/post/${post._id}`, post);
}

async function removePostById(postId) {
  return httpService.delete(`feed/post/${postId}`, postId);
}

async function createComment(comment) {
  // need to set different endpoint
  return httpService.post(`feed/${comment.postId}/comment`, comment);
}

export const feedService = {
  getPosts,
  addPost,
  removePostById,
  editPost,
  loveStatus,
  createComment,
};
